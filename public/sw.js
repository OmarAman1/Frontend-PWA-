// public/sw.js

const CACHE_VERSION = "v1";
const APP_SHELL_CACHE = `app-shell-${CACHE_VERSION}`;
const API_CACHE = `api-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const SCOPE_URL = self.registration?.scope || self.location.origin;
const APP_SHELL_FILES = [
  new URL("./", SCOPE_URL).toString(),
  new URL("manifest.json", SCOPE_URL).toString(),
  new URL("icons/icon-192x192.png", SCOPE_URL).toString(),
  new URL("icons/icon-512x512.png", SCOPE_URL).toString(),
];

// 1) INSTALL: spara app shell i cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) =>
      cache.addAll(
        APP_SHELL_FILES.map((url) => new Request(url, { cache: "reload" }))
      )
    )
  );

  self.skipWaiting();
});

// 2) ACTIVATE: rensa gamla caches om versionen ändras
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !key.includes(CACHE_VERSION))
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // A) Cache API-svar (cache-first)
  if (
    url.origin === "https://potterhead-api.vercel.app" &&
    url.pathname.startsWith("/api")
  ) {
    event.respondWith(cacheFirst(req, API_CACHE));
    return;
  }

  // B) För appens egna filer (same-origin), kör "runtime cache"
  if (url.origin === self.location.origin) {
    event.respondWith(runtimeCache(req));
    return;
  }
});

// ---- Hjälpfunktioner ----

// Cache-first = försök cache först, annars hämta nät och spara
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const res = await fetch(request);
  // Spara bara om det gick bra
  if (res.ok) cache.put(request, res.clone());
  return res;
}

// Runtime cache för appens egna filer:
// - försök nät först, om offline → ta cache
async function runtimeCache(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(request);

    // Om det är en sidnavigering (refresh på en route) returnera "/" som fallback
    if (!cached && request.mode === "navigate") {
      const shell = await caches.open(APP_SHELL_CACHE);
      return shell.match(new URL("./", SCOPE_URL).toString());
    }

    return cached || Response.error();
  }
}

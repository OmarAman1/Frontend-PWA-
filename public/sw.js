
self.addEventListener("install", (event) => {
  // Körs när service worker installeras
  self.skipWaiting(); // gör att den aktiveras snabbare
});

self.addEventListener("activate", (event) => {
  // Körs när service worker aktiveras
  self.clients.claim(); // tar kontroll över öppna flikar
});

const DB_NAME = "movies-app-db";
const DB_VERSION = 1;
const STORE_NAME = "favorites";

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "movieKey" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getMovieKey(movieOrKey) {
  if (typeof movieOrKey === "string" || typeof movieOrKey === "number") {
    return String(movieOrKey);
  }
  return String(movieOrKey?.id ?? movieOrKey?.serial ?? "");
}

export function getKeyFromMovie(movie) {
  return getMovieKey(movie);
}

export async function getAllFavorites() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveFavorite(movie) {
  const movieKey = getMovieKey(movie);
  if (!movieKey) return;

  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put({ ...movie, movieKey });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function removeFavorite(movieOrKey) {
  const movieKey = getMovieKey(movieOrKey);
  if (!movieKey) return;

  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(movieKey);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

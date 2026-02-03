const DB_NAME = "movies-app-db";
const DB_VERSION = 2;
const FAVORITES_STORE = "favorites";
const RATINGS_STORE = "ratings";

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(FAVORITES_STORE)) {
        db.createObjectStore(FAVORITES_STORE, { keyPath: "movieKey" });
      }
      if (!db.objectStoreNames.contains(RATINGS_STORE)) {
        db.createObjectStore(RATINGS_STORE, { keyPath: "movieKey" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllRatings() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RATINGS_STORE, "readonly");
    const store = tx.objectStore(RATINGS_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function saveRating(movieKey, ratingValue) {
  const key = String(movieKey || "");
  const value = Number(ratingValue || 0);
  if (!key || value < 1 || value > 5) return;

  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RATINGS_STORE, "readwrite");
    const store = tx.objectStore(RATINGS_STORE);
    const request = store.put({ movieKey: key, value });

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

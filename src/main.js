import { getCharacters, getMovies } from "./api/swapi.js";
import "./style.css";
import FavoritesPage from "./view/favoritesPage.js";
import Home from "./view/HomePage.js";
import MovieDetailsPage from "./view/movieDetailsPage.js";
import MoviesCard from "./view/moviesCard.js";
import TopRatedPage from "./view/topRatedPage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  getAllFavorites,
  getKeyFromMovie,
  removeFavorite,
  saveFavorite,
} from "./db/favoritesDb.js";
import { getAllRatings, saveRating } from "./db/ratingsDb.js";

/*
   OFFLINE BANNER (User story: tydlig feedback när offline)
*/
const offlineRoot = document.getElementById("offline-banner-root");

function renderOfflineBanner() {
  if (!offlineRoot) return;

  // navigator.onLine = true betyder online, false betyder offline
  const isOnline = navigator.onLine;

  if (isOnline) {
    offlineRoot.innerHTML = ""; // ta bort bannern
    return;
  }

  // Visa banner när offline
  offlineRoot.innerHTML = `
    <div role="alert" class="offline-banner">
      ⚠️ Du är offline. Appen kan ha begränsad funktion.
    </div>
  `;
}

// Kör en gång när sidan startar (om användaren redan är offline)
renderOfflineBanner();

// Lyssna på online/offline events och uppdatera bannern
window.addEventListener("online", renderOfflineBanner);
window.addEventListener("offline", renderOfflineBanner);

/*
   APP STATE
*/
const app = document.getElementById("app");
let moviesCache = null;
let favoriteKeySet = new Set();
let ratingMap = new Map();

/*
   SERVICE WORKER REGISTRERING
   Använder ./sw.js så det funkar även om appen körs under
   t.ex. /Frontend-PWA/ som base path
*/
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./sw.js");
      console.log("✅ Service Worker registrerad:", reg.scope);
    } catch (err) {
      console.log("❌ Service Worker kunde inte registreras:", err);
    }
  });
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function getAllMovies() {
  if (moviesCache) return moviesCache;
  moviesCache = await getMovies();
  return moviesCache;
}

function getMovieByKey(movieKey) {
  if (!moviesCache) return null;
  return (
    moviesCache.find(
      (movie) => String(getKeyFromMovie(movie)) === String(movieKey)
    ) || null
  );
}

function normalizeCharactersPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

function getMovieMatchTokens(movie) {
  const tokens = new Set();
  if (!movie) return [];
  if (movie.id !== undefined && movie.id !== null) tokens.add(String(movie.id));
  if (movie.serial !== undefined && movie.serial !== null) tokens.add(String(movie.serial));
  if (movie.movieKey !== undefined && movie.movieKey !== null) tokens.add(String(movie.movieKey));
  if (movie.title) tokens.add(String(movie.title));
  if (movie.title && movie.release_date) {
    tokens.add(`${movie.title} ${movie.release_date}`);
  }
  return Array.from(tokens).map((value) => value.toLowerCase());
}

function extractCharacterRefs(character) {
  const keys = [
    "movie",
    "movies",
    "film",
    "films",
    "appearances",
    "appearsIn",
    "appears_in",
    "movieTitle",
    "movie_title",
    "movieId",
    "movie_id",
    "serial",
    "title",
  ];
  const refs = [];
  keys.forEach((key) => {
    const value = character?.[key];
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((item) => refs.push(item));
      return;
    }
    refs.push(value);
  });
  return refs;
}

function characterMatchesMovie(character, tokens) {
  if (!tokens.length) return false;
  const refs = extractCharacterRefs(character);
  if (!refs.length) return false;

  return refs.some((ref) => {
    if (ref && typeof ref === "object") {
      const candidates = [
        ref.title,
        ref.name,
        ref.id,
        ref.movieKey,
        ref.serial,
      ].filter(Boolean);
      return candidates.some((value) =>
        tokens.some((token) => String(value).toLowerCase().includes(token))
      );
    }
    return tokens.some((token) =>
      String(ref).toLowerCase().includes(token)
    );
  });
}

async function getCharactersForMovie(movie) {
  if (!movie) return [];
  try {
    const payload = await getCharacters();
    const allCharacters = normalizeCharactersPayload(payload);
    const tokens = getMovieMatchTokens(movie);
    const related = allCharacters.filter((character) =>
      characterMatchesMovie(character, tokens)
    );
    const list = related.length ? related : allCharacters;
    return list.slice(0, 12);
  } catch {
    return [];
  }
}


function setFavoriteButtonA11y(button, isFavorite) {
  if (!button) return;

  button.setAttribute("aria-pressed", String(isFavorite));

  const movieKey = String(button.dataset.movieId || "");
  const movie = getMovieByKey(movieKey);
  // om vi inte hittar filmen i cache, använd en generell text
  const title = movie?.title ? String(movie.title) : "filmen";

  button.setAttribute(
    "aria-label",
    isFavorite
      ? `Ta bort ${title} från favoriter`
      : `Lägg till ${title} i favoriter`
  );
}

async function refreshFavoriteKeySet() {
  try {
    const favorites = await getAllFavorites();
    favoriteKeySet = new Set(
      favorites.map((movie) =>
        String(movie.movieKey ?? getKeyFromMovie(movie))
      )
    );
  } catch {
    favoriteKeySet = new Set();
  }
}

function setFavoriteIconState(icon, isFavorite) {
  if (!icon) return;
  icon.classList.toggle("bi-heart-fill", isFavorite);
  icon.classList.toggle("bi-heart", !isFavorite);
}

async function syncFavoriteIcons() {
  await refreshFavoriteKeySet();
  const buttons = document.querySelectorAll(".favorite-btn[data-movie-id]");
  buttons.forEach((button) => {
    const movieKey = String(button.dataset.movieId || "");
    const icon = button.querySelector("i");
    const isFav = favoriteKeySet.has(movieKey);

    setFavoriteIconState(icon, isFav);
    setFavoriteButtonA11y(button, isFav);
  });
}

async function refreshRatingMap() {
  try {
    const ratings = await getAllRatings();
    ratingMap = new Map(
      ratings.map((item) => [String(item.movieKey), Number(item.value || 0)])
    );
  } catch {
    ratingMap = new Map();
  }
}

function paintStars(ratingInput, selectedValue) {
  if (!ratingInput) return;
  const stars = ratingInput.querySelectorAll(".star");
  stars.forEach((star) => {
    const value = Number(star.getAttribute("data-value") || "0");
    star.style.color = value <= selectedValue ? "#ffd700" : "#d7d7d7";
  });
}

async function syncRatingStars() {
  await refreshRatingMap();
  const ratingInputs = document.querySelectorAll(".stars[data-movie-id]");
  ratingInputs.forEach((ratingInput) => {
    const movieId = String(ratingInput.getAttribute("data-movie-id") || "");
    const selected = ratingMap.get(movieId) || 0;
    paintStars(ratingInput, selected);
  });
}

function filterMovies(movies, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return movies;

  return movies.filter((movie) => {
    const title = String(movie.title || "").toLowerCase();
    const summary = String(movie.summary || "").toLowerCase();
    return title.includes(q) || summary.includes(q);
  });
}

function getNumericRating(movie) {
  const raw = String(movie?.rating ?? "").replace(/[^\d.]/g, "");
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
}

function loadingMarkup(label = "Loading...") {
  return `
    <div class="status-box status-loading" role="status" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>${escapeHtml(label)}</p>
    </div>
  `;
}

function emptyMarkup(message) {
  return `
    <div class="status-box status-empty">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function errorMarkup(message) {
  return `
    <div class="status-box status-error" role="alert">
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

async function renderHomePage(searchQuery = "") {
  app.innerHTML = Home(searchQuery);
  const moviesSection = document.getElementById("moviesSection");
  if (!moviesSection) return;

  moviesSection.innerHTML = loadingMarkup("Loading movies...");
  try {
    const movies = await getAllMovies();
    const filtered = filterMovies(movies, searchQuery);
    moviesSection.innerHTML = filtered.length
      ? MoviesCard(filtered, { allowRating: true })
      : emptyMarkup(`No movies found for "${searchQuery}".`);
    await syncFavoriteIcons();
    await syncRatingStars();
  } catch {
    moviesSection.innerHTML = errorMarkup("Could not load movies right now.");
  }
}

async function renderTopRatedPage(searchQuery = "") {
  app.innerHTML = TopRatedPage(searchQuery);
  const topRatedSection = document.getElementById("topRatedSection");
  if (!topRatedSection) return;

  topRatedSection.innerHTML = loadingMarkup("Loading top rated movies...");
  try {
    const movies = await getAllMovies();
    await refreshRatingMap();
    const filtered = filterMovies(movies, searchQuery);
    const ratedMovies = filtered.filter((movie) =>
      ratingMap.has(String(getKeyFromMovie(movie)))
    );
    const sortedMovies = [...ratedMovies].sort((a, b) => {
      const aRate = ratingMap.get(String(getKeyFromMovie(a))) || 0;
      const bRate = ratingMap.get(String(getKeyFromMovie(b))) || 0;
      if (bRate !== aRate) return bRate - aRate;
      return getNumericRating(b) - getNumericRating(a);
    });
    topRatedSection.innerHTML = sortedMovies.length
      ? MoviesCard(sortedMovies, { allowRating: false })
      : emptyMarkup("No rated movies yet. Please rate movies on Home page.");
    await syncFavoriteIcons();
    await syncRatingStars();
  } catch {
    topRatedSection.innerHTML = errorMarkup(
      "Could not load top rated movies right now."
    );
  }
}

async function renderFavoritesPage(searchQuery = "") {
  app.innerHTML = FavoritesPage(searchQuery);
  const favoritesSection = document.getElementById("favoritesSection");
  if (!favoritesSection) return;

  favoritesSection.innerHTML = loadingMarkup("Loading favorites...");
  try {
    const favorites = await getAllFavorites();
    const filtered = filterMovies(favorites, searchQuery);
    favoritesSection.innerHTML = filtered.length
      ? MoviesCard(filtered, { allowRating: false })
      : emptyMarkup(
          `No favorites found${searchQuery ? ` for "${searchQuery}"` : ""}.`
        );
    await syncFavoriteIcons();
    await syncRatingStars();
  } catch {
    favoritesSection.innerHTML = errorMarkup(
      "Could not load favorites from IndexedDB."
    );
  }
}

async function renderMovieDetailsPage(movieId, searchQuery = "") {
  app.innerHTML = MovieDetailsPage(null, searchQuery);
  try {
    const movies = await getAllMovies();
    let movie = movies.find((m) => String(m.id ?? m.serial) === String(movieId));
    if (!movie) {
      const favorites = await getAllFavorites();
      movie = favorites.find(
        (m) => String(m.movieKey ?? m.id ?? m.serial) === String(movieId)
      );
    }
    const characters = await getCharactersForMovie(movie);
    app.innerHTML = MovieDetailsPage(movie || null, searchQuery, { characters });
  } catch {
    try {
      const favorites = await getAllFavorites();
      const movie = favorites.find(
        (m) => String(m.movieKey ?? m.id ?? m.serial) === String(movieId)
      );
      const characters = await getCharactersForMovie(movie);
      app.innerHTML = MovieDetailsPage(movie || null, searchQuery, { characters });
    } catch {
      app.innerHTML = MovieDetailsPage(null, searchQuery);
    }
  }
}

async function renderApp() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  const page = params.get("page") || "home";
  const searchQuery = params.get("q") || "";

  if (movieId) {
    await renderMovieDetailsPage(movieId, searchQuery);
    return;
  }

  if (page === "top-rated") {
    await renderTopRatedPage(searchQuery);
    return;
  }

  if (page === "favorites") {
    await renderFavoritesPage(searchQuery);
    return;
  }

  await renderHomePage(searchQuery);
}

function navbarToggle(event) {
  const toggleButton = event.target.closest(".navbar-toggler");
  if (!toggleButton) return;

  const navContent = document.querySelector("#navbarSupportedContent");
  if (!navContent) return;

  navContent.classList.toggle("show");
  const expanded = navContent.classList.contains("show");
  toggleButton.setAttribute("aria-expanded", String(expanded));
}

async function favoriteToggle(event) {
  const btn = event.target.closest("button.favorite-btn[data-movie-id]");
  if (!btn) return;

  const movieKey = String(btn.dataset.movieId || "");
  if (!movieKey) return;
  const icon = btn.querySelector("i");

  const isFavorite = favoriteKeySet.has(movieKey);
  if (isFavorite) {
    await removeFavorite(movieKey);
    favoriteKeySet.delete(movieKey);
    setFavoriteIconState(icon, false);
    setFavoriteButtonA11y(btn, false);
  } else {
    const movie = getMovieByKey(movieKey);
    if (!movie) return;
    await saveFavorite(movie);
    favoriteKeySet.add(movieKey);
    setFavoriteIconState(icon, true);
    setFavoriteButtonA11y(btn, true);
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("page") === "favorites") {
    await renderFavoritesPage(params.get("q") || "");
  }
}

async function handleStarClick(event) {
  const ratingInput = event.target.closest(".rating-input[data-movie-id]");
  if (!ratingInput) return;
  if (!event.target.classList.contains("star")) return;
  event.stopPropagation();

  const selectedValue = Number(event.target.getAttribute("data-value") || "0");
  if (!selectedValue) return;
  const movieId = ratingInput.getAttribute("data-movie-id") || "";
  if (!movieId) return;

  await saveRating(movieId, selectedValue);
  ratingMap.set(String(movieId), selectedValue);
  paintStars(ratingInput, selectedValue);
}

/* stöd för Enter/Space på stjärnor (tangentbord) */
function handleStarKeydown(event) {
  const star = event.target.closest(".star[data-value]");
  if (!star) return;

  const ratingInput = star.closest(".rating-input[data-movie-id]");
  if (!ratingInput) return;

  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();

  const selectedValue = Number(star.getAttribute("data-value") || "0");
  if (!selectedValue) return;

  const movieId = ratingInput.getAttribute("data-movie-id") || "";
  if (!movieId) return;

  saveRating(movieId, selectedValue).then(() => {
    ratingMap.set(String(movieId), selectedValue);
    paintStars(ratingInput, selectedValue);
  });
}

function handleMovieCardNavigation(event) {
  if (event.target.closest("a, button, input, form, .star")) return;

  const card = event.target.closest(".movie-card[data-movie-id]");
  if (!card) return;

  const movieId = card.dataset.movieId;
  if (!movieId) return;

  const params = new URLSearchParams(window.location.search);
  params.set("id", movieId);
  window.history.pushState({}, "", `?${params.toString()}`);
  renderApp();
}

function handleSearchSubmit(event) {
  const form = event.target.closest("form[data-search-form]");
  if (!form) return;

  event.preventDefault();

  const formData = new FormData(form);
  const query = String(formData.get("q") || "").trim();
  const params = new URLSearchParams(window.location.search);
  const currentPage = params.get("page");

  params.delete("id");
  if (currentPage !== "top-rated" && currentPage !== "favorites") {
    params.set("page", "home");
  }

  if (query) {
    params.set("q", query);
  } else {
    params.delete("q");
  }

  window.history.pushState({}, "", `?${params.toString()}`);
  renderApp();
}

document.addEventListener("click", navbarToggle);
document.addEventListener("click", favoriteToggle);
document.addEventListener("click", handleStarClick);
document.addEventListener("keydown", handleStarKeydown);
document.addEventListener("click", handleMovieCardNavigation);
document.addEventListener("submit", handleSearchSubmit);
window.addEventListener("popstate", renderApp);

renderApp();

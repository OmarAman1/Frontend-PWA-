import { getMovies } from "./api/swapi.js";
import "./style.css";
import Home from "./view/HomePage.js";
import MoviesCard from "./view/moviesCard.js";
import MovieDetailsPage from "./view/movieDetailsPage.js";
import TopRatedPage from "./view/topRatedPage.js";
import FavoritesPage from "./view/favoritesPage.js";
import { getAllFavorites, getKeyFromMovie, removeFavorite, saveFavorite } from "./db/favoritesDb.js";
 
const app = document.getElementById("app");
let moviesCache = null;
let favoriteKeySet = new Set();
 
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
    moviesCache.find((movie) => String(getKeyFromMovie(movie)) === String(movieKey)) || null
  );
}
 
async function refreshFavoriteKeySet() {
  try {
    const favorites = await getAllFavorites();
    favoriteKeySet = new Set(favorites.map((movie) => String(movie.movieKey ?? getKeyFromMovie(movie))));
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
    setFavoriteIconState(icon, favoriteKeySet.has(movieKey));
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
      ? MoviesCard(filtered)
      : emptyMarkup(`No movies found for "${searchQuery}".`);
    await syncFavoriteIcons();
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
    const filtered = filterMovies(movies, searchQuery);
    const sortedMovies = [...filtered].sort((a, b) => getNumericRating(b) - getNumericRating(a));
    topRatedSection.innerHTML = sortedMovies.length
      ? MoviesCard(sortedMovies)
      : emptyMarkup(`No top rated movies found for "${searchQuery}".`);
    await syncFavoriteIcons();
  } catch {
    topRatedSection.innerHTML = errorMarkup("Could not load top rated movies right now.");
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
      ? MoviesCard(filtered)
      : emptyMarkup(`No favorites found${searchQuery ? ` for "${searchQuery}"` : ""}.`);
    await syncFavoriteIcons();
  } catch {
    favoritesSection.innerHTML = errorMarkup("Could not load favorites from IndexedDB.");
  }
}
 
async function renderMovieDetailsPage(movieId, searchQuery = "") {
  app.innerHTML = MovieDetailsPage(null, searchQuery);
  try {
    const movies = await getAllMovies();
    let movie = movies.find((m) => String(m.id ?? m.serial) === String(movieId));
    if (!movie) {
      const favorites = await getAllFavorites();
      movie = favorites.find((m) => String(m.movieKey ?? m.id ?? m.serial) === String(movieId));
    }
    app.innerHTML = MovieDetailsPage(movie || null, searchQuery);
  } catch {
    try {
      const favorites = await getAllFavorites();
      const movie = favorites.find((m) => String(m.movieKey ?? m.id ?? m.serial) === String(movieId));
      app.innerHTML = MovieDetailsPage(movie || null, searchQuery);
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
  } else {
    const movie = getMovieByKey(movieKey);
    if (!movie) return;
    await saveFavorite(movie);
    favoriteKeySet.add(movieKey);
    setFavoriteIconState(icon, true);
  }
 
  const params = new URLSearchParams(window.location.search);
  if (params.get("page") === "favorites") {
    await renderFavoritesPage(params.get("q") || "");
  }
}
 
function handleStarClick(event) {
  if (!event.target.classList.contains("star")) return;
 
  const selectedValue = Number(event.target.getAttribute("data-value") || "0");
  const stars = event.target.parentElement?.querySelectorAll(".star");
  if (!stars) return;
 
  stars.forEach((star) => {
    const value = Number(star.getAttribute("data-value") || "0");
    star.style.color = value <= selectedValue ? "#ffd700" : "#d7d7d7";
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
document.addEventListener("click", handleMovieCardNavigation);
document.addEventListener("submit", handleSearchSubmit);
window.addEventListener("popstate", renderApp);
 
renderApp();
 
 
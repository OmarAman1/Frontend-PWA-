import NavBar from "./NavbarPage.js";

export default function FavoritesPage(searchQuery = "") {
  return `
    ${NavBar("favorites", searchQuery)}
    <main class="container">
      <h1 class="page-title">Favorite Movies</h1>
      <p class="top-rated-subtitle">Saved in your browser (IndexedDB).</p>
      <section id="favoritesSection"></section>
    </main>
  `;
}

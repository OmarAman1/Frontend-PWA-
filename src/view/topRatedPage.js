import Footer from "./footerPage.js";
import NavBar from "./NavbarPage.js";
 
export default function TopRatedPage(searchQuery = "") {
  return `
    <div class="top-rated-page">
      ${NavBar("top-rated", searchQuery)}
      <main class="container">
        <h1 class="page-title">Top Rated Movies</h1>
        <p class="top-rated-subtitle">The highest-rated picks from the wizarding world.</p>
        <section id="topRatedSection"></section>
      </main>
      ${Footer()}
    </div>
  `;
}
 
 
import { getMovies } from "../api/swapi.js";
import NavBar from "./NavbarPage.js";
import MoviesCard from "./moviesCard.js";


function fetchAndRenderMovies() {
  getMovies().then((movies) => {
    console.log(movies);
    const moviesSection = document.getElementById("moviesSection");
    if (moviesSection) {
      moviesSection.innerHTML = MoviesCard(movies);
    }
  });
}


export default function Home(){



  return `
    ${NavBar()}
    <main class="container">
      <h1>Home Page</h1>
      <section id="moviesSection">
        <!-- Movies will be rendered here -->
      </section>
      <script>
        (${fetchAndRenderMovies.toString()})();
      </script>
      <h2>Footer</h2>
    </main>
  `;
}

import NavBar from "./NavbarPage";


export default function Home(){


  const year = new Date().getFullYear();

  return `
    ${NavBar()}
    <main class="container">
      <section id="moviesSection">
      </section>
      <footer class="site-footer">
        <div class="footer-brand">
          <h2>Harry Potter Epics</h2>
          <p>Watchlists, trailers and stories from your favorite worlds.</p>
        </div>

        <div class="footer-links">
          <a href="#">Now Showing</a>
          <a href="#">Top Rated</a>
          <a href="#">Coming Soon</a>
          <a href="#">Contact</a>
        </div>

        <p class="footer-copy">© ${year} CineScope. All rights reserved.</p>
      </footer>
    </main>
  `;
}

import NavBar from "./NavbarPage";


export default function Home(){


  const year = new Date().getFullYear();

  return `
    ${NavBar()}
    <main class="container">
      <h1>Home Page</h1>
      <h1 class="page-title">Movie Universe</h1>
      <section id="moviesSection">
      </section>

      <h2>Footer</h2>
      <footer class="site-footer">
        <div class="footer-brand">
          <h2>CineScope</h2>
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

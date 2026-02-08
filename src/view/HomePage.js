import Footer from "./footerPage";
import NavBar from "./NavbarPage";


export default function Home(){


  const year = new Date().getFullYear();

  return `
  <div class="home-page">
    ${NavBar()}
    <main class="container">
      <!-- Offline-banner visas när du tappar internet -->
    <div id="offline-banner-root"></div>
    <h1 class="home-title">Welcome to Harry Potter Epics</h1>
      <section id="moviesSection">
      </section>
    </main>
    ${Footer()}
    </div>
  `;
}

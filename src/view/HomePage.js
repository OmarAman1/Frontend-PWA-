import Footer from "./footerPage";
import NavBar from "./NavbarPage";


export default function Home(){

  const heroImageUrl = `${import.meta.env.BASE_URL}hero-poster.svg`;

  return `
  <div class="home-page">
    ${NavBar()}
    <main class="container">
      <!-- Offline-banner visas när du tappar internet -->
    <section class="home-hero" aria-label="Featured Harry Potter epics">
      <img
        class="home-hero__image"
        src="${heroImageUrl}"
        alt="Harry Potter Epics featured poster"
        width="340"
        height="550"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">Wizarding world collection</p>
        <h1 class="home-title">Welcome to Harry Potter Epics</h1>
        <p class="home-hero__subtitle">
          Discover every film, dive into trivia, and build your own favorites list.
        </p>
      </div>
    </section>
      <section id="moviesSection">
      </section>
    </main>
    ${Footer()}
    </div>
  `;
}

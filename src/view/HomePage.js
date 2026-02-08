import Footer from "./footerPage";
import NavBar from "./NavbarPage";


export default function Home(){


  const year = new Date().getFullYear();

  return `
    ${NavBar()}
    <main class="container">
    <h1 class="home-title">Welcome to Harry Potter Epics</h1>
      <section id="moviesSection">
      </section>
    </main>
    ${Footer()}
  `;
}

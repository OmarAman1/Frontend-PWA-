import NavBar from "../Components/NavbarPage.js";

export default function Home() {
  return `
    ${NavBar()}
    <main class="container my-4">
      <h1 class="mb-3">Galactic Dex</h1>
      <p class="text-muted">Laddar karaktärer...</p>
      <div id="appContent"></div>
    </main>
  `;
}

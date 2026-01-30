import "./styles/style.css";
import Home from "./view/HomePage.js";
import PeopleList from "./view/PeopleList.js";
import { getPeople } from "./api/swapi.js";

const app = document.getElementById("app");

async function renderHome() {
  // 1) Rita ut grundlayout först
  app.innerHTML = Home();

  // 2) Hitta platsen där content ska in
  const appContent = document.getElementById("appContent");
  const statusText = document.querySelector("main p.text-muted");

  try {
    // 3) Hämta data
    const data = await getPeople(1);

    // 4) Bygg listan och lägg in den
    appContent.innerHTML = PeopleList(data.results);

    // 5) Uppdatera text
    statusText.textContent = `Visar ${data.results.length} karaktärer.`;
  } catch (err) {
    console.error(err);
    statusText.textContent = "Något gick fel när vi hämtade data.";
    appContent.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Kunde inte hämta karaktärer. Testa igen senare.
      </div>
    `;
  }
}

renderHome();

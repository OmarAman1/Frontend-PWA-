import { getPeople } from "./api/swapi.js";
import "./style.css";
import Home from "./view/HomePage.js";
import PeopleList from "./view/PeopleList.js";

const app = document.getElementById("app");
function renderHome() {
  app.innerHTML = Home();

document.querySelector("#moviesCard").addEventListener("click", (e) => {
  const icon = e.target.closest("#favIcon");
  if (!icon) return;

  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
});

document.querySelector(".navbar-toggler").addEventListener("click", (e) => {
  e.preventDefault();
  const navContent = document.querySelector("#navbarSupportedContent");
  if (navContent.classList.contains("show")) {
    navContent.classList.remove("show");
  } else {
    navContent.classList.add("show");
  }
});

function handleStarClick(event) {
  if (event.target.classList.contains("star")) {
    const selectedValue = event.target.getAttribute("data-value");
    const stars = event.target.parentElement.querySelectorAll(".star");
    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= selectedValue) {
        star.style.color = "#ffd700"; // Highlight color
      } else {
        star.style.color = "#d7d7d7"; // Default color
      }
    });
  }
}

document.addEventListener("click", handleStarClick);
}
renderHome();

getPeople().then((people) => {
  const peopleListHTML = PeopleList(people);
  const peopleListContainer = document.createElement("div");
  peopleListContainer.innerHTML = peopleListHTML;
  app.appendChild(peopleListContainer);
});

import { getMovies } from "./api/swapi.js";
import "./style.css";
import Home from "./view/HomePage.js";
import MoviesCard from "./view/moviesCard.js";


const app = document.getElementById("app");
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navContent = document.querySelector("#navbarSupportedContent");
  const moviesCard = document.querySelector("#moviesCard");

function navbarToggle() {

  navContent.classList.toggle("show");
}



function favoriteToggle(event) {
  const btn = event.target.closest("button[data-serial]");
  if (!btn) return;

  const serial = btn.dataset.serial;
  const icon = document.querySelector(`#favIcon-${CSS.escape(serial)}`);
  if (!icon) return;

  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
}

document.addEventListener("click", favoriteToggle);
navbarToggler.addEventListener("click", navbarToggle);


});






function renderHome() {

  app.innerHTML = Home();



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





import './style.css';
import Home from './view/HomePage';

const app = document.getElementById('app');

app.insertAdjacentHTML('afterbegin', Home());
// Event delegation (one listener for all hearts)
document.querySelector("#moviesCard").addEventListener("click", (e) => {
  const icon = e.target.closest("#favIcon");
  if (!icon) return;

  icon.classList.toggle("bi-heart");
  icon.classList.toggle("bi-heart-fill");
});

document.querySelector(".navbar-toggler").addEventListener("click", (e) => {
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


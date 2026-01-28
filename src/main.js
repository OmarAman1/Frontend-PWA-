
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

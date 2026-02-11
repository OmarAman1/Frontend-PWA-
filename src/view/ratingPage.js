

// display rating ★★★★★/✩✩✩✩✩ for movies
export default function ratingPage(movieId, options = {}) {
  const { interactive = true } = options;
  const classes = interactive ? "stars rating-input" : "stars rating-readonly";
  const ratingAttrs = interactive ? "data-rating-input" : "";

  return `
    <div class="rating-page">
      <div class="${classes}" ${ratingAttrs} data-movie-id="${movieId}">
        <span class="star" data-value="1" role="${interactive ? "button" : "img"}" tabindex="${interactive ? "0" : "-1"}" aria-label="Sätt betyg 1 av 5">&#9733;</span>
        <span class="star" data-value="2" role="${interactive ? "button" : "img"}" tabindex="${interactive ? "0" : "-1"}" aria-label="Sätt betyg 2 av 5">&#9733;</span>
        <span class="star" data-value="3" role="${interactive ? "button" : "img"}" tabindex="${interactive ? "0" : "-1"}" aria-label="Sätt betyg 3 av 5">&#9733;</span>
        <span class="star" data-value="4" role="${interactive ? "button" : "img"}" tabindex="${interactive ? "0" : "-1"}" aria-label="Sätt betyg 4 av 5">&#9733;</span>
        <span class="star" data-value="5" role="${interactive ? "button" : "img"}" tabindex="${interactive ? "0" : "-1"}" aria-label="Sätt betyg 5 av 5">&#9733;</span>
      </div>
    </div>
  `;
}


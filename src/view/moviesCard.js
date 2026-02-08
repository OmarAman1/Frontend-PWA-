import ratingPage from "./ratingPage.js";

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function MoviesCard(movies, options = {}) {
  const list = Array.isArray(movies) ? movies : [movies];
  const { allowRating = true } = options;
  console.log(movies);

  return `
    <section aria-label="Lista med filmer och serier" class="movies-grid">
        ${list
          .map((m) => {
            const serial = escapeHtml(m.serial ?? m.id ?? "");
            const movieId = escapeHtml(
              m.movieKey ?? m.id ?? m.serial ?? `${m.title ?? ""}-${m.release_date ?? ""}`.trim()
            );
            const cardId = `moviesCard-${movieId || "x"}`;
            const iconId = `favIcon-${movieId || "x"}`;

            return `

                <div class="card h-100 movie-card__" id="${cardId}" data-movie-id="${movieId}">
                  <img class="card-img-top m-0 p-0"
                       src="${escapeHtml(m.poster || "")}"
                       alt="${escapeHtml(m.title || "Movie poster")}"
                       loading="lazy" />

                  <div class="card__b">
                    <h5 class="card-title fw-bold">${escapeHtml(m.title || "Card title")}</h5>


                    <p class="mb-1"><strong>Release:</strong> ${escapeHtml(m.release_date || "–")}</p>
                    <p class="mb-1"><strong>Runtime:</strong> ${escapeHtml(m.running_time || "–")}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${escapeHtml(m.rating || "–")}</p>

                <div class=" d-flex justify-content-between mb-2 border-0 ">
                    <div class="movie-rating">
                    ${ratingPage(movieId, { interactive: allowRating })}
                    </div>
                  <button class="btn btn-link p-0 m-2 favorite-btn"
                          type="button"
                          aria-label="Favorit"
                          data-serial="${serial}"
                          data-movie-id="${movieId}">
                    <i id="${iconId}" class="bi bi-heart"></i>
                  </button>

                </div>

                    <div class="mt-auto d-flex gap-2">
                      <a href="${escapeHtml(m.trailer || "#")}"
                         class="btn btn-primary flex-fill"
                         target="_blank" rel="noreferrer"
                         ${m.trailer ? "" : "aria-disabled='true' onclick='return false;'"}>Trailer</a>

                      <a href="${escapeHtml(m.wiki || "#")}"
                         class="btn btn-outline-secondary flex-fill"
                         target="_blank" rel="noreferrer"
                         ${m.wiki ? "" : "aria-disabled='true' onclick='return false;'"}>Wiki</a>
                    </div>



             
                </div>
              </div>
            `;
          })
          .join("")}
    </section>
  `;
}

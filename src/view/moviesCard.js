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

  return `
    <section aria-label="Lista med filmer och serier" class="movies-grid">
    <h2 class="visually-hidden">Filmlista</h2>
        ${list
      .map((m, idx) => {
        const isLcp = idx === 0;
        const serial = escapeHtml(m.serial ?? m.id ?? "");
        const movieId = escapeHtml(
          m.movieKey ?? m.id ?? m.serial ?? `${m.title ?? ""}-${m.release_date ?? ""}`.trim()
        );
        const cardId = `moviesCard-${movieId || "x"}`;
        const iconId = `favIcon-${movieId || "x"}`;

        return `

                <div class="card h-100 movie-card" id="${cardId}" data-movie-id="${movieId}">
                <img class="card-img"
          src="${escapeHtml(m.poster || "")}"
          alt="${escapeHtml(m.title || "Movie poster")}"
          loading="${isLcp ? "eager" : "lazy"}"
          fetchpriority="${isLcp ? "high" : "auto"}"
          decoding="async" />

                  <div class="card-body d-flex flex-column">
                    <p class="card-title fw-bold">${escapeHtml(m.title || "Card title")}</p>


                    <p class="mb-1"><strong>Release:</strong> ${escapeHtml(m.release_date || "–")}</p>
                    <p class="mb-1"><strong>Runtime:</strong> ${escapeHtml(m.running_time || "–")}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${escapeHtml(m.rating || "–")}</p>

                <div class=" d-flex justify-content-between mb-2 border-0 ">
                    <div class="movie-rating">
                    ${ratingPage(movieId, { interactive: allowRating })}
                    </div>
                  <button class="btn btn-link p-0 m-2 favorite-btn"
                          type="button"
                          aria-label="Lägg till ${escapeHtml(m.title || "filmen")} i favoriter"
                          aria-pressed="false"
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
                         class="btn btn-secondary flex-fill"
                          id="btn_wiki"
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

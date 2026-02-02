function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function MoviesCard(movies) {
  const list = Array.isArray(movies) ? movies : [movies];

  return `
    <section aria-label="Lista med filmer och serier" class="movies-grid">
        ${list
          .map((m) => {
            const serial = escapeHtml(m.serial ?? m.id ?? "");
            const movieId = escapeHtml(m.movieKey ?? m.id ?? m.serial ?? "");
            const cardId = `moviesCard-${movieId || "x"}`;
            const iconId = `favIcon-${movieId || "x"}`;

            return `
              <div class="movies-card">
                <div class="card h-100 movie-card" id="${cardId}" data-movie-id="${movieId}">

                  <button class="btn btn-link p-0 m-2 favorite-btn"
                          type="button"
                          aria-label="Favorit"
                          data-serial="${serial}"
                          data-movie-id="${movieId}">
                    <i id="${iconId}" class="bi bi-heart"></i>
                  </button>

                  <img class="card-img-top"
                       src="${escapeHtml(m.poster || "")}"
                       alt="${escapeHtml(m.title || "Movie poster")}"
                       loading="lazy" />

                  <div class="card-body w-100 d-flex flex-column">
                    <h5 class="card-title fw-bold">${escapeHtml(m.title || "Card title")}</h5>

                    <p class="card-text movie-summary">
                      ${escapeHtml(m.summary || "")}
                    </p>

                    <p class="mb-1"><strong>Release:</strong> ${escapeHtml(m.release_date || "–")}</p>
                    <p class="mb-1"><strong>Runtime:</strong> ${escapeHtml(m.running_time || "–")}</p>
                    <p class="mb-2"><strong>Rating:</strong> ${escapeHtml(m.rating || "–")}</p>

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
              </div>
            `;
          })
          .join("")}
    </section>
  `;
}

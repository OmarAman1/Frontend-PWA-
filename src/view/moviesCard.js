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
    <section aria-label="Lista med filmer">
      <div class="row g-3">
        ${list
          .map((m) => {
            const serial = escapeHtml(m.serial ?? "");
            const cardId = `moviesCard-${serial || "x"}`;
            const iconId = `favIcon-${serial || "x"}`;

            return `
              <div class="col-12 col-md-6 col-lg-4">
                <div class="movies-card">
                  <div class="card h-100" style="width: 18rem;" id="${cardId}">

                    <button class="btn btn-link p-0 position-absolute top-0 end-0 m-2"
                            type="button"
                            aria-label="Favorit"
                            data-serial="${serial}">
                      <i id="${iconId}" class="bi bi-heart"></i>
                    </button>

                    <img class="card-img-top"
                         src="${escapeHtml(m.poster || "")}"
                         alt="${escapeHtml(m.title || "Movie poster")}"
                         loading="lazy" />

                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title">${escapeHtml(m.title || "Card title")}</h5>

                      <p class="card-text" style="display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;">
                        ${escapeHtml(m.summary || "")}
                      </p>

                      <p class="mb-1"><strong>Release:</strong> ${escapeHtml(m.release_date || "–")}</p>
                      <p class="mb-1"><strong>Runtime:</strong> ${escapeHtml(m.running_time || "–")}</p>
                      <p class="mb-2"><strong>Rating:</strong> ${escapeHtml(m.rating || "–")}</p>

                      <div class="mt-auto d-flex gap-2">
                        <a href="${escapeHtml(m.trailer || "#")}"
                           class="btn btn-primary flex-fill"
                           target="_blank" rel="noreferrer"
                           ${m.trailer ? "" : "aria-disabled='true' onclick='return false;'"}>
                          Trailer
                        </a>

                        <a href="${escapeHtml(m.wiki || "#")}"
                           class="btn btn-outline-secondary flex-fill"
                           target="_blank" rel="noreferrer"
                           ${m.wiki ? "" : "aria-disabled='true' onclick='return false;'"}>
                          Wiki
                        </a>
                      </div>

                      ${typeof ratingPage === "function" ? ratingPage() : ""}
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

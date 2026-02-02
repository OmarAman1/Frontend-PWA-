import NavBar from "./NavbarPage.js";

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function MovieDetailsPage(movie, searchQuery = "") {
  if (!movie) {
    return `
      ${NavBar("movies", searchQuery)}
      <main class="container">
        <a class="back-link" href="?page=home">← Back to movies</a>
        <section class="details-card">
          <h1>Movie not found</h1>
          <p>We could not find this movie id.</p>
        </section>
      </main>
    `;
  }

  return `
    ${NavBar("movies", searchQuery)}
    <main class="container">
      <a class="back-link" href="?page=home">← Back to movies</a>
      <section class="details-card">
        <img class="details-poster"
             src="${escapeHtml(movie.poster || "")}"
             alt="${escapeHtml(movie.title || "Movie poster")}" />

        <div class="details-content">
          <h1>${escapeHtml(movie.title || "Movie")}</h1>
          <p class="details-summary">${escapeHtml(movie.summary || "No summary available.")}</p>
          <p><strong>Release:</strong> ${escapeHtml(movie.release_date || "–")}</p>
          <p><strong>Runtime:</strong> ${escapeHtml(movie.running_time || "–")}</p>
          <p><strong>Rating:</strong> ${escapeHtml(movie.rating || "–")}</p>

          <div class="details-actions">
            <a href="${escapeHtml(movie.trailer || "#")}"
               class="btn btn-primary"
               target="_blank" rel="noreferrer"
               ${movie.trailer ? "" : "aria-disabled='true' onclick='return false;'"}>
              Watch trailer
            </a>
            <a href="${escapeHtml(movie.wiki || "#")}"
               class="btn btn-outline-secondary"
               target="_blank" rel="noreferrer"
               ${movie.wiki ? "" : "aria-disabled='true' onclick='return false;'"}>
              Read wiki
            </a>
          </div>
        </div>
      </section>
    </main>
  `;
}

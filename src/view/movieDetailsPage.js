import NavBar from "./NavbarPage.js";

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getActorList(movie) {
  const directRaw =
    movie?.actors ??
    movie?.actor ??
    movie?.cast ??
    movie?.casts ??
    movie?.characters ??
    movie?.starring ??
    movie?.people ??
    [];

  const discoverRaw = Object.entries(movie || {})
    .filter(([key]) => /actor|cast|character|star/i.test(key))
    .map(([, value]) => value);

  const raw = Array.isArray(directRaw) ? [...directRaw, ...discoverRaw] : [directRaw, ...discoverRaw];

  if (Array.isArray(raw)) {
    return raw
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .map((item) => {
        if (typeof item === "string") return { fullName: item };
        if (item && typeof item === "object") {
          return {
            id: item.id ?? item._id ?? item.code ?? "",
            title: item.title ?? item.role ?? "Actor",
            fullName: item.fullName ?? item.name ?? item.full_name ?? "",
            avatar: item.avatar ?? item.image ?? item.photo ?? "",
          };
        }
        return null;
      })
      .filter(Boolean)
      .filter((p) => p.fullName);
  }

  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((fullName) => ({ fullName }));
  }

  return [];
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function renderActors(movie) {
  const actors = getActorList(movie);

  return `
    <section class="producers-section" aria-label="Actors">
      <h2 class="producers-title">Actors</h2>
      <div class="producers-grid">
        ${
          actors.length
            ? actors
                .map((actor, index) => {
                  const fullName = escapeHtml(actor.fullName || "Unknown");
                  const title = escapeHtml(actor.title || "Actor");
                  const pid = escapeHtml(String(actor.id || `AC-${String(index + 1).padStart(2, "0")}`));
                  const avatar = escapeHtml(actor.avatar || "");
                  const initials = escapeHtml(getInitials(actor.fullName || "A"));

                  return `
                    <article class="producer-card">
                      ${
                        avatar
                          ? `<img class="producer-avatar" src="${avatar}" alt="${fullName}" loading="lazy" />`
                          : `<div class="producer-avatar producer-avatar-fallback" aria-hidden="true">${initials}</div>`
                      }
                      <div class="producer-info">
                        <span class="producer-id">${pid}</span>
                        <p class="producer-role">${title}</p>
                        <p class="producer-name">${fullName}</p>
                      </div>
                    </article>
                  `;
                })
                .join("")
            : `<article class="producer-card"><div class="producer-info"><p class="producer-name">No actors data available for this movie.</p></div></article>`
        }
      </div>
    </section>
  `;
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
      ${renderActors(movie)}
    </main>
  `;
}

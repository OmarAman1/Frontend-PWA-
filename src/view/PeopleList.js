function extractIdFromUrl(url) {
  // SWAPI ger url t.ex. https://swapi.dev/api/people/1/
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}


// export default function PeopleList(people) {
//   console.log(people);
//   return `
//     <section aria-label="Lista med karaktärer">
//       <div class="row g-3">
//         ${people.map((person) => {
//             const id = extractIdFromUrl(person.url);
//             return `
//               <div class="col-12 col-md-6 col-lg-4">
//                 <article class="card p-3 h-100">
//                   <div class="d-flex justify-content-between align-items-start gap-2">
//                     <h2 class="h5 mb-1">${person.name}</h2>

//                     <!-- Favoritknapp kommer i vecka 3 (P2) -->
//                     <button class="btn btn-link p-0 fav-btn"
//                             aria-label="Markera ${person.name} som favorit"
//                             data-id="${id}">
//                       <i class="bi bi-heart"></i>
//                     </button>
//                   </div>

//                   <p class="mb-1"><strong>Kön:</strong> ${person.gender}</p>
//                   <p class="mb-0"><strong>Födelseår:</strong> ${person.birth_year}</p>

//                   <!-- Detaljsida kommer i vecka 3 (P2) -->
//                   <a class="btn btn-primary mt-3" href="#/person/${id}">Detaljer</a>
//                 </article>
//               </div>
//             `;
//           })
//           .join("")}
//       </div>
//     </section>
//   `;
// }



function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fieldRow(label, value) {
  const v =
    value === null || value === undefined || value === ""
      ? `<span class="text-muted">–</span>`
      : escapeHtml(String(value));

  return `<p class="mb-1"><strong>${escapeHtml(label)}:</strong> ${v}</p>`;
}

function listRow(label, arr = [], { max = 3 } = {}) {
  const list = Array.isArray(arr) ? arr : [];
  const count = list.length;

  if (count === 0) {
    return `<p class="mb-1"><strong>${escapeHtml(label)}:</strong> <span class="text-muted">–</span></p>`;
  }

  // show first `max` items as links, rest as "+N more"
  const shown = list.slice(0, max);
  const rest = count - shown.length;

  const itemsHtml = shown
    .map((url) => {
      const safe = escapeHtml(url);
      console.log(safe);
      return `<a class="d-block small text-truncate" href="${safe}" target="_blank" rel="noreferrer">${safe}</a>`;
    })
    .join("");

  return `
    <div class="mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <strong>${escapeHtml(label)}:</strong>
        <span class="badge text-bg-secondary">${count}</span>
      </div>
      <div class="mt-1">${itemsHtml}${rest > 0 ? `<div class="small text-muted">+${rest} more</div>` : ""}</div>
    </div>
  `;
}

export default function PeopleList(people) {
  return `
    <section aria-label="Lista med karaktärer">
      <div class="row g-3">
        ${people
          .map((person) => {
            const id = extractIdFromUrl(person.url);

            return `
              <div class="col-12 col-md-6 col-lg-4">
                <article class="card p-3 h-100">
                  <div class="d-flex justify-content-between align-items-start gap-2">
                    <h2 class="h5 mb-1">${escapeHtml(person.name)}</h2>

                    <button class="btn btn-link p-0 fav-btn"
                            aria-label="Markera ${escapeHtml(person.name)} som favorit"
                            data-id="${escapeHtml(id)}">
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>

                  <div class="mt-2">
                    ${fieldRow("Kön", person.gender)}
                    ${fieldRow("Födelseår", person.birth_year)}
                    ${fieldRow("Längd", person.height ? `${person.height} cm` : "")}
                    ${fieldRow("Vikt", person.mass ? `${person.mass} kg` : "")}
                    ${fieldRow("Ögonfärg", person.eye_color)}
                    ${fieldRow("Hårfärg", person.hair_color)}
                    ${fieldRow("Hudfärg", person.skin_color)}
                    ${fieldRow("Homeworld", person.homeworld)}
                    ${fieldRow("Skapad", person.created)}
                    ${fieldRow("Uppdaterad", person.edited)}

                    ${listRow("Filmer", person.films)}
                    ${listRow("Starships", person.starships)}
                    ${listRow("Vehicles", person.vehicles)}
                    ${listRow("Species", person.species)}
                  </div>

                  <div class="d-flex gap-2 mt-3">
                    <a class="btn btn-primary flex-fill" href="api/person/${escapeHtml(id)}">Detaljer</a>
                    <a class="btn btn-outline-secondary" href="${escapeHtml(person.url)}" target="_blank" rel="noreferrer">
                      SWAPI
                    </a>
                  </div>
                </article>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

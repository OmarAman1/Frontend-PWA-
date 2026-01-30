function extractIdFromUrl(url) {
  // SWAPI ger url t.ex. https://swapi.dev/api/people/1/
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export default function PeopleList(people = []) {
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
                    <h2 class="h5 mb-1">${person.name}</h2>

                    <!-- Favoritknapp kommer i vecka 3 (P2) -->
                    <button class="btn btn-link p-0 fav-btn" 
                            aria-label="Markera ${person.name} som favorit"
                            data-id="${id}">
                      <i class="bi bi-heart"></i>
                    </button>
                  </div>

                  <p class="mb-1"><strong>Kön:</strong> ${person.gender}</p>
                  <p class="mb-0"><strong>Födelseår:</strong> ${person.birth_year}</p>

                  <!-- Detaljsida kommer i vecka 3 (P2) -->
                  <a class="btn btn-primary mt-3" href="#/person/${id}">Detaljer</a>
                </article>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

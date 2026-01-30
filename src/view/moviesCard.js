export default function MoviesCard({
  id = "",
  title = "Card title",
  description = "Some quick example text to build on the card title and make up the bulk of the card's content.",
  imageUrl = "https://images.unsplash.com/photo-1761839256547-0a1cd11b6dfb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
  imageAlt = title,
  linkUrl = "#",
  linkText = "Go somewhere",
  isFavorite = false,
} = {}) {
  return `
    <article class="card movies-card" style="width: 18rem;" data-card-id="${id}">
      
      <button
        type="button"
        class="btn btn-link p-0 position-absolute top-0 end-0 m-2"
        aria-label="${isFavorite ? "Ta bort favorit" : "Markera som favorit"}"
        data-action="toggle-favorite"
        data-card-id="${id}"
      >
        <i class="bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}" aria-hidden="true"></i>
      </button>

      <img
        class="card-img-top"
        src="${imageUrl}"
        alt="${imageAlt}"
        loading="lazy"
      >

      <div class="card-body">
        <h2 class="card-title h5">${title}</h2>
        <p class="card-text">${description}</p>
        <a href="${linkUrl}" class="btn btn-primary">${linkText}</a>
      </div>
    </article>
  `;
}


function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default function NavBar(activePage = "home", searchQuery = ""){
  const isActive = (page) => (activePage === page ? "active" : "");
  const isCurrent = (page) => (activePage === page ? 'aria-current="page"' : "");

return(`<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="?page=home">Harry Potter Epics</a>
    <button class="navbar-toggler" id="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24"  fill="currentColor" class="bi bi-list" id="navbar-toggler-icon" viewBox="0 0 16 16 ">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
    </button>
    <div class="collapse navbar-collapse"id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link ${isActive("home")}" ${isCurrent("home")} href="?page=home">Home</a></li>
        <li class="nav-item"><a class="nav-link ${isActive("movies")}" ${isCurrent("movies")} href="?page=home">Movies</a></li>
        <li class="nav-item"><a class="nav-link ${isActive("top-rated")}" ${isCurrent("top-rated")} href="?page=top-rated">Top Rated</a></li>
        <li class="nav-item"><a class="nav-link ${isActive("favorites")}" ${isCurrent("favorites")} href="?page=favorites">Favorites</a></li>
      </ul>
      <form class="nav-search" data-search-form>
        <input class="form-control" name="q" type="search" placeholder="Search movie..." aria-label="Search" value="${escapeHtml(searchQuery)}">
        <button class="btn-search" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>`)

}

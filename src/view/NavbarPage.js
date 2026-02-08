
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
    <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse" id="navbarSupportedContent">
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

const BASE_URL = "https://potterhead-api.vercel.app/api";
const CHAR_URL = "https://potterhead-api.vercel.app/api/characters";

export async function getMovies() {
  const res = await fetch(`${BASE_URL}/movies`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer från SWAPI.");
  return res.json();
}

export async function getMovieDetails(movieId) {
  const res = await fetch(`${BASE_URL}/movies/${movieId}`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärsdetaljer från SWAPI.");
  return res.json();
}

export async function getCharacters() {
  const res = await fetch(CHAR_URL);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer från SWAPI.");
  return res.json();
}

export async function getCharacterDetails(charId) {
  const res = await fetch(`${CHAR_URL}/${charId}`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärsdetaljer från SWAPI.");
  return res.json();
}


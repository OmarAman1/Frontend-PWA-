const BASE_URL = "https://potterhead-api.vercel.app/api";

export async function getMovies() {
  const res = await fetch(`${BASE_URL}/movies`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer från SWAPI.");
  return res.json();
}


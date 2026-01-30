const BASE_URL = "https://swapi.dev/api";

export async function getPeople(page = 1) {
  const res = await fetch(`${BASE_URL}/people/?page=${page}`);
  if (!res.ok) throw new Error("Kunde inte hämta karaktärer från SWAPI.");
  return res.json();
}

import type {
  ApiErrorResponse,
  FavoriteRef,
  PokemonDetail,
  PokemonSummary,
} from "@pokemon/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorResponse | null;
    throw new Error(body?.error ?? `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function fetchPokemonList(): Promise<PokemonSummary[]> {
  return request("/api/pokemon");
}

export function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  return request(`/api/pokemon/${id}`);
}

export function fetchFavorites(): Promise<FavoriteRef[]> {
  return request("/api/favorites");
}

export function addFavorite(id: number): Promise<FavoriteRef[]> {
  return request("/api/favorites", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}

export function removeFavorite(id: number): Promise<FavoriteRef[]> {
  return request(`/api/favorites/${id}`, { method: "DELETE" });
}

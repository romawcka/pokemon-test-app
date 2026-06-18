import { HttpError } from "../errors.js";
import type {
  RawEvolutionChain,
  RawPokemon,
  RawPokemonListResponse,
  RawPokemonSpecies,
} from "./types.js";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// PokeAPI data is static, so cache responses for the process lifetime —
// avoids re-fetching the same pokemon/species/evolution-chain on every request.
const cache = new Map<string, Promise<unknown>>();

async function fetchJson<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached) return cached as Promise<T>;

  const promise = fetch(url).then(async (response) => {
    if (response.status === 404) {
      throw new HttpError(404, `Not found: ${url}`);
    }
    if (!response.ok) {
      throw new HttpError(502, `PokeAPI request failed: ${url}`);
    }
    return (await response.json()) as T;
  });

  // Drop failed lookups from the cache so a transient failure doesn't
  // permanently poison subsequent requests for the same resource.
  promise.catch(() => cache.delete(url));

  cache.set(url, promise);
  return promise;
}

export function getPokemonList(limit: number): Promise<RawPokemonListResponse> {
  return fetchJson(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=0`);
}

export function getPokemon(idOrName: number | string): Promise<RawPokemon> {
  return fetchJson(`${POKEAPI_BASE}/pokemon/${idOrName}`);
}

export function getPokemonSpecies(
  idOrName: number | string,
): Promise<RawPokemonSpecies> {
  return fetchJson(`${POKEAPI_BASE}/pokemon-species/${idOrName}`);
}

export function getEvolutionChain(url: string): Promise<RawEvolutionChain> {
  return fetchJson(url);
}

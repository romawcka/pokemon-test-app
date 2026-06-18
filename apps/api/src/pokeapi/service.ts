import type { PokemonDetail, PokemonSummary } from "@pokemon/shared";
import {
  getEvolutionChain,
  getPokemon,
  getPokemonList,
  getPokemonSpecies,
} from "./client.js";
import { flattenEvolutionChain } from "./evolution.js";
import { extractIdFromUrl, mapToDetail, mapToSummary } from "./mapper.js";

export async function getAllPokemonSummaries(
  limit: number,
): Promise<PokemonSummary[]> {
  const list = await getPokemonList(limit);
  const pokemon = await Promise.all(
    list.results.map((entry) => getPokemon(extractIdFromUrl(entry.url))),
  );
  return pokemon.map(mapToSummary);
}

export async function getPokemonDetail(id: number): Promise<PokemonDetail> {
  const raw = await getPokemon(id);
  const species = await getPokemonSpecies(raw.species.name);
  const chain = await getEvolutionChain(species.evolution_chain.url);
  const evolutions = flattenEvolutionChain(chain);
  return mapToDetail(raw, evolutions);
}

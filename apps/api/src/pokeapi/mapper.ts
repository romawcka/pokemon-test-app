import type { PokemonDetail, PokemonSummary } from "@pokemon/shared";
import type { EvolutionNode } from "@pokemon/shared";
import type { RawPokemon } from "./types.js";

export function extractIdFromUrl(url: string): number {
  const match = /\/(\d+)\/?$/.exec(url);
  if (!match) {
    throw new Error(`Could not extract id from url: ${url}`);
  }
  return Number(match[1]);
}

export function mapToSummary(raw: RawPokemon): PokemonSummary {
  return {
    id: raw.id,
    name: raw.name,
    sprite: raw.sprites.front_default,
    types: raw.types.map((t) => t.type.name),
  };
}

export function mapToDetail(
  raw: RawPokemon,
  evolutions: EvolutionNode[],
): PokemonDetail {
  return {
    id: raw.id,
    name: raw.name,
    sprite: raw.sprites.front_default,
    abilities: raw.abilities.map((a) => a.ability.name),
    types: raw.types.map((t) => t.type.name),
    evolutions,
  };
}

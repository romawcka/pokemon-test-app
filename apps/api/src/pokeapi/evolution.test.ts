import { describe, expect, it } from "vitest";
import { flattenEvolutionChain } from "./evolution.js";
import type { RawEvolutionChain } from "./types.js";

function speciesUrl(id: number): string {
  return `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
}

describe("flattenEvolutionChain", () => {
  it("flattens a linear chain in stage order", () => {
    const chain: RawEvolutionChain = {
      chain: {
        species: { name: "bulbasaur", url: speciesUrl(1) },
        evolves_to: [
          {
            species: { name: "ivysaur", url: speciesUrl(2) },
            evolves_to: [
              {
                species: { name: "venusaur", url: speciesUrl(3) },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    };

    expect(flattenEvolutionChain(chain).map((n) => n.name)).toEqual([
      "bulbasaur",
      "ivysaur",
      "venusaur",
    ]);
  });

  it("flattens a branching chain (e.g. eevee) depth-first per branch", () => {
    const chain: RawEvolutionChain = {
      chain: {
        species: { name: "eevee", url: speciesUrl(133) },
        evolves_to: [
          { species: { name: "vaporeon", url: speciesUrl(134) }, evolves_to: [] },
          { species: { name: "jolteon", url: speciesUrl(135) }, evolves_to: [] },
          { species: { name: "flareon", url: speciesUrl(136) }, evolves_to: [] },
        ],
      },
    };

    const result = flattenEvolutionChain(chain);
    expect(result.map((n) => n.name)).toEqual([
      "eevee",
      "vaporeon",
      "jolteon",
      "flareon",
    ]);
    expect(result.map((n) => n.id)).toEqual([133, 134, 135, 136]);
    expect(result[0]?.sprite).toContain("/133.png");
  });

  it("returns just the root for a pokemon with no evolutions", () => {
    const chain: RawEvolutionChain = {
      chain: { species: { name: "tauros", url: speciesUrl(128) }, evolves_to: [] },
    };

    expect(flattenEvolutionChain(chain)).toEqual([
      {
        id: 128,
        name: "tauros",
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png",
      },
    ]);
  });
});

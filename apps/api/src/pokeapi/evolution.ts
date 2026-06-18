import type { EvolutionNode } from "@pokemon/shared";
import { extractIdFromUrl } from "./mapper.js";
import type { RawEvolutionChain, RawEvolutionChainLink } from "./types.js";

// The evolution-chain payload only gives each stage's name + species url, no
// sprite. PokeAPI's sprite URLs are id-keyed and predictable, so build the
// sprite directly instead of doing an extra /pokemon/{id} fetch per stage.
function spriteUrlForId(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function linkToNode(link: RawEvolutionChainLink): EvolutionNode {
  const id = extractIdFromUrl(link.species.url);
  return { id, name: link.species.name, sprite: spriteUrlForId(id) };
}

// Walks the (possibly branching, e.g. Eevee) evolution tree into a flat,
// stage-ordered list: root first, then each branch fully depth-first.
function walk(link: RawEvolutionChainLink, out: EvolutionNode[]): void {
  out.push(linkToNode(link));
  for (const child of link.evolves_to) {
    walk(child, out);
  }
}

export function flattenEvolutionChain(chain: RawEvolutionChain): EvolutionNode[] {
  const out: EvolutionNode[] = [];
  walk(chain.chain, out);
  return out;
}

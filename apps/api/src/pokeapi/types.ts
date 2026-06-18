export interface NamedApiResource {
  name: string;
  url: string;
}

export interface RawPokemonListResponse {
  results: NamedApiResource[];
}

export interface RawPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: { type: NamedApiResource }[];
  abilities: { ability: NamedApiResource }[];
  species: NamedApiResource;
}

export interface RawPokemonSpecies {
  evolution_chain: { url: string };
}

export interface RawEvolutionChainLink {
  species: NamedApiResource;
  evolves_to: RawEvolutionChainLink[];
}

export interface RawEvolutionChain {
  chain: RawEvolutionChainLink;
}

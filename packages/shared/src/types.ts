export interface PokemonSummary {
  id: number;
  name: string;
  sprite: string | null;
  types: string[];
}

export interface EvolutionNode {
  id: number;
  name: string;
  sprite: string | null;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string | null;
  abilities: string[];
  types: string[];
  evolutions: EvolutionNode[];
}

export interface FavoriteRef {
  id: number;
}

export interface AddFavoriteRequest {
  id: number;
}

export interface ApiErrorResponse {
  error: string;
}

export type PokemonListResponse = PokemonSummary[];
export type FavoritesResponse = FavoriteRef[];

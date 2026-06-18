import type { PokemonSummary } from "@pokemon/shared";
import { PokemonCard } from "./PokemonCard";

interface PokemonListProps {
  pokemon: PokemonSummary[];
  favoriteIds: Set<number>;
  onSelect: (id: number) => void;
}

export function PokemonList({ pokemon, favoriteIds, onSelect }: PokemonListProps) {
  if (pokemon.length === 0) {
    return <p className="py-12 text-center text-gray-500">No Pokémon found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favoriteIds.has(p.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

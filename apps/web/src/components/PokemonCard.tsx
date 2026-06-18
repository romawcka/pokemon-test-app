import type { PokemonSummary } from "@pokemon/shared";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  isFavorite: boolean;
  onSelect: (id: number) => void;
}

export function PokemonCard({ pokemon, isFavorite, onSelect }: PokemonCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pokemon.id)}
      className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex w-full justify-end">
        <FavoriteButton id={pokemon.id} isFavorite={isFavorite} />
      </div>
      {pokemon.sprite ? (
        <img src={pokemon.sprite} alt={pokemon.name} className="h-20 w-20" />
      ) : (
        <div className="h-20 w-20" />
      )}
      <span className="text-xs text-gray-400">#{pokemon.id}</span>
      <span className="font-medium capitalize">{pokemon.name}</span>
      <div className="flex gap-1">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600"
          >
            {type}
          </span>
        ))}
      </div>
    </button>
  );
}

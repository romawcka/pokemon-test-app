import type { MouseEvent } from "react";
import { useAddFavorite, useRemoveFavorite } from "../queries/favorites";

interface FavoriteButtonProps {
  id: number;
  isFavorite: boolean;
  className?: string;
}

export function FavoriteButton({ id, isFavorite, className }: FavoriteButtonProps) {
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const isPending = addFavorite.isPending || removeFavorite.isPending;

  function handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (isFavorite) {
      removeFavorite.mutate(id);
    } else {
      addFavorite.mutate(id);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={`text-2xl leading-none transition-transform hover:scale-110 disabled:opacity-50 ${className ?? ""}`}
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}

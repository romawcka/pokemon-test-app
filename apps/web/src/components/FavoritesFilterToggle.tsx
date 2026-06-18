interface FavoritesFilterToggleProps {
  showFavoritesOnly: boolean;
  onChange: (value: boolean) => void;
}

export function FavoritesFilterToggle({
  showFavoritesOnly,
  onChange,
}: FavoritesFilterToggleProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      <input
        type="checkbox"
        checked={showFavoritesOnly}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4"
      />
      Favorites only
    </label>
  );
}

import { useMemo, useState } from "react";
import { FavoritesFilterToggle } from "./components/FavoritesFilterToggle";
import { PokemonDetailModal } from "./components/PokemonDetailModal";
import { PokemonList } from "./components/PokemonList";
import { SearchInput } from "./components/SearchInput";
import { useFavorites } from "./queries/favorites";
import { usePokemonList } from "./queries/pokemon";

function App() {
  const [search, setSearch] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const pokemonList = usePokemonList();
  const favorites = useFavorites();

  const favoriteIds = useMemo(
    () => new Set((favorites.data ?? []).map((f) => f.id)),
    [favorites.data],
  );

  const visiblePokemon = useMemo(() => {
    const all = pokemonList.data ?? [];
    return all.filter((p) => {
      if (showFavoritesOnly && !favoriteIds.has(p.id)) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [pokemonList.data, showFavoritesOnly, favoriteIds, search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Pokédex</h1>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <SearchInput value={search} onChange={setSearch} />
          <FavoritesFilterToggle
            showFavoritesOnly={showFavoritesOnly}
            onChange={setShowFavoritesOnly}
          />
        </div>

        {pokemonList.isLoading && (
          <p className="py-12 text-center text-gray-500">Loading Pokémon...</p>
        )}

        {pokemonList.isError && (
          <div className="py-12 text-center">
            <p className="mb-3 text-red-500">Failed to load Pokémon.</p>
            <button
              type="button"
              onClick={() => pokemonList.refetch()}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
            >
              Retry
            </button>
          </div>
        )}

        {pokemonList.data && (
          <PokemonList
            pokemon={visiblePokemon}
            favoriteIds={favoriteIds}
            onSelect={setSelectedId}
          />
        )}
      </main>

      {selectedId !== null && (
        <PokemonDetailModal
          id={selectedId}
          favoriteIds={favoriteIds}
          onClose={() => setSelectedId(null)}
          onSelectEvolution={setSelectedId}
        />
      )}
    </div>
  );
}

export default App;

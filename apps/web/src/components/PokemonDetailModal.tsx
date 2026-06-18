import { useEffect } from "react";
import { usePokemonDetail } from "../queries/pokemon";
import { FavoriteButton } from "./FavoriteButton";

interface PokemonDetailModalProps {
  id: number;
  favoriteIds: Set<number>;
  onClose: () => void;
  onSelectEvolution: (id: number) => void;
}

export function PokemonDetailModal({
  id,
  favoriteIds,
  onClose,
  onSelectEvolution,
}: PokemonDetailModalProps) {
  const { data, isLoading, isError, refetch } = usePokemonDetail(id);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if(id) {
      document.body.style.overflow = 'hidden'      
    }

    return () => {
      document.body.style.overflow = ''
    }
  },[id])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {isLoading && <p className="py-8 text-center text-gray-500">Loading...</p>}

        {isError && (
          <div className="py-8 text-center">
            <p className="mb-3 text-red-500">Failed to load Pokémon.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
            >
              Retry
            </button>
          </div>
        )}

        {data && (
          <div className="flex flex-col items-center gap-3 text-center">
            <FavoriteButton id={data.id} isFavorite={favoriteIds.has(data.id)} />
            {data.sprite && <img src={data.sprite} alt={data.name} className="h-32 w-32" />}
            <h2 className="text-xl font-semibold capitalize">{data.name}</h2>
            <p className="text-sm text-gray-400">#{data.id}</p>

            <div className="flex gap-1">
              {data.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="w-full text-left">
              <h3 className="mb-1 text-sm font-semibold text-gray-700">Abilities</h3>
              <ul className="list-inside list-disc text-sm capitalize text-gray-600">
                {data.abilities.map((ability) => (
                  <li key={ability}>{ability}</li>
                ))}
              </ul>
            </div>

            {data.evolutions.length > 1 && (
              <div className="w-full text-left">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Evolutions</h3>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {data.evolutions.map((evolution) => (
                    <button
                      key={evolution.id}
                      type="button"
                      onClick={() => onSelectEvolution(evolution.id)}
                      className={`flex flex-col items-center gap-1 rounded-md p-2 transition hover:bg-gray-100 ${
                        evolution.id === data.id ? "bg-gray-100" : ""
                      }`}
                    >
                      {evolution.sprite && (
                        <img src={evolution.sprite} alt={evolution.name} className="h-14 w-14" />
                      )}
                      <span className="text-xs capitalize text-gray-600">{evolution.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

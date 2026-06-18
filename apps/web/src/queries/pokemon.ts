import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, fetchPokemonList } from "../api/client";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: fetchPokemonList,
  });
}

export function usePokemonDetail(id: number | null) {
  return useQuery({
    queryKey: ["pokemon", "detail", id],
    queryFn: () => fetchPokemonDetail(id!),
    enabled: id !== null,
  });
}

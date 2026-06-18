import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavorite, fetchFavorites, removeFavorite } from "../api/client";

const FAVORITES_KEY = ["favorites"];

export function useFavorites() {
  return useQuery({
    queryKey: FAVORITES_KEY,
    queryFn: fetchFavorites,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(FAVORITES_KEY, data);
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(FAVORITES_KEY, data);
    },
  });
}

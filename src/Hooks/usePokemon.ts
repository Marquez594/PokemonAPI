import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../API/pokemon";

export const usePokemon = (name: string) => {
  return useQuery({
    queryKey: ["Pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: !!name.trim(),
  });
};

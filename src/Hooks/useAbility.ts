import { useQuery } from "@tanstack/react-query";
import { getAbilityDesc } from "../API/ability";

export const useAbilityDesc = (url: string) => {
  return useQuery({
    queryKey: ["AbilityDesc", url],
    queryFn: () => getAbilityDesc(url),
    enabled: !!url,
  });
};

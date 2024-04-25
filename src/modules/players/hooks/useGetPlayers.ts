import { useQuery } from "@tanstack/react-query";

import { getAll } from "@/modules/players/services/HttpPlayers";

export const QUERY_KEY = "get-players";

export const useGetPlayers = () => {
  return useQuery({
    queryFn: () => getAll(),
    queryKey: [QUERY_KEY],
  });
};

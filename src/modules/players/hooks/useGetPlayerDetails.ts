import { useQuery } from "@tanstack/react-query";

import { getDetails } from "@/modules/players/services/HttpPlayers";

export const QUERY_KEY = "get-players-details";

export const useGetPlayerDetails = (playerId: string) => {
  return useQuery({
    queryFn: () => getDetails(playerId),
    queryKey: [QUERY_KEY, playerId],
  });
};

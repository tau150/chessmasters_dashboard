import type { Player } from "@/modules/players/domain/Player";
import fetcher from "@/lib/fetcher";

interface GetAllResponse {
  players: string[];
}

export const getAll = async (): Promise<GetAllResponse> => {
  return fetcher("/titled/GM");
};

export const getDetails = async (playerId: string): Promise<Player> => {
  return fetcher(`/player/${playerId}`);
};

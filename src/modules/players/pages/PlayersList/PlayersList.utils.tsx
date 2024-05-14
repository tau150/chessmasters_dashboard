import { ReactElement } from "react";
import { PlayerCard } from "./components/PlayerCard";
import { SortType } from "./PlayersList.types";

export const mapPlayers = (players: string[]): ReactElement[] => {
  return players.map((player) => <PlayerCard key={player} player={player} />);
};

export const sortPlayers = (
  selectedSort: SortType,
  searchTerm: string,
  players: string[],
): string[] => {
  const filteredPlayers = searchTerm
    ? players.filter((player) => player.toLowerCase().includes(searchTerm.toLowerCase()))
    : players;

  const sortedPlayers =
    selectedSort === SortType.DESC
      ? filteredPlayers
      : [...filteredPlayers].sort((a, b) => b.localeCompare(a));

  return sortedPlayers;
};

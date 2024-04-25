import { render, screen, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { PlayersList } from "../PlayersList";
import { useGetPlayers } from "../../../hooks/useGetPlayers";

vi.mock("../../../hooks/useGetPlayers");

describe("PlayersList Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (useGetPlayers as Mock).mockReturnValue({ data: null, isLoading: true, isError: false });

    render(<PlayersList />);

    expect(screen.getByTestId("loading-section")).toBeInTheDocument();
    expect(screen.getByText("Chess Grandmasters")).toBeInTheDocument();
    expect(screen.queryByTestId("error-section")).not.toBeInTheDocument();
  });

  it("renders player list when data is loaded", async () => {
    const PLAYER_1 = "Test player 1";
    const PLAYER_2 = "Test player 2";

    const mockPlayersData = {
      players: [PLAYER_1, PLAYER_2],
    };

    (useGetPlayers as Mock).mockReturnValue({
      data: mockPlayersData,
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <PlayersList />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(PLAYER_1)).toBeInTheDocument();
      expect(screen.getByText(PLAYER_2)).toBeInTheDocument();
    });

    expect(screen.queryByTestId("error-section")).not.toBeInTheDocument();
  });

  it("renders error section when there is an error", () => {
    (useGetPlayers as Mock).mockReturnValue({ data: null, isLoading: false, isError: true });

    render(<PlayersList />);

    expect(screen.getByTestId("error-section")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-section")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { PlayerDetails } from "../PlayerDetails";
import { useGetPlayerDetails } from "@/modules/players/hooks/useGetPlayerDetails";

vi.mock("@/modules/players/hooks/useGetPlayerDetails");
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useParams: vi.fn(() => ({ id: "testUser" })),
}));

describe("PlayerDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state while fetching player details", async () => {
    (useGetPlayerDetails as Mock).mockReturnValue({ data: null, isLoading: true, isError: false });

    render(<PlayerDetails />);

    expect(screen.getByTestId("loading-section")).toBeInTheDocument();
    expect(screen.getByText("Grandmaster Profile")).toBeInTheDocument();
  });

  it("renders player details when data is loaded", async () => {
    const playerData = {
      avatar: "https://example.com/avatar.jpg",
      player_id: 123,
      "@id": "player-123",
      url: "https://example.com/player-123",
      name: "Alice Johnson",
      username: "alice123",
      followers: 1500,
      country: "United States",
      last_online: 1648920000,
      joined: 1609459200,
      status: "Active player",
      is_streamer: true,
      verified: true,
      league: "Grandmaster",
      streaming_platforms: ["Twitch", "Chess.com"],
    };

    (useGetPlayerDetails as Mock).mockReturnValue({
      data: playerData,
      isLoading: false,
      isError: false,
    });

    render(
      <BrowserRouter>
        <PlayerDetails />
      </BrowserRouter>,
    );

    expect(await screen.findByText(playerData.username)).toBeInTheDocument();
    expect(screen.getByText("Active player")).toBeInTheDocument();
    expect(screen.getByText(playerData.username)).toBeInTheDocument();
    expect(screen.getByText("Verified")).toBeInTheDocument();
    expect(screen.getByText("Grandmaster")).toBeInTheDocument();
  });

  it("renders error section when there is an error fetching player details", () => {
    (useGetPlayerDetails as Mock).mockReturnValue({ data: null, isLoading: false, isError: true });

    render(<PlayerDetails />);

    expect(screen.getByTestId("error-section")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-section")).not.toBeInTheDocument();
  });
});

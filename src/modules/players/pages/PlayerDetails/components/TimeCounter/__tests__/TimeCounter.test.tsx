import { render, act, screen } from "@testing-library/react";
import { vi } from "vitest";
import { TimeCounter } from "../TimeCounter";

describe("TimeCounter", () => {
  const date = new Date("2024-04-27T16:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with initial time and updates time every second", () => {
    const initialTimeSeconds = 1714230000; // 1 hour before mocked date (2024-04-27T15:00:00Z)

    render(<TimeCounter initialTime={initialTimeSeconds} />);

    expect(screen.getByText(/Time since last online:/i)).toBeInTheDocument();
    expect(screen.getByText(/01:00:00/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersToNextTimer(); // move forward the setInterval that is 1 second
    });

    expect(screen.getByText(/01:00:01/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(60000); // move forward 1 minute
    });

    expect(screen.getByText(/01:01:01/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3600000); // move forward 1 hour
    });

    expect(screen.getByText(/02:01:01/i)).toBeInTheDocument();
  });
});

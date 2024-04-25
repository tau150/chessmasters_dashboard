import { vi } from "vitest";
import { getPastTimeValues, formatTimeSection } from "../TimeCounter.utils";

const date = new Date("2024-04-28T12:00:00Z");

vi.useFakeTimers();
vi.setSystemTime(date);

describe("TimeCounter utils", () => {
  describe("getPastTimeValues", () => {
    it("should calculate the correct past time values", () => {
      const currentTimestamp = new Date().getTime();
      const lastOnlineTimestamp = currentTimestamp - 1 * 60 * 60 * 1000; // 1 hour ago in milliseconds

      const pastTimeValues = getPastTimeValues(lastOnlineTimestamp / 1000);

      const expectedValues = { hours: 1, minutes: 0, seconds: 0 };

      expect(pastTimeValues).toEqual(expectedValues);
    });
  });

  describe("formatTimeSection", () => {
    it("should format time section correctly", () => {
      const hours = 1;
      const minutes = 30;
      const seconds = 45;

      const formattedTime = formatTimeSection(hours, minutes, seconds);

      const expectedFormattedTime = "01:30:45";

      expect(formattedTime).toEqual(expectedFormattedTime);
    });

    it("should handle single-digit values correctly", () => {
      const hours = 0;
      const minutes = 5;
      const seconds = 9;

      const formattedTime = formatTimeSection(hours, minutes, seconds);

      const expectedFormattedTime = "00:05:09";

      expect(formattedTime).toEqual(expectedFormattedTime);
    });
  });
});

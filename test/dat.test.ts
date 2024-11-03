import { describe, it, expect } from "bun:test";
import { Dat } from "../src";

describe("Dat", () => {
  describe("addSeconds", () => {
    it("adds seconds to a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.addSeconds(date, 30);
      expect(result).toEqual(new Date("2023-01-01T12:00:30.000Z"));
    });
  });

  describe("addMinutes", () => {
    it("adds minutes to a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.addMinutes(date, 15);
      expect(result).toEqual(new Date("2023-01-01T12:15:00.000Z"));
    });
  });

  describe("addHours", () => {
    it("adds hours to a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.addHours(date, 2);
      expect(result).toEqual(new Date("2023-01-01T14:00:00.000Z"));
    });
  });

  describe("addDays", () => {
    it("adds days to a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.addDays(date, 3);
      expect(result).toEqual(new Date("2023-01-04T00:00:00.000Z"));
    });
  });

  describe("addWeeks", () => {
    it("adds weeks to a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.addWeeks(date, 2);
      expect(result).toEqual(new Date("2023-01-15T00:00:00.000Z"));
    });
  });

  describe("addMonths", () => {
    it("adds months to a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.addMonths(date, 3);
      expect(result).toEqual(new Date("2023-04-01T00:00:00.000Z"));
    });
  });

  describe("addYears", () => {
    it("adds years to a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.addYears(date, 5);
      expect(result).toEqual(new Date("2028-01-01T00:00:00.000Z"));
    });
  });

  describe("subtractSeconds", () => {
    it("subtracts seconds from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.subtractSeconds(date, 30);
      expect(result).toEqual(new Date("2023-01-01T11:59:30.000Z"));
    });
  });

  describe("subtractMinutes", () => {
    it("subtracts minutes from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.subtractMinutes(date, 15);
      expect(result).toEqual(new Date("2023-01-01T11:45:00.000Z"));
    });
  });

  describe("subtractHours", () => {
    it("subtracts hours from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.subtractHours(date, 2);
      expect(result).toEqual(new Date("2023-01-01T10:00:00.000Z"));
    });
  });

  describe("subtractDays", () => {
    it("subtracts days from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.subtractDays(date, 3);
      expect(result).toEqual(new Date("2022-12-29T00:00:00.000Z"));
    });
  });

  describe("subtractWeeks", () => {
    it("subtracts weeks from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.subtractWeeks(date, 2);
      expect(result).toEqual(new Date("2022-12-18T00:00:00.000Z"));
    });
  });

  describe("subtractMonths", () => {
    it("subtracts months from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.subtractMonths(date, 3);
      expect(result).toEqual(new Date("2022-10-01T00:00:00.000Z"));
    });
  });

  describe("subtractYears", () => {
    it("subtracts years from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.subtractYears(date, 5);
      expect(result).toEqual(new Date("2018-01-01T00:00:00.000Z"));
    });
  });

  describe("calculationDuration", () => {
    it("calculates the duration between two dates", () => {
      const firstDate = new Date("2023-01-01T00:00:00.000Z");
      const secondDate = new Date("2023-01-01T01:00:00.000Z");
      const result = Dat.calculateDuration(firstDate, secondDate, "second");
      expect(result).toEqual(3600); // 1 hour in seconds
    });
  });

  describe("fromNow", () => {
    it("calculates the duration from the current time to a given date", () => {
      const date = new Date("2025-01-01T12:00:00.000Z");
      const result = Dat.durationFromNow(date, "month");
      // cannot test the exact duration as it depends on the current time
      expect(result).toBeGreaterThan(0); // duration should be greater than 0
    });
  });

  describe("toNow", () => {
    it("calculates the duration from a given date to the current time", () => {
      const date = new Date("2024-05-01T12:00:00.000Z");
      const result = Dat.durationToNow(date, "day");
      // cannot test the exact duration as it depends on the current time
      expect(result).toBeGreaterThan(0); // duration should be greater than 0
    });
  });

  describe("formatDate", () => {
    it("formats a date in default format with dateStyle = medium and timeStyle = medium", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.formatDate(date, {
        dateStyle: "medium",
        timeStyle: "medium",
      });
      expect(result).toEqual("Jan 1, 2023 at 12:00:00 PM");
    });
  });

  describe("formatDuration", () => {
    it("formats a duration in default format", () => {
      const result = Dat.formatDuration(3, "month");
      expect(result).toEqual("in 3 months");
    });

    it("formats a duration in FR format with numeric = auto", () => {
      const result = Dat.formatDuration(2, "day", {
        locale: "fr-FR",
        numeric: "auto",
      });
      expect(result).toEqual("après-demain");
    });
  });

  describe("isAfter", () => {
    it("returns true if the first date is after the second date", () => {
      const date1 = new Date("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(Dat.isAfter(date1, date2)).toBe(true);
    });

    it("returns false if the first date is before the second date", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.isAfter(date1, date2)).toBe(false);
    });

    it("returns false if the dates are the same", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.isAfter(date1, date2)).toBe(false);
    });
  });

  describe("isBefore", () => {
    it("returns true if the first date is before the second date", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.isBefore(date1, date2)).toBe(true);
    });

    it("returns false if the first date is after the second date", () => {
      const date1 = new Date("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(Dat.isBefore(date1, date2)).toBe(false);
    });

    it("returns false if the dates are the same", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.isBefore(date1, date2)).toBe(false);
    });
  });

  describe("isSame", () => {
    it("returns true if the dates are the same", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.isSame(date1, date2)).toBe(true);
    });

    it("returns false if the dates are different", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.isSame(date1, date2)).toBe(false);
    });
  });

  describe("hasAfter", () => {
    it("returns true if the first date has a value after the second date for the specified unit", () => {
      const date1 = new Date("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(Dat.hasAfter(date1, date2, "day")).toBe(true);
    });

    it("returns false if the first date has a value before the second date for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.hasAfter(date1, date2, "day")).toBe(false);
    });

    it("returns false if the dates have the same value for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.hasAfter(date1, date2, "day")).toBe(false);
    });
  });

  describe("hasBefore", () => {
    it("returns true if the first date has a value before the second date for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.hasBefore(date1, date2, "day")).toBe(true);
    });

    it("returns false if the first date has a value after the second date for the specified unit", () => {
      const date1 = new Date("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(Dat.hasBefore(date1, date2, "day")).toBe(false);
    });

    it("returns false if the dates have the same value for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.hasBefore(date1, date2, "day")).toBe(false);
    });
  });

  describe("hasSame", () => {
    it("returns true if the dates have the same value for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-01");
      expect(Dat.hasSame(date1, date2, "day")).toBe(true);
    });

    it("returns false if the dates have different values for the specified unit", () => {
      const date1 = new Date("2022-01-01");
      const date2 = new Date("2022-01-02");
      expect(Dat.hasSame(date1, date2, "day")).toBe(false);
    });
  });
});

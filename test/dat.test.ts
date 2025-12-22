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

  describe("substractSeconds", () => {
    it("substracts seconds from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.substractSeconds(date, 30);
      expect(result).toEqual(new Date("2023-01-01T11:59:30.000Z"));
    });
  });

  describe("substractMinutes", () => {
    it("substracts minutes from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.substractMinutes(date, 15);
      expect(result).toEqual(new Date("2023-01-01T11:45:00.000Z"));
    });
  });

  describe("substractHours", () => {
    it("substracts hours from a date", () => {
      const date = new Date("2023-01-01T12:00:00.000Z");
      const result = Dat.substractHours(date, 2);
      expect(result).toEqual(new Date("2023-01-01T10:00:00.000Z"));
    });
  });

  describe("substractDays", () => {
    it("substracts days from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.substractDays(date, 3);
      expect(result).toEqual(new Date("2022-12-29T00:00:00.000Z"));
    });
  });

  describe("substractWeeks", () => {
    it("substracts weeks from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.substractWeeks(date, 2);
      expect(result).toEqual(new Date("2022-12-18T00:00:00.000Z"));
    });
  });

  describe("substractMonths", () => {
    it("substracts months from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.substractMonths(date, 3);
      expect(result).toEqual(new Date("2022-10-01T00:00:00.000Z"));
    });
  });

  describe("substractYears", () => {
    it("substracts years from a date", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      const result = Dat.substractYears(date, 5);
      expect(result).toEqual(new Date("2018-01-01T00:00:00.000Z"));
    });
  });

  describe("diff", () => {
    it("calculates the duration between two dates", () => {
      const firstDate = new Date("2023-01-01T00:00:00.000Z");
      const secondDate = new Date("2023-01-01T01:00:00.000Z");
      const result = Dat.diff(firstDate, secondDate, "second");
      expect(result).toEqual(3600); // 1 hour in seconds
    });
  });

  describe("fromNow", () => {
    it("calculates the duration from the current time to a given date", () => {
      const date = Dat.addMonths(new Date(), 5);
      const result = Dat.durationFromNow(date, "month");
      // cannot test the exact duration as it depends on the current time
      expect(result).toBeGreaterThan(0); // duration should be greater than 0
    });
  });

  describe("untilNow", () => {
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

  describe("v2 instance methods", () => {
    it("addDays returns a Dat instance and does not mutate original", () => {
      const original = new Dat("2023-01-01T00:00:00.000Z");
      const result = original.addDays(3);
      expect(result).toBeInstanceOf(Dat);
      expect(result.toISOString()).toEqual("2023-01-04T00:00:00.000Z");
      expect(original.toISOString()).toEqual("2023-01-01T00:00:00.000Z");
    });

    it("addSeconds/addMinutes/addHours return correct values", () => {
      const base = new Dat("2023-01-01T12:00:00.000Z");
      expect(base.addSeconds(30).toISOString()).toEqual(
        "2023-01-01T12:00:30.000Z"
      );
      expect(base.addMinutes(15).toISOString()).toEqual(
        "2023-01-01T12:15:00.000Z"
      );
      expect(base.addHours(2).toISOString()).toEqual(
        "2023-01-01T14:00:00.000Z"
      );
    });

    it("addWeeks/addMonths/addYears return correct values", () => {
      const base = new Dat("2023-01-01T00:00:00.000Z");
      expect(base.addWeeks(2).toISOString()).toEqual(
        "2023-01-15T00:00:00.000Z"
      );
      expect(base.addMonths(3).toISOString()).toEqual(
        "2023-04-01T00:00:00.000Z"
      );
      expect(base.addYears(5).toISOString()).toEqual(
        "2028-01-01T00:00:00.000Z"
      );
    });

    it("substractDays/substractMonths/substractYears return correct values", () => {
      const base = new Dat("2023-01-01T00:00:00.000Z");
      expect(base.substractDays(3).toISOString()).toEqual(
        "2022-12-29T00:00:00.000Z"
      );
      expect(base.substractMonths(3).toISOString()).toEqual(
        "2022-10-01T00:00:00.000Z"
      );
      expect(base.substractYears(5).toISOString()).toEqual(
        "2018-01-01T00:00:00.000Z"
      );
    });

    it("diff instance method matches Dat.diff", () => {
      const a = new Dat("2023-01-01T00:00:00.000Z");
      const b = new Date("2023-01-01T01:00:00.000Z");
      expect(a.diff(b, "second")).toEqual(Dat.diff(a, b, "second"));
    });

    it("fromNow/untilNow match their static counterparts", () => {
      const future = new Dat("2025-01-01T12:00:00.000Z");
      expect(future.fromNow("month")).toEqual(Dat.durationFromNow(future, "month"));

      const past = new Dat("2024-05-01T12:00:00.000Z");
      expect(past.untilNow("day")).toEqual(Dat.durationToNow(past, "day"));
    });

    it("formatDate instance matches Dat.formatDate", () => {
      const date = new Dat("2023-01-01T12:00:00.000Z");
      const options = { dateStyle: "medium", timeStyle: "medium" } as const;
      expect(date.formatDate(options)).toEqual(Dat.formatDate(date, options));
    });

    it("formatDuration instance matches Dat.formatDuration", () => {
      const date = new Dat("2023-01-01T12:00:00.000Z");
      expect(date.formatDuration("month")).toEqual(
        Dat.formatDuration(date.getTime(), "month")
      );
    });

    it("instance comparison methods match static methods", () => {
      const date1 = new Dat("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(date1.isAfter(date2)).toBe(Dat.isAfter(date1, date2));
      expect(date1.isBefore(date2)).toBe(Dat.isBefore(date1, date2));
      expect(date1.isSame(date2)).toBe(Dat.isSame(date1, date2));

      expect(date1.hasAfter(date2, "day")).toBe(Dat.hasAfter(date1, date2, "day"));
      expect(date1.hasBefore(date2, "day")).toBe(
        Dat.hasBefore(date1, date2, "day")
      );
      expect(date1.hasSame(date2, "month")).toBe(Dat.hasSame(date1, date2, "month"));
    });
  });
});

import { describe, expect, it } from "bun:test";
import { Dat, DurationUnit } from "../src";

describe("Dat", () => {
  describe("Dat instanciation", () => {
    it("define a define which is instanceof Dat", () => {
      const date = new Dat();
      expect(date).toBeInstanceOf(Dat);
    });

    it("define a date of now when no arguments are provided", () => {
      const date = new Dat();
      const today = new Date();

      expect(date.valueOf()).toEqual(today.valueOf());
      expect(date.getFullYear()).toEqual(today.getFullYear());
      expect(date.getMonth()).toEqual(today.getMonth());
      expect(date.getDate()).toEqual(today.getDate());
      expect(date.getHours()).toEqual(today.getHours());
      expect(date.getMinutes()).toEqual(today.getMinutes());
      expect(date.getSeconds()).toEqual(today.getSeconds());
      expect(date.getMilliseconds()).toEqual(today.getMilliseconds());
    });

    it("define a date when there is only one argument and it is an object of type DatParametersObject", () => {
      const date = new Dat({ year: 2023, month: 1, day: 1 });

      expect(date.getFullYear()).toEqual(2023);
      expect(date.getMonth()).toEqual(1);
      expect(date.getDate()).toEqual(1);
    });

    it("define a date when there is only one argument and it is a string", () => {
      const date = new Dat("2023-01-01T12:00:00.000Z");

      expect(date.getFullYear()).toEqual(2023);
      expect(date.getMonth()).toEqual(0);
      expect(date.getDate()).toEqual(1);
      expect(date.getHours()).toEqual(12);
    });

    it("define a date when there is only one argument and it is a number", () => {
      const date = new Dat(1672531200000);

      expect(date.valueOf()).toEqual(1672531200000);
    });

    it("define a date when there is only one argument and it is a Date", () => {
      const date = new Dat(new Date("2023-01-01T12:00:00.000Z"));
      expect(date.valueOf()).toEqual(
        new Date("2023-01-01T12:00:00.000Z").valueOf(),
      );
    });

    it("define a date when args arity is greater than 1", () => {
      const date = new Dat(2023, 1, 1, 12);

      expect(date.getFullYear()).toEqual(2023);
      expect(date.getMonth()).toEqual(1);
      expect(date.getDate()).toEqual(1);
      expect(date.getHours()).toEqual(12);
    });
  });

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

  describe("isLeapYear", () => {
    it("returns true if the year is a leap year", () => {
      const date = new Date("2024-01-01T00:00:00.000Z");
      expect(Dat.isLeapYear(date)).toBe(true);
    });

    it("returns false if the year is not a leap year", () => {
      const date = new Date("2023-01-01T00:00:00.000Z");
      expect(Dat.isLeapYear(date)).toBe(false);
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
        "2023-01-01T12:00:30.000Z",
      );
      expect(base.addMinutes(15).toISOString()).toEqual(
        "2023-01-01T12:15:00.000Z",
      );
      expect(base.addHours(2).toISOString()).toEqual(
        "2023-01-01T14:00:00.000Z",
      );
    });

    it("addWeeks/addMonths/addYears return correct values", () => {
      const base = new Dat("2023-01-01T00:00:00.000Z");
      expect(base.addWeeks(2).toISOString()).toEqual(
        "2023-01-15T00:00:00.000Z",
      );
      expect(base.addMonths(3).toISOString()).toEqual(
        "2023-04-01T00:00:00.000Z",
      );
      expect(base.addYears(5).toISOString()).toEqual(
        "2028-01-01T00:00:00.000Z",
      );
    });

    it("substractDays/substractMonths/substractYears return correct values", () => {
      const base = new Dat("2023-01-01T00:00:00.000Z");
      expect(base.substractDays(3).toISOString()).toEqual(
        "2022-12-29T00:00:00.000Z",
      );
      expect(base.substractMonths(3).toISOString()).toEqual(
        "2022-10-01T00:00:00.000Z",
      );
      expect(base.substractYears(5).toISOString()).toEqual(
        "2018-01-01T00:00:00.000Z",
      );
    });

    it("diff instance method matches Dat.diff", () => {
      const a = new Dat("2023-01-01T00:00:00.000Z");
      const b = new Date("2023-01-01T01:00:00.000Z");
      expect(a.diff(b, "second")).toEqual(Dat.diff(a, b, "second"));
    });

    it("fromNow/untilNow match their static counterparts", () => {
      const future = new Dat("2025-01-01T12:00:00.000Z");
      expect(future.fromNow("month")).toEqual(
        Dat.durationFromNow(future, "month"),
      );

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
      const value = -3;
      const unit: DurationUnit = "month";
      const options = { locale: "en-US" } as const;

      expect(date.formatDuration(value, unit, options)).toEqual(
        Dat.formatDuration(value, unit, options),
      );
    });

    it("instance comparison methods match static methods", () => {
      const date1 = new Dat("2022-01-02");
      const date2 = new Date("2022-01-01");
      expect(date1.isAfter(date2)).toBe(Dat.isAfter(date1, date2));
      expect(date1.isBefore(date2)).toBe(Dat.isBefore(date1, date2));
      expect(date1.isSame(date2)).toBe(Dat.isSame(date1, date2));

      expect(date1.hasAfter(date2, "day")).toBe(
        Dat.hasAfter(date1, date2, "day"),
      );
      expect(date1.hasBefore(date2, "day")).toBe(
        Dat.hasBefore(date1, date2, "day"),
      );
      expect(date1.hasSame(date2, "month")).toBe(
        Dat.hasSame(date1, date2, "month"),
      );
    });

    it("isLeapYear instance matches Dat.isLeapYear", () => {
      const date = new Dat("2025-01-01T00:00:00.000Z");
      expect(date.isLeapYear()).toBe(Dat.isLeapYear(date));
    });
  });
});

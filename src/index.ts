import { type Locale } from "./locales";

export type DurationUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export type DatParametersObject = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  milliseconds?: number;
};

function isDatParametersObject(param: unknown): param is DatParametersObject {
  return (
    typeof param === "object" && param !== null && !(param instanceof Date)
  );
}

type DateConstructorArgs =
  | []
  | [value: string | number | Date]
  | [
      year: number,
      month: number,
      day?: number,
      hour?: number,
      minute?: number,
      second?: number,
      milliseconds?: number,
    ];

export class Dat extends Date {
  constructor();
  constructor(value: string | number | Date);
  constructor(
    year: number,
    month: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    milliseconds?: number,
  );
  constructor(params: DatParametersObject);
  constructor(...args: [...DateConstructorArgs] | [DatParametersObject]) {
    if (args.length === 0) {
      super();
    } else if (args.length === 1) {
      if (isDatParametersObject(args[0])) {
        const {
          year = 0,
          month = 0,
          day = 0,
          hour = 0,
          minute = 0,
          second = 0,
          milliseconds = 0,
        } = args[0];
        super(year, month, day, hour, minute, second, milliseconds);
      } else {
        super(args[0]);
      }
    } else {
      super(...args);
    }
  }

  /**
   * Adds the specified number of seconds to this date.
   * @param {number} seconds - The number of seconds to add.
   * @returns {Dat} - A new Dat instance with the seconds added.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.addSeconds(30);
   * console.log(result.toISOString()); // "2023-01-01T12:00:30.000Z"
   */
  addSeconds(seconds: number): Dat {
    const result = new Dat(this);
    result.setSeconds(result.getSeconds() + seconds);
    return result;
  }

  /**
   * Subtracts the specified number of seconds from this date.
   * @param {number} seconds - The number of seconds to subtract.
   * @returns {Dat} - A new Dat instance with the seconds subtracted.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.substractSeconds(30);
   * console.log(result.toISOString()); // "2023-01-01T11:59:30.000Z"
   */
  substractSeconds(seconds: number): Dat {
    return this.addSeconds(-seconds);
  }

  /**
   * Adds the specified number of minutes to this date.
   * @param {number} minutes - The number of minutes to add.
   * @returns {Dat} - A new Dat instance with the minutes added.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.addMinutes(15);
   * console.log(result.toISOString()); // "2023-01-01T12:15:00.000Z"
   */
  addMinutes(minutes: number): Dat {
    const result = new Dat(this);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }

  /**
   * Subtracts the specified number of minutes from this date.
   * @param {number} minutes - The number of minutes to subtract.
   * @returns {Dat} - A new Dat instance with the minutes subtracted.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.substractMinutes(15);
   * console.log(result.toISOString()); // "2023-01-01T11:45:00.000Z"
   */
  substractMinutes(minutes: number): Dat {
    return this.addMinutes(-minutes);
  }

  /**
   * Adds the specified number of hours to this date.
   * @param {number} hours - The number of hours to add.
   * @returns {Dat} - A new Dat instance with the hours added.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.addHours(2);
   * console.log(result.toISOString()); // "2023-01-01T14:00:00.000Z"
   */
  addHours(hours: number): Dat {
    const result = new Dat(this);
    result.setHours(result.getHours() + hours);
    return result;
  }

  /**
   * Subtracts the specified number of hours from this date.
   * @param {number} hours - The number of hours to subtract.
   * @returns {Dat} - A new Dat instance with the hours subtracted.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * const result = date.substractHours(2);
   * console.log(result.toISOString()); // "2023-01-01T10:00:00.000Z"
   */
  substractHours(hours: number): Dat {
    return this.addHours(-hours);
  }

  /**
   * Adds the specified number of days to this date.
   * @param {number} days - The number of days to add.
   * @returns {Dat} - A new Dat instance with the days added.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.addDays(3);
   * console.log(result.toISOString()); // "2023-01-04T00:00:00.000Z"
   */
  addDays(days: number): Dat {
    const result = new Dat(this);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Subtracts the specified number of days from this date.
   * @param {number} days - The number of days to subtract.
   * @returns {Dat} - A new Dat instance with the days subtracted.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.substractDays(3);
   * console.log(result.toISOString()); // "2022-12-29T00:00:00.000Z"
   */
  substractDays(days: number): Dat {
    return this.addDays(-days);
  }

  /**
   * Adds the specified number of weeks to this date.
   * @param {number} weeks - The number of weeks to add.
   * @returns {Dat} - A new Dat instance with the weeks added.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.addWeeks(2);
   * console.log(result.toISOString()); // "2023-01-15T00:00:00.000Z"
   */
  addWeeks(weeks: number): Dat {
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    return new Dat(this.getTime() + weeks * millisecondsInWeek);
  }

  /**
   * Adds the specified number of months to this date.
   * @param {number} months - The number of months to add.
   * @returns {Dat} - A new Dat instance with the months added.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.addMonths(3);
   * console.log(result.toISOString()); // "2023-04-01T00:00:00.000Z"
   */
  addMonths(months: number): Dat {
    const result = new Dat(this);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Subtracts the specified number of months from this date.
   * @param {number} months - The number of months to subtract.
   * @returns {Dat} - A new Dat instance with the months subtracted.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.substractMonths(3);
   * console.log(result.toISOString()); // "2022-10-01T00:00:00.000Z"
   */
  substractMonths(months: number): Dat {
    return this.addMonths(-months);
  }

  /**
   * Adds the specified number of years to this date.
   * @param {number} years - The number of years to add.
   * @returns {Dat} - A new Dat instance with the years added.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.addYears(5);
   * console.log(result.toISOString()); // "2028-01-01T00:00:00.000Z"
   */
  addYears(years: number): Dat {
    const result = new Dat(this);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Subtracts the specified number of years from this date.
   * @param {number} years - The number of years to subtract.
   * @returns {Dat} - A new Dat instance with the years subtracted.
   * @example
   * const date = new Dat("2023-01-01T00:00:00.000Z");
   * const result = date.substractYears(5);
   * console.log(result.toISOString()); // "2018-01-01T00:00:00.000Z"
   */
  substractYears(years: number): Dat {
    return this.addYears(-years);
  }

  /**
   * Calculates the duration between this date and another date in the specified unit.
   * @param {Date | Dat} compareTo - The date to compare to.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   * @example
   * const a = new Dat("2023-01-01T00:00:00.000Z");
   * const b = new Dat("2023-01-01T01:00:00.000Z");
   * console.log(a.diff(b, "hour")); // 1
   */
  diff(compareTo: Date | Dat, unit: DurationUnit): number {
    return Dat.diff(this, compareTo, unit);
  }

  /**
   * Checks if this date comes after the provided date.
   * @param {Date | Dat} compareTo - The date to compare against.
   * @returns {boolean} True if this date is after compareTo, false otherwise.
   * @example
   * const date = new Dat("2022-01-02");
   * console.log(date.isAfter(new Dat("2022-01-01"))); // true
   */
  isAfter(compareTo: Date | Dat): boolean {
    return Dat.isAfter(this, compareTo);
  }

  /**
   * Checks if this date comes before the provided date.
   * @param {Date | Dat} compareTo - The date to compare against.
   * @returns {boolean} True if this date is before compareTo, false otherwise.
   * @example
   * const date = new Dat("2022-01-01");
   * console.log(date.isBefore(new Dat("2022-01-02"))); // true
   */
  isBefore(compareTo: Date | Dat): boolean {
    return Dat.isBefore(this, compareTo);
  }

  /**
   * Checks if this date is the same as the provided date (same timestamp).
   * @param {Date | Dat} compareTo - The date to compare against.
   * @returns {boolean} True if both dates are the same, false otherwise.
   * @example
   * const date = new Dat("2022-01-01");
   * console.log(date.isSame(new Dat("2022-01-01"))); // true
   */
  isSame(compareTo: Date | Dat): boolean {
    return Dat.isSame(this, compareTo);
  }

  /**
   * Checks if this date has the same unit value as the provided date.
   * @param {Date | Dat} compareTo - The date to compare against.
   * @param {DurationUnit} unit - The unit to compare.
   * @returns {boolean} True if both dates share the same unit value.
   * @example
   * const date = new Dat("2022-01-01");
   * console.log(date.hasSame(new Dat("2022-01-02"), "month")); // true
   */
  hasSame(compareTo: Date | Dat, unit: DurationUnit): boolean {
    return Dat.hasSame(this, compareTo, unit);
  }

  /**
   * Checks if this date's unit value comes before the provided date's unit value.
   * @param {Date | Dat} compareTo - The date to compare against.
   * @param {DurationUnit} unit - The unit to compare.
   * @returns {boolean} True if this date is before compareTo for the specified unit.
   * @example
   * const date = new Dat("2022-01-01");
   * console.log(date.hasBefore(new Dat("2022-01-02"), "day")); // true
   */
  hasBefore(compareTo: Date | Dat, unit: DurationUnit): boolean {
    return Dat.hasBefore(this, compareTo, unit);
  }

  /**
   * Checks if this date's unit value comes after the provided date's unit value.
   * @param {Date | Dat} compareTo - The date to compare against.
   * @param {DurationUnit} unit - The unit to compare.
   * @returns {boolean} True if this date is after compareTo for the specified unit.
   * @example
   * const date = new Dat("2022-01-02");
   * console.log(date.hasAfter(new Dat("2022-01-01"), "day")); // true
   */
  hasAfter(compareTo: Date | Dat, unit: DurationUnit): boolean {
    return Dat.hasAfter(this, compareTo, unit);
  }

  /**
   * Calculates the duration from now to this date in the specified unit.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   * @example
   * const date = new Dat();
   * console.log(date.addMonths(3).fromNow("month"));
   */
  fromNow(unit: DurationUnit): number {
    return Dat.durationFromNow(this, unit);
  }

  /**
   * Calculates the duration from this date to now in the specified unit.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   * @example
   * const date = new Dat();
   * console.log(date.substractMonths(3).untilNow("month"));
   */
  untilNow(unit: DurationUnit): number {
    return Dat.durationToNow(this, unit);
  }

  /**
   * Formats this date using Intl.DateTimeFormat with the specified locale and options.
   * @param {Intl.DateTimeFormatOptions & { locale?: Locale }} [options] - Optional Intl.DateTimeFormat options and locale.
   * @returns {string} - The formatted date string.
   * @example
   * const date = new Dat("2023-01-01T12:00:00.000Z");
   * console.log(date.formatDate({ dateStyle: "medium", timeStyle: "medium" }));
   */
  formatDate(
    options: Intl.DateTimeFormatOptions & { locale?: Locale } = {
      locale: "en-US",
    },
  ): string {
    return Dat.formatDate(this, options);
  }

  /**
   * Formats this date as a relative duration using Intl.RelativeTimeFormat.
   * @param {DurationUnit} unit - The unit of time for the duration.
   * @param {Intl.RelativeTimeFormatOptions & { locale?: Locale }} [options] - Options for Intl.RelativeTimeFormat and locale.
   * @returns {string} - The formatted duration string.
   * @example
   * const date = new Dat();
   * console.log(date.formatDuration("day"));
   */
  formatDuration(
    value: number,
    unit: DurationUnit,
    options: Intl.RelativeTimeFormatOptions & { locale?: Locale } = {
      locale: "en-US",
    },
  ): string {
    return Dat.formatDuration(value, unit, options);
  }

  /**
   * Calculates the duration from now to a future date in the specified unit.
   * @param {Date} futureDate - The future date to compare against the current date.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   */
  static durationFromNow(futureDate: Date, unit: DurationUnit): number {
    const now = new Date();
    return this.diff(now, futureDate, unit);
  }

  /**
   * Calculates the duration from a past date to now in the specified unit.
   * @param {Date} pastDate - The past date to compare against the current date.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   */
  static durationToNow(pastDate: Date, unit: DurationUnit): number {
    const now = new Date();
    return this.diff(pastDate, now, unit);
  }

  /**
   * Formats a date using Intl.DateTimeFormat with the specified locale and options.
   * @param {Date} date - The date to format.
   * @param {Intl.DateTimeFormatOptions & { locale?: Locale }} [options] - Optional Intl.DateTimeFormat options for custom formatting and locale code (e.g., 'en-US' or 'fr-FR').
   * @returns {string} - The formatted date string.
   * @example
   * const formattedDate = Dat.formatDate(new Date(), { dateStyle: 'long', locale: 'fr-FR' });
   * console.log(formattedDate); // e.g., "30 Octobre, 2023"
   */

  static formatDate(
    date: Date,
    options: Intl.DateTimeFormatOptions & { locale?: Locale } = {
      locale: "en-US",
    },
  ): string {
    const { locale, ...restOptions } = options;

    return new Intl.DateTimeFormat(locale, restOptions).format(date);
  }

  /**
   * Formats a duration using Intl.RelativeTimeFormat and formatToParts.
   * @param {number} value - The duration value (positive or negative).
   * @param {DurationUnit} unit - The unit of time for the duration.
   * @param {Intl.RelativeTimeFormatOptions & { locale?: Locale }} [options] - Options for Intl.RelativeTimeFormat and the locale for formatting.
   * @returns {string} - The formatted duration string.
   * @example
   * const durationString = Dat.formatDuration(-2, 'day', 'fr-FR');
   * console.log(durationString); // e.g., "il y a 2 jours" (French locale)
   */
  static formatDuration(
    value: number,
    unit: DurationUnit,
    options: Intl.RelativeTimeFormatOptions & { locale?: Locale } = {
      locale: "en-US",
    },
  ): string {
    const { locale, ...restOptions } = options;
    const rtf = new Intl.RelativeTimeFormat(locale, restOptions);
    const parts = rtf.formatToParts(value, unit);

    // Combine the parts to form the final formatted string
    return parts.map((part) => part.value).join("");
  }

  /**
   * Helper function to calculate the duration between two dates in the specified unit.
   * Uses a map to retrieve the appropriate calculation function.
   * @param {Date} firstDate - The first date for the duration calculation.
   * @param {Date} secondDate - The second date for the duration calculation.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   * @example
   * const daysBetween = Dat.diff(new Date('2023-01-01'), new Date('2023-01-03'), 'day'); // Returns 2
   */
  static diff(
    firstDate: Date | Dat,
    secondDate: Date | Dat,
    unit: DurationUnit,
  ): number {
    let result: number;
    switch (unit) {
      case "second":
        result = (secondDate.getTime() - firstDate.getTime()) / 1000;
        break;
      case "minute":
        result = (secondDate.getTime() - firstDate.getTime()) / (60 * 1000);
        break;
      case "hour":
        result =
          (secondDate.getTime() - firstDate.getTime()) / (60 * 60 * 1000);
        break;
      case "day":
        result =
          (secondDate.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000);
        break;
      case "week":
        result =
          (secondDate.getTime() - firstDate.getTime()) /
          (7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        result =
          (secondDate.getFullYear() - firstDate.getFullYear()) * 12 +
          (secondDate.getMonth() - firstDate.getMonth());
        break;
      case "year":
        result = secondDate.getFullYear() - firstDate.getFullYear();
        break;
      default:
        throw new Error(`Unknown unit: ${unit}`);
    }

    const formattedResult = result.toFixed(2);
    return Number(formattedResult);
  }

  // Dates comparaison methods

  /**
   * Checks if the first date comes after the second date.
   * @param {Date} firstDate The date to check.
   * @param {Date} secondDate The date to compare against.
   * @returns {boolean} True if firstDate comes after secondDate, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-02');
   * console.log(isAfter(date1, date2)); // false
   * console.log(isAfter(date2, date1)); // true
   */
  static isAfter(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getTime() > secondDate.getTime();
  }

  /**
   * Checks if the first date comes before the second date.
   * @param {Date} firstDate The date to check.
   * @param {Date} secondDate The date to compare against.
   * @returns {boolean} True if firstDate comes before secondDate, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-02');
   * console.log(isBefore(date1, date2)); // true
   * console.log(isBefore(date2, date1)); // false
   */
  static isBefore(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getTime() < secondDate.getTime();
  }

  /**
   * Checks if two dates are the same.
   * @param {Date} firstDate The first date to compare.
   * @param {Date} secondDate The second date to compare.
   * @returns {boolean} True if the two dates are the same, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-01');
   * console.log(isSame(date1, date2)); // true
   * const date3 = new Date('2022-01-02');
   * console.log(isSame(date1, date3)); // false
   */
  static isSame(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getTime() === secondDate.getTime();
  }

  /**
   * Checks if two dates have the same value based on the specified unit.
   *
   * @param {Date} firstDate The first date to compare.
   * @param {Date} secondDate The second date to compare.
   * @param {DurationUnit} unit The unit to compare.
   * @returns {boolean} True if the two dates have the same value for the specified unit, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-02');
   * console.log(hasSame(date1, date2, 'month')); // true
   * console.log(hasSame(date1, date2, 'day')); // false
   * console.log(hasSame(date1, date2, 'week')); // true
   */
  static hasSame(
    firstDate: Date,
    secondDate: Date,
    unit: DurationUnit,
  ): boolean {
    switch (unit) {
      case "year":
        return firstDate.getFullYear() === secondDate.getFullYear();
      case "month":
        return firstDate.getMonth() === secondDate.getMonth();
      case "day":
        return firstDate.getDate() === secondDate.getDate();
      case "hour":
        return firstDate.getHours() === secondDate.getHours();
      case "minute":
        return firstDate.getMinutes() === secondDate.getMinutes();
      case "second":
        return firstDate.getSeconds() === secondDate.getSeconds();
      case "week":
        const firstDayOfWeek = (date: Date) => {
          const dayOfWeek = date.getDay() || 7;
          if (dayOfWeek === 1) {
            return date;
          } else {
            const diff = date.getDate() - dayOfWeek + 1;
            return new Date(date.setDate(diff));
          }
        };
        return (
          firstDayOfWeek(firstDate).getTime() ===
          firstDayOfWeek(secondDate).getTime()
        );
      default:
        throw new Error(`Invalid unit: ${unit}`);
    }
  }

  /**
   * Checks if the unit value of the first date comes before the unit value of the second date.
   * @param {Date} firstDate The first date to compare.
   * @param {Date} secondDate The second date to compare.
   * @param {DurationUnit} unit The unit to compare.
   * @returns {boolean} True if the first date comes before the second date for the specified unit, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-02');
   * console.log(hasBefore(date1, date2, 'day')); // true
   * console.log(hasBefore(date1, date2, 'month')); // false
   */
  static hasBefore(
    firstDate: Date,
    secondDate: Date,
    unit: DurationUnit,
  ): boolean {
    switch (unit) {
      case "year":
        return firstDate.getFullYear() < secondDate.getFullYear();
      case "month":
        return firstDate.getMonth() < secondDate.getMonth();
      case "day":
        return firstDate.getDate() < secondDate.getDate();
      case "hour":
        return firstDate.getHours() < secondDate.getHours();
      case "minute":
        return firstDate.getMinutes() < secondDate.getMinutes();
      case "second":
        return firstDate.getSeconds() < secondDate.getSeconds();
      case "week":
        const firstDayOfWeek = (date: Date) => {
          const dayOfWeek = date.getDay() || 7;
          if (dayOfWeek === 1) {
            return date;
          } else {
            const diff = date.getDate() - dayOfWeek + 1;
            return new Date(date.setDate(diff));
          }
        };
        return (
          firstDayOfWeek(firstDate).getTime() <
          firstDayOfWeek(secondDate).getTime()
        );
      default:
        throw new Error(`Invalid unit: ${unit}`);
    }
  }

  /**
   * Checks if the unit value of the first date comes after the unit value of the second date.
   * @param {Date} firstDate The first date to compare.
   * @param {Date} secondDate The second date to compare.
   * @param {DurationUnit} unit The unit to compare.
   * @returns {boolean} True if the first date comes after the second date for the specified unit, false otherwise.
   * @example
   * const date1 = new Date('2022-01-01');
   * const date2 = new Date('2022-01-02');
   * console.log(hasAfter(date1, date2, 'day')); // false
   * console.log(hasAfter(date1, date2, 'month')); // false
   */
  static hasAfter(
    firstDate: Date,
    secondDate: Date,
    unit: DurationUnit,
  ): boolean {
    switch (unit) {
      case "year":
        return firstDate.getFullYear() > secondDate.getFullYear();
      case "month":
        return firstDate.getMonth() > secondDate.getMonth();
      case "day":
        return firstDate.getDate() > secondDate.getDate();
      case "hour":
        return firstDate.getHours() > secondDate.getHours();
      case "minute":
        return firstDate.getMinutes() > secondDate.getMinutes();
      case "second":
        return firstDate.getSeconds() > secondDate.getSeconds();
      case "week":
        const firstDayOfWeek = (date: Date) => {
          const dayOfWeek = date.getDay() || 7;
          if (dayOfWeek === 1) {
            return date;
          } else {
            const diff = date.getDate() - dayOfWeek + 1;
            return new Date(date.setDate(diff));
          }
        };
        return (
          firstDayOfWeek(firstDate).getTime() >
          firstDayOfWeek(secondDate).getTime()
        );
      default:
        throw new Error(`Invalid unit: ${unit}`);
    }
  }

  // Time manipulation helper methods

  /**
   * Adds the specified number of seconds to the given date.
   * @param {Date} date - The date to add seconds to.
   * @param {number} seconds - The number of seconds to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addSeconds(new Date(), 30);
   * console.log(result); // e.g., "2023-01-01T00:00:30.000Z"
   */
  static addSeconds(date: Date, seconds: number): Date {
    const result = new Date(date);
    result.setSeconds(result.getSeconds() + seconds);
    return result;
  }

  /**
   * Adds the specified number of minutes to the given date.
   * @param {Date} date - The date to add minutes to.
   * @param {number} minutes - The number of minutes to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addMinutes(new Date(), 22);
   * console.log(result); // e.g., "2023-01-01T00:22:00.000Z"
   */
  static addMinutes(date: Date, minutes: number): Date {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }

  /**
   * Adds the specified number of hours to the given date.
   * @param {Date} date - The date to add hours to.
   * @param {number} hours - The number of hours to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addHours(new Date(), 4);
   * console.log(result); // e.g., "2023-01-01T04:00:00.000Z"
   */
  static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  /**
   * Adds the specified number of days to the given date.
   * @param {Date} date - The date to add days to.
   * @param {number} days - The number of days to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addDays(new Date('2023-01-01'), 2);
   * console.log(result); // e.g., "2023-01-03T00:00:00.000Z"
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Adds a specified number of weeks to a given date.
   *
   * @param {Date} date - The date to which the weeks will be added.
   * @param {number} weeks - The number of weeks to add.
   * @returns {Date} - The new date after adding the specified number of weeks.
   *
   * @example
   * const newDate = addWeeks(new Date('2022-01-01'), 2);
   * console.log(newDate); // "2022-01-15"
   */
  static addWeeks(date: Date, weeks: number): Date {
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const newDate = new Date(date.getTime() + weeks * millisecondsInWeek);
    return newDate;
  }

  /**
   * Adds the specified number of months to the given date.
   * @param {Date} date - The date to add months to.
   * @param {number} months - The number of months to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addMonths(new Date('2023-01-01'), 3);
   * console.log(result); // e.g., "2023-04-01T00:00:00.000Z"
   */
  static addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Adds the specified number of years to the given date.
   * @param {Date} date - The date to add years to.
   * @param {number} years - The number of years to add.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.addYears(new Date('2023-01-01'), 2);
   * console.log(result); // e.g., "2025-01-01T00:00:00.000Z"
   */
  static addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Substracts the specified number of seconds from the given date.
   * @param {Date} date - The date to substract seconds from.
   * @param {number} seconds - The number of seconds to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractSeconds(new Date('2023-01-01T12:00:00.000Z'), 30);
   * console.log(result); // e.g., "2023-01-01T11:59:30.000Z"
   */
  static substractSeconds(date: Date, seconds: number): Date {
    return Dat.addSeconds(date, -seconds);
  }

  /**
   * Substracts the specified number of minutes from the given date.
   * @param {Date} date - The date to substract minutes from.
   * @param {number} minutes - The number of minutes to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractMinutes(new Date('2023-01-01T12:00:00.000Z'), 15);
   * console.log(result); // e.g., "2023-01-01T11:45:00.000Z"
   */
  static substractMinutes(date: Date, minutes: number): Date {
    return Dat.addMinutes(date, -minutes);
  }

  /**
   * Substracts the specified number of hours from the given date.
   * @param {Date} date - The date to substract hours from.
   * @param {number} hours - The number of hours to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractHours(new Date('2023-01-01T12:00:00.000Z'), 2);
   * console.log(result); // e.g., "2023-01-01T10:00:00.000Z"
   */
  static substractHours(date: Date, hours: number): Date {
    return Dat.addHours(date, -hours);
  }

  /**
   * Substracts the specified number of days from the given date.
   * @param {Date} date - The date to substract days from.
   * @param {number} days - The number of days to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractDays(new Date('2023-01-01T00:00:00.000Z'), 3);
   * console.log(result); // e.g., "2022-12-29T00:00:00.000Z"
   */
  static substractDays(date: Date, days: number): Date {
    return Dat.addDays(date, -days);
  }

  /**
   * Substracts the specified number of weeks from the given date.
   * @param {Date} date - The date to substract weeks from.
   * @param {number} weeks - The number of weeks to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractWeeks(new Date('2023-01-01T00:00:00.000Z'), 2);
   * console.log(result); // e.g., "2022-12-18T00:00:00.000Z"
   */
  static substractWeeks(date: Date, weeks: number): Date {
    return Dat.addWeeks(date, -weeks);
  }

  /**
   * Substracts the specified number of months from the given date.
   * @param {Date} date - The date to substract months from.
   * @param {number} months - The number of months to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractMonths(new Date('2023-01-01T00:00:00.000Z'), 3);
   * console.log(result); // e.g., "2022-10-01T00:00:00.000Z"
   */
  static substractMonths(date: Date, months: number): Date {
    return Dat.addMonths(date, -months);
  }

  /**
   * Substracts the specified number of years from the given date.
   * @param {Date} date - The date to substract years from.
   * @param {number} years - The number of years to substract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.substractYears(new Date('2023-01-01T00:00:00.000Z'), 5);
   * console.log(result); // e.g., "2018-01-01T00:00:00.000Z"
   */
  static substractYears(date: Date, years: number): Date {
    return Dat.addYears(date, -years);
  }

  // Duration calculation helper methods

  /**
   * Calculates the number of seconds between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of seconds between the two dates.
   * @example
   * const seconds = Dat.secondsBetween(new Date('2023-01-01T00:00:00Z'), new Date('2023-01-01T00:01:40Z'));
   * console.log(seconds); // 100
   */
  static secondsBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "second"));
  }

  /**
   * Calculates the number of minutes between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of minutes between the two dates.
   * @example
   * const minutes = Dat.minutesBetween(new Date('2023-01-01T00:00:00Z'), new Date('2023-01-01T00:01:40Z'));
   * console.log(minutes); // 1.67
   */
  static minutesBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "minute"));
  }

  /**
   * Calculates the number of hours between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of hours between the two dates.
   * @example
   * const hours = Dat.hoursBetween(new Date('2023-01-01T00:00:00Z'), new Date('2023-01-01T01:40:00Z'));
   * console.log(hours); // 1.67
   */
  static hoursBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "hour"));
  }

  /**
   * Calculates the number of days between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of days between the two dates.
   * @example
   * const days = Dat.daysBetween(new Date('2023-01-01'), new Date('2023-01-03'));
   * console.log(days); // 2
   */
  static daysBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "day"));
  }

  /**
   * Calculates the number of weeks between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of weeks between the two dates.
   * @example
   * const weeks = Dat.weeksBetween(new Date('2023-01-01'), new Date('2023-01-15'));
   * console.log(weeks); // 2
   */
  static weeksBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "week"));
  }

  /**
   * Calculates the number of months between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of months between the two dates.
   * @example
   * const months = Dat.monthsBetween(new Date('2023-01-01'), new Date('2023-03-01'));
   * console.log(months); // 2
   */
  static monthsBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "month"));
  }

  /**
   * Calculates the number of years between two dates.
   * @param {Date} firstDate - The first date for the calculation.
   * @param {Date} secondDate - The second date for the calculation.
   * @returns {number} - The number of years between the two dates.
   * @example
   * const years = Dat.yearsBetween(new Date('2020-01-01'), new Date('2023-01-01'));
   * console.log(years); // 3
   */
  static yearsBetween(firstDate: Date, secondDate: Date): number {
    return Math.abs(Dat.diff(firstDate, secondDate, "year"));
  }
}

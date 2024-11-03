// src/Dat.ts
import { type Locale } from "./locales";

export type DurationUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export class Dat {
  /**
   * A map that associates units with their corresponding duration calculation methods.
   */
  static unitCalculators = new Map<
    DurationUnit,
    (firstDate: Date, secondDate: Date) => number
  >([
    ["second", Dat.secondsBetween],
    ["minute", Dat.minutesBetween],
    ["hour", Dat.hoursBetween],
    ["day", Dat.daysBetween],
    ["week", Dat.weeksBetween],
    ["month", Dat.monthsBetween],
    ["year", Dat.yearsBetween],
  ]);

  /**
   * Calculates the duration from now to a future date in the specified unit.
   * @param {Date} futureDate - The future date to compare against the current date.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   */
  static durationFromNow(futureDate: Date, unit: DurationUnit): number {
    const now = new Date();
    return this.calculateDuration(now, futureDate, unit);
  }

  /**
   * Calculates the duration from a past date to now in the specified unit.
   * @param {Date} pastDate - The past date to compare against the current date.
   * @param {DurationUnit} unit - The unit of time to return the duration in.
   * @returns {number} - The duration in the specified unit.
   */
  static durationToNow(pastDate: Date, unit: DurationUnit): number {
    const now = new Date();
    return this.calculateDuration(pastDate, now, unit);
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
    options: Intl.DateTimeFormatOptions & { locale?: Locale } = { locale: "en-US" }
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
    options: Intl.RelativeTimeFormatOptions & { locale?: Locale } = { locale: "en-US" }
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
   * const daysBetween = Dat.calculateDuration(new Date('2023-01-01'), new Date('2023-01-03'), 'day'); // Returns 2
   */
  static calculateDuration(
    firstDate: Date,
    secondDate: Date,
    unit: DurationUnit
  ): number {
    const calculator = this.unitCalculators.get(unit);
    if (!calculator) {
      throw new Error(`Unknown unit: ${unit}`);
    }
    const formattedResult = calculator(firstDate, secondDate).toFixed(2);
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
    unit: DurationUnit
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
    unit: DurationUnit
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
    unit: DurationUnit
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
   * Subtracts the specified number of seconds from the given date.
   * @param {Date} date - The date to subtract seconds from.
   * @param {number} seconds - The number of seconds to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractSeconds(new Date('2023-01-01T12:00:00.000Z'), 30);
   * console.log(result); // e.g., "2023-01-01T11:59:30.000Z"
   */
  static subtractSeconds(date: Date, seconds: number): Date {
    return Dat.addSeconds(date, -seconds);
  }

  /**
   * Subtracts the specified number of minutes from the given date.
   * @param {Date} date - The date to subtract minutes from.
   * @param {number} minutes - The number of minutes to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractMinutes(new Date('2023-01-01T12:00:00.000Z'), 15);
   * console.log(result); // e.g., "2023-01-01T11:45:00.000Z"
   */
  static subtractMinutes(date: Date, minutes: number): Date {
    return Dat.addMinutes(date, -minutes);
  }

  /**
   * Subtracts the specified number of hours from the given date.
   * @param {Date} date - The date to subtract hours from.
   * @param {number} hours - The number of hours to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractHours(new Date('2023-01-01T12:00:00.000Z'), 2);
   * console.log(result); // e.g., "2023-01-01T10:00:00.000Z"
   */
  static subtractHours(date: Date, hours: number): Date {
    return Dat.addHours(date, -hours);
  }

  /**
   * Subtracts the specified number of days from the given date.
   * @param {Date} date - The date to subtract days from.
   * @param {number} days - The number of days to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractDays(new Date('2023-01-01T00:00:00.000Z'), 3);
   * console.log(result); // e.g., "2022-12-29T00:00:00.000Z"
   */
  static subtractDays(date: Date, days: number): Date {
    return Dat.addDays(date, -days);
  }

  /**
   * Subtracts the specified number of weeks from the given date.
   * @param {Date} date - The date to subtract weeks from.
   * @param {number} weeks - The number of weeks to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractWeeks(new Date('2023-01-01T00:00:00.000Z'), 2);
   * console.log(result); // e.g., "2022-12-18T00:00:00.000Z"
   */
  static subtractWeeks(date: Date, weeks: number): Date {
    return Dat.addWeeks(date, -weeks);
  }

  /**
   * Subtracts the specified number of months from the given date.
   * @param {Date} date - The date to subtract months from.
   * @param {number} months - The number of months to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractMonths(new Date('2023-01-01T00:00:00.000Z'), 3);
   * console.log(result); // e.g., "2022-10-01T00:00:00.000Z"
   */
  static subtractMonths(date: Date, months: number): Date {
    return Dat.addMonths(date, -months);
  }

  /**
   * Subtracts the specified number of years from the given date.
   * @param {Date} date - The date to subtract years from.
   * @param {number} years - The number of years to subtract.
   * @returns {Date} - The resulting date object.
   * @example
   * const result = Dat.subtractYears(new Date('2023-01-01T00:00:00.000Z'), 5);
   * console.log(result); // e.g., "2018-01-01T00:00:00.000Z"
   */
  static subtractYears(date: Date, years: number): Date {
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
    const msPerSecond = 1000;
    return Math.abs((secondDate.getTime() - firstDate.getTime()) / msPerSecond);
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
    const msPerMinute = 60 * 1000;
    return Math.abs((secondDate.getTime() - firstDate.getTime()) / msPerMinute);
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
    const msPerHour = 60 * 60 * 1000;
    return Math.abs((secondDate.getTime() - firstDate.getTime()) / msPerHour);
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
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.abs((secondDate.getTime() - firstDate.getTime()) / msPerDay);
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
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const diffInMilliseconds = secondDate.getTime() - firstDate.getTime();
    return Math.abs(Math.round(diffInMilliseconds / millisecondsInWeek));
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
    return Math.abs(
      (secondDate.getFullYear() - firstDate.getFullYear()) * 12 +
        (secondDate.getMonth() - firstDate.getMonth())
    );
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
    return Math.abs(secondDate.getFullYear() - firstDate.getFullYear());
  }
}
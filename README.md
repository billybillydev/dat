# Dat

The `Dat` class provides a collection of helpful methods for date manipulation, formatting, and comparison. You can calculate the duration between dates, format dates and times, add or subtract time units, and perform various date comparisons. This package aims to use no dependencies to work with.

## Goal

The main purpose of this project is to be a complementary tool for javascript Date object.

Date already has great features to manipulate date. However, some common usage functions are lacking like adding days to a date. Manually do this operation decreases the developper experience when it comes to date with javascript.

So, Dat is just a set of common features/operations developpers would like to have with js Date.

The mostly great feature with Dat is the combination between javascript Date and Intl.DateTimeFormat / Intl.RelativeTimeFormat which provide so much handful way of formatting date/time in a proper way - by even dealing with locale.

Therefore, Dat has no dependencies...and we wznted to let you know that :)

We'll see with time what developpers think that could be included in this package without the needs to be bound to another dependencies. Enjoy !

_Dat is the translation of Date in **haitian kreyol**._

## Features

- Format dates with different locales and options using Intl.DateTimeFormat and Intl.RelativeTimeFormat.
- Calculate the duration between two dates in various units (seconds, minutes, hours, days, weeks, months, years).
- Add or subtract time units to/from a date.
- Perform date comparisons (check if one date comes before, after, or is the same as another).
- Compatible with both local and international date formats.

---

## Installation

Simply:
- npm:
    ```bash
    npm install @mosi/dat
- yarn
    ```bash
    yarn add @mosi/dat
- pnpm:
    ```bash
    pnpm install @mosi/dat

- bun
    ```bash
    bun add @mosi/dat


---

## Usage

### Importing the Class

```typescript
import { Dat } from '@mosi/dat';
```

### Examples

#### 1. Formatting Dates

The `formatDate` method formats a date based on the specified locale and options.

```typescript
const formattedDate = Dat.formatDate(new Date(), { dateStyle: 'long', locale: 'fr-FR' });
console.log(formattedDate); // e.g., "30 Octobre, 2023"
```

#### 2. Calculating Duration Between Dates

Use `calculateDuration` to get the duration between two dates in different units.

```typescript
const startDate = new Date('2023-01-01');
const endDate = new Date('2023-01-03');
const daysBetween = Dat.calculateDuration(startDate, endDate, 'day'); // Returns 2
console.log(`Days between: ${daysBetween}`);
```

#### 3. Adding and Subtracting Time

Add or subtract time units (seconds, minutes, hours, days, weeks, months, years) to/from a date.

```typescript
const now = new Date();

// Adding time
const futureDate = Dat.addDays(now, 5);
console.log(`5 days from now: ${Dat.formatDate(futureDate)}`);

// Subtracting time
const pastDate = Dat.subtractMonths(now, 2);
console.log(`2 months ago: ${Dat.formatDate(pastDate)}`);
```

#### 4. Date Comparison

Check if one date is before, after, or the same as another date.

```typescript
const date1 = new Date('2023-01-01');
const date2 = new Date('2023-01-02');

console.log(Dat.isBefore(date1, date2)); // true
console.log(Dat.isAfter(date1, date2));  // false
console.log(Dat.isSame(date1, date2));   // false
```

#### 5. Formatting Durations

`formatDuration` provides a formatted relative duration string, compatible with `Intl.RelativeTimeFormat`.

```typescript
const durationString = Dat.formatDuration(-2, 'day', { locale: 'fr-FR' });
console.log(durationString); // e.g., "il y a 2 jours" (French locale)
```

#### 6. Duration based on current time

`durationFromNow` and `durationToNow` let you know the duration for the specified unit between current time and a future or a past date.

```typescript
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 10); // 10 days from now

const daysUntil = Dat.durationFromNow(futureDate, 'day');
console.log(`Days until future date: ${daysUntil}`); // Outputs: Days until future date: 10

const pastDate = new Date();
pastDate.setFullYear(pastDate.getFullYear() - 1); // 1 year ago

const yearsSince = Dat.durationToNow(pastDate, 'year');
console.log(`Years since past date: ${yearsSince}`); // Outputs: Years since past date: 1
```

#### 7. Date units comparison

Check if one date has the specified unit value before, after or equal to another date unit value.

```typescript
const date1 = new Date('2023-10-01');
const date2 = new Date('2023-10-15');

const isSameMonth = Dat.hasSame(date1, date2, 'month');
console.log(`Do both dates have the same month? ${isSameMonth}`); // Outputs: Do both dates have the same month? true

const isSameDay = Dat.hasSame(date1, date2, 'day');
console.log(`Do both dates have the same day? ${isSameDay}`); // Outputs: Do both dates have the same day? false

const date3 = new Date('2023-09-01');
const date4 = new Date('2023-10-01');

const isBeforeMonth = Dat.hasBefore(date3, date4, 'month');
console.log(`Is the month of date3 before date4? ${isBeforeMonth}`); // Outputs: Is the month of date3 before date4? true

const isBeforeYear = Dat.hasBefore(date3, date4, 'year');
console.log(`Is the year of date3 before date4? ${isBeforeYear}`); // Outputs: Is the year of date3 before date4? false

const date5 = new Date('2023-12-01');
const date6 = new Date('2023-10-01');

const isAfterMonth = Dat.hasAfter(date5, date6, 'month');
console.log(`Is the month of date5 after date6? ${isAfterMonth}`); // Outputs: Is the month of date5 after date6? true

const isAfterDay = Dat.hasAfter(date5, date6, 'day');
console.log(`Is the day of date5 after date6? ${isAfterDay}`); // Outputs: Is the day of date5 after date6? true
```

## API Reference

### `Dat.formatDate(date: Date, options?: Intl.DateTimeFormatOptions & { locale?: Locale }): string`

Formats a date based on the specified options and locale.

### `Dat.formatDuration(value: number, unit: DurationUnit, options?: Intl.RelativeTimeFormatOptions & { locale?: Locale }): string`

Formats a duration based on the specified options and locale.

### `Dat.calculateDuration(firstDate: Date, secondDate: Date, unit: DurationUnit): number`

Calculates the duration between two dates in the specified unit.

### `Dat.durationFromNow(futureDate: Date, unit: DurationUnit): number`

Calculates the duration from the current date to a future date in the specified unit (e.g., days, weeks, months).

### `Dat.durationToNow(pastDate: Date, unit: DurationUnit): number`

Calculates the duration from a past date to the current date in the specified unit (e.g., days, weeks, months).

### `Dat.add[Unit](date: Date, value: number): Date`

Adds a specified unit to a date.

### `Dat.subtract[Unit](date: Date, value: number): Date`

Subtracts a specified unit from a date.

### `Dat.isBefore(firstDate: Date, secondDate: Date): boolean`

Checks if the first date is before the second date.

### `Dat.isAfter(firstDate: Date, secondDate: Date): boolean`

Checks if the first date is after the second date.

### `Dat.isSame(firstDate: Date, secondDate: Date): boolean`

Checks if two dates are the same.

### `Dat.hasBefore(firstDate: Date, secondDate: Date, unit: DurationUnit): boolean`

Checks if the unit value of the first date comes before the unit value of the second date for a specific unit.

### `Dat.hasAfter(firstDate: Date, secondDate: Date, unit: DurationUnit): boolean`

Checks if the unit value of the first date comes after the unit value of the second date for a specific unit.

### `Dat.hasSame(firstDate: Date, secondDate: Date, unit: DurationUnit): boolean`

Checks if two dates share the same value for a specific unit (like the same month, day, or year).

## Suggestion and Contributing

We'll provide asap a guidelines. Meanwhile, feel free to make suggestion or open issues.

## License

This project is licensed under the MIT License.
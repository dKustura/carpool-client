import { DateTime, DurationUnit } from 'luxon';

export const isDateBetweenDates = (
  date: Date | string,
  start: Date | string,
  end: Date | string,
) => {
  const dateDate = toUtcDate(date);
  const startDate = toUtcDate(start);
  const endDate = toUtcDate(end);
  return dateDate >= startDate && dateDate <= endDate;
};

export const toUtcDate = (d: Date | string) => {
  const date = new Date(d);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
  );
};

export const getStartOf = (date: Date, unit: DurationUnit) =>
  toUtcDate(DateTime.fromJSDate(date).startOf(unit).toJSDate());

export const getEndOf = (date: Date, unit: DurationUnit) =>
  toUtcDate(DateTime.fromJSDate(date).endOf(unit).toJSDate());

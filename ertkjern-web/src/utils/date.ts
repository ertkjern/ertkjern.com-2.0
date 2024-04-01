import {
  differenceInYears,
  differenceInMonths,
  isSameDay,
  format,
} from "date-fns";

export const getJobLength = (fromDate: Date, toDate: Date): string => {
  const yearDiff = differenceInYears(toDate, fromDate);

  // Get month diff (but not total, subtract years and add 1 as months begins on zero)
  const monthDiff = differenceInMonths(toDate, fromDate) - yearDiff * 12 + 1;
  const yearString = yearDiff > 0 ? `${yearDiff} years ` : "";
  const monthString =
    monthDiff > 0 && monthDiff !== 1 ? `${monthDiff} months ` : "";

  // Return string
  return `${yearString}${monthString}`;
};

export const getFromToDate = (fromDate: Date, toDate: Date) => {
  const isStillActiveJob = isSameDay(fromDate, toDate);
  return `${format(fromDate, "MMMM yyyy")} - 
            ${isStillActiveJob ? "Today" : format(toDate, "MMMM yyyy")}`;
};

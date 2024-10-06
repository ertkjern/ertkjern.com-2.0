import {
  differenceInYears,
  differenceInMonths,
  isSameDay,
  format,
  Locale,
} from "date-fns";
import { nb, enUS } from "date-fns/locale";
import { capitalizeFirstLetter } from "./common";

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

export const getFromToDate = (fromDate: Date, toDate: Date, locale: string) => {
  const isStillActiveJob = isSameDay(new Date(), toDate);
  console.log(fromDate.toISOString(), toDate.toISOString());
  const langCode = getLangCode(locale);
  const from = format(fromDate, "MMMM yyyy", { locale: langCode });
  const to = format(toDate, "MMMM yyyy", { locale: langCode });
  return `${capitalizeFirstLetter(from)} - 
            ${isStillActiveJob ? "Today" : capitalizeFirstLetter(to)}`;
};

export const getLangCode = (locale: string): Locale => {
  return locale === "en" ? enUS : nb;
};

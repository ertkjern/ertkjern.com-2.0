import {
  differenceInYears,
  differenceInMonths,
  isSameDay,
  format,
  Locale,
} from "date-fns";
import { nb, enUS } from "date-fns/locale";
import { capitalizeFirstLetter } from "./common";

interface JobLength {
  years: number;
  months: number;
}

export const getJobLength = (fromDate: Date, toDate: Date): JobLength  => {
  const yearDiff = differenceInYears(toDate, fromDate);

  // Get month diff (but not total, subtract years and add 1 as months begins on zero)
  const monthDiff = differenceInMonths(toDate, fromDate) - yearDiff * 12 + 1;
  return {
    years: yearDiff,
    months: monthDiff,
  }
};

export const getFromToDate = (fromDate: Date, toDate: Date, locale: string) => {

  const isStillActiveJob = isSameDay(new Date(), toDate);
  const langCode = getLangCode(locale);
  const from = format(fromDate, "MMMM yyyy", { locale: langCode });
  const to = format(toDate, "MMMM yyyy", { locale: langCode });
  const translation = locale === "en" ? 'Present' : 'Pågående';
  return `${capitalizeFirstLetter(from)} - 
            ${isStillActiveJob ? translation : capitalizeFirstLetter(to)}`;
};

export const getLangCode = (locale: string): Locale => {
  return locale === "en" ? enUS : nb;
};

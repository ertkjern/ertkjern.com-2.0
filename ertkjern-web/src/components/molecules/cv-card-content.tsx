import { getFromToDate, getJobLength, getLangCode, } from "@/utils/date";
import { format, parseISO } from "date-fns";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC } from "react";

interface Props {
  title: string;
  description: string;
  startDate?: string;
  toDate?: string;
  image: string;
  url: string;
  linkText: string,
  startingText: string;
  locale: 'en' | 'no';
}

export const CVCardContent: FC<Props> = ({
  title,
  description,
  image,
  startDate,
  toDate,
  url,
  linkText,
  startingText,
  locale,
}) => {
  const generalI18n = useTranslations('general');
 
  const start = parseISO(startDate ?? new Date().toISOString());
  const end = parseISO(toDate ?? new Date().toISOString());
  const hasNotStarted = start > new Date();

  // Calculate job length
  const { years, months } = getJobLength(start, end)
  const yearString = years > 0 ? `${years} ${generalI18n('years')} ` : "";
  const monthString =
    months > 0 && months !== 1 ? `${months} ${generalI18n('months')} ` : "";

  const jobLengthString = `${yearString}${monthString}`;


  return (
    <div className="clickable-card p-4 ">
      <div className="w-full flex justify-center align-center h-32">
        <Image src={image} alt={title} width={450} height={150}/>
      </div>
      <h5 className="text-lg font-bold mt-4">{title}</h5>
      {(startDate && !hasNotStarted) && 
        <p className="my-1 text-sm text-gray-500">{getFromToDate(start, end, locale)} <br/> {jobLengthString}</p>
      }
      {hasNotStarted &&
        <p className="my-1 text-sm text-gray-500">{startingText}: {format(start, 'MMMM', { locale: getLangCode(locale)})}</p>
      }
      <p className="my-1">{description}</p>
      <a href={url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-blue-700 border-b-2 border-blue-700">{linkText}</a>
    </div>
  );
};

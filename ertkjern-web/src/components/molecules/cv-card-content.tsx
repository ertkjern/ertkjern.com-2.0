import { getFromToDate, getJobLength, } from "@/utils/date";
import { parseISO } from "date-fns";
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
}

export const CVCardContent: FC<Props> = ({
  title,
  description,
  image,
  startDate,
  toDate,
  url,
  linkText
}) => {
  const start = parseISO(startDate ?? new Date().toISOString());
  const end = parseISO(toDate ?? new Date().toISOString());
  return (
    <div className="clickable-card p-4 ">
      <div className="w-full flex justify-center align-center h-32">
        <Image src={image} alt={title} width={450} height={150}/>
      </div>
      <h5 className="text-lg font-bold mt-4">{title}</h5>
      {startDate && 
        <p className="my-1 text-sm text-gray-500">{getFromToDate(start, end)} <br/> {getJobLength(start, end)}</p>
      }
      <p className="my-1">{description}</p>
      <a href={url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-blue-700 border-b-2 border-blue-700">{linkText}</a>
    </div>
  );
};

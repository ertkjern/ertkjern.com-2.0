import { HomeProject } from "@/sanity/queries";
import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import { FC, Fragment } from "react";
import Link from "next/link";

interface Props {
  locale: string;
  project: HomeProject;
  readMoreText: string;
  websiteText: string;
}

export const Project: FC<Props> = ({ locale, project, readMoreText, websiteText }) => {
  const logoUrl = project.logo ? urlFor(project.logo)?.url() : "";
  const promoSlug = project.promoPage?.slug?.current;
  const websiteUrl = project.url;

  return (
    <div className="flex flex-col mt-16">
      {logoUrl && (
        <div className="flex justify-start">
          <Image
            src={logoUrl}
            alt={project.title ?? ""}
            width={159}
            height={157}
            className="object-contain w-1/3 max-md:h-[85px] max-md:w-[85px] max-md:max-w-full"
          />
        </div>
      )}
      <h4 className="text-xl font-bold mt-4 mb-2">{project.title}</h4>
      <p className="min-h-[4.5rem] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
        {project.description}
      </p>
      <ul className="list-none mt-4 flex items-center text-gray-700">
        {project.bulletPoints?.map((point, index) => (
          <Fragment key={point + index}>
            <li>
              <span>{point}</span>
              {index !== (project?.bulletPoints?.length ?? 0) - 1 && (
                <span className="mx-2 text-sm">•​​</span>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
      {(promoSlug || websiteUrl) && (
        <div className="mt-3 flex flex-wrap items-center gap-4">
          {promoSlug && (
            <Link
              href={`/${locale}/apps/${promoSlug}`}
              className="inline-block text-blue-700 border-b-2 border-blue-700"
            >
              {readMoreText}
            </Link>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-700 border-b-2 border-blue-700"
            >
              {websiteText}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

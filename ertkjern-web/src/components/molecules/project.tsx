import { HomeProject } from "@/sanity/queries";
import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import { FC, Fragment } from "react";
import Link from "next/link";

interface Props {
  locale: string;
  project: HomeProject;
  linkText: string;
}

export const Project: FC<Props> = ({ locale, project, linkText }) => {
  const logoUrl = project.logo ? urlFor(project.logo)?.url() : "";
  const promoSlug = project.promoPage?.slug?.current;

  return (
    <div className="flex flex-col mt-16">
      {logoUrl && (
        <div className="flex max-md:justify-center">
          <Image
            src={logoUrl}
            alt={project.title ?? ""}
            width={159}
            height={157}
            className="object-contain w-1/3 max-md:place-content-center max-md:w-150"
          />
        </div>
      )}
      <h4 className="text-xl font-bold mt-4 mb-2">{project.title}</h4>
      <p>{project.description}</p>
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
      {promoSlug && (
        <div>
          <Link
            href={`/${locale}/apps/${promoSlug}`}
            className="inline-block mt-3 text-blue-700 border-b-2 border-blue-700"
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

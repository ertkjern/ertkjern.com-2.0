import { Project as ProjectModel } from "@/sanity/sanity.types";
import { urlFor } from "@/utils/sanity";
import Image from "next/image";
import { FC, Fragment } from "react";

interface Props {
  project: ProjectModel;
  linkText: string;
}

export const Project: FC<Props> = ({ project, linkText }) => {
  const logoUrl = project.logo ? urlFor(project.logo)?.url() : "";

  return (
    <div key={project.title} className="flex flex-col mt-16">
      <div className="flex max-md:justify-center">
        <Image
          src={logoUrl ?? ""}
          alt={project.title ?? ""}
          width={159}
          height={157}
          className="object-contain w-1/3 max-md:place-content-center max-md:w-150"
        />
      </div>
      <h4 className="text-xl font-bold mt-4 mb-2">{project.title}</h4>
      <p>{project.description}</p>
      <ul className="list-none mt-4 flex items-center text-gray-700">
        {project.bulletPoints?.map((point, index) => (
          <Fragment key={point + index}>
            <li key={point}>
              <span>{point}</span>
              {index !== (project?.bulletPoints?.length ?? 0) - 1 && (
                <span className="mx-2 text-sm">•​​</span>
              )}
            </li>
          </Fragment>
        ))}
      </ul>
      {project.url && (
        <div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-700 border-b-2 border-blue-700"
          >
            {linkText}
          </a>
        </div>
      )}
    </div>
  );
};

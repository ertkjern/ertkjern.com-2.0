import { Project as ProjectModel } from "@/sanity/sanity.types";
import { urlFor } from "@/utils/sanity";
import { FC, Fragment } from "react";

interface Props {
  project: ProjectModel;
}

export const Project: FC<Props> = ({ project }) => {
  const logoUrl = project.logo ? urlFor(project.logo)?.url() : "";

  return (
    <div key={project.title} className="flex flex-col mt-16">
      <div className="flex max-md:justify-center">
        <img
          src={logoUrl}
          alt={project.title}
          className="object-contain w-1/3 max-md:place-content-center max-md:w-150"
        />
      </div>
      <h4 className="text-xl font-bold mt-4 mb-2">{project.title}</h4>
      <p>{project.description}</p>
      <ul className="list-none mt-4 flex items-center text-gray-500">
        {project.bulletPoints?.map((point, index) => (
          <Fragment key={point + index}>
            <li key={point}>{point}</li>
            {index !== (project?.bulletPoints?.length ?? 0) - 1 && (
              <span className="mx-2 text-sm">•​​</span>
            )}
          </Fragment>
        ))}
      </ul>
      {project.url && (
        <div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-blue-500 border-b-2 border-blue-500"
          >
            Read more
          </a>
        </div>
      )}
    </div>
  );
};

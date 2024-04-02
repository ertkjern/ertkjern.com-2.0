import { FC, Fragment } from "react";
import { Title } from "../atoms/title";
import { BlockContent, Project as ProjectModel } from "@/sanity/sanity.types";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/utils/sanity";
import { Project } from "../molecules/project";

interface Props {
  projects: ProjectModel[];
  projectsDescription: BlockContent;
}

export const Projects: FC<Props> = ({ projects, projectsDescription }) => {
  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-4">
      <div className="container mx-auto py-24">
        <Title tag="h3">Projects</Title>
        <div className="block-content">
          <PortableText value={projectsDescription} />
        </div>
        <div className="grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1">
          {projects?.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

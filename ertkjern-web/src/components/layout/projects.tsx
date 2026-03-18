import { FC, Fragment } from "react";
import { Title } from "../atoms/title";
import { BlockContent } from "@/sanity/sanity.types";
import { PortableText } from "@portabletext/react";
import { Project } from "../molecules/project";
import { useTranslations } from "next-intl";
import { HomeProject } from "@/sanity/queries";

interface Props {
  locale: string;
  projects: HomeProject[];
  projectsDescription: BlockContent;
}

export const Projects: FC<Props> = ({ locale, projects, projectsDescription, }) => {
  const projectPageI18n = useTranslations('projectPage');
  const headersI18n = useTranslations('headers');

  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-4">
      <div className="container mx-auto py-24">
        <Title tag="h3">{headersI18n('projects')}</Title>
        <div className="block-content">
          <PortableText value={projectsDescription} />
        </div>
        <div className="grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1">
          {projects?.map((project) => (
            <Project
              key={project._key ?? project.title}
              locale={locale}
              project={project}
              linkText={projectPageI18n('openAppPage')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

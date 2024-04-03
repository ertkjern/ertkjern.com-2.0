import {
  BlockContent,
  QuickFacts as QuickFactsModel,
  WorkAndEducation,
} from "@/sanity/sanity.types";
import { Title } from "../atoms/title";
import { PortableText } from "next-sanity";
import { FC } from "react";
import { Card } from "../atoms/card";
import { CVCardContent } from "../molecules/cv-card-content";
import { urlFor } from "@/utils/sanity";
import { QuickFacts } from "../molecules/quick-facts";

interface Props {
  introdution: BlockContent;
  quickFacts: QuickFactsModel[];
  workAndEducation: WorkAndEducation[];
}

export const CV: FC<Props> = ({
  introdution,
  quickFacts,
  workAndEducation,
}) => {
  const work = workAndEducation?.filter((item) => item.type === "work");
  const education = workAndEducation?.filter(
    (item) => item.type === "education"
  );

  return (
    <div className="container mx-auto">
      <Title tag="h3">Curriculum Vitae</Title>
      <div className="block-content">
        <PortableText value={introdution} />
      </div>
      <Title className="mt-16" tag="h4">General</Title>
      <div className="px-3">
        {quickFacts.map((item, index) => {
          return (
            <QuickFacts key={index} quickFact={item} />
          );
        })}
      </div>
      <Title className="mt-16" tag="h4">Work</Title>
      <div className="px-3 grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1">
        {work?.map((item, index) => {
          const imageUrl = item.image ? urlFor(item.image)?.url() : "";
          return (
            <Card key={index} className="min-h-64">
              <CVCardContent
                title={item.title ?? ""}
                description={item.description ?? ""}
                image={imageUrl ?? ""}
                startDate={item.startDate}
                toDate={item.endDate}
                url={item.url ?? ""}
              />
            </Card>
          );
        })}
      </div>
      <Title className="mt-16" tag="h4">Education</Title>
      <div className="grid gap-4 grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1">
        {education?.map((item, index) => {
          const imageUrl = item.image ? urlFor(item.image)?.url() : "";
          return (
            <Card key={index} className="min-h-64">
              <CVCardContent
                title={item.title ?? ""}
                description={item.description ?? ""}
                image={imageUrl ?? ""}
                startDate={item.startDate}
                toDate={item.endDate}
                url={item.url ?? ""}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

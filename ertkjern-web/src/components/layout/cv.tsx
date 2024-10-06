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
import { useTranslations } from "next-intl";

interface Props {
  introdution: BlockContent;
  quickFacts: QuickFactsModel[];
  workAndEducation: WorkAndEducation[];
  locale: 'en' | 'no';
}

export const CV: FC<Props> = ({
  introdution,
  quickFacts,
  workAndEducation,
  locale,
}) => {
  const headersI18n = useTranslations('headers');
  const generalI18n = useTranslations('general');

  const work = workAndEducation?.filter((item) => item.type === "work");
  const education = workAndEducation?.filter(
    (item) => item.type === "education"
  );

  return (
    <div className="container mx-auto">
      <Title tag="h3">{headersI18n('curriculumVitae')}</Title>
      <div className="block-content">
        <PortableText value={introdution} />
      </div>
      <Title className="mt-16" tag="h4">{headersI18n('general')}</Title>
      <div className="px-3">
        {quickFacts.map((item, index) => {
          return (
            <QuickFacts key={index} quickFact={item} />
          );
        })}
      </div>
      <Title className="mt-16" tag="h4">{headersI18n('work')}</Title>
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
                linkText={generalI18n('visitWebsite')}
                startingText={generalI18n('starting')}
                locale={locale}
              />
            </Card>
          );
        })}
      </div>
      <Title className="mt-16" tag="h4">{headersI18n('education')}</Title>
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
                linkText={generalI18n('visitWebsite')}
                startingText={generalI18n('starting')}
                locale={locale}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

import { FC } from "react";
import { Title } from "../atoms/title";
import { PortableText } from "@portabletext/react";
import { BlockContent } from "@/sanity/sanity.types";
import { useTranslations } from "next-intl";

interface Props {
  body: BlockContent;
}

export const About: FC<Props> = ({ body }) => {
  const t = useTranslations('headers');
  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-4">
      <div className="container mx-auto py-24">
        <Title tag="h3">{t('about')}</Title>
        <div className="block-content">
          <PortableText value={body} />
        </div>
      </div>
    </div>
  );
};

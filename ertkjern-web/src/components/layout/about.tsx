import { FC } from "react";
import { Title } from "../atoms/title";
import { PortableText } from "@portabletext/react";
import { BlockContent } from "@/sanity/sanity.types";

interface Props {
  title: string;
  body: BlockContent;
}

export const About: FC<Props> = ({ title, body }) => {
  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-4">
      <div className="container mx-auto py-24">
        <Title tag="h3">About me</Title>
        <div className="block-content">
          <PortableText value={body} />
        </div>
      </div>
    </div>
  );
};

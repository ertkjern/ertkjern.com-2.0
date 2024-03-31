import { FC } from "react";
import { Title } from "../atoms/title";
import { PortableText } from "@portabletext/react";

interface Props {
  title: string;
  body: any[];
}

export const About: FC<Props> = ({title, body}) => {
  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-8">
      <div className="container mx-auto py-24">
        <Title tag="h3">About me</Title>
        <div className="block-content py-8 text-lg px-3">
            <PortableText value={body} />
        </div>
      </div>
    </div>
  );
};

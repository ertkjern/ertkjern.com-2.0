import { FC } from "react";
import { Title } from "../atoms/title";

interface Props {
  
}

export const Projects: FC<Props> = ({ }) => {
  return (
    <div className="bg-secondary-bg-gray w-full max-md:px-4">
      <div className="container mx-auto py-24">
        <Title tag="h3">Projects</Title>
        
      </div>
    </div>
  );
};

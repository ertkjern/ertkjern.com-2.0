import { Children, FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card: FC<Props> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-primary rounded-lg p-4 transition duration-500 transform scale-101-3d hover:cursor-pointer hover:shadow-hover ${className}`}
    >
      {children}
    </div>
  );
};

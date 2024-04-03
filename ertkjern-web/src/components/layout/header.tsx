import Image from "next/image";
import { FC } from "react";


interface Props {
    name: string;
    title: string;
    profileImage?: string | null;
}

export const Header: FC<Props> = ({
    name,
    title,
    profileImage
  }) => {  
    return (
      <div className="container mx-auto flex items-center justify-evenly h-screen max-lg:flex-wrap max-lg:flex-col-reverse max-lg:justify-center max-lg:gap-20">
        <div className="flex flex-col justify-center text-center gap-3 max-lg:gap-8 max-sm:gap-4 max-sm:mx-4">
          <h1 className="text-7xl px-16 font-light max-sm:px-0 max-sm:text-5xl">{name}</h1>
          <h2 className="text-3xl px-16 font-light max-sm:px-0 max-sm:text-3xl">{title}</h2>
          <div className="border-b-4 border-indigo-200 my-4 max-sm:my-1"></div>
          <nav className="flex justify-center gap-16">
            <a href="#about" className="text-xl text-blue-500 pb-1 border-b-2 border-blue-500">
              About
            </a>
            <a href="#cv" className="text-xl text-blue-500 pb-1 border-b-2 border-blue-500">
              CV
            </a>
            <a href="#projects" className="text-xl	text-blue-500 pb-1 border-b-2 border-blue-500">
              Project
            </a>
          </nav>
        </div>
        <div>
          <Image
            alt="Image"
            className="rounded-full object-cover object-center shadow-primary w-96 h-96 max-md:w-60 max-md:h-60 max-sm:w-48 max-sm:h-48"
            src={profileImage ?? ''}
            width={300}
            height={300}
          />
        </div>
      </div>

    );
};

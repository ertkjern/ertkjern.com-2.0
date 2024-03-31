import { ReactNode, FC } from "react";

interface Props {
    children: ReactNode;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title: FC<Props> = ({
    children,
    tag
}) => {
    const HeadingTag = tag as React.ElementType;

    //A dd background color to h3 and h4
    let bgColor = '';
    if(tag === 'h3') bgColor = 'after:bg-indigo-200';
    if(tag === 'h4') bgColor = 'after:bg-green-200';

    return (
        <div className="relative w-fit text-3xl font-semibold z-0">
            <HeadingTag className={`border-b-2 border-black title-after ${bgColor}`}>{children}</HeadingTag>
        </div>
    );
}

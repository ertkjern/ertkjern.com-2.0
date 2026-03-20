import { ReactNode, FC } from "react";

interface Props {
    children: ReactNode;
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

export const Title: FC<Props> = ({
    children,
    tag,
    className = '',
}) => {
    const HeadingTag = tag as React.ElementType;

    let titleAfterBg = '#D4D4FF';
    if(tag === 'h4') titleAfterBg = '#D4FFED';

    return (
        <div className={`relative w-fit text-3xl font-semibold z-0 my-8 ${className}`}>
            <HeadingTag
                className="border-b-2 border-black title-after"
                style={{ ['--title-after-bg' as string]: titleAfterBg }}
            >
                {children}
            </HeadingTag>
        </div>
    );
}

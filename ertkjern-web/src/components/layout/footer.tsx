import { useTranslations } from "next-intl";
import { FC } from "react";

interface FooterProps {
    title: string;
    email: string;    
}

export const Footer: FC<FooterProps> = ({ title, email}) => {
    const t = useTranslations('general');
    return (
        <footer className="w-full bg-h3-bg py-40 flex items-center flex-col">
            <h2 className="text-5xl mb-4 font-light">{title}</h2>
            <h3 className="text-2xl font-light">{t('reachOut')} {email}</h3>
        </footer>
    )
}
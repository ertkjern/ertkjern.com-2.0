'use client';

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  currentLanguage: string;
  href: string;
}

export const LanguagePicker: FC<Props> = ({ currentLanguage, href }) => {
  const userCanSwapTo = currentLanguage === "en" ? "no" : "en";
  const t = useTranslations('language');

  return (
    <Link
      href={href}
      locale={userCanSwapTo}
      className="absolute p-2 flex center-content"
    >
      <span className="material-symbols-outlined mr-2">language</span>
      {currentLanguage === "en" ? t("toNorwegian") : t("toEnglish")}
    </Link>
  );
};

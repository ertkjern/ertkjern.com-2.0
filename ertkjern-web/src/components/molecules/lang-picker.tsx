import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

interface Props {
  currentLanguage: String;
}

export const LanguagePicker: FC<Props> = ({ currentLanguage }) => {
  const userCanSwapTo = currentLanguage === "en" ? "no" : "en";
  const t = useTranslations('language');
  return (
    <Link href={`./${userCanSwapTo}`} className="absolute p-2 flex center-content">
      <span className="material-symbols-outlined mr-2">language</span>
      {currentLanguage === "en" ? t("toNorwegian") : t("toEnglish")}
    </Link>
  );
};

import { QuickFacts as QuickFactsModel } from "@/sanity/sanity.types";
import { FC, Fragment } from "react";

interface Props {
  quickFact: QuickFactsModel;
}

const isLastElement = (index: number, length?: number) =>
  index === (length ?? 0) - 1;

export const QuickFacts: FC<Props> = ({ quickFact }) => {
  return (
    <div className="flex items-start gap-7 mb-6">
      <span className="material-symbols-outlined text-4xl">
        {quickFact.icon}
      </span>
      <div className="text-lg flex flex-col">
        {quickFact.facts?.map((fact, index) => (
          <p key={index} className="pt-1 max-sm:mb-4">
            {fact.facts?.map((f, index) => {
              const title =
                ((quickFact.facts?.length ?? 0) > 1 && index === 0) ? (
                  <strong className="mr-3 max-sm:block">{fact.title}:</strong>
                ) : null;
              return (
                <Fragment key={`${f+index}`}>
                  {title}
                  <span>{`${f}${
                    isLastElement(index, fact.facts?.length) ? "" : ", "
                  }`}</span>
                </Fragment>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
};

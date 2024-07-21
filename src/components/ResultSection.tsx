"use client";
import { useMapCalculation } from "@/hooks/useMapCalculation";
import { useTextAreaContext } from "@/providers/TextAreaProvider";

export function ResultsSection() {
  const { textareaValue } = useTextAreaContext();
  const result = useMapCalculation(textareaValue);
  //   const { path, letters } = result;

  return (
    <div className="flex flex-col items-start justify-start w-full pl-8">
      {result && (
        <>
          <p>Results:</p>
          {result}
          <div>
            Letters: <span data-testid="letters">{"letters"}</span>
            <p>
              Path as characters: <span data-testid="path">{"path"}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

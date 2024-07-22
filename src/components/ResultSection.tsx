"use client";
import { useMapCalculation } from "@/hooks/useMapCalculation";
import { useTextAreaContext } from "@/providers/TextAreaProvider";

export function ResultsSection() {
  const { textareaValue } = useTextAreaContext();
  console.log(textareaValue);
  const { result, error } = useMapCalculation(textareaValue);

  return (
    <div className="flex flex-col items-start justify-start w-full pl-8">
      {error && (
        <div>
          <span data-testid="error">{error.message}</span>
        </div>
      )}
      {!error && result && (
        <>
          <p>Results:</p>
          <div>
            Letters: <span data-testid="letters">{result.letters}</span>
            <p>
              Path as characters: <span data-testid="path">{result.path}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

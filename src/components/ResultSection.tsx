"use client";
import { useGridCalculation } from "@/hooks/useGridCalculation";
import { useTextAreaContext } from "@/providers/TextAreaProvider";

export function ResultSection() {
  const { textareaValue } = useTextAreaContext();
  const { result, error } = useGridCalculation(textareaValue);
  if (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col items-start justify-start w-full p-8">
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

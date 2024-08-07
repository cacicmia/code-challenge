import { EMPTY_RETURN } from "@/app/services/constants";
import { gridHandler } from "@/app/services/gridHandler";
import { ResultType } from "@/types/GridTypes";
import { GridValidationError } from "@/types/ValidationError";
import { useEffect, useState } from "react";

export function useGridCalculation(textareaValue: string): {
  result: ResultType | null;
  error: GridValidationError | Error | null;
} {
  const [value, setValue] = useState<ResultType>(EMPTY_RETURN);
  const [error, setError] = useState<GridValidationError | null>(null);

  useEffect(() => {
    setValue(EMPTY_RETURN);
    setError(null);
    try {
      const result = gridHandler(textareaValue);
      setValue(result);
    } catch (error: unknown) {
      if (error instanceof GridValidationError) {
        setError(error);
      }
    }
  }, [textareaValue, setValue, setError]);
  return { result: value, error };
}

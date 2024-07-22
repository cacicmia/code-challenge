import { EMPTY_RETURN } from "@/app/services/mapHandler/constants";
import { mapHandler } from "@/app/services/mapHandler/mapHandler";
import { MapValidationError } from "@/types/ValidationError";
import { useEffect, useState } from "react";

export function useMapCalculation(textareaValue: string): {
  result: MapResultType | null;
  error: MapValidationError | Error | null;
} {
  const [value, setValue] = useState<MapResultType>(EMPTY_RETURN);
  const [error, setError] = useState<MapValidationError | null>(null);

  useEffect(() => {
    setValue(EMPTY_RETURN);
    setError(null);
    try {
      const result = mapHandler(textareaValue);
      setValue(result);
    } catch (error: unknown) {
      if (error instanceof MapValidationError) {
        setError(error);
      }
    }

    return () => {};
  }, [textareaValue]);
  return { result: value, error };
}

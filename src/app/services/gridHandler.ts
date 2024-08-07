import { validateTextarea } from "./validation/validateTextarea";
import { EMPTY_RETURN } from "./constants";
import { getGridPathSigns } from "./gridHandlers/getGridPathSigns";
import { getPath } from "./gridHandlers/getPath";
import { getLetters } from "./gridHandlers/getLetters";

export function gridHandler(input: string) {
  if (!input) {
    return EMPTY_RETURN;
  }
  validateTextarea(input);
  const pathWithValues = getGridPathSigns(input);
  const path = getPath(pathWithValues);
  const letters = getLetters(pathWithValues);

  return { path, letters };
}

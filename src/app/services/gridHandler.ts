import { validateTextarea } from "./validation/validateTextarea";
import { EMPTY_RETURN } from "./constants";
import { getGridPathSigns } from "./gridHandlers/getGridPathSigns";
import { getPath } from "./gridHandlers/getPath";
import { getLetters } from "./gridHandlers/getLetters";
import { mapInputToGrid } from "./mapInputToGrid";

export function gridHandler(input: string) {
  if (!input) {
    return EMPTY_RETURN;
  }
  validateTextarea(input);

  const grid = mapInputToGrid(input);
  const pathWithValues = getGridPathSigns(grid);
  const path = getPath(pathWithValues);
  const letters = getLetters(pathWithValues);

  return { path, letters };
}

import { GridErrorMessage } from "@/types/GridErrorMessage";
import { GridValidationError } from "@/types/ValidationError";
import { START_CHAR } from "../constants";
import { CharData } from "@/types/CharTypes";

export function getStartingChar(grid: string[][]): CharData {
  let y = 0;
  for (const row of grid) {
    const x = row.indexOf(START_CHAR);
    if (x !== -1) {
      return {
        coordinates: { x, y },
        char: START_CHAR,
      };
    }
    y++;
  }
  throw new GridValidationError(GridErrorMessage.MISSING_START_SIGN_CHARACTER);
}

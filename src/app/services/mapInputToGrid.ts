import { GridErrorMessage } from "@/types/GridErrorMessage";
import { GridValidationError } from "@/types/ValidationError";

export function mapInputToGrid(input: string): string[][] {
  try {
    const rows = input.split("\n");
    return rows.map((row) => row.split(""));
  } catch (e) {
    throw new GridValidationError(GridErrorMessage.UNRECOGNIZABLE_INPUT);
  }
}

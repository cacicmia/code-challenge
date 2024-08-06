import { MapErrorMessage } from "@/types/MapErrorMessage";
import { MapValidationError } from "@/types/ValidationError";

export function mapInputToArray(input: string): string[][] {
  try {
    const singleArray = input.split("\n");
    return singleArray.map((element) => element.split(""));
  } catch (e) {
    throw new MapValidationError(MapErrorMessage.UNRECOGNIZABLE_INPUT);
  }
}

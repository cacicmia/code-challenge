import { CharCoordinates, CharData } from "@/types/mapCharTypes";
import { MapErrorMessage } from "@/types/MapErrorMessage";
import { MapValidationError } from "@/types/ValidationError";

export function getFirstChar(grid: string[][]): CharData {
  let coordinates: CharCoordinates | undefined;
  grid.forEach((rowArray, y) => {
    const x = rowArray.indexOf("@");
    if (x >= 0) {
      coordinates = { x, y };
      return;
    }
  });
  if (!coordinates) {
    if (!coordinates) {
      throw new MapValidationError(
        MapErrorMessage.MISSING_START_SIGN_CHARACTER
      );
    }
  }
  const firstCharData: CharData = {
    coordinates,
    value: "@",
  };
  return firstCharData;
}

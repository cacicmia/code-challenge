import {
  CharCoordinates,
  CharData,
  Direction,
  Offset,
} from "@/types/mapCharTypes";
import { getFirstChar } from "./getFirstChar";
import { mapInputToArray } from "./mapInputToArray";
import {
  filterOutPreviousCharacter,
  getDirection,
  getNextOffset,
} from "./charHandlerFunctions";
import { MapValidationError } from "@/types/ValidationError";
import { getSurroundingCharacters } from "./getSurroundingCharacters";
import { MapErrorMessage } from "@/types/MapErrorMessage";

export function getMapPathSigns(input: string): CharData[] {
  const grid = mapInputToArray(input);
  const firstCharData = getFirstChar(grid);
  const pathWithData: CharData[] = [firstCharData];

  let direction: Direction;
  let nextOffset: Offset | undefined;
  try {
    while (pathWithData[pathWithData.length - 1].value !== "x") {
      const currentChar = pathWithData[pathWithData.length - 1];

      const currentCoordinates = currentChar.coordinates;

      const previousCoordinates =
        pathWithData[pathWithData.length - 2]?.coordinates;

      const surroundingCharacters = getSurroundingCharacters(
        grid,
        currentCoordinates
      );
      const nextPossibilities = filterOutPreviousCharacter(
        surroundingCharacters,
        previousCoordinates
      );

      let nextCoordinates: CharCoordinates | undefined;
      const isLetterOnTurn =
        nextPossibilities.length === 1 && currentChar.value.match(/[A-Z]/g);

      if (direction === undefined || isLetterOnTurn) {
        nextCoordinates = nextPossibilities[0];
        direction = currentCoordinates.x === nextCoordinates.x ? "y" : "x";
      } else {
        nextCoordinates = nextPossibilities?.find((posibilityCoordinates) => {
          if (nextOffset) {
            return (
              posibilityCoordinates[direction as "x" | "y"] ===
              currentCoordinates[direction as "x" | "y"] + nextOffset!
            );
          } else {
            return (
              posibilityCoordinates[direction as "x" | "y"] ===
                currentCoordinates[direction as "x" | "y"] + 1 ||
              posibilityCoordinates[direction as "x" | "y"] ===
                currentCoordinates[direction as "x" | "y"] - 1
            );
          }
        });
      }

      if (!nextCoordinates) {
        throw new MapValidationError(MapErrorMessage.BROKEN_PATH);
        // throw new MapValidationError(MapErrorMessage.FORK_IN_PATH);
      }
      const value = grid[nextCoordinates.y][nextCoordinates.x];

      direction = getDirection(value, direction);
      pathWithData.push({
        coordinates: nextCoordinates,
        value,
      });

      nextOffset = getNextOffset(
        direction,
        currentCoordinates,
        nextCoordinates
      );
    }
  } catch (e: any) {
    throw new MapValidationError(e?.message || JSON.stringify(e));
  }
  return pathWithData;
}

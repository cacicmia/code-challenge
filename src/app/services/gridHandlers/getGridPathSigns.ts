import { mapInputToGrid } from "../mapInputToGrid";
import { GridValidationError } from "@/types/ValidationError";
import { getSurroundingCharacters } from "../charHandlers/getSurroundingCharacters";
import { GridErrorMessage } from "@/types/GridErrorMessage";
import { filterOutPreviousCharacter } from "../charHandlers/filterOutPreviousCharacter";
import { getNextOffset } from "../charHandlers/getNextOffset";
import { getDirection } from "../charHandlers/getDirection";
import { getStartingChar } from "../charHandlers/getStartingChar";
import { END_CHAR } from "../constants";
import { CharData, CharCoordinates } from "@/types/CharTypes";
import { Direction, Offset } from "@/types/GridTypes";

export function getGridPathSigns(input: string): CharData[] {
  const grid = mapInputToGrid(input);
  const firstCharData = getStartingChar(grid);
  const pathWithData: CharData[] = [firstCharData];

  let direction: Direction;
  let nextOffset: Offset | undefined;
  try {
    while (pathWithData[pathWithData.length - 1].char !== END_CHAR) {
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
        nextPossibilities.length === 1 && currentChar.char.match(/[A-Z]/g);

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
        throw new GridValidationError(GridErrorMessage.BROKEN_PATH);
      }
      const char = grid[nextCoordinates.y][nextCoordinates.x];

      direction = getDirection(char, direction);
      pathWithData.push({
        coordinates: nextCoordinates,
        char,
      });

      nextOffset = getNextOffset(
        direction,
        currentCoordinates,
        nextCoordinates
      );
    }
  } catch (e: any) {
    throw new GridValidationError(e?.message || JSON.stringify(e));
  }
  return pathWithData;
}

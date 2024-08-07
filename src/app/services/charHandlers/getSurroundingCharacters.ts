import { GridValidationError } from "@/types/ValidationError";
import { GridErrorMessage } from "@/types/GridErrorMessage";
import { CharCoordinates } from "@/types/CharTypes";

export type CharacterLookupFunction = (
  x: number,
  y: number,
  lengthX: number,
  lengthY: number
) => CharCoordinates[] | [];

export function getSurroundingCharacters(
  grid: string[][],
  lastAddedCharCoordinates: CharCoordinates
): CharCoordinates[] {
  const { lengthX, lengthY } = getGridDimensions(grid);
  const { x, y } = lastAddedCharCoordinates;
  const possibleNextChars = [horizontalLookup, verticalLookup]
    ?.map((fn) => (fn.length > 0 ? fn(x, y, lengthX, lengthY) : []))
    .flat();
  const nextCoordinates = possibleNextChars?.filter((option) => {
    const nextValue = grid[option.y][option.x];
    if (!nextValue || nextValue === " ") {
      return false;
    }
    return true;
  });
  if (nextCoordinates.length === 0) {
    throw new GridValidationError(GridErrorMessage.BROKEN_PATH);
  }

  return nextCoordinates;
}

export function getGridDimensions(grid: string[][]) {
  const lengthY: number = grid.length - 1;
  const lengthX: number =
    (grid
      .map((row) => row.length)
      .sort((a, b) => b - a)[0] as unknown as number) - 1;
  return { lengthX, lengthY };
}

export const horizontalLookup: CharacterLookupFunction = (
  x: number,
  y: number,
  lengthX: number,
  lengthY: number
) => [
  ...(x > 0 ? [{ y, x: x - 1 }] : []),
  ...(x < lengthX ? [{ y, x: x + 1 }] : []),
];

export const verticalLookup: CharacterLookupFunction = (
  x: number,
  y: number,
  lengthX: number,
  lengthY: number
): CharCoordinates[] => [
  ...(y > 0 ? [{ y: y - 1, x }] : []),
  ...(y < lengthY ? [{ y: y + 1, x }] : []),
];

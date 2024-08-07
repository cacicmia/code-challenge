import { CharCoordinates } from "@/types/CharTypes";

export function filterOutPreviousCharacter(
  nextPossibilities: CharCoordinates[],
  prevCoordinates?: CharCoordinates
): CharCoordinates[] {
  if (!prevCoordinates) return nextPossibilities;
  return nextPossibilities.filter(
    (nextCoordinates) =>
      !(
        nextCoordinates.x === prevCoordinates.x &&
        nextCoordinates.y === prevCoordinates.y
      )
  );
}

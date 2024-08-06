import { CharCoordinates, Direction, Offset } from "@/types/mapCharTypes";

export function getDirection(sign: string, previousDirection: Direction) {
  if (previousDirection === undefined) {
    return previousDirection;
  }
  switch (sign) {
    case "+":
      return previousDirection === "x" ? "y" : "x";
    default:
      return previousDirection;
  }
}
export function getNextOffset(
  direction: Direction,
  currentCoordinates: CharCoordinates,
  nextCoordinates: CharCoordinates
) {
  if (!direction) {
    return undefined;
  }
  return direction === "y"
    ? ((nextCoordinates.y - currentCoordinates.y) as Offset)
    : ((nextCoordinates.x - currentCoordinates.x) as Offset);
}

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

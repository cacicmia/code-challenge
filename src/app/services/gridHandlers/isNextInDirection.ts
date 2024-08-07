import { CharCoordinates } from "@/types/CharTypes";
import { Direction, Offset } from "@/types/GridTypes";

export function isNextInDirection(
  char: CharCoordinates,
  currentCoords: CharCoordinates,
  direction: Direction,
  nextOffset?: Offset
): boolean {
  const coordValue = currentCoords[direction as "x" | "y"];
  return nextOffset
    ? char[direction as "x" | "y"] === coordValue + nextOffset
    : char[direction as "x" | "y"] === coordValue + 1 ||
        char[direction as "x" | "y"] === coordValue - 1;
}

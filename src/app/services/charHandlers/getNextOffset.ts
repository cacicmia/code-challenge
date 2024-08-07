import { CharCoordinates } from "@/types/CharTypes";
import { Direction, Offset } from "@/types/GridTypes";

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

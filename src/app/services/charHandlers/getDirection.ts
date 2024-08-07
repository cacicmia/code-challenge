import { Direction } from "@/types/GridTypes";
import { TURN_CHAR } from "../constants";

export function getDirection(sign: string, previousDirection: Direction) {
  if (previousDirection === undefined) {
    return previousDirection;
  }
  switch (sign) {
    case TURN_CHAR:
      return previousDirection === "x" ? "y" : "x";
    default:
      return previousDirection;
  }
}

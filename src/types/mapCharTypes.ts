export interface CharCoordinates {
  x: number;
  y: number;
}
export interface CharData {
  coordinates: CharCoordinates;
  value: string;
}
export interface MapResultType {
  letters: string;
  path: string;
}
export type Direction = "y" | "x" | undefined;
export type Offset = 1 | -1;

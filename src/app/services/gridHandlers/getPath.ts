import { CharData } from "@/types/CharTypes";

export function getPath(pathWithValues: CharData[]) {
  if (pathWithValues?.length === 0) {
    return "";
  }

  return pathWithValues.map((element: CharData) => element.char).join("");
}

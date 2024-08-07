import { CharData } from "@/types/CharTypes";

export function getLetters(pathWithValues: CharData[]) {
  const pathWithComparableValues = pathWithValues.map((obj: CharData) =>
    JSON.stringify(obj)
  );
  const pathWithUniqueValues = new Set<string>(pathWithComparableValues);
  if (pathWithUniqueValues.size === 0) {
    return "";
  }

  return Array.from(pathWithUniqueValues)
    .map((obj: string) => JSON.parse(obj))
    .map((element: CharData) => element.char)
    .filter((element: string) => element.match(/[A-Z]/g))
    .join("");
}

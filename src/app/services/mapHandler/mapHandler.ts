import { MapValidationError } from "@/types/ValidationError";
import { validateTextarea } from "../validation/validateTextarea";
import { EMPTY_RETURN } from "./constants";
import { mapInputToArray } from "./mapInputToArray";
import { CharData } from "@/types/mapCharTypes";
import { getFirstChar } from "./getFirstChar";
// import { getMapPathSigns } from "./getMapPath";
import { getMapPathSigns } from "./getMapPathSigns";

export function mapHandler(input: string) {
  if (!input) {
    return EMPTY_RETURN;
  }
  validateTextarea(input);
  const orderedObjects = getMapPathSigns(input);
  const path = orderedObjects?.length
    ? orderedObjects.map((element: CharData) => element.value).join("")
    : "";
  const orderedObjectsInJson = orderedObjects.map((obj: CharData) =>
    JSON.stringify(obj)
  );
  const orderedObjectsSet = new Set<string>(orderedObjectsInJson);
  const letters = orderedObjectsSet.size
    ? //@ts-ignore @TODO
      Array.from(orderedObjectsSet)
        .map((obj: string) => JSON.parse(obj))
        .map((element: CharData) => element.value)
        .filter((element: string) => element.match(/[A-Z]/g))
        .join("")
    : "";

  return { path, letters };
}

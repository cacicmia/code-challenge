import { validateTextarea } from "../validation/validateTextarea";
import { EMPTY_RETURN } from "./constants";

export function mapHandler(input: string) {
  if (!input) {
    return EMPTY_RETURN;
  }
  validateTextarea(input);
  return EMPTY_RETURN;
}

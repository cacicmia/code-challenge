import { GridErrorMessage } from "@/types/GridErrorMessage";
import { GridValidationError } from "@/types/ValidationError";

export function validateTextarea(input: string): void {
  checkUnallowedCharacters(input);
  checkStartCharacter(input);
  checkEndCharacter(input);
  return;
}
function checkUnallowedCharacters(input: string): void {
  const invalidCharacters = input.match(/[^x|\-+@A-Z \n]/g);
  if (invalidCharacters && invalidCharacters.length > 0) {
    throw new GridValidationError(GridErrorMessage.UNALLOWED_CHARACTERS);
  }
}
function checkStartCharacter(input: string): void {
  const startCount = input.match(/@/g)?.length || 0;
  if (startCount === 0) {
    throw new GridValidationError(
      GridErrorMessage.MISSING_START_SIGN_CHARACTER
    );
  }
  if (startCount > 1) {
    throw new GridValidationError(
      GridErrorMessage.MULTIPLE_START_SIGN_APPEARANCES
    );
  }
}
function checkEndCharacter(input: string): void {
  const xCount = input.match(/x/g)?.length || 0;

  if (xCount === 0) {
    throw new GridValidationError(GridErrorMessage.MISSING_END_SIGN_CHARACTER);
  }
  if (xCount > 1) {
    throw new GridValidationError(
      GridErrorMessage.MULTIPLE_END_SIGN_APPEARANCES
    );
  }
}

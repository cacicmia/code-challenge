export enum MapErrorMessage {
  UNALLOWED_CHARACTERS = "Unallowed characters used",
  MISSING_START_SIGN_CHARACTER = "Missing start sign @",
  MULTIPLE_START_SIGN_APPEARANCES = "Multiple start sign appearances",
  MULTIPLE_END_SIGN_APPEARANCES = "Multiple end sign appearances",
  MISSING_END_SIGN_CHARACTER = "Missing end sign x",
  BROKEN_PATH = "Broken path",
  FAKE_TURN = "Fake turn after + sign",
  FORK_IN_PATH = "Fork in the path present", // ??
  UNRECOGNIZABLE_INPUT = "Unrecognizable input",
}

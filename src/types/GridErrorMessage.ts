import { END_CHAR, START_CHAR, TURN_CHAR } from "@/app/services/constants";

export enum GridErrorMessage {
  UNALLOWED_CHARACTERS = "Unallowed characters used",
  MISSING_START_SIGN_CHARACTER = `Missing start sign ${START_CHAR}`,
  MULTIPLE_START_SIGN_APPEARANCES = `Multiple start sign ${START_CHAR} appearances`,
  MULTIPLE_END_SIGN_APPEARANCES = `Multiple end sign ${END_CHAR} appearances`,
  MISSING_END_SIGN_CHARACTER = `Missing end sign ${END_CHAR}`,
  BROKEN_PATH = "Broken path",
  FAKE_TURN = `Fake turn after ${TURN_CHAR} sign`,
  FORK_IN_PATH = "Fork in the path present",
  UNRECOGNIZABLE_INPUT = "Unrecognizable input",
}

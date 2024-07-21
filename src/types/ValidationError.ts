export class MapValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MapValidationError";
  }
}

export class GridValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GridValidationError";
  }
}

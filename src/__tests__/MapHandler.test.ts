import { mapHandler } from "@/app/service/mapHandler";
import { MapValidationError } from "@/types/ValidationError";

describe("valid maps tests", () => {
  it("should return empty value when provided with an empty value", () => {
    const { path, letters } = mapHandler("");

    expect(path).toBe("");
    expect(letters).toBe("");
  });

  it("should return the expected result for the basic example", () => {
    const { path, letters } = mapHandler(
      `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+`
    );

    expect(letters).toBe("ACB");
    expect(path).toBe("@---A---+|C|+---+|+-B-x");
  });

  it("should go straight through the intersections", () => {
    const { path, letters } = mapHandler(
      `
      @
      | +-C--+
      A |    |
      +---B--+
        |      x
        |      |
        +---D--+`
    );

    expect(letters).toBe("ABCD");
    expect(path).toBe("@|A+---B--+|+--C-+|-||+---D--+|x");
  });

  it("should be able to find letters on turns", () => {
    const { path, letters } = mapHandler(
      `
      @---A---+
              |
      x-B-+   |
          |   |
          +---C`
    );

    expect(letters).toBe("ACB");
    expect(path).toBe("@---A---+|||C---+|+-B-x");
  });

  it("shouldn't collect a letter twice", () => {
    const { path, letters } = mapHandler(
      `
      +-O-N-+
      |     |
      |   +-I-+
  @-G-O-+ | | |
      | | +-+ E
      +-+     S
              |
              x`
    );

    expect(letters).toBe("GOONIES");
    expect(path).toBe("@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x");
  });

  it("should keep direction in compact space", () => {
    const { path, letters } = mapHandler(
      `
      +-L-+
      |  +A-+
     @B+ ++ H
      ++    x
     `
    );

    expect(letters).toBe("BLAH");
    expect(path).toBe("@B+++B|+-L-+A+++A-+Hx");
  });

  it("should ignore the stuff after the end of path", () => {
    const { path, letters } = mapHandler(
      `
      @-A--+
           |
           +-B--x-C--D`
    );

    expect(letters).toBe("AB");
    expect(path).toBe("@-A--+|+-B--x");
  });
});
describe("invalid maps", () => {
  it("should fail when missing start character", () => {
    expect(() =>
      mapHandler(
        `
     -A---+
          |
  x-B-+   C
      |   |
      +---+
`
      )
    ).toThrow(MapValidationError);
  });
  it("should fail when missing end character", () => {
    expect(() =>
      mapHandler(
        `
   @--A---+
          |
    B-+   C
      |   |
      +---+
`
      )
    ).toThrow(MapValidationError);
  });

  it("should fail when having multiple start characters", () => {
    expect(() =>
      mapHandler(
        `
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
`
      )
    ).toThrow(MapValidationError);
  });

  it("should fail when having fork in the path", () => {
    expect(() =>
      mapHandler(
        `
        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+

`
      )
    ).toThrow(MapValidationError);
  });

  it("should fail when having a broken path", () => {
    expect(() =>
      mapHandler(
        `
   @--A-+
        |
         
        B-x
`
      )
    ).toThrow(MapValidationError);
  });

  it("should fail when having multiple starting paths", () => {
    expect(() =>
      mapHandler(
        `
   @--A-+
        |
         
        B-x
`
      )
    ).toThrow(MapValidationError);
  });

  it("should fail when having a fake turn", () => {
    expect(() =>
      mapHandler(
        `
      @-A-+-B-x

`
      )
    ).toThrow(MapValidationError);
  });
});

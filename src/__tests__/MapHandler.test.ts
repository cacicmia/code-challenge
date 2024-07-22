import { mapHandler } from "@/app/service/mapHandler";
import { MapValidationError } from "@/types/ValidationError";
const successScenarios = [
  {
    name: "should return empty value when provided with an empty value",
    input: "",
    result: {
      path: "",
      letters: "",
    },
  },
  {
    name: "should return the expected result for the basic example",
    input: `
    @---A---+
            |
    x-B-+   C
        |   |
        +---+`,
    result: {
      letters: "ACB",
      path: "@---A---+|C|+---+|+-B-x",
    },
  },

  {
    name: "should go straight through the intersections",
    input: `
    @
    | +-C--+
    A |    |
    +---B--+
      |      x
      |      |
      +---D--+`,
    result: {
      letters: "ABCD",
      path: "@|A+---B--+|+--C-+|-||+---D--+|x",
    },
  },

  {
    name: "should be able to find letters on turns",
    input: `
      @---A---+
              |
      x-B-+   |
          |   |
          +---C`,
    result: {
      letters: "ACB",
      path: "@---A---+|||C---+|+-B-x",
    },
  },

  {
    name: "shouldn't collect a letter twice",
    input: `
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x`,
    result: {
      letters: "GOONIES",
      path: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
    },
  },
  {
    name: "should keep direction in compact space",
    input: `
    +-L-+
    |  +A-+
   @B+ ++ H
    ++    x
   `,
    result: {
      letters: "BLAH",
      path: "@B+++B|+-L-+A+++A-+Hx",
    },
  },
  {
    name: "should ignore the stuff after the end of path",
    input: `
    @-A--+
         |
         +-B--x-C--D`,
    result: {
      letters: "AB",
      path: "@-A--+|+-B--x",
    },
  },
];
describe.each(successScenarios)("valid maps tests", (scenario) => {
  it(scenario.name, () => {
    const { path, letters } = mapHandler(scenario.input);

    expect(path).toBe(scenario.result.path);
    expect(letters).toBe(scenario.result.letters);
  });
});

const failedScenarios = [
  {
    name: "should fail when missing start character",
    input: `
    -A---+
         |
 x-B-+   C
     |   |
     +---+
`,
  },
  {
    name: "should fail when missing end character",
    input: `
    @--A---+
           |
     B-+   C
       |   |
       +---+
 `,
  },

  {
    name: "should fail when having multiple start characters",
    input: `
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
`,
  },
  {
    name: "should fail when having fork in the path",
    input: `
    x-B
      |
@--A---+
      |
 x+   C
  |   |
  +---+

`,
  },
  {
    name: "should fail when having a broken path",
    input: `
    @--A-+
         |
          
         B-x
 `,
  },
  {
    name: "should fail when having multiple end paths",
    input: `
x-B-@-A-x
 `,
  },
  {
    name: "should fail when having a fake turn",
    input: `
 @-A-+-B-x

 `,
  },
];
describe.each(failedScenarios)("invalid maps", (scenario) => {
  it(scenario.name, () => {
    expect(() => mapHandler(scenario.input)).toThrow(MapValidationError);
  });
});

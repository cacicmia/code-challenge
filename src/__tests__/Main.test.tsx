import { Main } from "@/components/Main";
import { render, screen } from "@testing-library/react";
let textareaElement: HTMLElement,
  lettersElement: HTMLElement,
  pathElement: HTMLElement;
beforeAll(() => {
  render(<Main />);
  textareaElement = screen.getByTestId("textarea");
  lettersElement = screen.getByTestId("letters");
  pathElement = screen.getByTestId("path");
});
test("should render the textarea", () => {
  expect(textareaElement).toBeInTheDocument();
});

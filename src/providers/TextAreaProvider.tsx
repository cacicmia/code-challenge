"use client";
import { ReactNode, createContext, useContext, useState } from "react";

const initialState = {
  textareaValue: `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+`,
  setTextareaValue: (value: string) => console.log("initial"),
};
const TextAreaContext = createContext(initialState);
export function TextareaValueProvider({ children }: { children: ReactNode }) {
  const [textareaValue, setTextarea] = useState<string>(
    initialState.textareaValue
  );
  const setTextareaValue = (value: string) => {
    setTextarea(value);
  };
  return (
    <TextAreaContext.Provider value={{ textareaValue, setTextareaValue }}>
      {children}
    </TextAreaContext.Provider>
  );
}

export function useTextAreaContext() {
  return useContext(TextAreaContext);
}

"use client";
import { useTextAreaContext } from "@/providers/TextAreaProvider";

export function Textarea() {
  const { textareaValue, setTextareaValue } = useTextAreaContext();
  return (
    <form className="flex items-start justify-start w-full">
      <textarea
        data-testid="input"
        cols={40}
        rows={30}
        name="map"
        value={textareaValue}
        className="w-full"
        onChange={(e) => {
          setTextareaValue(e.target.value);
        }}
      ></textarea>
    </form>
  );
}

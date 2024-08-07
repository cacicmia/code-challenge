import { TextareaValueProvider } from "@/providers/TextAreaProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { ResultSection } from "./ResultSection";
import { Textarea } from "./Textarea";

export function Main() {
  return (
    <TextareaValueProvider>
      <Textarea />
      <ErrorBoundary>
        <ResultSection />
      </ErrorBoundary>
    </TextareaValueProvider>
  );
}

import { TextareaValueProvider } from "@/providers/TextAreaProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { ResultsSection } from "./ResultSection";
import { Textarea } from "./Textarea";

export function Main() {
  return (
    <TextareaValueProvider>
      <Textarea />
      <ErrorBoundary>
        <ResultsSection />
      </ErrorBoundary>
    </TextareaValueProvider>
  );
}

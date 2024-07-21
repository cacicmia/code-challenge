import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ResultsSection } from "@/components/ResultSection";
import { Textarea } from "@/components/Textarea";
import { TextareaValueProvider } from "@/providers/TextAreaProvider";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-full items-start justify-between basis-1/2">
      <TextareaValueProvider>
        <Textarea />
        <ErrorBoundary>
          <ResultsSection />
        </ErrorBoundary>
      </TextareaValueProvider>
    </div>
  );
}

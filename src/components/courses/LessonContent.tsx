import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";

interface LessonContentProps {
  lessonId: string;
  courseId: string;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function LessonContent({
  lessonId,
  courseId,
  onComplete,
  onNext,
  onPrevious,
}: LessonContentProps) {
  const { updateLessonProgress } = useSupabase();
  const [loading, setLoading] = React.useState(false);

  const handleComplete = async () => {
    try {
      setLoading(true);
      await updateLessonProgress(lessonId, true);
      onComplete();
    } catch (error) {
      console.error("Error completing lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lesson content would go here */}
        <div className="prose max-w-none">
          <h2>Introduction</h2>
          <p>
            This is where the lesson content would go. It could include text,
            images, code examples, and interactive elements.
          </p>
          <pre className="bg-muted p-4 rounded-lg">
            <code>{`// Example code
const greeting = "Hello, World!";
console.log(greeting);`}</code>
          </pre>
        </div>

        <div className="flex items-center justify-between pt-6">
          <Button variant="outline" onClick={onPrevious} disabled={!onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button onClick={handleComplete} disabled={loading} className="px-8">
            <CheckCircle className="mr-2 h-4 w-4" />
            {loading ? "Marking as Complete..." : "Mark as Complete"}
          </Button>

          <Button variant="outline" onClick={onNext} disabled={!onNext}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

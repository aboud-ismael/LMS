import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useSupabase } from "@/hooks/useSupabase";
import CodeLesson from "./lesson-types/CodeLesson";
import QuizLesson from "./lesson-types/QuizLesson";
import { supabase } from "@/lib/supabase";

interface LessonContentProps {
  lessonId: string;
  courseId: string;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

interface Lesson {
  id: string;
  type: "code" | "quiz" | "text";
  content: any;
  title: string;
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
  const [lesson, setLesson] = React.useState<Lesson | null>(null);

  React.useEffect(() => {
    const fetchLesson = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

      if (error) {
        console.error("Error fetching lesson:", error);
        return;
      }

      setLesson(data);
    };

    fetchLesson();
  }, [lessonId]);

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
        {/* Dynamic lesson content based on type */}
        {lesson ? (
          <>
            {lesson.type === "code" && lesson.content && (
              <CodeLesson
                content={{
                  explanation:
                    lesson.content.explanation || "No explanation provided",
                  code: lesson.content.code || "// No code provided",
                  language: lesson.content.language || "javascript",
                }}
              />
            )}
            {lesson.type === "quiz" && lesson.content && (
              <QuizLesson
                content={{
                  question: lesson.content.question || "No question provided",
                  options: lesson.content.options || ["No options provided"],
                  correctAnswer: lesson.content.correctAnswer || 0,
                }}
                onComplete={(correct) => {
                  if (correct) {
                    handleComplete();
                  }
                }}
              />
            )}
            {lesson.type === "text" && lesson.content && (
              <div className="prose max-w-none space-y-4">
                <h2 className="text-xl font-semibold">
                  {lesson.content.title || "Lesson Content"}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lesson.content.content || "No content provided",
                  }}
                />
              </div>
            )}
            {(!lesson.type || !lesson.content) && (
              <div className="prose max-w-none">
                <p>This lesson's content is not properly formatted.</p>
              </div>
            )}
          </>
        ) : (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        )}

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

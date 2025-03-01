import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";
import LessonContent from "./LessonContent";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useSupabase } from "@/hooks/useSupabase";

interface LessonItemProps {
  title: string;
  duration: number;
  completed?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const LessonItem = ({
  title,
  duration,
  completed,
  active,
  onClick,
}: LessonItemProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-between items-center p-4 ${active ? "bg-muted" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {completed ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <PlayCircle className="h-5 w-5 text-primary" />
      )}
      <span>{title}</span>
    </div>
    <div className="flex items-center text-muted-foreground">
      <Clock className="h-4 w-4 mr-2" />
      <span>{duration} mins</span>
    </div>
  </Button>
);

export default function CourseView() {
  const { courseId } = useParams();
  const { courses, progress, loading } = useSupabase();
  const [activeLesson, setActiveLesson] = React.useState<string | null>(null);

  const course = courses.find((c) => c.id === courseId);

  React.useEffect(() => {
    // Set the first lesson as active by default
    if (course?.lessons?.length > 0 && !activeLesson) {
      setActiveLesson(course.lessons[0].id);
    }
  }, [course]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (!course)
    return (
      <div className="flex items-center justify-center h-screen">
        Course not found
      </div>
    );

  const completedLessons = course.lessons?.filter((lesson) =>
    progress.some((p) => p.lesson_id === lesson.id && p.completed),
  );

  const progressPercentage = Math.round(
    ((completedLessons?.length || 0) / (course.lessons?.length || 1)) * 100,
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Active Lesson Content */}
          {activeLesson && (
            <ProtectedRoute>
              <LessonContent
                lessonId={activeLesson}
                courseId={course.id}
                onComplete={() => {
                  // Refresh progress data
                  window.location.reload();
                }}
                onNext={() => {
                  const currentIndex =
                    course.lessons?.findIndex((l) => l.id === activeLesson) ??
                    -1;
                  const nextLesson = course.lessons?.[currentIndex + 1];
                  if (nextLesson) {
                    setActiveLesson(nextLesson.id);
                  }
                }}
                onPrevious={() => {
                  const currentIndex =
                    course.lessons?.findIndex((l) => l.id === activeLesson) ??
                    -1;
                  const prevLesson = course.lessons?.[currentIndex - 1];
                  if (prevLesson) {
                    setActiveLesson(prevLesson.id);
                  }
                }}
              />
            </ProtectedRoute>
          )}
        </div>

        {/* Lesson List */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Course Lessons</h3>
            <div className="space-y-1">
              {course.lessons?.map((lesson) => (
                <React.Fragment key={lesson.id}>
                  <LessonItem
                    title={lesson.title}
                    duration={lesson.duration}
                    completed={progress.some(
                      (p) => p.lesson_id === lesson.id && p.completed,
                    )}
                    active={activeLesson === lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                  />
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

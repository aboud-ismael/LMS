import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface LessonItem {
  title: string;
  duration: string;
  course: string;
}

interface NextUpWidgetProps {
  lessons?: LessonItem[];
}

const NextUpWidget = ({
  lessons = [
    {
      title: "Introduction to HTML Tags",
      duration: "15 mins",
      course: "HTML Fundamentals",
    },
    {
      title: "CSS Selectors Deep Dive",
      duration: "20 mins",
      course: "CSS Basics",
    },
    {
      title: "JavaScript Variables",
      duration: "25 mins",
      course: "JavaScript Essentials",
    },
    {
      title: "Python Functions",
      duration: "30 mins",
      course: "Python Basics",
    },
  ],
}: NextUpWidgetProps) => {
  return (
    <Card className="w-[320px] h-[400px] bg-white">
      <CardHeader>
        <h2 className="text-xl font-semibold">Next Up</h2>
        <p className="text-sm text-gray-500">Your upcoming lessons</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{lesson.title}</h3>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
                <p className="text-xs text-gray-500">{lesson.course}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs justify-between"
                >
                  Start Lesson
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NextUpWidget;

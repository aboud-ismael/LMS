import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Clock } from "lucide-react";

interface Lesson {
  title: string;
  duration: string;
  course: string;
}

interface NextUpWidgetProps {
  lessons?: Lesson[];
}

const NextUpWidget = ({ lessons = [] }: NextUpWidgetProps) => {
  return (
    <Card className="w-full lg:w-[320px] bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Next Up</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[120px] pr-2 snap-y snap-mandatory overflow-y-auto">
          {lessons.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors snap-start"
                >
                  <div className="font-medium mb-1">{lesson.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {lesson.course}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {lesson.duration}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No upcoming lessons
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NextUpWidget;

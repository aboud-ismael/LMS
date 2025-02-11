import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { PlayCircle } from "lucide-react";

interface CourseCardProps {
  title?: string;
  description?: string;
  progress?: number;
  image?: string;
  color?: string;
}

const CourseCard = ({
  title = "HTML Fundamentals",
  description = "Learn the basics of HTML and start building web pages",
  progress = 45,
  image = "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=500&h=300&fit=crop",
  color = "bg-orange-500",
}: CourseCardProps) => {
  return (
    <Card className="w-full max-w-[400px] bg-white hover:shadow-sm transition-shadow duration-200 rounded-xl overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-100"
            indicatorClassName={`${color} opacity-90`}
          />
        </div>

        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          variant="default"
        >
          <span
            onClick={() =>
              (window.location.href = `/courses/${title.toLowerCase().replace(/ /g, "-")}`)
            }
          >
            Continue Learning
          </span>
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;

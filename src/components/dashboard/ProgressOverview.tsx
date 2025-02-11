import React from "react";
import { Progress } from "../ui/progress";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Trophy, Star, Target, Book } from "lucide-react";

interface ProgressOverviewProps {
  totalProgress?: number;
  achievements?: Array<{
    id: string;
    title: string;
    icon: "trophy" | "star" | "target" | "book";
  }>;
}

const ProgressOverview = ({
  totalProgress = 65,
  achievements = [
    { id: "1", title: "Fast Learner", icon: "trophy" },
    { id: "2", title: "Perfect Score", icon: "star" },
    { id: "3", title: "Goal Setter", icon: "target" },
    { id: "4", title: "Bookworm", icon: "book" },
  ],
}: ProgressOverviewProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-4 w-4" />;
      case "star":
        return <Star className="h-4 w-4" />;
      case "target":
        return <Target className="h-4 w-4" />;
      case "book":
        return <Book className="h-4 w-4" />;
      default:
        return <Trophy className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Completion</span>
                <span>{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <Badge
                  key={achievement.id}
                  variant="secondary"
                  className="flex items-center gap-2 py-2 px-4"
                >
                  {getIcon(achievement.icon)}
                  {achievement.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;

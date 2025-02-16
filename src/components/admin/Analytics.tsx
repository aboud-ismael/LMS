import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import {
  Users,
  BookOpen,
  GraduationCap,
  Award,
  TrendingUp,
} from "lucide-react";

export default function Analytics() {
  const [stats, setStats] = React.useState({
    totalUsers: 0,
    totalCourses: 0,
    totalLessons: 0,
    completionRate: 0,
    courseEngagement: [],
  });

  React.useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const { supabase } = await import("@/lib/supabase");

    // Fetch users
    const { count: userCount } = await supabase
      .from("user_progress")
      .select("user_id", { count: "exact", head: true });

    // Fetch courses and their completion rates
    const { data: courses } = await supabase.from("courses").select("*");
    const { data: progress } = await supabase
      .from("user_progress")
      .select("course_id, completed");

    const courseStats = courses?.map((course) => {
      const courseProgress = progress?.filter((p) => p.course_id === course.id);
      const completed = courseProgress?.filter((p) => p.completed)?.length || 0;
      const total = courseProgress?.length || 1;
      return {
        id: course.id,
        title: course.title,
        completionRate: (completed / total) * 100,
        totalEnrollments: total,
      };
    });

    setStats({
      totalUsers: userCount || 0,
      totalCourses: courses?.length || 0,
      totalLessons: 0, // You can add this from your lessons table
      completionRate:
        courseStats?.reduce((acc, curr) => acc + curr.completionRate, 0) /
          (courseStats?.length || 1) || 0,
      courseEngagement: courseStats || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Total Users</div>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-sm font-medium">Total Courses</div>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Total Lessons</div>
                <div className="text-2xl font-bold">{stats.totalLessons}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">Completion Rate</div>
                <div className="text-2xl font-bold">
                  {Math.round(stats.completionRate)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {stats.courseEngagement.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-gray-500">
                      {course.totalEnrollments} enrollments
                    </div>
                  </div>
                  <Progress value={course.completionRate} />
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>Completion Rate</div>
                    <div>{Math.round(course.completionRate)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

import React from "react";
import Sidebar from "./dashboard/Sidebar";
import CourseGrid from "./dashboard/CourseGrid";
import ProgressOverview from "./dashboard/ProgressOverview";
import NextUpWidget from "./dashboard/NextUpWidget";
import SearchBar from "./dashboard/SearchBar";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const calculateProgress = (lessons: any[], progress: any[]) => {
  if (!lessons?.length) return 0;
  const completedLessons = progress.filter(
    (p) => p.completed && lessons.some((l) => l.id === p.lesson_id),
  );
  return Math.round((completedLessons.length / lessons.length) * 100);
};

const Home = () => {
  const [activeNavItem, setActiveNavItem] = React.useState("home");
  const { courses, upcomingLessons, progress, achievements, loading } =
    useSupabase();
  const { user } = useAuth();
  const navigate = useNavigate();

  const hasEnrolledCourses = courses.length > 0;

  const EmptyState = () => (
    <div className="text-center max-w-2xl mx-auto py-12">
      <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Start Your Learning Journey</h2>
      <p className="text-gray-600 mb-8">
        Explore our courses and begin your path to mastering web development.
      </p>
      <Button
        size="lg"
        onClick={() => navigate("/courses")}
        className="bg-primary hover:bg-primary/90"
      >
        <BookOpen className="mr-2 h-5 w-5" />
        Browse Courses
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={(item) => setActiveNavItem(item)}
      />

      <main className="md:ml-[280px] overflow-x-hidden p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">
                Welcome{hasEnrolledCourses ? " back" : ""},{" "}
                {user?.email?.split("@")[0] || "Student"}!
              </h1>
              {hasEnrolledCourses && <SearchBar />}
            </div>
            {hasEnrolledCourses && (
              <NextUpWidget
                lessons={upcomingLessons.map((lesson) => ({
                  title: lesson.title,
                  duration: `${lesson.duration} mins`,
                  course: lesson.courses?.title || "",
                }))}
              />
            )}
          </div>

          {hasEnrolledCourses ? (
            <>
              <ProgressOverview
                totalProgress={
                  courses.length > 0
                    ? Math.round(
                        courses.reduce(
                          (acc, course) =>
                            acc + calculateProgress(course.lessons, progress),
                          0,
                        ) / courses.length,
                      )
                    : 0
                }
                achievements={achievements.map((achievement) => ({
                  id: achievement.id,
                  title: achievement.achievements?.title || "",
                  icon: achievement.achievements?.icon || "trophy",
                }))}
              />

              <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <CourseGrid
                    courses={courses.map((course) => ({
                      id: course.id,
                      title: course.title,
                      description: course.description || "",
                      progress: calculateProgress(course.lessons, progress),
                      image: course.image_url,
                      color: course.color || "bg-gray-500",
                    }))}
                  />
                )}
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

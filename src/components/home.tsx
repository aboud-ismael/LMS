import React from "react";
import Sidebar from "./dashboard/Sidebar";
import CourseGrid from "./dashboard/CourseGrid";
import ProgressOverview from "./dashboard/ProgressOverview";
import NextUpWidget from "./dashboard/NextUpWidget";
import SearchBar from "./dashboard/SearchBar";
import { useSupabase } from "@/hooks/useSupabase";

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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={(item) => setActiveNavItem(item)}
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6">
                Welcome back, Student!
              </h1>
              <SearchBar />
            </div>
            <NextUpWidget
              lessons={upcomingLessons.map((lesson) => ({
                title: lesson.title,
                duration: `${lesson.duration} mins`,
                course: lesson.courses?.title || "",
              }))}
            />
          </div>

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

          <div>
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
        </div>
      </main>
    </div>
  );
};

export default Home;

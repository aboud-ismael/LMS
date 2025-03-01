import React from "react";
import Sidebar from "../dashboard/Sidebar";
import CourseGrid from "../dashboard/CourseGrid";
import SearchBar from "../dashboard/SearchBar";
import { useSupabase } from "@/hooks/useSupabase";

const calculateProgress = (lessons: any[], progress: any[]) => {
  if (!lessons?.length) return 0;
  const completedLessons = progress.filter(
    (p) => p.completed && lessons.some((l) => l.id === p.lesson_id),
  );
  return Math.round((completedLessons.length / lessons.length) * 100);
};

const CoursesPage = () => {
  const { courses, progress, loading } = useSupabase();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar activeItem="courses" />

      <main className="md:ml-[280px] overflow-x-hidden p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">All Courses</h1>
            <SearchBar
              placeholder="Search courses..."
              onSearch={setSearchQuery}
            />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <CourseGrid
              courses={filteredCourses.map((course) => ({
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
      </main>
    </div>
  );
};

export default CoursesPage;

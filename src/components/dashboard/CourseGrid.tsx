import React from "react";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  image?: string;
  color?: string;
}

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid = ({ courses: allCourses = [] }: CourseGridProps) => {
  // Remove duplicates by title if they exist
  const courses = allCourses.filter(
    (course, index, self) =>
      index === self.findIndex((c) => c.title === course.title),
  );
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            progress={course.progress}
            image={course.image}
            color={course.color}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;

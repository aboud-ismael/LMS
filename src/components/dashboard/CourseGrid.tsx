import React from "react";
import CourseCard from "./CourseCard";

interface Course {
  title: string;
  description: string;
  progress: number;
  image: string;
  color: string;
}

interface CourseGridProps {
  courses?: Course[];
}

const CourseGrid = ({
  courses = [
    {
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML and start building web pages",
      progress: 45,
      image:
        "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=500&h=300&fit=crop",
      color: "bg-red-500",
    },
    {
      title: "CSS Mastery",
      description: "Master the art of styling with CSS",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=500&h=300&fit=crop",
      color: "bg-blue-600",
    },
    {
      title: "JavaScript Essentials",
      description: "Learn the fundamentals of JavaScript programming",
      progress: 15,
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop",
      color: "bg-orange-500",
    },
    {
      title: "Python Basics",
      description: "Get started with Python programming",
      progress: 0,
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&h=300&fit=crop",
      color: "bg-green-500",
    },
  ],
}: CourseGridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
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

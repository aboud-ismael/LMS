import React from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useSupabase } from "@/hooks/useSupabase";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  image?: string;
  color?: string;
}

interface EnrollmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const EnrollmentDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: EnrollmentDialogProps) => (
  <AlertDialog open={isOpen} onOpenChange={onClose}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Enroll in {title}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you ready to start your learning journey with this course?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Enroll Now</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const CourseCard = ({
  id,
  title,
  description,
  progress,
  image = "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=500&h=300&fit=crop",
  color = "bg-orange-500",
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { enrollments, enrollInCourse } = useSupabase();
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] =
    React.useState(false);
  const [isEnrolling, setIsEnrolling] = React.useState(false);

  const isEnrolled = enrollments.some((e) => e.course_id === id);
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
          onClick={() => {
            if (isEnrolled) {
              navigate(`/courses/${id}`);
            } else {
              setIsEnrollmentDialogOpen(true);
            }
          }}
          disabled={isEnrolling}
        >
          {isEnrolling
            ? "Enrolling..."
            : isEnrolled
              ? progress > 0
                ? "Continue Learning"
                : "Start Course"
              : "Enroll Now"}
        </Button>

        <EnrollmentDialog
          isOpen={isEnrollmentDialogOpen}
          onClose={() => setIsEnrollmentDialogOpen(false)}
          onConfirm={async () => {
            setIsEnrolling(true);
            try {
              await enrollInCourse(id);
              setIsEnrollmentDialogOpen(false);
              navigate(`/courses/${id}`);
            } catch (error) {
              console.error("Error enrolling:", error);
            } finally {
              setIsEnrolling(false);
            }
          }}
          title={title}
        />
      </div>
    </Card>
  );
};

export default CourseCard;

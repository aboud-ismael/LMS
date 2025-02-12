import { useState, useEffect } from "react";
import {
  getCourses,
  getUpcomingLessons,
  getUserProgress,
  getUserAchievements,
  updateLessonProgress as apiUpdateLessonProgress,
} from "@/lib/api";

import { useAuth } from "@/components/auth/AuthProvider";

export const useSupabase = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [coursesData, lessonsData, progressData, achievementsData] =
          await Promise.all([
            getCourses(),
            getUpcomingLessons(user?.id),
            getUserProgress(user?.id),
            getUserAchievements(user?.id),
          ]);

        setCourses(coursesData);
        setUpcomingLessons(lessonsData);
        setProgress(progressData);
        setAchievements(achievementsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const updateLessonProgress = async (lessonId: string, completed: boolean) => {
    try {
      await apiUpdateLessonProgress(lessonId, completed);
      // Refresh progress data
      const newProgress = await getUserProgress(user?.id);
      setProgress(newProgress);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return {
    courses,
    upcomingLessons,
    progress,
    achievements,
    loading,
    error,
    updateLessonProgress,
  };
};

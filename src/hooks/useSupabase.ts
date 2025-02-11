import { useState, useEffect } from "react";
import {
  getCourses,
  getUpcomingLessons,
  getUserProgress,
  getUserAchievements,
} from "@/lib/api";

import { useAuth } from "@/components/auth/AuthProvider";

export const useSupabase = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return { courses, upcomingLessons, progress, achievements, loading, error };
};

import { supabase } from "./supabase";
import { Database } from "@/types/supabase";

export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];

// Courses
export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*, lessons(*), user_progress(*)")
    .order("created_at");

  if (error) throw error;
  return data;
};

// Lessons
export const getUpcomingLessons = async (userId: string, limit = 4) => {
  const { data, error } = await supabase
    .from("lessons")
    .select(
      `
      *,
      courses!inner(*),
      user_progress!left(*)
    `,
    )
    .eq("user_progress.completed", false)
    .eq("user_progress.user_id", userId)
    .order("order_index")
    .limit(limit);

  if (error) throw error;
  return data;
};

// Progress
export const getUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

// Achievements
export const getUserAchievements = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_achievements")
    .select("*, achievements(*)")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

// Update progress
export const updateLessonProgress = async (
  userId: string,
  lessonId: string,
  completed: boolean,
) => {
  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

import React from "react";
import { useSupabase } from "@/hooks/useSupabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Plus, Trash2, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type LessonType = "text" | "code" | "quiz";

interface LessonFormData {
  title: string;
  duration: number;
  type: LessonType;
  content: any;
  course_id: string;
  order_index: number;
}

export default function LessonManager() {
  const { courses } = useSupabase();
  const [formData, setFormData] = React.useState<LessonFormData>({
    title: "",
    duration: 15,
    type: "TEXT",
    content: {},
    course_id: "",
    order_index: 1,
  });
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [lessons, setLessons] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    const { supabase } = await import("@/lib/supabase");
    const { data } = await supabase
      .from("lessons")
      .select("*, courses(title)")
      .order("order_index");
    if (data) setLessons(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { supabase } = await import("@/lib/supabase");

    try {
      // Format content based on lesson type
      let formattedContent;
      if (formData.type === "text") {
        formattedContent = {
          title: formData.content?.title || "",
          content: formData.content?.content || "",
        };
      } else if (formData.type === "code") {
        formattedContent = {
          explanation: formData.content?.explanation || "",
          code: formData.content?.code || "",
          language: formData.content?.language || "html",
        };
      } else if (formData.type === "quiz") {
        formattedContent = {
          question: formData.content?.question || "",
          options: formData.content?.options || [],
          correctAnswer: parseInt(formData.content?.correctAnswer) || 0,
        };
      }

      // Ensure all required fields are present and properly formatted
      const lessonData = {
        title: formData.title.trim(),
        duration: Math.max(1, parseInt(formData.duration.toString()) || 15),
        type: formData.type,
        content: formattedContent,
        course_id: formData.course_id,
        order_index: Math.max(
          1,
          parseInt(formData.order_index.toString()) || 1,
        ),
      };

      // Validate required fields
      if (!lessonData.title || !lessonData.course_id) {
        throw new Error("Title and Course are required");
      }

      // Validate content based on type
      if (
        lessonData.type === "text" &&
        (!formattedContent.title || !formattedContent.content)
      ) {
        throw new Error("Text lessons require both title and content");
      } else if (
        lessonData.type === "code" &&
        (!formattedContent.explanation || !formattedContent.code)
      ) {
        throw new Error("Code lessons require both explanation and code");
      } else if (
        lessonData.type === "quiz" &&
        (!formattedContent.question || !formattedContent.options?.length)
      ) {
        throw new Error("Quiz lessons require a question and options");
      }

      if (editingId) {
        const { error } = await supabase
          .from("lessons")
          .update(lessonData)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("lessons").insert([lessonData]);
        if (error) throw error;
      }

      setFormData({
        title: "",
        duration: 15,
        type: "TEXT",
        content: {},
        course_id: "",
        order_index: 1,
      });
      setEditingId(null);
      setIsOpen(false);
      fetchLessons();
    } catch (error) {
      console.error("Error saving lesson:", error);
      alert("Error saving lesson. Please check the console for details.");
    }
  };

  const handleEdit = (lesson: any) => {
    setFormData({
      title: lesson.title,
      duration: lesson.duration,
      type: lesson.type,
      content: lesson.content,
      course_id: lesson.course_id,
      order_index: lesson.order_index,
    });
    setEditingId(lesson.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { supabase } = await import("@/lib/supabase");
    await supabase.from("lessons").delete().eq("id", id);
    fetchLessons();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lesson Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Lesson" : "Add Lesson"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Select
                  value={formData.course_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, course_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Lesson Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Select
                  value={formData.type}
                  onValueChange={(value: LessonType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {formData.type === "text" && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Content Title"
                      value={formData.content?.title || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            title: e.target.value,
                          },
                        })
                      }
                    />
                    <Textarea
                      placeholder="Content HTML"
                      value={formData.content?.content || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            content: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                {formData.type === "code" && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Explanation"
                      value={formData.content?.explanation || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            explanation: e.target.value,
                          },
                        })
                      }
                    />
                    <Textarea
                      placeholder="Code"
                      value={formData.content?.code || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            code: e.target.value,
                          },
                        })
                      }
                    />
                    <Input
                      placeholder="Language (e.g., html, javascript)"
                      value={formData.content?.language || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            language: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
                {formData.type === "quiz" && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Question"
                      value={formData.content?.question || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            question: e.target.value,
                            options: formData.content?.options || [],
                          },
                        })
                      }
                    />
                    <div className="space-y-2">
                      {[0, 1, 2, 3].map((index) => (
                        <Input
                          key={index}
                          placeholder={`Option ${index + 1}`}
                          value={formData.content?.options?.[index] || ""}
                          onChange={(e) => {
                            const newOptions = [
                              ...(formData.content?.options || []),
                            ];
                            newOptions[index] = e.target.value;
                            setFormData({
                              ...formData,
                              content: {
                                ...formData.content,
                                options: newOptions,
                              },
                            });
                          }}
                        />
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Correct Answer (0-3)"
                      min={0}
                      max={3}
                      value={formData.content?.correctAnswer || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content: {
                            ...formData.content,
                            correctAnswer: parseInt(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Order Index"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Lesson" : "Create Lesson"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {lessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{lesson.title}</span>
                <span className="text-sm text-gray-500">
                  Course: {lesson.courses?.title}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Type: {lesson.type} | Duration: {lesson.duration}min |
                    Order:
                    {lesson.order_index}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(lesson)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(lesson.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

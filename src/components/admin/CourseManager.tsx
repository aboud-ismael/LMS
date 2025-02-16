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

interface CourseFormData {
  title: string;
  description: string;
  color: string;
  image_url: string;
}

export default function CourseManager() {
  const { courses, loading } = useSupabase();
  const [formData, setFormData] = React.useState<CourseFormData>({
    title: "",
    description: "",
    color: "bg-orange-500",
    image_url: "",
  });
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { supabase } = await import("@/lib/supabase");

    if (editingId) {
      await supabase.from("courses").update(formData).eq("id", editingId);
    } else {
      await supabase.from("courses").insert([formData]);
    }

    setFormData({
      title: "",
      description: "",
      color: "bg-orange-500",
      image_url: "",
    });
    setEditingId(null);
    setIsOpen(false);
    window.location.reload();
  };

  const handleEdit = (course: any) => {
    setFormData({
      title: course.title,
      description: course.description || "",
      color: course.color || "bg-orange-500",
      image_url: course.image_url || "",
    });
    setEditingId(course.id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { supabase } = await import("@/lib/supabase");
    await supabase.from("courses").delete().eq("id", id);
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Course" : "Add Course"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Course Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Color (e.g., bg-orange-500)"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Image URL"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingId ? "Update Course" : "Create Course"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(course)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

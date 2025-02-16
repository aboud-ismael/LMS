import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CourseManager from "./CourseManager";
import LessonManager from "./LessonManager";
import UserManager from "./UserManager";
import Analytics from "./Analytics";
import { Card } from "../ui/card";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card className="p-6">
        <Tabs defaultValue="analytics">
          <TabsList className="grid w-[600px] grid-cols-4 mb-6">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="courses">
            <CourseManager />
          </TabsContent>

          <TabsContent value="lessons">
            <LessonManager />
          </TabsContent>

          <TabsContent value="users">
            <UserManager />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

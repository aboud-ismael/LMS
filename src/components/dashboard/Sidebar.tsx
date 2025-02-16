import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthProvider";
import {
  Home,
  BookOpen,
  Award,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const Sidebar = ({ activeItem = "home", onNavigate }: SidebarProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleNavigate = (path: string, item: string) => {
    navigate(path);
    onNavigate?.(item);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="w-[280px] h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Learning Platform</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant={activeItem === "home" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleNavigate("/", "home")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>

          <Button
            variant={activeItem === "courses" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleNavigate("/courses", "courses")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </Button>

          <Button
            variant={activeItem === "achievements" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleNavigate("/achievements", "achievements")}
          >
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </Button>

          <Button
            variant={activeItem === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handleNavigate("/profile", "profile")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

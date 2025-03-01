import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthProvider";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useResponsive } from "@/hooks/useResponsive";
import {
  Home,
  BookOpen,
  Award,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
} from "lucide-react";

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const SidebarContent = ({ activeItem = "home", onNavigate }: SidebarProps) => {
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
    <div className="h-full flex flex-col bg-white">
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

const Sidebar = (props: SidebarProps) => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 border-r">
            <SidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-[280px] h-screen border-r border-gray-200">
      <SidebarContent {...props} />
    </div>
  );
};

export default Sidebar;

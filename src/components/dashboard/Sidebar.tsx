import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  BookOpen,
  Code2,
  Home,
  Settings,
  User,
  GraduationCap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  className?: string;
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const navigationItems = [
  { id: "home", icon: Home, label: "Dashboard" },
  { id: "courses", icon: BookOpen, label: "Courses" },
  { id: "exercises", icon: Code2, label: "Exercises" },
  { id: "achievements", icon: GraduationCap, label: "Achievements" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({
  className = "",
  activeItem = "home",
  onNavigate = () => {},
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full w-[280px] bg-white border-r p-4 space-y-4",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-2 py-4">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="font-bold text-xl">LMS Platform</span>
      </div>

      <div className="flex-1 py-4">
        <TooltipProvider>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeItem === item.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-4 px-4",
                        activeItem === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                      onClick={() => onNavigate(item.id)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>

      <div className="mt-auto">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="text-sm font-semibold">Need Help?</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Check our documentation or contact support
          </p>
          <Button className="w-full mt-3" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

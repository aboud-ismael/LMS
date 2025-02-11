import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: string[]) => void;
  placeholder?: string;
}

const SearchBar = ({
  onSearch = () => {},
  onFilter = () => {},
  placeholder = "Search for courses, lessons, or content...",
}: SearchBarProps) => {
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const handleFilterChange = (filter: string) => {
    const updatedFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    setActiveFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="w-full h-[60px] bg-white flex items-center gap-2 px-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex-1 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("courses")}
            onCheckedChange={() => handleFilterChange("courses")}
          >
            Courses
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("lessons")}
            onCheckedChange={() => handleFilterChange("lessons")}
          >
            Lessons
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={activeFilters.includes("exercises")}
            onCheckedChange={() => handleFilterChange("exercises")}
          >
            Exercises
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserManager() {
  const [users, setUsers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { supabase } = await import("@/lib/supabase");
    const { data: userData } = await supabase.auth.admin.listUsers();
    const { data: progressData } = await supabase
      .from("user_progress")
      .select("user_id, completed");

    const userProgress = progressData?.reduce((acc, curr) => {
      if (!acc[curr.user_id]) {
        acc[curr.user_id] = { total: 0, completed: 0 };
      }
      acc[curr.user_id].total++;
      if (curr.completed) acc[curr.user_id].completed++;
      return acc;
    }, {});

    const users = userData?.users.map((user) => ({
      ...user,
      progress: userProgress?.[user.id] || { total: 0, completed: 0 },
    }));

    setUsers(users || []);
    setLoading(false);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {loading ? (
                <div>Loading...</div>
              ) : (
                filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          />
                          <AvatarFallback>
                            {user.email.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{user.email}</h3>
                          <div className="text-sm text-gray-500">
                            Joined:{" "}
                            {new Date(user.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="w-[200px]">
                          <div className="text-sm text-gray-500 mb-1">
                            Course Progress
                          </div>
                          <Progress
                            value={
                              user.progress.total
                                ? (user.progress.completed /
                                    user.progress.total) *
                                  100
                                : 0
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) throw error;
      setMessage("Password updated successfully");
      setPassword("");
    } catch (error) {
      setError("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Profile Settings</CardTitle>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Change Password</h3>
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

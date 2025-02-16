import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (email !== "ismaelaboud@gmail.com") {
        setError("You do not have admin access");
        return;
      }
      await signIn(email, password);
      // After successful login, force reload to update auth state
      window.location.href = "/admin";
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In as Admin
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

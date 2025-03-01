import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
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
            Sign In
          </Button>
          <div className="flex justify-between text-sm">
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="px-0"
            >
              Create Account
            </Button>
            <Button
              variant="link"
              onClick={() => navigate("/reset-password")}
              className="px-0"
            >
              Forgot Password?
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

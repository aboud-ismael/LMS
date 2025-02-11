import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Using supabase directly for sign up

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) throw error;
      setError("Check your email to confirm your account");
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || "Error creating account");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Create Account</CardTitle>
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
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

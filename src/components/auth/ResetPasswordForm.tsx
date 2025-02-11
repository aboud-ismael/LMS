import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap } from "lucide-react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setMessage("Check your email for the password reset link");
    } catch (error) {
      setError("Error sending reset password email");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Reset Password</CardTitle>
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
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

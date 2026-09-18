import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await apiPost("/auth/reset-password", { email, password });
      toast({ title: "Success", description: "Password updated successfully!" });
      navigate("/login");
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">Invalid Link</h2>
          <p className="text-muted-foreground mb-6">This password reset link is invalid or has expired.</p>
          <Button variant="hero" onClick={() => navigate("/forgot-password")}>
            Request New Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-foreground">Set New Password</h2>
          <p className="mt-2 text-muted-foreground">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <Button type="submit" variant="hero" className="w-full py-6" disabled={loading}>
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

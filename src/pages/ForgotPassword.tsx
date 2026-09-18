import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      await apiPost("/auth/forgot-password", { email: email.trim() });
      navigate(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-foreground">Forgot Password</h2>
          <p className="mt-2 text-muted-foreground">
            Enter your account email to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
            />
          </div>
          <Button type="submit" variant="hero" className="w-full py-6" disabled={loading}>
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <p className="text-center">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

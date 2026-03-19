import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus, Heart, Stethoscope, ShieldCheck, User } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const roles: { value: AppRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "patient", label: "Patient", icon: <User className="h-5 w-5" />, desc: "Book tests & appointments" },
  { value: "doctor", label: "Doctor", icon: <Stethoscope className="h-5 w-5" />, desc: "Manage patients & prescriptions" },
  { value: "nurse", label: "Nurse", icon: <Heart className="h-5 w-5" />, desc: "Assist with patient care" },
  { value: "admin", label: "Admin", icon: <ShieldCheck className="h-5 w-5" />, desc: "Full system management" },
];

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          role,
        },
      },
    });
    setLoading(false);

    if (error) {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account, then sign in.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12" style={{ background: "var(--gradient-hero)" }}>
        <div className="text-center max-w-md">
          <Heart className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-4">
            Join Our Platform
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Create your account to access comprehensive healthcare services.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold text-foreground">Create Account</h2>
            <p className="mt-2 text-muted-foreground">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Dr. John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                maxLength={100}
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Select Your Role</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as AppRole)} className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <label
                    key={r.value}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      role === r.value
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={r.value} className="sr-only" />
                    <span className={role === r.value ? "text-primary" : "text-muted-foreground"}>
                      {r.icon}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{r.label}</span>
                    <span className="text-xs text-muted-foreground text-center">{r.desc}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <Button type="submit" variant="hero" className="w-full py-6" disabled={loading}>
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground" />
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>

          <p className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

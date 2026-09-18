import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiPatch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setSaving(true);
    try {
      await apiPatch("/auth/me", { fullName: fullName.trim() });
      toast({ title: "Saved", description: "Your profile has been updated." });
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" description="Manage your account details." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-display font-semibold text-foreground">{user?.fullName}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ""} disabled />
          </div>
          <Button type="submit" variant="hero" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

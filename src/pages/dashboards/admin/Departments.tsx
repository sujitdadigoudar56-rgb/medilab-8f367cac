import { useState, useEffect } from "react";
import { useApiData } from "@/hooks/useApiData";
import { apiPost, apiDelete } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { getIcon } from "@/lib/iconMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface Department {
  _id: string;
  name: string;
  description?: string;
  iconName?: string;
  headDoctor?: { _id: string; fullName: string };
}

interface DoctorOption {
  _id: string;
  fullName: string;
}

const Departments = () => {
  const { data: departments, loading, refetch } = useApiData<Department[]>("/data/departments", []);
  const { data: doctors } = useApiData<DoctorOption[]>("/data/users?role=doctor", []);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [headDoctor, setHeadDoctor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (!justAddedId) return;
    const el = document.getElementById(`dept-${justAddedId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setJustAddedId(null), 2500);
    return () => clearTimeout(timer);
  }, [justAddedId, departments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Error", description: "Department name is required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const created = await apiPost<Department>("/data/departments", {
        name: name.trim(),
        description: description.trim(),
        headDoctor: headDoctor || undefined,
      });
      toast({ title: "Added", description: `"${created.name}" was created.` });
      setName("");
      setDescription("");
      setHeadDoctor("");
      setJustAddedId(created._id);
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/data/departments/${id}`);
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Departments" description="Hospital department structure." />

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 card-shadow space-y-4">
        <h3 className="text-lg font-display font-semibold text-foreground">Add Department</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dept-name">Name</Label>
            <Input id="dept-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Cardiology" />
          </div>
          <div className="space-y-2">
            <Label>Head Doctor</Label>
            <Select value={headDoctor} onValueChange={setHeadDoctor}>
              <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d._id} value={d._id}>{d.fullName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dept-desc">Description</Label>
          <Textarea id="dept-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What this department covers..." />
        </div>
        <Button type="submit" variant="hero" disabled={submitting}>
          {submitting ? "Saving..." : "Add Department"}
        </Button>
      </form>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : departments.length === 0 ? (
          <EmptyState message="No departments yet." />
        ) : (
          <ul className="divide-y divide-border">
            {departments.map((dept) => {
              const Icon = getIcon(dept.iconName);
              return (
                <li
                  key={dept._id}
                  id={`dept-${dept._id}`}
                  className={`py-4 flex items-center gap-4 px-3 -mx-3 rounded-lg transition-colors duration-700 ${
                    justAddedId === dept._id ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{dept.name}</p>
                    {dept.description && <p className="text-xs text-muted-foreground">{dept.description}</p>}
                    {dept.headDoctor && <p className="text-xs text-muted-foreground mt-0.5">Head: {dept.headDoctor.fullName}</p>}
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(dept._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Departments;

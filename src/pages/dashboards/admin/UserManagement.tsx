import { useDashboardData, type PersonRef } from "@/hooks/useDashboardData";
import { apiPatch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Role = "doctor" | "nurse" | "patient";

const UserManagement = () => {
  const { data, loading, refetch } = useDashboardData();
  const { toast } = useToast();

  const users: (PersonRef & { role: Role })[] = [
    ...((data.doctors || []) as PersonRef[]).map((u) => ({ ...u, role: "doctor" as Role })),
    ...((data.nurses || []) as PersonRef[]).map((u) => ({ ...u, role: "nurse" as Role })),
    ...((data.patients || []) as PersonRef[]).map((u) => ({ ...u, role: "patient" as Role })),
  ];

  const changeRole = async (id: string, role: Role) => {
    try {
      await apiPatch(`/data/users/${id}/role`, { role });
      toast({ title: "Updated", description: "User role changed." });
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="User Management" description="View and manage roles for all accounts." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : users.length === 0 ? (
          <EmptyState message="No users yet." />
        ) : (
          <ul className="divide-y divide-border">
            {users.map((u) => (
              <li key={u._id} className="py-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{u.fullName}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <Select value={u.role} onValueChange={(role) => changeRole(u._id, role as Role)}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserManagement;

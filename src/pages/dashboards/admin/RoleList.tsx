import { User } from "lucide-react";
import { useDashboardData, type PersonRef } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

interface RoleListProps {
  title: string;
  description: string;
  role: "doctors" | "nurses" | "patients";
}

const RoleList = ({ title, description, role }: RoleListProps) => {
  const { data, loading } = useDashboardData();
  const people: PersonRef[] = data[role] || [];

  return (
    <div className="space-y-8">
      <PageHeader title={title} description={description} />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : people.length === 0 ? (
          <EmptyState message={`No ${title.toLowerCase()} yet.`} />
        ) : (
          <ul className="divide-y divide-border">
            {people.map((p) => (
              <li key={p._id} className="py-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{p.fullName}</p>
                  <p className="text-xs text-muted-foreground">{p.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoleList;

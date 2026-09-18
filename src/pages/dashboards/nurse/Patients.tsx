import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { User } from "lucide-react";

const Patients = () => {
  const { data, loading } = useDashboardData();
  const vitals = data.vitals || [];

  const patients = Array.from(
    new Map(vitals.filter((v) => v.patient).map((v) => [v.patient._id, v.patient])).values()
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Patients" description="Patients you've recorded vitals for." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : patients.length === 0 ? (
          <EmptyState message="No patients yet." />
        ) : (
          <ul className="divide-y divide-border">
            {patients.map((p) => (
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

export default Patients;

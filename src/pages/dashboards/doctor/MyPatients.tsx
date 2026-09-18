import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { User } from "lucide-react";

const MyPatients = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.appointments || [];

  const patients = Array.from(
    new Map(
      appointments
        .filter((a) => a.patient)
        .map((a) => [a.patient!._id, { ...a.patient!, visits: 0 }])
    ).values()
  ).map((p) => ({
    ...p,
    visits: appointments.filter((a) => a.patient?._id === p._id).length,
  }));

  return (
    <div className="space-y-8">
      <PageHeader title="My Patients" description="Patients you've consulted with." />

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
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{p.fullName}</p>
                  <p className="text-xs text-muted-foreground">{p.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">{p.visits} visit{p.visits !== 1 ? "s" : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPatients;

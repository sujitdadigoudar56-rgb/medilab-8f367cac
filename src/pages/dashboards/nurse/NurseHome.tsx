import { Users, Activity } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const NurseHome = () => {
  const { data, loading } = useDashboardData();
  const vitals = data.vitals || [];

  const uniquePatients = new Set(vitals.map((v) => v.patient?._id).filter(Boolean)).size;
  const today = new Date();
  const recordedToday = vitals.filter((v) => isSameDay(new Date(v.timestamp), today)).length;

  const stats = [
    { label: "Assigned Patients", value: loading ? "-" : uniquePatients, icon: <Users className="h-6 w-6" />, color: "text-primary bg-primary/10" },
    { label: "Vitals Recorded Today", value: loading ? "-" : recordedToday, icon: <Activity className="h-6 w-6" />, color: "text-red-500 bg-red-500/10" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Welcome, Nurse" description="Here's your patient care overview." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Vitals</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : vitals.length === 0 ? (
          <EmptyState message="No vitals recorded yet." />
        ) : (
          <ul className="divide-y divide-border">
            {vitals.slice(0, 5).map((v) => (
              <li key={v._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm font-medium text-foreground">{v.patient.fullName}</p>
                <p className="text-xs text-muted-foreground">BP {v.bloodPressure || "-"} · Pulse {v.pulse || "-"} · {new Date(v.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NurseHome;

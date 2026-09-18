import { Calendar, Pill, FileText, Activity } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";

const PatientHome = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.appointments || [];
  const prescriptions = data.prescriptions || [];
  const vitals = data.vitals || [];

  const upcoming = appointments.filter((a) => a.status === "pending" || a.status === "confirmed");
  const labReports = appointments.filter((a) => a.type === "test" && a.status === "completed");

  const stats = [
    { label: "Upcoming Appointments", value: loading ? "-" : upcoming.length, icon: <Calendar className="h-6 w-6" />, color: "text-primary bg-primary/10" },
    { label: "Active Prescriptions", value: loading ? "-" : prescriptions.length, icon: <Pill className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
    { label: "Lab Reports", value: loading ? "-" : labReports.length, icon: <FileText className="h-6 w-6" />, color: "text-orange-500 bg-orange-500/10" },
    { label: "Vitals Recorded", value: loading ? "-" : vitals.length, icon: <Activity className="h-6 w-6" />, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Welcome Back" description="Here's your health overview." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Prescriptions</h3>
          {prescriptions.length === 0 ? (
            <EmptyState message="No prescriptions yet." />
          ) : (
            <ul className="space-y-3">
              {prescriptions.slice(0, 3).map((p) => (
                <li key={p._id} className="text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                  <p className="font-medium text-foreground">{p.doctor}</p>
                  <p className="text-muted-foreground">{p.medicines.map((m) => m.name).join(", ")}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Upcoming Appointments</h3>
          {upcoming.length === 0 ? (
            <EmptyState message="No upcoming appointments." />
          ) : (
            <ul className="space-y-3">
              {upcoming.slice(0, 3).map((a) => (
                <li key={a._id} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium text-foreground">{a.type === "test" ? a.test?.name : `Consultation${a.doctor ? ` with ${a.doctor.fullName}` : ""}`}</p>
                    <p className="text-muted-foreground">{new Date(a.date).toLocaleDateString()}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientHome;

import { Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const DoctorHome = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.appointments || [];

  const today = new Date();
  const todayCount = appointments.filter((a) => isSameDay(new Date(a.date), today)).length;
  const uniquePatients = new Set(appointments.map((a) => a.patient?._id).filter(Boolean)).size;
  const completed = appointments.filter((a) => a.status === "completed").length;
  const cancelled = appointments.filter((a) => a.status === "cancelled").length;

  const stats = [
    { label: "Today's Appointments", value: loading ? "-" : todayCount, icon: <Calendar className="h-6 w-6" />, color: "text-primary bg-primary/10" },
    { label: "Total Patients", value: loading ? "-" : uniquePatients, icon: <Users className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
    { label: "Completed", value: loading ? "-" : completed, icon: <CheckCircle className="h-6 w-6" />, color: "text-green-500 bg-green-500/10" },
    { label: "Cancelled", value: loading ? "-" : cancelled, icon: <XCircle className="h-6 w-6" />, color: "text-red-500 bg-red-500/10" },
  ];

  const upcoming = appointments.filter((a) => a.status === "pending" || a.status === "confirmed");

  return (
    <div className="space-y-8">
      <PageHeader title="Welcome, Doctor" description="Here's your schedule overview." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Upcoming Appointments</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : upcoming.length === 0 ? (
          <EmptyState message="No upcoming appointments." />
        ) : (
          <ul className="divide-y divide-border">
            {upcoming.slice(0, 5).map((a) => (
              <li key={a._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.patient?.fullName || "Patient"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()}</p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;

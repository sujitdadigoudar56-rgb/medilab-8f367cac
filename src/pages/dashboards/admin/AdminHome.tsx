import { Users, Stethoscope, Heart, Calendar, Clock } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import StatCard from "@/components/dashboard/StatCard";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const AdminHome = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.recentAppointments || [];
  const today = new Date();
  const todayCount = appointments.filter((a) => isSameDay(new Date(a.date), today)).length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  const stats = [
    { label: "Total Patients", value: loading ? "-" : (data.patients || []).length, icon: <Users className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
    { label: "Doctors", value: loading ? "-" : (data.doctors || []).length, icon: <Stethoscope className="h-6 w-6" />, color: "text-primary bg-primary/10" },
    { label: "Nurses", value: loading ? "-" : (data.nurses || []).length, icon: <Heart className="h-6 w-6" />, color: "text-pink-500 bg-pink-500/10" },
    { label: "Appointments Today", value: loading ? "-" : todayCount, icon: <Calendar className="h-6 w-6" />, color: "text-orange-500 bg-orange-500/10" },
    { label: "Pending Appointments", value: loading ? "-" : pendingCount, icon: <Clock className="h-6 w-6" />, color: "text-red-500 bg-red-500/10" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Welcome, Admin" description="Here's an overview of your hospital." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Appointments</h3>
          {loading ? (
            <EmptyState message="Loading..." />
          ) : appointments.length === 0 ? (
            <EmptyState message="No appointments yet." />
          ) : (
            <ul className="divide-y divide-border">
              {appointments.slice(0, 5).map((a) => (
                <li key={a._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-sm font-medium text-foreground">{a.patient?.fullName || "Patient"}</p>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Activity</h3>
          {loading ? (
            <EmptyState message="Loading..." />
          ) : (data.recentActivity || []).length === 0 ? (
            <EmptyState message="No activity logged yet." />
          ) : (
            <ul className="divide-y divide-border">
              {(data.recentActivity || []).slice(0, 5).map((log) => (
                <li key={log._id} className="py-3">
                  <p className="text-sm text-foreground">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.user?.fullName || "System"} · {new Date(log.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

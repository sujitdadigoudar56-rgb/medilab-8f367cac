import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

const Reports = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.recentAppointments || [];

  const byStatus = ["pending", "confirmed", "completed", "cancelled"].map((status) => ({
    status,
    count: appointments.filter((a) => a.status === status).length,
  }));
  const testCount = appointments.filter((a) => a.type === "test").length;
  const consultCount = appointments.filter((a) => a.type === "consultation").length;
  const totalRevenue = appointments
    .filter((a) => a.status !== "cancelled")
    .reduce((sum, a) => sum + (a.amount || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader title="Reports" description="Aggregate platform statistics." />

      {loading ? (
        <EmptyState message="Loading..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Appointments by Status</h3>
            <ul className="space-y-3">
              {byStatus.map((s) => (
                <li key={s.status} className="flex items-center justify-between text-sm">
                  <span className="capitalize text-muted-foreground">{s.status}</span>
                  <span className="font-semibold text-foreground">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Summary</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between"><span className="text-muted-foreground">Lab test bookings</span><span className="font-semibold text-foreground">{testCount}</span></li>
              <li className="flex items-center justify-between"><span className="text-muted-foreground">Consultations</span><span className="font-semibold text-foreground">{consultCount}</span></li>
              <li className="flex items-center justify-between"><span className="text-muted-foreground">Total appointments</span><span className="font-semibold text-foreground">{appointments.length}</span></li>
              <li className="flex items-center justify-between border-t border-border pt-3"><span className="text-muted-foreground">Revenue (excl. cancelled)</span><span className="font-semibold text-foreground">₹{totalRevenue.toLocaleString()}</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;

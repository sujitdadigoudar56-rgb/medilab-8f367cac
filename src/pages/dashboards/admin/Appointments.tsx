import { useDashboardData } from "@/hooks/useDashboardData";
import { apiPatch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";

const Appointments = () => {
  const { data, loading, refetch } = useDashboardData();
  const { toast } = useToast();
  const appointments = data.recentAppointments || [];

  const cancel = async (id: string) => {
    try {
      await apiPatch(`/data/appointments/${id}`, { status: "cancelled" });
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Appointments" description="All appointments across the platform." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : appointments.length === 0 ? (
          <EmptyState message="No appointments yet." />
        ) : (
          <ul className="divide-y divide-border">
            {appointments.map((a) => (
              <li key={a._id} className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {a.patient?.fullName || "Patient"} — {a.type === "test" ? a.test?.name || "Lab Test" : `Consultation${a.doctor ? ` with ${a.doctor.fullName}` : ""}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()} · ₹{a.amount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.status} />
                  {(a.status === "pending" || a.status === "confirmed") && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => cancel(a._id)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;

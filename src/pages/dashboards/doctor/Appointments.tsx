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
  const appointments = data.appointments || [];

  const updateStatus = async (id: string, status: string) => {
    try {
      await apiPatch(`/data/appointments/${id}`, { status });
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Appointments" description="Manage your patient consultations." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : appointments.length === 0 ? (
          <EmptyState message="No appointments assigned to you yet." />
        ) : (
          <ul className="divide-y divide-border">
            {appointments.map((a) => (
              <li key={a._id} className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-foreground text-sm">{a.patient?.fullName || "Patient"}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={a.status} />
                  {a.status === "pending" && (
                    <Button variant="outline" size="sm" onClick={() => updateStatus(a._id, "confirmed")}>Confirm</Button>
                  )}
                  {(a.status === "pending" || a.status === "confirmed") && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => updateStatus(a._id, "completed")}>Complete</Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => updateStatus(a._id, "cancelled")}>Cancel</Button>
                    </>
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

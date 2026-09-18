import { Activity, Calendar } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatusBadge from "@/components/dashboard/StatusBadge";

const MedicalHistory = () => {
  const { data, loading } = useDashboardData();
  const appointments = data.appointments || [];
  const vitals = data.vitals || [];

  type TimelineEntry =
    | { kind: "appointment"; date: string; item: (typeof appointments)[number] }
    | { kind: "vitals"; date: string; item: (typeof vitals)[number] };

  const timeline: TimelineEntry[] = [
    ...appointments.map((a) => ({ kind: "appointment" as const, date: a.date, item: a })),
    ...vitals.map((v) => ({ kind: "vitals" as const, date: v.timestamp, item: v })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-8">
      <PageHeader title="Medical History" description="A timeline of your appointments and recorded vitals." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : timeline.length === 0 ? (
          <EmptyState message="No medical history yet." />
        ) : (
          <ul className="space-y-4">
            {timeline.map((entry, i) => (
              <li key={i} className="flex gap-4 border-b border-border last:border-0 pb-4 last:pb-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  {entry.kind === "appointment" ? <Calendar className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  {entry.kind === "appointment" ? (
                    <>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">
                          {entry.item.type === "test" ? entry.item.test?.name || "Lab Test" : `Consultation${entry.item.doctor ? ` with ${entry.item.doctor.fullName}` : ""}`}
                        </p>
                        <StatusBadge status={entry.item.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{new Date(entry.date).toLocaleString()}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-foreground">Vitals recorded</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        BP {entry.item.bloodPressure || "-"} · Temp {entry.item.temperature || "-"} · Pulse {entry.item.pulse || "-"} · SpO2 {entry.item.spO2 || "-"}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleString()}</p>
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

export default MedicalHistory;

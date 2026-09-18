import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";

const Prescriptions = () => {
  const { data, loading } = useDashboardData();
  const prescriptions = data.prescriptions || [];

  return (
    <div className="space-y-8">
      <PageHeader title="Prescriptions" description="Medicines prescribed by your doctors." />

      <div className="space-y-4">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : prescriptions.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 card-shadow">
            <EmptyState message="No prescriptions yet." />
          </div>
        ) : (
          prescriptions.map((p) => (
            <div key={p._id} className="bg-card rounded-xl border border-border p-6 card-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-foreground">{p.doctor}</h3>
                <span className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <ul className="space-y-1 mb-3">
                {p.medicines.map((m, i) => (
                  <li key={i} className="text-sm text-foreground">
                    {m.name} {m.dosage && <span className="text-muted-foreground">· {m.dosage}</span>} {m.duration && <span className="text-muted-foreground">· {m.duration}</span>}
                  </li>
                ))}
              </ul>
              {p.notes && <p className="text-sm text-muted-foreground italic">{p.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prescriptions;

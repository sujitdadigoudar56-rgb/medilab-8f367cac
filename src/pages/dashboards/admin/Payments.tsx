import { useApiData } from "@/hooks/useApiData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import type { AppointmentItem, PersonRef, TestRef, PackageRef } from "@/hooks/useDashboardData";

interface PaymentItem {
  _id: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  appointment?: {
    _id: string;
    patient?: PersonRef;
    doctor?: PersonRef;
    test?: TestRef;
    package?: PackageRef;
    type: "test" | "consultation";
  };
}

interface PaymentsResponse {
  confirmed: PaymentItem[];
  pending: AppointmentItem[];
}

const describeAppointment = (a?: { type: "test" | "consultation"; test?: TestRef; doctor?: PersonRef }) => {
  if (!a) return "Appointment";
  return a.type === "test" ? a.test?.name || "Lab Test" : `Consultation${a.doctor ? ` with ${a.doctor.fullName}` : ""}`;
};

const Payments = () => {
  const { data, loading } = useApiData<PaymentsResponse>("/payments", { confirmed: [], pending: [] });
  const { confirmed, pending } = data;

  const totalPending = pending.reduce((sum, a) => sum + (a.amount || 0), 0);
  const totalConfirmed = confirmed.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader title="Payments" description="Pending and confirmed payments across the platform." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <p className="text-2xl font-display font-bold text-orange-500">₹{totalPending.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{pending.length} appointment{pending.length !== 1 ? "s" : ""} awaiting payment</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 card-shadow">
          <p className="text-sm text-muted-foreground">Confirmed Payments</p>
          <p className="text-2xl font-display font-bold text-green-600">₹{totalConfirmed.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{confirmed.length} payment{confirmed.length !== 1 ? "s" : ""} received</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Pending Payments</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : pending.length === 0 ? (
          <EmptyState message="No pending payments." />
        ) : (
          <ul className="divide-y divide-border">
            {pending.map((a) => (
              <li key={a._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.patient?.fullName || "Patient"} — {describeAppointment(a)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600">
                  ₹{a.amount} unpaid
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Confirmed Payments</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : confirmed.length === 0 ? (
          <EmptyState message="No confirmed payments yet." />
        ) : (
          <ul className="divide-y divide-border">
            {confirmed.map((p) => (
              <li key={p._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {p.appointment?.patient?.fullName || "Patient"} — {describeAppointment(p.appointment)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(p.createdAt).toLocaleString()} · {p.razorpayPaymentId}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-600">
                  ₹{p.amount} paid
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Payments;

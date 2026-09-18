import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDashboardData, type AppointmentItem } from "@/hooks/useDashboardData";
import { useApiData } from "@/hooks/useApiData";
import { apiPost, apiPatch } from "@/lib/api";
import { payForAppointment } from "@/lib/payment";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TestOption {
  _id: string;
  name: string;
  price: number;
}

interface DoctorOption {
  _id: string;
  fullName: string;
}

interface BookingNavState {
  type?: "test" | "consultation";
  testId?: string;
}

const BookAppointment = () => {
  const { data, loading, refetch } = useDashboardData();
  const { data: tests } = useApiData<TestOption[]>("/data/tests", []);
  const { data: doctors } = useApiData<DoctorOption[]>("/data/users?role=doctor", []);
  const { toast } = useToast();
  const { user } = useAuth();
  const location = useLocation();
  const navState = (location.state as BookingNavState) || {};

  const [type, setType] = useState<"test" | "consultation">(navState.type || "test");
  const [testId, setTestId] = useState(navState.testId || "");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [payingId, setPayingId] = useState<string | null>(null);

  const appointments = data.appointments || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({ title: "Error", description: "Please choose a date", variant: "destructive" });
      return;
    }
    if (type === "test" && !testId) {
      toast({ title: "Error", description: "Please choose a test", variant: "destructive" });
      return;
    }
    if (type === "consultation" && !doctorId) {
      toast({ title: "Error", description: "Please choose a doctor", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const selectedTest = tests.find((t) => t._id === testId);
      const amount = type === "test" ? selectedTest?.price ?? 0 : 500;
      const appointment = await apiPost<AppointmentItem>("/data/appointments", {
        type,
        date: new Date(date).toISOString(),
        test: type === "test" ? testId : undefined,
        doctor: type === "consultation" ? doctorId : undefined,
        amount,
      });
      setDate("");
      setTestId("");
      setDoctorId("");
      refetch();

      try {
        await payForAppointment({ appointmentId: appointment._id, amount, name: user!.fullName, email: user!.email });
        toast({ title: "Booked & Paid!", description: "Your appointment is confirmed." });
      } catch {
        toast({ title: "Booked", description: "Payment wasn't completed — you can pay from My Appointments." });
      }
      refetch();
    } catch (error) {
      toast({ title: "Booking failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await apiPatch(`/data/appointments/${id}`, { status: "cancelled" });
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  };

  const handlePay = async (a: AppointmentItem) => {
    setPayingId(a._id);
    try {
      await payForAppointment({ appointmentId: a._id, amount: a.amount, name: user!.fullName, email: user!.email });
      toast({ title: "Paid!", description: "Payment successful." });
      refetch();
    } catch (error) {
      toast({ title: "Payment not completed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Book Appointment" description="Schedule a lab test or a doctor consultation." />

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 card-shadow space-y-4">
        <div className="flex gap-3">
          <Button type="button" variant={type === "test" ? "hero" : "outline"} size="sm" onClick={() => setType("test")}>
            Lab Test
          </Button>
          <Button type="button" variant={type === "consultation" ? "hero" : "outline"} size="sm" onClick={() => setType("consultation")}>
            Doctor Consultation
          </Button>
        </div>

        {type === "test" ? (
          <div className="space-y-2">
            <Label>Select Test</Label>
            <Select value={testId} onValueChange={setTestId}>
              <SelectTrigger><SelectValue placeholder="Choose a test" /></SelectTrigger>
              <SelectContent>
                {tests.map((t) => (
                  <SelectItem key={t._id} value={t._id}>{t.name} — ₹{t.price}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Select Doctor</Label>
            <Select value={doctorId} onValueChange={setDoctorId}>
              <SelectTrigger><SelectValue placeholder="Choose a doctor" /></SelectTrigger>
              <SelectContent>
                {doctors.map((d) => (
                  <SelectItem key={d._id} value={d._id}>{d.fullName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="date">Date & Time</Label>
          <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <Button type="submit" variant="hero" disabled={submitting}>
          {submitting ? "Booking..." : "Book Appointment"}
        </Button>
      </form>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">My Appointments</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : appointments.length === 0 ? (
          <EmptyState message="You have no appointments yet." />
        ) : (
          <ul className="divide-y divide-border">
            {appointments.map((a: AppointmentItem) => (
              <li key={a._id} className="py-3 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {a.type === "test" ? a.test?.name || "Lab Test" : `Consultation${a.doctor ? ` with ${a.doctor.fullName}` : ""}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleString()} · ₹{a.amount}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={a.status} />
                  {a.paymentStatus === "unpaid" && a.status !== "cancelled" && (
                    <Button variant="outline" size="sm" disabled={payingId === a._id} onClick={() => handlePay(a)}>
                      {payingId === a._id ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                  {(a.status === "pending" || a.status === "confirmed") && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleCancel(a._id)}>
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

export default BookAppointment;

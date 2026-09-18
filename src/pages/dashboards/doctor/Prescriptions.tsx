import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { apiPost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Prescriptions = () => {
  const { data, loading, refetch } = useDashboardData();
  const { toast } = useToast();
  const prescriptions = data.prescriptions || [];
  const appointments = data.appointments || [];

  const patients = Array.from(
    new Map(appointments.filter((a) => a.patient).map((a) => [a.patient!._id, a.patient!])).values()
  );

  const [patientId, setPatientId] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !medicineName.trim()) {
      toast({ title: "Error", description: "Choose a patient and enter a medicine", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await apiPost("/data/prescriptions", {
        patient: patientId,
        medicines: [{ name: medicineName.trim(), dosage: dosage.trim(), duration: duration.trim() }],
        notes: notes.trim(),
      });
      toast({ title: "Prescription sent", description: "The prescription was saved." });
      setMedicineName("");
      setDosage("");
      setDuration("");
      setNotes("");
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Prescriptions" description="Write and review prescriptions for your patients." />

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 card-shadow space-y-4">
        <h3 className="text-lg font-display font-semibold text-foreground">Write Prescription</h3>
        <div className="space-y-2">
          <Label>Patient</Label>
          <Select value={patientId} onValueChange={setPatientId}>
            <SelectTrigger><SelectValue placeholder={patients.length ? "Choose a patient" : "No patients yet"} /></SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p._id} value={p._id}>{p.fullName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="medicine">Medicine</Label>
            <Input id="medicine" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} placeholder="e.g. Paracetamol" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 500mg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 5 days" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional instructions..." />
        </div>
        <Button type="submit" variant="hero" disabled={submitting}>
          {submitting ? "Saving..." : "Send Prescription"}
        </Button>
      </form>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recently Written</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : prescriptions.length === 0 ? (
          <EmptyState message="You haven't written any prescriptions yet." />
        ) : (
          <ul className="divide-y divide-border">
            {prescriptions.map((p) => (
              <li key={p._id} className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{p.patient.fullName}</p>
                  <span className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">{p.medicines.map((m) => m.name).join(", ")}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;

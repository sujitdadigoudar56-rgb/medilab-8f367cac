import { useState } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useApiData } from "@/hooks/useApiData";
import { apiPost } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PatientOption {
  _id: string;
  fullName: string;
}

const Vitals = () => {
  const { data, loading, refetch } = useDashboardData();
  const { data: patients } = useApiData<PatientOption[]>("/data/users?role=patient", []);
  const { toast } = useToast();
  const vitals = data.vitals || [];

  const [patientId, setPatientId] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pulse, setPulse] = useState("");
  const [spO2, setSpO2] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) {
      toast({ title: "Error", description: "Choose a patient", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await apiPost("/data/vitals", { patient: patientId, bloodPressure, temperature, pulse, spO2 });
      toast({ title: "Saved", description: "Vitals recorded." });
      setBloodPressure("");
      setTemperature("");
      setPulse("");
      setSpO2("");
      refetch();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Vitals" description="Record and review patient vitals." />

      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 card-shadow space-y-4">
        <h3 className="text-lg font-display font-semibold text-foreground">Record Vitals</h3>
        <div className="space-y-2">
          <Label>Patient</Label>
          <Select value={patientId} onValueChange={setPatientId}>
            <SelectTrigger><SelectValue placeholder="Choose a patient" /></SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p._id} value={p._id}>{p.fullName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bp">Blood Pressure</Label>
            <Input id="bp" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} placeholder="120/80" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temp">Temperature</Label>
            <Input id="temp" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="98.6 F" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pulse">Pulse</Label>
            <Input id="pulse" value={pulse} onChange={(e) => setPulse(e.target.value)} placeholder="72 bpm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spo2">SpO2</Label>
            <Input id="spo2" value={spO2} onChange={(e) => setSpO2(e.target.value)} placeholder="98%" />
          </div>
        </div>
        <Button type="submit" variant="hero" disabled={submitting}>
          {submitting ? "Saving..." : "Save Vitals"}
        </Button>
      </form>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recorded Vitals</h3>
        {loading ? (
          <EmptyState message="Loading..." />
        ) : vitals.length === 0 ? (
          <EmptyState message="No vitals recorded yet." />
        ) : (
          <ul className="divide-y divide-border">
            {vitals.map((v) => (
              <li key={v._id} className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{v.patient.fullName}</p>
                  <span className="text-xs text-muted-foreground">{new Date(v.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">BP {v.bloodPressure || "-"} · Temp {v.temperature || "-"} · Pulse {v.pulse || "-"} · SpO2 {v.spO2 || "-"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Vitals;

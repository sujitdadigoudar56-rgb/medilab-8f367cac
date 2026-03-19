import DashboardLayout from "@/components/DashboardLayout";
import { Users, Activity, BedDouble, ClipboardList } from "lucide-react";

const stats = [
  { label: "Assigned Patients", value: "18", icon: <Users className="h-6 w-6" />, color: "text-primary bg-primary/10" },
  { label: "Vitals Pending", value: "6", icon: <Activity className="h-6 w-6" />, color: "text-red-500 bg-red-500/10" },
  { label: "Ward Beds", value: "24", icon: <BedDouble className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
  { label: "Observations Today", value: "12", icon: <ClipboardList className="h-6 w-6" />, color: "text-orange-500 bg-orange-500/10" },
];

const NurseDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">Welcome, Nurse</h2>
          <p className="text-muted-foreground">Here's your patient care overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-6 card-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Patient Vitals</h3>
            <p className="text-muted-foreground text-sm">Vitals tracking will be available in the next phase.</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Daily Observations</h3>
            <p className="text-muted-foreground text-sm">Observation logs will be available in the next phase.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NurseDashboard;

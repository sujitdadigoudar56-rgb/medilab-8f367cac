import DashboardLayout from "@/components/DashboardLayout";
import { Users, Stethoscope, Calendar, Activity, Heart, Building2 } from "lucide-react";

const stats = [
  { label: "Total Patients", value: "1,240", icon: <Users className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
  { label: "Doctors", value: "48", icon: <Stethoscope className="h-6 w-6" />, color: "text-primary bg-primary/10" },
  { label: "Nurses", value: "96", icon: <Heart className="h-6 w-6" />, color: "text-pink-500 bg-pink-500/10" },
  { label: "Appointments Today", value: "32", icon: <Calendar className="h-6 w-6" />, color: "text-orange-500 bg-orange-500/10" },
  { label: "Departments", value: "12", icon: <Building2 className="h-6 w-6" />, color: "text-purple-500 bg-purple-500/10" },
  { label: "Active Cases", value: "156", icon: <Activity className="h-6 w-6" />, color: "text-red-500 bg-red-500/10" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">Welcome, Admin</h2>
          <p className="text-muted-foreground">Here's an overview of your hospital.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Appointments</h3>
            <p className="text-muted-foreground text-sm">Appointment management will be available in the next phase.</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Activity</h3>
            <p className="text-muted-foreground text-sm">Activity log will be available in the next phase.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

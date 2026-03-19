import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, Pill, FileText, MessageSquare } from "lucide-react";

const stats = [
  { label: "Upcoming Appointments", value: "2", icon: <Calendar className="h-6 w-6" />, color: "text-primary bg-primary/10" },
  { label: "Active Prescriptions", value: "3", icon: <Pill className="h-6 w-6" />, color: "text-blue-500 bg-blue-500/10" },
  { label: "Lab Reports", value: "7", icon: <FileText className="h-6 w-6" />, color: "text-orange-500 bg-orange-500/10" },
  { label: "Unread Messages", value: "1", icon: <MessageSquare className="h-6 w-6" />, color: "text-purple-500 bg-purple-500/10" },
];

const PatientDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">Welcome Back</h2>
          <p className="text-muted-foreground">Here's your health overview.</p>
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
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Prescriptions</h3>
            <p className="text-muted-foreground text-sm">Your prescription details will appear here.</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">Upcoming Appointments</h3>
            <p className="text-muted-foreground text-sm">Your appointment schedule will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;

import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, type AppRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, Users, Calendar, FileText, Settings, LogOut,
  Menu, X, Stethoscope, Heart, User, ChevronRight, Activity,
  ClipboardList, Building2, BarChart3, UserCog, Pill, BedDouble,
  MessageSquare, Download, CreditCard
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navByRole: Record<AppRole, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Doctors", href: "/admin/doctors", icon: <Stethoscope className="h-5 w-5" /> },
    { label: "Nurses", href: "/admin/nurses", icon: <Heart className="h-5 w-5" /> },
    { label: "Patients", href: "/admin/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Appointments", href: "/admin/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Payments", href: "/admin/payments", icon: <CreditCard className="h-5 w-5" /> },
    { label: "Departments", href: "/admin/departments", icon: <Building2 className="h-5 w-5" /> },
    { label: "Reports", href: "/admin/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "User Management", href: "/admin/users", icon: <UserCog className="h-5 w-5" /> },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Appointments", href: "/doctor/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "My Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Prescriptions", href: "/doctor/prescriptions", icon: <Pill className="h-5 w-5" /> },
    { label: "Reports", href: "/doctor/reports", icon: <FileText className="h-5 w-5" /> },
    { label: "Profile", href: "/doctor/profile", icon: <User className="h-5 w-5" /> },
  ],
  nurse: [
    { label: "Dashboard", href: "/nurse", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Patients", href: "/nurse/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Vitals", href: "/nurse/vitals", icon: <Activity className="h-5 w-5" /> },
    { label: "Ward Info", href: "/nurse/ward", icon: <BedDouble className="h-5 w-5" /> },
    { label: "Observations", href: "/nurse/observations", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Profile", href: "/nurse/profile", icon: <User className="h-5 w-5" /> },
  ],
  patient: [
    { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Book Appointment", href: "/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Prescriptions", href: "/patient/prescriptions", icon: <Pill className="h-5 w-5" /> },
    { label: "Medical History", href: "/patient/history", icon: <FileText className="h-5 w-5" /> },
    { label: "Reports", href: "/patient/reports", icon: <Download className="h-5 w-5" /> },
    { label: "Messages", href: "/patient/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
  ],
};

const roleLabels: Record<AppRole, string> = {
  admin: "Administrator",
  doctor: "Doctor",
  nurse: "Nurse",
  patient: "Patient",
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, role, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!role) return null;

  const navItems = navByRole[role];

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-secondary/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-7 w-7 text-primary" />
              <span className="text-xl font-display font-bold text-foreground">MediCare</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{roleLabels[role]} Panel</p>
          </div>

          {/* Nav items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-display font-semibold text-foreground">
            {navItems.find((i) => i.href === location.pathname)?.label || "Dashboard"}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

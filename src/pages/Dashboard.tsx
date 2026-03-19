import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Route to role-specific dashboard
  switch (role) {
    case "admin":
      return <Navigate to="/admin" replace />;
    case "doctor":
      return <Navigate to="/doctor" replace />;
    case "nurse":
      return <Navigate to="/nurse" replace />;
    case "patient":
      return <Navigate to="/patient" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default Dashboard;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <ShieldX className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Please contact your administrator.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="hero" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="heroOutline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

const StatCard = ({ label, value, icon, color }: StatCardProps) => (
  <div className="bg-card rounded-xl border border-border p-6 card-shadow">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

export default StatCard;

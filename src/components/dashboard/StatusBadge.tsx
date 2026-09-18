const statusStyles: Record<string, string> = {
  pending: "bg-orange-500/10 text-orange-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  completed: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-600",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
      statusStyles[status] || "bg-muted text-muted-foreground"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;

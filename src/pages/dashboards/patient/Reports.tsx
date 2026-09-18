import { Download, FileText } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { data, loading } = useDashboardData();
  const { toast } = useToast();
  const reports = (data.appointments || []).filter((a) => a.type === "test" && a.status === "completed");

  return (
    <div className="space-y-8">
      <PageHeader title="Lab Reports" description="Digital reports for your completed lab tests." />

      <div className="bg-card rounded-xl border border-border p-6 card-shadow">
        {loading ? (
          <EmptyState message="Loading..." />
        ) : reports.length === 0 ? (
          <EmptyState message="No completed reports yet. Reports appear here once a lab test is marked complete." />
        ) : (
          <ul className="divide-y divide-border">
            {reports.map((r) => (
              <li key={r._id} className="py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{r.test?.name || "Lab Test"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast({ title: "Not available", description: "Report file downloads aren't set up yet." })}
                >
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reports;

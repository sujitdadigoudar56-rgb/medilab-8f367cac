import { FileText } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ComingSoon from "@/components/dashboard/ComingSoon";

const Reports = () => (
  <div className="space-y-8">
    <PageHeader title="Reports" description="Lab and diagnostic reports for your patients." />
    <ComingSoon
      icon={<FileText className="w-6 h-6" />}
      title="Report authoring isn't set up yet"
      description="Doctor-authored diagnostic reports will be added in a future update."
    />
  </div>
);

export default Reports;

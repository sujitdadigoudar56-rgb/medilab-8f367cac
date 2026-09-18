import { BedDouble } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ComingSoon from "@/components/dashboard/ComingSoon";

const WardInfo = () => (
  <div className="space-y-8">
    <PageHeader title="Ward Info" description="Bed occupancy and ward assignments." />
    <ComingSoon
      icon={<BedDouble className="w-6 h-6" />}
      title="Ward management isn't set up yet"
      description="Bed and ward tracking will be added in a future update."
    />
  </div>
);

export default WardInfo;

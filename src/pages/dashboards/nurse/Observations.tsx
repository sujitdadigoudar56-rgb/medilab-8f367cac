import { ClipboardList } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ComingSoon from "@/components/dashboard/ComingSoon";

const Observations = () => (
  <div className="space-y-8">
    <PageHeader title="Observations" description="Daily clinical observation logs." />
    <ComingSoon
      icon={<ClipboardList className="w-6 h-6" />}
      title="Observation logs aren't set up yet"
      description="Free-form clinical observations will be added in a future update."
    />
  </div>
);

export default Observations;

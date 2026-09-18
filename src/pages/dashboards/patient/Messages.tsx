import { MessageSquare } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ComingSoon from "@/components/dashboard/ComingSoon";

const Messages = () => (
  <div className="space-y-8">
    <PageHeader title="Messages" description="Chat with your care team." />
    <ComingSoon
      icon={<MessageSquare className="w-6 h-6" />}
      title="Messaging isn't set up yet"
      description="Direct messaging with doctors and staff will be added in a future update."
    />
  </div>
);

export default Messages;

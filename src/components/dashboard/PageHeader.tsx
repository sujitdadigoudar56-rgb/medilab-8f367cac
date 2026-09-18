import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="flex items-start justify-between gap-4 flex-wrap">
    <div>
      <h2 className="text-2xl font-display font-bold text-foreground mb-1">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
    {action}
  </div>
);

export default PageHeader;

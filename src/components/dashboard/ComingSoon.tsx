import { ReactNode } from "react";

interface ComingSoonProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ComingSoon = ({ icon, title, description }: ComingSoonProps) => (
  <div className="bg-card rounded-xl border border-border p-12 card-shadow text-center">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
    <span className="inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
      Coming Soon
    </span>
  </div>
);

export default ComingSoon;

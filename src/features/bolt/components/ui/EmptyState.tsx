import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <Icon className="w-12 h-12 text-muted mb-4" />
      <h3 className="text-[14px] font-medium text-primary mb-2">{title}</h3>
      <p className="text-[12px] text-muted mb-4 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

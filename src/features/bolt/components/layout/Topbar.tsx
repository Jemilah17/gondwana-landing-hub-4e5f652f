import { ReactNode } from 'react';

interface TopbarProps {
  title: string;
  actions?: ReactNode;
}

export default function Topbar({ title, actions }: TopbarProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <h1 className="text-[14px] font-medium text-primary">{title}</h1>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

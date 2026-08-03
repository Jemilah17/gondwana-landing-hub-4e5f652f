import type { ReactNode } from 'react';

export function Card({ children, className = '', accent = false }: { children: ReactNode; className?: string; accent?: boolean }) {
  return (
    <div
      className={`bg-card border border-border rounded-md ${accent ? 'border-l-[3px] border-l-orange' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ tone, children }: { tone: 'green' | 'amber' | 'orange' | 'red' | 'blue' | 'gray'; children: ReactNode }) {
  const tones: Record<string, string> = {
    green: 'bg-green-tint text-green',
    amber: 'bg-amber-tint text-amber',
    orange: 'bg-orange-tint text-orange',
    red: 'bg-red-tint text-red',
    blue: 'bg-blue-tint text-blue',
    gray: 'bg-black/5 text-muted',
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] ${tones[tone]}`}>{children}</span>;
}

export function DirectorHeader({ title, subtitle, right }: { title: string; subtitle: string; right?: ReactNode }) {
  return (
    <div className="flex items-start justify-between px-6 py-4 border-b border-border bg-card">
      <div>
        <div className="text-[16px] font-medium text-primary">{title}</div>
        <div className="text-[11px] text-muted mt-0.5">{subtitle}</div>
      </div>
      {right}
    </div>
  );
}

export const todayLabel = 'Monday, 28 July 2026';

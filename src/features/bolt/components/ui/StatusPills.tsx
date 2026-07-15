interface StatusPillProps {
  status: string;
}

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  compliant: { label: 'Compliant', bg: 'bg-green/10', text: 'text-green' },
  'due soon': { label: 'Due soon', bg: 'bg-amber/10', text: 'text-amber' },
  overdue: { label: 'Overdue', bg: 'bg-red/10', text: 'text-red' },
  filed: { label: 'Filed', bg: 'bg-green/10', text: 'text-green' },
  pending: { label: 'Pending', bg: 'bg-muted/10', text: 'text-muted' },
  active: { label: 'Active', bg: 'bg-green/10', text: 'text-green' },
  retired: { label: 'Retired', bg: 'bg-muted/10', text: 'text-muted' },
  current: { label: 'Current', bg: 'bg-green/10', text: 'text-green' },
  'review due': { label: 'Review due', bg: 'bg-amber/10', text: 'text-amber' },
  expired: { label: 'Expired', bg: 'bg-red/10', text: 'text-red' },
  draft: { label: 'Draft', bg: 'bg-orange/10', text: 'text-orange' },
  applied: { label: 'Applied', bg: 'bg-green/10', text: 'text-green' },
  applying: { label: 'Applying', bg: 'bg-amber/10', text: 'text-amber' },
  'not yet addressed': { label: 'Not yet addressed', bg: 'bg-red/10', text: 'text-red' },
  critical: { label: 'Critical', bg: 'bg-red/10', text: 'text-red' },
  high: { label: 'High', bg: 'bg-orange/10', text: 'text-orange' },
  medium: { label: 'Medium', bg: 'bg-amber/10', text: 'text-amber' },
  low: { label: 'Low', bg: 'bg-muted/10', text: 'text-muted' },
  'expiring soon': { label: 'Expiring soon', bg: 'bg-amber/10', text: 'text-amber' },
  maturing: { label: 'Maturing', bg: 'bg-amber/10', text: 'text-amber' },
  'under renewal': { label: 'Under renewal', bg: 'bg-blue/10', text: 'text-blue' },
};

export default function StatusPill({ status }: StatusPillProps) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export function TypePill({ type, color }: { type: string; color: string }) {
  return (
    <span className={`inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium ${color}`}>
      {type}
    </span>
  );
}

import type { Filing } from '../../data/filings';

const HANDOFF: Record<Filing['handoffStage'], [string, string]> = {
  not_due: ['Not due', 'bg-muted/10 text-muted'],
  handed_to_consultant: ['With consultant', 'bg-blue/10 text-blue'],
  filed_awaiting_proof: ['Awaiting proof', 'bg-amber/10 text-amber'],
  confirmed_filed: ['Confirmed filed', 'bg-green/10 text-green'],
  overdue_unconfirmed: ['Overdue · unconfirmed', 'bg-red/10 text-red'],
};

export default function HandoffPill({ stage }: { stage: Filing['handoffStage'] }) {
  const [label, cls] = HANDOFF[stage];
  return <span className={`px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap ${cls}`}>{label}</span>;
}

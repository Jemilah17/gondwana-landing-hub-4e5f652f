import { Link } from '@tanstack/react-router';
import { ArrowRight, AlertTriangle, Clock, FileCheck } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { useFilings } from '../contexts/FilingsContext';
import type { Filing } from '../data/filings';

const TODAY = new Date('2026-08-04T00:00:00Z');

function daysBetween(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return Math.round((d.getTime() - TODAY.getTime()) / 86400000);
}

function fmt(dateStr: string) {
  return new Date(dateStr + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function CountTile({ label, count, tint, text, icon: Icon }: {
  label: string;
  count: number;
  tint: string;
  text: string;
  icon: typeof Clock;
}) {
  return (
    <div className={`${tint} rounded-lg px-4 py-3 flex items-center gap-3`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-card ${text}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <div className={`text-[22px] font-medium leading-none ${text}`}>{count}</div>
        <div className="text-[10px] mt-1" style={{ color: '#9A4D20' }}>{label}</div>
      </div>
    </div>
  );
}

function OverdueRow({ filing }: { filing: Filing }) {
  const diff = Math.abs(daysBetween(filing.dueDate));
  return (
    <div className="bg-card border border-border border-l-[3px] border-l-red rounded-lg px-4 py-3 flex items-center gap-3">
      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-red-tint text-red">
        <AlertTriangle className="w-4 h-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-medium text-primary truncate">{filing.entityName}</div>
        <div className="text-[10px] text-muted">{filing.type}</div>
        <div className="text-[10px] text-red">
          Due {fmt(filing.dueDate)} · {diff} days overdue · not confirmed as filed
        </div>
      </div>
      <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-red-tint text-red">
        Overdue & unconfirmed
      </span>
    </div>
  );
}

export default function ConsultantDashboard() {
  const { filings } = useFilings();

  // The consultant sees everything assigned to them, across all clusters.
  const mine = filings.filter(f => f.assignedTo === 'consultant');
  const handedOff = mine.filter(f => f.handoffStage === 'handed_to_consultant');
  const awaitingProof = mine.filter(f => f.handoffStage === 'filed_awaiting_proof');
  const overdue = mine.filter(f => f.handoffStage === 'overdue_unconfirmed');
  const upcoming = mine.filter(f => f.handoffStage === 'not_due');

  return (
    <div>
      <Topbar title="Consultant Dashboard" />

      <div className="p-6 space-y-5 max-w-3xl">
        <p className="text-[11px] text-muted">
          Assigned filings across all Gondwana entities — Namibia CoSec Services
        </p>

        {/* Overdue filings first — same red treatment as the internal side */}
        {overdue.length > 0 && (
          <section className="space-y-2">
            <div className="bg-red-tint rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-[11px] font-medium text-red">Overdue & unconfirmed</span>
              <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-card text-red">
                {overdue.length}
              </span>
            </div>
            {overdue.map(f => <OverdueRow key={f.id} filing={f} />)}
          </section>
        )}

        {/* Count tiles */}
        <div className="grid grid-cols-3 gap-3">
          <CountTile label="Handed off" count={handedOff.length} tint="bg-orange-tint" text="text-orange" icon={Clock} />
          <CountTile label="Awaiting proof" count={awaitingProof.length} tint="bg-amber-tint" text="text-amber" icon={FileCheck} />
          <CountTile label="Overdue" count={overdue.length} tint="bg-red-tint" text="text-red" icon={AlertTriangle} />
        </div>

        {/* Upcoming assigned work */}
        <section className="space-y-2">
          <div className="bg-background rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted">Not yet due</span>
            <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-card text-muted">
              {upcoming.length}
            </span>
          </div>
          {upcoming.length === 0 && (
            <p className="text-[11px] text-muted px-1">Nothing upcoming.</p>
          )}
          {upcoming.map(f => (
            <div key={f.id} className="bg-card border border-border border-l-[3px] border-l-border rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium text-primary truncate">{f.entityName}</div>
                <div className="text-[10px] text-muted">{f.type}</div>
                <div className="text-[10px] text-muted">Due {fmt(f.dueDate)}</div>
              </div>
              <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-muted/10 text-muted">
                Cluster {f.cluster}
              </span>
            </div>
          ))}
        </section>

        {/* Filings list lives on its own page */}
        <Link
          to="/consultant-filings"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
        >
          View all assigned filings
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

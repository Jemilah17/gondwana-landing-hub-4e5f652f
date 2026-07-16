import { useState } from 'react';
import { Plus, ChevronRight, Flag } from 'lucide-react';
import Topbar from '../components/layout/Topbar';

type Stage = 'Draft' | 'Circulated' | 'Reviewed' | 'Approved' | 'Signed';

interface MinuteRow {
  id: string;
  title: string;
  date: string;
  stage: Stage;
  flagged?: boolean;
}

const initialRows: MinuteRow[] = [
  { id: 'm1', title: 'February 2026 General Meeting', date: 'Feb 2026', stage: 'Draft', flagged: true },
  { id: 'm2', title: '4th Annual General Meeting', date: '24 Jun 2021', stage: 'Signed' },
  { id: 'm3', title: '5th Annual General Meeting', date: '02 Jun 2022', stage: 'Signed' },
  { id: 'm4', title: '3rd Annual General Meeting', date: '08 Apr 2020', stage: 'Signed' },
];

const stages: Stage[] = ['Draft', 'Circulated', 'Reviewed', 'Approved', 'Signed'];

function WorkflowBanner({ current }: { current: Stage }) {
  const currentIdx = stages.indexOf(current);
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="text-[10px] uppercase tracking-wider text-muted mb-3 font-medium">Minutes workflow</div>
      <div className="flex items-center">
        {stages.map((s, i) => {
          const active = i <= currentIdx;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-initial">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium border ${
                    active
                      ? 'bg-orange border-orange text-white'
                      : 'bg-background border-border text-muted'
                  }`}
                >
                  {i + 1}
                </div>
                <span className={`text-[12px] font-medium ${active ? 'text-primary' : 'text-muted'}`}>{s}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < currentIdx ? 'bg-orange' : 'bg-border'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StageBadge({ stage }: { stage: Stage }) {
  const map: Record<Stage, string> = {
    Draft: 'bg-orange-tint text-orange',
    Circulated: 'bg-amber-tint text-amber',
    Reviewed: 'bg-amber-tint text-amber',
    Approved: 'bg-green-tint text-green',
    Signed: 'bg-green-tint text-green',
  };
  return (
    <span className={`inline-flex px-2 py-[2px] rounded-lg text-[10px] font-medium ${map[stage]}`}>{stage}</span>
  );
}

function SetupView({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('February 2026 General Meeting');
  const [date, setDate] = useState('2026-02-15');
  const [location, setLocation] = useState('Windhoek Head Office');

  return (
    <div>
      <Topbar
        title="New minutes — Setup"
        actions={
          <button
            onClick={onBack}
            className="px-3 py-1.5 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
          >
            Back to register
          </button>
        }
      />
      <div className="p-6">
        <WorkflowBanner current="Draft" />
        <div className="bg-card border border-border rounded-lg p-6 max-w-2xl">
          <div className="text-[13px] font-medium text-primary mb-4">Meeting details</div>
          <div className="space-y-4">
            <Field label="Meeting title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background focus:outline-none focus:border-orange"
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background focus:outline-none focus:border-orange"
              />
            </Field>
            <Field label="Location">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background focus:outline-none focus:border-orange"
              />
            </Field>
            <Field label="Attendees">
              <textarea
                rows={3}
                placeholder="List directors and invitees…"
                className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background focus:outline-none focus:border-orange"
              />
            </Field>
            <Field label="Agenda">
              <textarea
                rows={5}
                placeholder="1. Apologies&#10;2. Approval of prior minutes&#10;3. …"
                className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background focus:outline-none focus:border-orange"
              />
            </Field>
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-border">
            <button
              onClick={onBack}
              className="px-3 py-1.5 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
            >
              Cancel
            </button>
            <button className="px-3 py-1.5 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90">
              Save draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-medium text-muted mb-1">{label}</div>
      {children}
    </label>
  );
}

export default function Minutes() {
  const [view, setView] = useState<'list' | 'setup'>('list');
  const [rows] = useState<MinuteRow[]>(initialRows);

  if (view === 'setup') return <SetupView onBack={() => setView('list')} />;

  return (
    <div>
      <Topbar
        title="Minutes"
        actions={
          <button
            onClick={() => setView('setup')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" /> New minutes
          </button>
        }
      />
      <div className="p-6">
        <WorkflowBanner current="Draft" />

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="text-[13px] font-medium text-primary">Minutes register</div>
            <div className="text-[11px] text-muted">{rows.length} records</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Meeting</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Stage</th>
                <th className="px-4 py-2 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0 hover:bg-background">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {row.flagged && <Flag className="w-3.5 h-3.5 text-orange fill-orange" />}
                      <span className="text-[12px] font-medium text-primary">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted">{row.date}</td>
                  <td className="px-4 py-3"><StageBadge stage={row.stage} /></td>
                  <td className="px-4 py-3 text-right">
                    {row.stage === 'Draft' ? (
                      <button
                        onClick={() => setView('setup')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange text-white rounded-lg text-[11px] font-medium hover:opacity-90"
                      >
                        Continue <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-1 px-2.5 py-1 border border-border text-primary rounded-lg text-[11px] font-medium hover:bg-background">
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
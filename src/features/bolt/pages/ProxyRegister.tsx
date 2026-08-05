import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import Modal from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';

const TOTAL_SHARES = 55_000_000;

const MEETINGS = [
  { id: 'gm-2026', label: 'February 2026 General Meeting — 26 Feb 2026', short: 'Feb 2026 GM', deadline: '23 Feb 2026' },
  { id: 'agm-5', label: '5th AGM — 02 Jun 2022', short: '5th AGM', deadline: '30 May 2022' },
  { id: 'agm-4', label: '4th AGM — 24 Jun 2021', short: '4th AGM', deadline: '21 Jun 2021' },
];

interface ProxyRow {
  no: string;
  shareholder: string;
  meta?: string;
  shares: number;
  formReceived: string;
  instruction: string;
  dateLodged: string;
  lodgedWith: string;
  status: 'filed' | 'not-voted';
}

const INITIAL_ROWS: ProxyRow[] = [
  { no: '001', shareholder: 'Gys Joubert', meta: 'MD · Executive', shares: 4_200_000, formReceived: 'Yes', instruction: 'For all', dateLodged: '20 Feb 2026', lodgedWith: 'Fabiola', status: 'filed' },
  { no: '002', shareholder: 'GCN Employee Share Scheme', shares: 3_850_000, formReceived: 'Yes', instruction: 'For all', dateLodged: '21 Feb 2026', lodgedWith: 'Fabiola', status: 'filed' },
  { no: '003', shareholder: 'Institutional shareholders (960+ combined)', shares: 35_070_000, formReceived: 'Yes', instruction: 'For all', dateLodged: '22 Feb 2026', lodgedWith: 'Fabiola', status: 'filed' },
];

const num = (n: number) => n.toLocaleString('en-US');
const pct = (n: number) => ((n / TOTAL_SHARES) * 100).toFixed(1) + '%';

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-card border border-border rounded-xl ${className}`}>{children}</div>;
}

function SideCard({ title, children, tint }: { title: string; children: React.ReactNode; tint?: string }) {
  return (
    <div className={`rounded-xl border p-3 mb-3 ${tint ?? 'bg-card border-border'}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted mb-2">{title}</div>
      {children}
    </div>
  );
}

export default function ProxyRegister() {
  const { showToast } = useToast();
  const [meeting, setMeeting] = useState(MEETINGS[0].id);
  const [rows, setRows] = useState<ProxyRow[]>(INITIAL_ROWS);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ shareholder: '', shares: '', date: '', instruction: 'For all', lodgedBy: 'Fabiola' });

  const active = MEETINGS.find((m) => m.id === meeting)!;
  const represented = rows.reduce((s, r) => s + r.shares, 0);
  const notRepresented = TOTAL_SHARES - represented;
  const repPct = (represented / TOTAL_SHARES) * 100;

  const save = () => {
    const shares = Number(form.shares.replace(/[^0-9]/g, ''));
    if (!form.shareholder.trim() || !shares) return;
    setRows((prev) => [
      ...prev,
      {
        no: String(prev.length + 1).padStart(3, '0'),
        shareholder: form.shareholder.trim(),
        shares,
        formReceived: 'Yes',
        instruction: form.instruction,
        dateLodged: form.date || '—',
        lodgedWith: form.lodgedBy,
        status: 'filed',
      },
    ]);
    setModalOpen(false);
    setForm({ shareholder: '', shares: '', date: '', instruction: 'For all', lodgedBy: 'Fabiola' });
    showToast('Proxy form added to register');
  };

  const inputCls = 'w-full border border-border rounded-lg px-2.5 py-1.5 text-[12px] text-primary bg-card focus:outline-none focus:border-orange';
  const labelCls = 'block text-[10px] uppercase tracking-wider text-muted mb-1';

  return (
    <>
      <Topbar
        title="Proxy register"
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="border border-orange text-orange rounded-lg px-3 py-1.5 text-[12px] font-medium hover:bg-orange-tint"
          >
            Add proxy
          </button>
        }
      />

      <div className="flex gap-4 p-6 items-start">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="text-[11px] text-muted -mt-2">
            Shareholder proxy submissions and voting instructions — Gondwana Holdings Ltd
          </div>

          {/* Meeting selector */}
          <Card className="p-4">
            <label className={labelCls}>Meeting</label>
            <select
              value={meeting}
              onChange={(e) => setMeeting(e.target.value)}
              className={`${inputCls} max-w-[420px]`}
            >
              {MEETINGS.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </Card>

          {/* Summary bar */}
          <div className="bg-orange-tint border border-orange-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <div className="text-[13px] font-medium text-primary">{active.label}</div>
                <div className="text-[11px] text-muted mt-0.5">Proxy deadline: {active.deadline}</div>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-[20px] font-medium text-orange leading-tight">{repPct.toFixed(1)}%</div>
                  <div className="text-[10px] text-muted">Proxy representation</div>
                </div>
                <div>
                  <div className="text-[20px] font-medium text-charcoal leading-tight">
                    {(represented / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] text-muted">Shares represented</div>
                </div>
                <div>
                  <div className="text-[20px] font-medium text-green leading-tight">{rows.length}</div>
                  <div className="text-[10px] text-muted">Proxy forms received</div>
                </div>
              </div>
            </div>

            <div className="mt-4 h-2 w-full rounded-full bg-white/70 overflow-hidden">
              <div className="h-full bg-orange rounded-full" style={{ width: `${repPct}%` }} />
            </div>
            <div className="text-[10px] text-muted mt-1.5">
              {repPct.toFixed(1)}% of {num(TOTAL_SHARES)} shares represented
            </div>

            <div className="mt-3 bg-green-tint border border-green/20 rounded-lg px-3 py-2 text-[11px] text-green">
              ✓ Quorum met — 3 members required per Article 15.2. 56.1% proxy representation confirmed at meeting.
            </div>
          </div>

          {/* Proxy table */}
          <Card className="overflow-hidden">
            <div className="px-4 py-3 border-b border-border text-[12px] font-medium text-primary">
              Proxy forms lodged
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-muted border-b border-border">
                    {['#', 'Shareholder', 'Shares', '%', 'Form received', 'Voting instruction', 'Date lodged', 'Lodged with', 'Status'].map((h) => (
                      <th key={h} className="text-left font-normal px-3 py-2 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.no} className="border-b border-border last:border-0">
                      <td className="px-3 py-2.5 text-muted">{r.no}</td>
                      <td className="px-3 py-2.5">
                        <div className="text-primary font-medium">{r.shareholder}</div>
                        {r.meta && <div className="text-[10px] text-muted">{r.meta}</div>}
                      </td>
                      <td className="px-3 py-2.5 text-primary whitespace-nowrap">{num(r.shares)}</td>
                      <td className="px-3 py-2.5 text-muted">{pct(r.shares)}</td>
                      <td className="px-3 py-2.5 text-primary">{r.formReceived}</td>
                      <td className="px-3 py-2.5 text-primary">{r.instruction}</td>
                      <td className="px-3 py-2.5 text-muted whitespace-nowrap">{r.dateLodged}</td>
                      <td className="px-3 py-2.5 text-muted">{r.lodgedWith}</td>
                      <td className="px-3 py-2.5">
                        <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-green-tint text-green">Filed</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-background/60">
                    <td className="px-3 py-2.5 text-muted">—</td>
                    <td className="px-3 py-2.5 text-muted">Not represented</td>
                    <td className="px-3 py-2.5 text-muted whitespace-nowrap">{num(notRepresented)}</td>
                    <td className="px-3 py-2.5 text-muted">{pct(notRepresented)}</td>
                    <td className="px-3 py-2.5 text-muted">—</td>
                    <td className="px-3 py-2.5 text-muted">Not voted</td>
                    <td className="px-3 py-2.5 text-muted">—</td>
                    <td className="px-3 py-2.5 text-muted">—</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-muted/10 text-muted">Not voted</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 text-[10px] text-muted italic border-t border-border">
              {pct(notRepresented)} not represented. Meeting quorate at {repPct.toFixed(1)}% proxy representation.
            </div>
          </Card>

          {/* Resolution voting summary */}
          <Card className="p-4">
            <div className="text-[12px] font-medium text-primary mb-3">Resolution outcomes — Feb 2026 GM</div>
            <div className="text-[11px] font-medium text-primary">
              OR-2026-001 — Issue 10,400,000 shares at N$10.00
            </div>
            <div className="mt-2 flex h-2.5 w-full rounded-full overflow-hidden">
              <div className="bg-green" style={{ width: '78.4%' }} />
              <div className="bg-red" style={{ width: '0%' }} />
              <div className="bg-muted/30" style={{ width: '21.6%' }} />
            </div>
            <div className="mt-2 flex items-center gap-4 text-[10px] text-muted">
              <span><span className="text-green font-medium">FOR:</span> 78.4%</span>
              <span><span className="text-red font-medium">AGAINST:</span> 0%</span>
              <span>NOT VOTED: 21.6%</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] text-muted">Outcome:</span>
              <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-green-tint text-green">Passed</span>
            </div>
            <div className="text-[10px] text-muted mt-1">Effective 26 February 2026</div>
          </Card>
        </div>

        {/* Right sidebar */}
        <aside className="w-[220px] flex-shrink-0">
          <SideCard title="Proxy statistics">
            {[
              ['Total shares', num(TOTAL_SHARES)],
              ['Forms received', String(rows.length)],
              ['Represented', `${num(represented)} (${repPct.toFixed(1)}%)`],
              ['Not represented', `${num(notRepresented)} (${pct(notRepresented)})`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-2 py-1">
                <span className="text-[10px] text-muted">{k}</span>
                <span className="text-[11px] text-primary text-right">{v}</span>
              </div>
            ))}
          </SideCard>

          <SideCard title="Submission details">
            {[
              ['Proxy deadline', '23 Feb 2026'],
              ['Submission to', 'Fabiola Schrywer'],
              ['Email', 'fabiola.s@gcnam.com'],
              ['Tel', '+264 61 427 200'],
            ].map(([k, v]) => (
              <div key={k} className="py-1">
                <div className="text-[10px] text-muted">{k}</div>
                <div className="text-[11px] text-primary break-all">{v}</div>
              </div>
            ))}
          </SideCard>

          <SideCard title="Legal reference" tint="bg-blue-tint border-blue/20">
            <div className="text-[11px] text-blue leading-relaxed">
              AoA Article 14.6 — proxy entitlement<br />
              AoA Article 15.2 — quorum of 3 members
            </div>
          </SideCard>
        </aside>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add proxy">
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Shareholder name</label>
            <input className={inputCls} value={form.shareholder} onChange={(e) => setForm({ ...form, shareholder: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Shares</label>
            <input className={inputCls} value={form.shares} onChange={(e) => setForm({ ...form, shares: e.target.value })} placeholder="1,000,000" />
          </div>
          <div>
            <label className={labelCls}>Proxy form date</label>
            <input className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="24 Feb 2026" />
          </div>
          <div>
            <label className={labelCls}>Voting instruction</label>
            <select className={inputCls} value={form.instruction} onChange={(e) => setForm({ ...form, instruction: e.target.value })}>
              <option>For all</option>
              <option>Against all</option>
              <option>Discretionary</option>
              <option>Abstain</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Lodged by</label>
            <input className={inputCls} value={form.lodgedBy} onChange={(e) => setForm({ ...form, lodgedBy: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setModalOpen(false)} className="text-[12px] text-muted px-3 py-1.5 rounded-lg hover:bg-background">Cancel</button>
            <button onClick={save} className="text-[12px] text-white bg-orange px-3 py-1.5 rounded-lg font-medium">Save proxy</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

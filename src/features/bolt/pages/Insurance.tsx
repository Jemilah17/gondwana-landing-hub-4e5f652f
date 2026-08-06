import { useState } from 'react';
import { AlertTriangle, Shield, Phone } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import Drawer from '../components/ui/Drawer';

interface Policy {
  insurer: string;
  name: string;
  border: string;
  ref: string;
  from: string;
  to: string;
  coverage: string;
  status: { label: string; cls: string };
  subBadge?: string;
  buttons: { label: string; variant: 'primary' | 'outline' }[];
}

const POLICIES: Policy[] = [
  {
    insurer: 'Hollard', name: 'Business Interruption', border: 'border-l-red',
    ref: 'HOL-BI-2021', from: '2021-03-01', to: '2027-03-01', coverage: 'N$50,000,000',
    status: { label: 'Active — claim in progress', cls: 'bg-orange-tint text-orange' },
    subBadge: 'BI-2021-001 active',
    buttons: [{ label: 'View claim →', variant: 'primary' }, { label: 'View policy', variant: 'outline' }],
  },
  {
    insurer: 'Old Mutual', name: 'Directors & Officers', border: 'border-l-blue',
    ref: 'OM-DO-2025', from: '2025-01-01', to: '2026-01-01', coverage: 'N$20,000,000',
    status: { label: 'Renewal due', cls: 'bg-amber-tint text-amber' },
    buttons: [{ label: 'Renew', variant: 'primary' }, { label: 'View', variant: 'outline' }],
  },
  {
    insurer: 'Santam', name: 'Group property', border: 'border-l-green',
    ref: 'SAN-PROP-2026', from: '2026-01-01', to: '2027-01-01', coverage: 'N$120,000,000',
    status: { label: 'Active', cls: 'bg-green-tint text-green' },
    buttons: [{ label: 'View', variant: 'outline' }, { label: 'View', variant: 'outline' }],
  },
  {
    insurer: 'Hollard', name: 'Public liability', border: 'border-l-orange',
    ref: 'HOL-PL-2026', from: '2026-03-01', to: '2027-03-01', coverage: 'N$10,000,000',
    status: { label: 'Active', cls: 'bg-green-tint text-green' },
    buttons: [{ label: 'View', variant: 'outline' }, { label: 'View', variant: 'outline' }],
  },
  {
    insurer: 'Mutual & Federal', name: 'Motor fleet', border: 'border-l-amber',
    ref: 'MF-MOT-2026', from: '2026-01-01', to: '2027-01-01', coverage: 'N$5,000,000',
    status: { label: 'Active', cls: 'bg-green-tint text-green' },
    buttons: [{ label: 'View', variant: 'outline' }, { label: 'View', variant: 'outline' }],
  },
];

function fmt(d: string) {
  return new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

const TIMELINE = [
  { period: 'Mar 2021', text: 'Claim lodged with Hollard' },
  { period: 'Mid 2021', text: 'Hollard objected to urgent court proceedings' },
  { period: 'Late 2021', text: 'Matter proceeding on normal time periods' },
  { period: '2022 — 2026', text: 'Active litigation, millions in legal costs' },
];

const CONTACTS = [
  { name: 'Hollard Namibia Insurance', phone: '+264 61 371 300' },
  { name: 'Old Mutual Namibia', phone: '+264 61 299 3000' },
  { name: 'Santam Namibia', phone: '+264 61 292 8000' },
  { name: 'Mutual & Federal', phone: '+264 61 297 1000' },
];

function PolicyCard({ p }: { p: Policy }) {
  return (
    <div className={`bg-card border border-border border-l-[3px] ${p.border} rounded-lg p-4 flex flex-col gap-2`}>
      <div>
        <div className="text-[12px] font-medium text-primary">{p.insurer} · {p.name}</div>
        <div className="text-[10px] text-muted mt-[2px]">{p.ref} · {fmt(p.from)} to {fmt(p.to)}</div>
      </div>
      <div className="text-[11px] text-primary">Coverage: <span className="font-medium">{p.coverage}</span></div>
      <div className="flex flex-wrap items-center gap-[6px]">
        <span className={`inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium ${p.status.cls}`}>{p.status.label}</span>
        {p.subBadge && (
          <span className="inline-flex px-[6px] py-[1px] rounded-lg text-[9px] font-medium bg-red-tint text-red">{p.subBadge}</span>
        )}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {p.buttons.map((b, i) => (
          <button
            key={i}
            className={
              b.variant === 'primary'
                ? 'px-3 py-1 rounded text-[10px] font-medium bg-orange text-white hover:opacity-90'
                : 'px-3 py-1 rounded text-[10px] font-medium border border-border text-muted hover:text-primary'
            }
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Insurance() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Topbar title="Insurance register" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 flex gap-5 items-start">
          <div className="flex-1 min-w-0 space-y-4">
            <p className="text-[11px] text-muted">
              All policies · Active claims · Renewal calendar · Gondwana Holdings Ltd
            </p>

            {/* Active claim alert */}
            <div className="bg-red-tint rounded-lg px-4 py-3 flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-red shrink-0" />
              <p className="text-[11px] text-red flex-1">
                Business Interruption claim active against Hollard Insurance. Lead director: Hannes Gouws. Matter: BI-2021-001.
              </p>
              <a href="/legal" className="text-[11px] font-medium text-orange hover:underline shrink-0">
                View in legal matters →
              </a>
            </div>

            {/* Policy cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {POLICIES.map(p => <PolicyCard key={p.ref} p={p} />)}
            </div>

            {/* Active claims table */}
            <div className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-[12px] font-medium text-primary">Active claims</h2>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-muted">
                    {['Policy', 'Claim ref', 'Opened', 'Status', 'Lead director', 'Action'].map(h => (
                      <th key={h} className="px-4 py-2 font-medium border-b border-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-orange-tint text-[11px] text-primary">
                    <td className="px-4 py-3">Business Interruption</td>
                    <td className="px-4 py-3">BI-2021-001</td>
                    <td className="px-4 py-3">15 Mar 2021</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-card text-orange">In litigation</span>
                    </td>
                    <td className="px-4 py-3">Hannes Gouws</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDrawerOpen(true)}
                        className="px-3 py-1 rounded text-[10px] font-medium bg-orange text-white hover:opacity-90"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="w-[220px] shrink-0 space-y-3">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-[11px] font-medium text-primary mb-2">Upcoming renewals</h3>
              <div className="space-y-1">
                <div className="text-[11px] text-primary">Old Mutual D&amp;O</div>
                <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-red-tint text-red">
                  Due 01 Jan 2026 — OVERDUE
                </span>
                <button className="block text-[10px] font-medium text-orange hover:underline">Renew immediately</button>
              </div>
              <p className="text-[10px] text-muted mt-3">No other renewals until 2027.</p>
              <div className="mt-2">
                <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-green-tint text-green">
                  All others: Current
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-[11px] font-medium text-primary mb-1">Total coverage</h3>
              <div className="text-[18px] font-medium text-primary">N$205,000,000</div>
              <ul className="mt-2 space-y-1">
                {[['BI', 'N$50M'], ['Property', 'N$120M'], ['D&O', 'N$20M'], ['Public liability', 'N$10M'], ['Fleet', 'N$5M']].map(([k, v]) => (
                  <li key={k} className="flex justify-between text-[10px] text-muted">
                    <span>{k}</span><span className="text-primary">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-[11px] font-medium text-primary mb-2">Key contacts</h3>
              <ul className="space-y-2">
                {CONTACTS.map(c => (
                  <li key={c.name}>
                    <div className="text-[10px] text-primary">{c.name}</div>
                    <div className="text-[10px] text-muted flex items-center gap-1">
                      <Phone className="w-3 h-3" />{c.phone}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="BI-2021-001 — Hollard Business Interruption Claim"
      >
        <div className="space-y-5">
          <div>
            <h4 className="text-[11px] font-medium text-primary mb-2">Timeline</h4>
            <ol className="relative border-l border-border ml-1 space-y-3">
              {TIMELINE.map(t => (
                <li key={t.period} className="pl-4 relative">
                  <span className="absolute -left-[5px] top-[5px] w-[9px] h-[9px] rounded-full bg-orange" />
                  <div className="text-[10px] font-medium text-primary">{t.period}</div>
                  <div className="text-[10px] text-muted">{t.text}</div>
                </li>
              ))}
            </ol>
            <p className="text-[10px] text-primary mt-3">
              <span className="font-medium">Next step:</span> Court date on merits — TBC
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-primary mb-2">Lead director</h4>
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-background">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue text-white text-[8px] font-medium">HG</span>
              <span className="text-[10px] text-primary">Hannes Gouws</span>
            </span>
            <p className="text-[10px] text-muted mt-2">
              Hannes Gouws has managed this matter 7 days a week — per 4th AGM minutes June 2021
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-primary mb-1">External counsel</h4>
            <p className="text-[10px] text-muted">External legal team — details in legal matters register</p>
            <a href="/legal" className="text-[10px] font-medium text-orange hover:underline">View legal matter →</a>
          </div>

          <div className="bg-amber-tint rounded-lg p-3 flex gap-2">
            <Shield className="w-3.5 h-3.5 text-amber shrink-0 mt-[1px]" />
            <p className="text-[10px] text-amber">
              Material financial exposure — amounts being managed as an operational risk. Reported to board at each meeting.
            </p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
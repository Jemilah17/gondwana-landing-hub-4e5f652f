import { useState, type ReactNode } from 'react';
import { AlertTriangle, FileText, Plus, Download } from 'lucide-react';

type PillTone =
  | 'orange'
  | 'green'
  | 'amber'
  | 'red'
  | 'blue'
  | 'purple'
  | 'gray';

const toneClass: Record<PillTone, string> = {
  orange: 'bg-orange-tint text-orange',
  green: 'bg-green-tint text-green',
  amber: 'bg-amber-tint text-amber',
  red: 'bg-red-tint text-red',
  blue: 'bg-blue-tint text-blue',
  purple: 'bg-purple-tint text-purple',
  gray: 'bg-border text-muted',
};

function Pill({ tone, children }: { tone: PillTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function PrimaryBtn({ children }: { children: ReactNode }) {
  return (
    <button className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium hover:opacity-90">
      {children}
    </button>
  );
}

function OutlineBtn({ children }: { children: ReactNode }) {
  return (
    <button className="px-3 py-1 border border-border text-muted rounded text-[10px] hover:text-primary">
      {children}
    </button>
  );
}

const tabs = [
  { id: 'members', label: 'Members', count: '960+', tone: 'gray' as const },
  { id: 'directors', label: 'Directors', count: '8', tone: 'gray' as const },
  {
    id: 'beneficial',
    label: 'Beneficial owners',
    count: '3 pending',
    tone: 'red' as const,
  },
  { id: 'resolutions', label: 'Resolutions', count: '18', tone: 'gray' as const },
  {
    id: 'coi',
    label: 'Conflict of interest',
    count: '2 due',
    tone: 'red' as const,
  },
  { id: 'minutes', label: 'Minutes', count: '6', tone: 'gray' as const },
  { id: 'debentures', label: 'Debentures', count: '', tone: 'gray' as const },
  { id: 'auditors', label: 'Auditors', count: '', tone: 'gray' as const },
];

// ---------------- Data ----------------

const members = [
  {
    n: '001',
    name: 'Gys Joubert',
    sub: 'MD · Executive',
    shares: '4,200,000',
    pct: '7.6%',
    classTone: 'orange' as PillTone,
    className: 'Ordinary',
    registered: '2018-04-12',
    status: 'Active',
    statusTone: 'green' as PillTone,
    action: 'View',
  },
  {
    n: '002',
    name: 'GCN Employee Share Scheme',
    sub: '7% cap · OR-2021-005',
    shares: '3,850,000',
    pct: '7.0%',
    classTone: 'purple' as PillTone,
    className: 'Scheme',
    registered: '2021-06-24',
    status: 'Active',
    statusTone: 'green' as PillTone,
    action: 'View',
  },
  {
    n: '003',
    name: 'Feb 2026 GM placement',
    sub: '10.4M shares · N$10.00 · OR-2026-001',
    shares: '10,400,000',
    pct: '18.9%',
    classTone: 'orange' as PillTone,
    className: 'Ordinary',
    registered: '2026-02-26',
    status: 'Pending',
    statusTone: 'amber' as PillTone,
    action: 'Update',
    flagged: true,
  },
  {
    n: '004',
    name: 'Remaining shareholders',
    sub: '960+ individual and institutional',
    shares: '36,550,000',
    pct: '66.5%',
    classTone: 'orange' as PillTone,
    className: 'Ordinary',
    registered: 'Various',
    status: 'Active',
    statusTone: 'green' as PillTone,
    action: 'View all',
  },
];

const directors = [
  {
    name: 'Dave Smuts',
    role: 'Chairperson · NED Independent',
    appointed: '2025',
    basis: 'Board resolution',
    clusters: 'A · C',
    clustersTone: 'orange' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'Gys Joubert',
    role: 'Managing Director · Executive',
    appointed: 'Pre-2018',
    basis: 'Board resolution',
    clusters: 'All',
    clustersTone: 'orange' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'James Mnyupe',
    role: 'Audit Risk Opp Cttee Chair · NED Independent',
    appointed: 'Pre-2021 · re-elected 02 Jun 2022',
    basis: 'AGM election',
    clusters: 'A · D',
    clustersTone: 'orange' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'David Namalenga',
    role: 'Independent NED',
    appointed: 'Pre-2021 · re-elected 24 Jun 2021',
    basis: 'AGM election',
    clusters: 'B · D',
    clustersTone: 'amber' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'Hannes Gouws',
    role: 'NED · BI litigation lead',
    appointed: 'Pre-2021',
    basis: 'Board resolution',
    clusters: 'A · C · E',
    clustersTone: 'blue' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'Jaco Visser',
    role: 'Chief Financial Officer · Executive',
    appointed: 'Pre-2021',
    basis: 'Board resolution',
    clusters: 'B · C · E',
    clustersTone: 'orange' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
  {
    name: 'Steve Galloway',
    role: 'Former Independent Chairman',
    appointed: 'Pre-2018',
    basis: 'AGM election',
    clusters: 'Former',
    clustersTone: 'gray' as PillTone,
    status: 'Retired',
    statusTone: 'gray' as PillTone,
  },
  {
    name: 'Fabiola Schrywer',
    role: 'Company Secretary · Officer',
    appointed: 'Pre-2021',
    basis: 'Board appointment',
    clusters: 'All · CoSec',
    clustersTone: 'orange' as PillTone,
    status: 'Active',
    statusTone: 'green' as PillTone,
  },
];

const beneficialOwners = [
  {
    entity: 'Gondwana Holdings Ltd',
    entitySub: 'Cluster A · Fabiola',
    bo: 'Gys Joubert',
    basis: '7.6%',
    receipt: 'BO/2026/GHL/001',
    filedBy: 'Fabiola',
    status: 'Filed',
    statusTone: 'green' as PillTone,
  },
  {
    entity: 'Gondwana Travel Centre',
    entitySub: 'Cluster A · DNFBP',
    bo: 'Gys Joubert',
    basis: 'Effective control',
    receipt: 'BO/2026/GTC/0018',
    filedBy: 'Fabiola',
    status: 'Filed',
    statusTone: 'green' as PillTone,
  },
  {
    entity: 'Sossusvlei Dune Lodge',
    entitySub: 'Cluster B',
    bo: 'Gys Joubert',
    basis: 'Effective control',
    receipt: 'BO/2026/SDL/004',
    filedBy: 'Jemilah',
    status: 'Filed',
    statusTone: 'green' as PillTone,
  },
  {
    entity: 'Canyon Lodge',
    entitySub: 'Cluster B · Jemilah',
    bo: '—',
    basis: '—',
    receipt: '—',
    filedBy: '—',
    status: 'Pending',
    statusTone: 'red' as PillTone,
    flagged: true,
  },
  {
    entity: 'Swakopmund Guesthouse',
    entitySub: 'Cluster C · Hilma',
    bo: '—',
    basis: '—',
    receipt: '—',
    filedBy: '—',
    status: 'Pending',
    statusTone: 'red' as PillTone,
    flagged: true,
  },
  {
    entity: 'Hakusembe River Lodge',
    entitySub: 'Cluster E · Jemilah',
    bo: '—',
    basis: '—',
    receipt: '—',
    filedBy: '—',
    status: 'Pending',
    statusTone: 'red' as PillTone,
    flagged: true,
  },
];

type Resolution = {
  ref: string;
  text: string;
  meeting: string;
  type: string;
  typeTone: PillTone;
  vote: string;
  effective: string;
  status: string;
  statusTone: PillTone;
  flagged?: boolean;
};

const resolutionSections: { label: string; rows: Resolution[] }[] = [
  {
    label: 'February 2026 General Meeting',
    rows: [
      {
        ref: 'OR-2026-001',
        text: 'Issue 10,400,000 shares at N$10.00',
        meeting: 'GM 26 Feb 2026',
        type: 'Ordinary',
        typeTone: 'blue',
        vote: 'Passed',
        effective: '26 Feb 2026',
        status: 'Implementing',
        statusTone: 'amber',
        flagged: true,
      },
    ],
  },
  {
    label: '4th AGM — 24 June 2021',
    rows: [
      { ref: 'OR-2021-001', text: 'Approval of AFS FY Oct 2020', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '95.6%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2021-002', text: 'Re-appoint Ernst & Young Namibia', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '99.6%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2021-003', text: 'Re-election Galloway and Namalenga', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '95.9%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2021-004', text: 'Directors fees N$10,000 pending reinstatement', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '95.3%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2021-005', text: 'Employee share scheme amended', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '98.9%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2021-006', text: 'Directors borrowing powers', meeting: '4th AGM', type: 'Ordinary', typeTone: 'blue', vote: '98.3%', effective: '24 Jun 2021', status: 'Done', statusTone: 'green' },
    ],
  },
  {
    label: '5th AGM — 2 June 2022',
    rows: [
      { ref: 'OR-2022-001', text: 'Approval AFS FY Oct 2021', meeting: '5th AGM', type: 'Ordinary', typeTone: 'blue', vote: 'Passed', effective: '02 Jun 2022', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2022-002', text: 'Re-appoint EY Namibia', meeting: '5th AGM', type: 'Ordinary', typeTone: 'blue', vote: 'Passed', effective: '02 Jun 2022', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2022-003', text: 'Re-election James Mnyupe', meeting: '5th AGM', type: 'Ordinary', typeTone: 'blue', vote: 'Passed', effective: '02 Jun 2022', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2022-004', text: 'Directors fees reinstated N$10,000 board N$5,000 committee', meeting: '5th AGM', type: 'Ordinary', typeTone: 'blue', vote: 'Passed', effective: '02 Jun 2022', status: 'Done', statusTone: 'green' },
      { ref: 'OR-2022-005', text: 'Shareholder discount converted to Gondwana Card', meeting: '5th AGM', type: 'Ordinary', typeTone: 'blue', vote: 'Passed', effective: '31 Oct 2022', status: 'Done', statusTone: 'green' },
      { ref: 'SR-2022-001', text: 'MoA alteration — broadened company objects', meeting: '5th AGM', type: 'Special', typeTone: 'purple', vote: 'Passed', effective: '02 Jun 2022', status: 'Registered BIPA', statusTone: 'green' },
    ],
  },
];

const coiRows = [
  { director: 'Dave Smuts', fy: 'FY2025', declared: 'None', received: '2026-03-10', filedBy: 'Fabiola', status: 'Filed', tone: 'green' as PillTone },
  { director: 'Gys Joubert', fy: 'FY2025', declared: 'None', received: '2026-03-10', filedBy: 'Fabiola', status: 'Filed', tone: 'green' as PillTone },
  { director: 'James Mnyupe', fy: 'FY2025', declared: 'None', received: '2026-03-12', filedBy: 'Fabiola', status: 'Filed', tone: 'green' as PillTone },
  { director: 'Jaco Visser', fy: 'FY2025', declared: 'None', received: '2026-06-20', filedBy: 'Hilma', status: 'Filed', tone: 'green' as PillTone },
  { director: 'Fabiola Schrywer', fy: 'FY2025', declared: 'None', received: '2026-03-01', filedBy: 'Fabiola (self)', status: 'Filed', tone: 'green' as PillTone },
  { director: 'David Namalenga', fy: 'FY2025', declared: '—', received: '—', filedBy: '—', status: 'Outstanding', tone: 'amber' as PillTone, flagged: true },
  { director: 'Hannes Gouws', fy: 'FY2025', declared: '—', received: '—', filedBy: '—', status: 'Outstanding', tone: 'amber' as PillTone, flagged: true },
];

const minutesRows = [
  {
    meeting: 'General Meeting 2026',
    ref: 'OR-2026-001',
    date: '26 Feb 2026',
    type: 'GM',
    typeTone: 'orange' as PillTone,
    chair: 'Dave Smuts',
    approved: 'Pending',
    status: 'Draft',
    statusTone: 'amber' as PillTone,
    action: 'Draft →',
    flagged: true,
  },
  {
    meeting: '5th AGM',
    ref: '',
    date: '02 Jun 2022',
    type: 'AGM',
    typeTone: 'blue' as PillTone,
    chair: 'S. Galloway',
    approved: 'Next AGM',
    status: 'Final',
    statusTone: 'green' as PillTone,
    action: 'View',
  },
  {
    meeting: '4th AGM',
    ref: '',
    date: '24 Jun 2021',
    type: 'AGM',
    typeTone: 'blue' as PillTone,
    chair: 'S. Galloway',
    approved: '5th AGM',
    status: 'Final',
    statusTone: 'green' as PillTone,
    action: 'View',
  },
  {
    meeting: '3rd AGM',
    ref: '',
    date: '08 Apr 2020',
    type: 'AGM',
    typeTone: 'blue' as PillTone,
    chair: 'S. Galloway',
    approved: '4th AGM',
    status: 'Final',
    statusTone: 'green' as PillTone,
    action: 'View',
  },
];

const debentures = [
  { ref: 'GHL-BOND-001', holder: 'Institutional holder A', value: 'N$25,000,000', issue: '2021-03-01', maturity: '2026-03-01', status: 'Maturing', tone: 'amber' as PillTone },
  { ref: 'GHL-BOND-002', holder: 'Institutional holder B', value: 'N$15,000,000', issue: '2021-06-15', maturity: '2026-06-15', status: 'Active', tone: 'green' as PillTone },
];

const auditors = [
  { period: 'FY ending Oct 2022', auditor: 'Ernst & Young Namibia (re-appointed 5th AGM 02 June 2022)', resolution: 'OR-2022-002', recommended: 'James Mnyupe · Audit Risk Cttee', status: 'Completed', tone: 'green' as PillTone },
  { period: 'FY ending Oct 2021', auditor: 'Ernst & Young Namibia (re-appointed 4th AGM 24 June 2021)', resolution: 'OR-2021-002', recommended: 'Arne Stier · Stier Vente', status: 'Completed', tone: 'green' as PillTone },
  { period: 'FY ending Oct 2023', auditor: 'Ernst & Young Namibia', resolution: 'Pending next AGM', recommended: 'Pending Cttee recommendation', status: 'Pending AGM', tone: 'amber' as PillTone, flagged: true },
];

// ---------------- Layout helpers ----------------

const thBase = 'px-4 py-3 text-left text-[10px] text-muted uppercase font-medium tracking-wider';
const tdBase = 'px-4 py-3 text-[11px] text-primary align-top';
const tdMuted = 'px-4 py-3 text-[11px] text-muted align-top';

function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full">{children}</table>
    </div>
  );
}

function GreenFooter({ children }: { children: ReactNode }) {
  return (
    <div className="bg-green-tint border border-green/20 rounded-lg p-3 text-[10px] text-primary leading-relaxed">
      {children}
    </div>
  );
}

// ---------------- Sidebar (right) ----------------

function UrgentItem({
  icon,
  tone,
  children,
}: {
  icon: string;
  tone: 'red' | 'amber';
  children: ReactNode;
}) {
  const bg = tone === 'red' ? 'bg-red-tint' : 'bg-amber-tint';
  const fg = tone === 'red' ? 'text-red' : 'text-amber';
  return (
    <div className={`${bg} rounded p-2 flex gap-2 items-start`}>
      <span className={`${fg} text-[11px] leading-none pt-0.5`}>{icon}</span>
      <div className="text-[10px] text-primary leading-snug">{children}</div>
    </div>
  );
}

function RightRail() {
  const jumps = [
    { name: 'Canyon Lodge', sub: 'Cluster B · BO pending', alert: 'red' as const },
    { name: 'Gondwana Holdings', sub: 'Cluster A' },
    { name: 'Hakusembe River', sub: 'Cluster E · BO pending', alert: 'red' as const },
    { name: 'Swakopmund Guesthouse', sub: 'Cluster C', alert: 'amber' as const },
  ];

  return (
    <aside className="w-[200px] flex-shrink-0 space-y-4">
      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-[9px] uppercase tracking-wider text-muted font-medium mb-2">
          Urgent items
        </div>
        <div className="space-y-2">
          <UrgentItem icon="⚠" tone="red">
            3 BO declarations pending
          </UrgentItem>
          <UrgentItem icon="📋" tone="amber">
            2 COI declarations outstanding
          </UrgentItem>
          <UrgentItem icon="📋" tone="amber">
            Feb 2026 GM minutes in draft
          </UrgentItem>
          <UrgentItem icon="📋" tone="amber">
            Members register update pending
          </UrgentItem>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-3">
        <div className="text-[9px] uppercase tracking-wider text-muted font-medium mb-2">
          Jump to entity
        </div>
        <div className="space-y-1">
          {jumps.map((j) => (
            <button
              key={j.name}
              className="w-full text-left px-2 py-1.5 rounded hover:bg-background flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="text-[11px] text-primary font-medium truncate">
                  {j.name}
                </div>
                <div className="text-[9px] text-muted truncate">{j.sub}</div>
              </div>
              {j.alert && (
                <span
                  className={`text-[11px] leading-none pt-0.5 ${
                    j.alert === 'red' ? 'text-red' : 'text-amber'
                  }`}
                >
                  !
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ---------------- Tab panels ----------------

function MembersTab() {
  return (
    <div className="space-y-4">
      <div className="bg-orange-tint border border-orange-border rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-primary">
          <strong>February 2026 GM issued 10,400,000 new shares at N$10.00.</strong>{' '}
          <span className="text-muted">Members register update pending.</span>
        </div>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>#</th>
            <th className={thBase}>Shareholder</th>
            <th className={thBase}>Shares</th>
            <th className={thBase}>%</th>
            <th className={thBase}>Class</th>
            <th className={thBase}>Registered</th>
            <th className={thBase}>Status</th>
            <th className={thBase}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {members.map((m) => (
            <tr
              key={m.n}
              className={m.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
            >
              <td className={tdMuted}>{m.n}</td>
              <td className={tdBase}>
                <div className="font-medium">{m.name}</div>
                <div className="text-[10px] text-muted">{m.sub}</div>
              </td>
              <td className={tdMuted}>{m.shares}</td>
              <td className={tdMuted}>{m.pct}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={m.classTone}>{m.className}</Pill>
              </td>
              <td className={tdMuted}>{m.registered}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={m.statusTone}>{m.status}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                {m.flagged ? (
                  <PrimaryBtn>{m.action}</PrimaryBtn>
                ) : (
                  <OutlineBtn>{m.action}</OutlineBtn>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <GreenFooter>
        <strong>How to update:</strong> share transfer or new issue → New entry →
        shareholder name, ID, shares, date, consideration → system updates totals
        → audit trail entry created.
      </GreenFooter>
    </div>
  );
}

function DirectorsTab() {
  return (
    <div className="space-y-4">
      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Name</th>
            <th className={thBase}>Role</th>
            <th className={thBase}>Appointed</th>
            <th className={thBase}>Basis</th>
            <th className={thBase}>Clusters</th>
            <th className={thBase}>Status</th>
            <th className={thBase}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {directors.map((d) => (
            <tr key={d.name} className="hover:bg-background">
              <td className={tdBase + ' font-medium'}>{d.name}</td>
              <td className={tdMuted}>{d.role}</td>
              <td className={tdMuted}>{d.appointed}</td>
              <td className={tdMuted}>{d.basis}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={d.clustersTone}>{d.clusters}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                <Pill tone={d.statusTone}>{d.status}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                <OutlineBtn>View</OutlineBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <GreenFooter>
        Director appointed → New entry → name, ID, date, basis, cluster. Retiring
        by rotation → mark Retired → link AGM resolution → BIPA notification
        triggered.
      </GreenFooter>
    </div>
  );
}

function BeneficialOwnersTab() {
  return (
    <div className="space-y-4">
      <div className="bg-red-tint border border-red/30 rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-primary">
          <strong className="text-red">FATF grey-listing remediation — urgent:</strong>{' '}
          3 entities have no beneficial ownership declaration filed with BIPA.
          Canyon Lodge (Cluster B), Swakopmund Guesthouse (Cluster C), Hakusembe
          River Lodge (Cluster E).
        </div>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Entity</th>
            <th className={thBase}>Beneficial owner</th>
            <th className={thBase}>% basis</th>
            <th className={thBase}>BIPA receipt</th>
            <th className={thBase}>Filed by</th>
            <th className={thBase}>Status</th>
            <th className={thBase}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {beneficialOwners.map((b) => (
            <tr
              key={b.entity}
              className={b.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
            >
              <td className={tdBase}>
                <div className="font-medium">{b.entity}</div>
                <div className="text-[10px] text-muted">{b.entitySub}</div>
              </td>
              <td className={tdMuted}>{b.bo}</td>
              <td className={tdMuted}>{b.basis}</td>
              <td className={tdMuted}>{b.receipt}</td>
              <td className={tdMuted}>{b.filedBy}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={b.statusTone}>{b.status}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                {b.flagged ? (
                  <PrimaryBtn>Declare</PrimaryBtn>
                ) : (
                  <OutlineBtn>View</OutlineBtn>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}

function ResolutionsTab() {
  return (
    <div className="space-y-4">
      {resolutionSections.map((sec) => (
        <div key={sec.label} className="space-y-2">
          <div className="text-[11px] font-medium text-primary px-1">
            {sec.label}
          </div>
          <TableShell>
            <thead>
              <tr className="bg-background border-b border-border">
                <th className={thBase}>Ref</th>
                <th className={thBase}>Resolution</th>
                <th className={thBase}>Meeting</th>
                <th className={thBase}>Type</th>
                <th className={thBase}>Vote</th>
                <th className={thBase}>Effective</th>
                <th className={thBase}>Status</th>
                <th className={thBase}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sec.rows.map((r) => (
                <tr
                  key={r.ref}
                  className={r.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
                >
                  <td className={tdBase + ' font-medium'}>{r.ref}</td>
                  <td className={tdMuted}>{r.text}</td>
                  <td className={tdMuted}>{r.meeting}</td>
                  <td className="px-4 py-3 align-top">
                    <Pill tone={r.typeTone}>{r.type}</Pill>
                  </td>
                  <td className={tdMuted}>{r.vote}</td>
                  <td className={tdMuted}>{r.effective}</td>
                  <td className="px-4 py-3 align-top">
                    <Pill tone={r.statusTone}>{r.status}</Pill>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <OutlineBtn>View</OutlineBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </div>
      ))}

      <GreenFooter>
        After every meeting → New entry → resolution text, type, votes, effective
        date → upload signed resolution → link to meeting record.
      </GreenFooter>
    </div>
  );
}

function CoiTab() {
  return (
    <div className="space-y-4">
      <div className="bg-orange-tint border border-orange-border rounded-lg p-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-primary">
          <strong>2 declarations outstanding:</strong> David Namalenga and Hannes
          Gouws have not returned FY2025 COI declarations. Must be received before
          next board meeting.
        </div>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Director</th>
            <th className={thBase}>FY</th>
            <th className={thBase}>Conflicts declared</th>
            <th className={thBase}>Date received</th>
            <th className={thBase}>Filed by</th>
            <th className={thBase}>Status</th>
            <th className={thBase}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {coiRows.map((c) => (
            <tr
              key={c.director}
              className={c.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
            >
              <td className={tdBase + ' font-medium'}>{c.director}</td>
              <td className={tdMuted}>{c.fy}</td>
              <td className={tdMuted}>{c.declared}</td>
              <td className={tdMuted}>{c.received}</td>
              <td className={tdMuted}>{c.filedBy}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={c.tone}>{c.status}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                {c.flagged ? (
                  <PrimaryBtn>Chase</PrimaryBtn>
                ) : (
                  <OutlineBtn>View</OutlineBtn>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}

function MinutesTab() {
  return (
    <div className="space-y-4">
      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Meeting</th>
            <th className={thBase}>Date</th>
            <th className={thBase}>Type</th>
            <th className={thBase}>Chairperson</th>
            <th className={thBase}>Approved at</th>
            <th className={thBase}>Status</th>
            <th className={thBase}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {minutesRows.map((m) => (
            <tr
              key={m.meeting}
              className={m.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
            >
              <td className={tdBase}>
                <div className="font-medium">{m.meeting}</div>
                {m.ref && (
                  <div className="text-[10px] text-muted">{m.ref}</div>
                )}
              </td>
              <td className={tdMuted}>{m.date}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={m.typeTone}>{m.type}</Pill>
              </td>
              <td className={tdMuted}>{m.chair}</td>
              <td className={tdMuted}>{m.approved}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={m.statusTone}>{m.status}</Pill>
              </td>
              <td className="px-4 py-3 align-top">
                {m.flagged ? (
                  <PrimaryBtn>{m.action}</PrimaryBtn>
                ) : (
                  <OutlineBtn>{m.action}</OutlineBtn>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <div className="text-[10px] text-muted italic px-1">
        Minutes are permanently retained. Signed minutes cannot be edited — only
        viewed.
      </div>
    </div>
  );
}

function DebenturesTab() {
  return (
    <div className="space-y-4">
      <div className="bg-blue-tint border border-blue/20 rounded-lg p-3 flex items-start gap-2">
        <FileText className="w-4 h-4 text-blue flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-primary">
          NSX listed bond programme approved December 2020. Register must be
          current and available for NSX inspection at all times.
        </div>
      </div>

      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Bond ref</th>
            <th className={thBase}>Holder</th>
            <th className={thBase}>Face value</th>
            <th className={thBase}>Issue date</th>
            <th className={thBase}>Maturity</th>
            <th className={thBase}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {debentures.map((d) => (
            <tr key={d.ref} className="hover:bg-background">
              <td className={tdBase + ' font-medium'}>{d.ref}</td>
              <td className={tdMuted}>{d.holder}</td>
              <td className={tdMuted}>{d.value}</td>
              <td className={tdMuted}>{d.issue}</td>
              <td className={tdMuted}>{d.maturity}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={d.tone}>{d.status}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>
    </div>
  );
}

function AuditorsTab() {
  return (
    <div className="space-y-4">
      <TableShell>
        <thead>
          <tr className="bg-background border-b border-border">
            <th className={thBase}>Period</th>
            <th className={thBase}>Auditor</th>
            <th className={thBase}>Resolution</th>
            <th className={thBase}>Recommended by</th>
            <th className={thBase}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {auditors.map((a) => (
            <tr
              key={a.period}
              className={a.flagged ? 'bg-orange-tint' : 'hover:bg-background'}
            >
              <td className={tdBase + ' font-medium'}>{a.period}</td>
              <td className={tdMuted}>{a.auditor}</td>
              <td className={tdMuted}>{a.resolution}</td>
              <td className={tdMuted}>{a.recommended}</td>
              <td className="px-4 py-3 align-top">
                <Pill tone={a.tone}>{a.status}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </TableShell>

      <GreenFooter>
        Auditor elected at each AGM per Article 15 of the Articles of Association
        on recommendation of the Audit Risk and Opportunity Committee.
      </GreenFooter>
    </div>
  );
}

// ---------------- Page ----------------

export default function Registers() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div>
      {/* Page header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[16px] font-medium text-primary">
            Company registers
          </h1>
          <p className="text-[11px] text-muted mt-0.5">
            Gondwana Holdings Ltd · Reg. 2017/1055 · All statutory and governance
            registers
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange text-white rounded text-[11px] font-medium hover:opacity-90">
            <Plus className="w-3.5 h-3.5" />
            New entry
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-primary rounded text-[11px] hover:bg-background">
            <Download className="w-3.5 h-3.5" />
            Export all
          </button>
        </div>
      </header>

      <div className="p-6 flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-border mb-4 overflow-x-auto">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-[11px] font-medium whitespace-nowrap ${
                    active
                      ? 'text-orange border-b-2 border-orange -mb-px'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <span
                      className={`ml-2 px-1.5 py-0.5 rounded text-[9px] ${
                        tab.tone === 'red'
                          ? 'bg-red-tint text-red'
                          : 'bg-border text-muted'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {activeTab === 'members' && <MembersTab />}
          {activeTab === 'directors' && <DirectorsTab />}
          {activeTab === 'beneficial' && <BeneficialOwnersTab />}
          {activeTab === 'resolutions' && <ResolutionsTab />}
          {activeTab === 'coi' && <CoiTab />}
          {activeTab === 'minutes' && <MinutesTab />}
          {activeTab === 'debentures' && <DebenturesTab />}
          {activeTab === 'auditors' && <AuditorsTab />}
        </div>

        <RightRail />
      </div>
    </div>
  );
}
import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  AlertTriangle, Clock, FileText, Package, Book, History,
  ArrowRight, Upload, X,
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import { entities, Entity } from '../data/entities';
import { filings } from '../data/filings';
import { users } from '../data/users';
import EntityDrawer from '../components/ui/EntityDrawer';

const TODAY = new Date('2026-07-28T08:00:00');

const fmtLong = (d: Date) =>
  d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const fmtShort = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

interface Task {
  id: string;
  kind: 'overdue' | 'due soon';
  type: string;
  entityId: string;
  entityName: string;
  cluster: string;
  dueLabel: string;
}

const TASKS: Record<string, Task[]> = {
  fabiola: [
    { id: 't-f1', kind: 'overdue', type: 'BIPA Annual Return', entityId: 'gcn-003', entityName: 'Gondwana Travel Centre', cluster: 'A', dueLabel: 'Due 31 Mar 2026' },
    { id: 't-f2', kind: 'overdue', type: 'FIC Compliance Return', entityId: 'gcn-003', entityName: 'Gondwana Travel Centre', cluster: 'A', dueLabel: 'Due 30 Jun 2026' },
    { id: 't-f3', kind: 'due soon', type: 'NTB Statutory Levy', entityId: 'gcn-001', entityName: 'Gondwana Holdings Ltd', cluster: 'A', dueLabel: 'Due 31 Jul 2026' },
    { id: 't-f4', kind: 'due soon', type: 'BO Declaration', entityId: 'gcn-003', entityName: 'Gondwana Travel Centre', cluster: 'A', dueLabel: 'Outstanding' },
  ],
  hilma: [
    { id: 't-h1', kind: 'overdue', type: 'BIPA Annual Return', entityId: 'gcn-013', entityName: 'Swakopmund Guesthouse & Spa', cluster: 'C', dueLabel: 'Due 31 Dec 2025' },
    { id: 't-h2', kind: 'overdue', type: 'NTB Statutory Levy', entityId: 'gcn-013', entityName: 'Swakopmund Guesthouse & Spa', cluster: 'C', dueLabel: 'Due 15 Jan 2026' },
    { id: 't-h3', kind: 'due soon', type: 'BIPA Annual Return', entityId: 'gcn-025', entityName: 'Etosha Safari Camp', cluster: 'D', dueLabel: 'Due 31 Aug 2026' },
    { id: 't-h4', kind: 'due soon', type: 'NTB Statutory Levy', entityId: 'gcn-025', entityName: 'Etosha Safari Camp', cluster: 'D', dueLabel: 'Due 20 Jul 2026' },
  ],
  jemilah: [
    { id: 't-j1', kind: 'overdue', type: 'BIPA Annual Return', entityId: 'gcn-008', entityName: 'Kalahari Anib Lodge', cluster: 'B', dueLabel: 'Due 31 Jan 2026' },
    { id: 't-j2', kind: 'due soon', type: 'NTB Statutory Levy', entityId: 'gcn-007', entityName: 'Hakusembe River Lodge', cluster: 'E', dueLabel: 'Due 15 Jul 2026' },
    { id: 't-j3', kind: 'due soon', type: 'BO Declaration', entityId: 'gcn-005', entityName: 'Canyon Lodge', cluster: 'B', dueLabel: 'Outstanding' },
    { id: 't-j4', kind: 'due soon', type: 'BO Declaration', entityId: 'gcn-007', entityName: 'Hakusembe River Lodge', cluster: 'E', dueLabel: 'Outstanding' },
  ],
};

function Gauge({ value, size = 28 }: { value: number; size?: number }) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = r * 2 * Math.PI;
  const color = value >= 80 ? '#2D7A4F' : value >= 55 ? '#9A6E1A' : '#B53A2F';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EFECE6" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[8px] font-medium text-primary">{value}%</span>
    </div>
  );
}

const entityPill = (e: Entity) => {
  if (e.isIncoming) return <span className="px-1.5 py-0.5 rounded text-[9px] font-medium text-blue border border-dashed border-blue">Incoming</span>;
  const map = {
    compliant: 'bg-green-tint text-green',
    'due soon': 'bg-amber-tint text-amber',
    overdue: 'bg-red-tint text-red',
  } as const;
  const label = { compliant: 'Compliant', 'due soon': 'Due soon', overdue: 'Overdue' }[e.status];
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${map[e.status]}`}>{label}</span>;
};

export default function Dashboard() {
  const { activeUser, canWrite } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [done, setDone] = useState<string[]>([]);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [receipt, setReceipt] = useState('');
  const [drawerEntity, setDrawerEntity] = useState<Entity | null>(null);

  const myEntities = useMemo(() => entities.filter(e => canWrite(e.cluster)), [activeUser]);
  const myFilings = useMemo(() => filings.filter(f => canWrite(f.cluster)), [activeUser]);
  const tasks = (TASKS[activeUser.id] ?? []).slice(0, 6)
    .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'overdue' ? -1 : 1));

  const openTasks = tasks.filter(t => !done.includes(t.id));
  const overdue = openTasks.filter(t => t.kind === 'overdue').length;
  const dueSoon = openTasks.filter(t => t.kind === 'due soon').length;
  const onTrack = myFilings.filter(f => f.status === 'filed' || f.status === 'compliant').length + done.length;
  const scope = activeUser.writeAccess.length > 1
    ? `Clusters ${activeUser.writeAccess.join(' & ')}`
    : `Cluster ${activeUser.writeAccess[0]}`;

  const deadlines = useMemo(
    () => myFilings
      .filter(f => f.status !== 'filed')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5),
    [activeUser],
  );

  const alerts = [
    { color: '#B53A2F', title: `BO declaration overdue — ${myEntities[0]?.name ?? 'Gondwana Holdings Ltd'}` },
    { color: '#9A6E1A', title: 'COI declaration outstanding — Namalenga' },
    { color: '#9A6E1A', title: 'Minutes in draft — Feb 2026 GM' },
  ];

  const activity = [
    { user: 'fabiola', text: 'Logged BIPA filing · Canyon Lodge', time: '2 hours ago' },
    { user: 'system', text: 'Compliance calendar updated · 33 entities', time: 'Today 06:00' },
    { user: 'jemilah', text: 'Board pack compiled · Q3 2026', time: 'Yesterday' },
    { user: 'hilma', text: 'COI declaration filed · Jaco Visser', time: '2 days ago' },
    { user: 'fabiola', text: 'Minutes circulated · Feb 2026 GM', time: '3 days ago' },
  ];

  const confirmLog = () => {
    if (!modalTask) return;
    setDone(prev => [...prev, modalTask.id]);
    setModalTask(null);
    setReceipt('');
    showToast('Filing logged · Entity updated · Audit trail entry created');
  };

  const quickActions = [
    { icon: FileText, label: 'Draft minutes', to: '/minutes' },
    { icon: Package, label: 'Board pack', to: '/board-pack' },
    { icon: Book, label: 'Registers', to: '/registers' },
    { icon: History, label: 'Audit trail', to: '/audit-trail' },
  ] as const;

  return (
    <div className="bg-background min-h-full">
      {/* Topbar */}
      <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div>
          <div className="text-[16px] font-medium text-primary">Good morning, {activeUser.name}</div>
          <div className="text-[11px] text-muted mt-0.5">{fmtLong(TODAY)}</div>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-tint text-orange text-[11px] font-medium">
          {scope} · {myEntities.length} entities
        </span>
      </div>

      <div className="p-6 space-y-4">
        {/* Attention box */}
        <div className="bg-orange-tint border border-orange-border rounded-lg px-4 py-[14px] flex items-center justify-between">
          <div>
            <div className="text-[13px] font-medium text-orange">
              {overdue + dueSoon} things need your attention today
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: '#9A4D20' }}>
              {scope} — {fmtLong(TODAY)}
            </div>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-[22px] font-medium text-red leading-none">{overdue}</div>
              <div className="text-[10px] text-muted mt-1">Overdue</div>
            </div>
            <div>
              <div className="text-[22px] font-medium text-amber leading-none">{dueSoon}</div>
              <div className="text-[10px] text-muted mt-1">Due soon</div>
            </div>
            <div>
              <div className="text-[22px] font-medium text-green leading-none">{onTrack}</div>
              <div className="text-[10px] text-muted mt-1">On track</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Today's tasks */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[12px] font-medium text-primary">Today's tasks</div>
              <div className="text-[10px] text-muted">Overdue and due soon — your clusters only</div>
              <div className="mt-3 divide-y divide-border">
                {tasks.map(t => {
                  const isDone = done.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => !isDone && setModalTask(t)}
                      className={`group flex items-center gap-3 py-2.5 ${isDone ? 'opacity-45' : 'cursor-pointer'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.kind === 'overdue' ? 'bg-red-tint' : 'bg-amber-tint'}`}>
                        {t.kind === 'overdue'
                          ? <AlertTriangle className="w-4 h-4 text-red" />
                          : <Clock className="w-4 h-4 text-amber" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-primary truncate">{t.type} — {t.entityName}</div>
                        <div className="text-[10px] text-muted">{t.dueLabel} · Cluster {t.cluster}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-green-tint text-green">Filed ✓</span>
                        ) : (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${t.kind === 'overdue' ? 'bg-red-tint text-red' : 'bg-amber-tint text-amber'}`}>
                            {t.kind === 'overdue' ? 'Overdue' : 'Due soon'}
                          </span>
                        )}
                        <span className={`text-[11px] text-orange ${isDone ? '' : 'opacity-0 group-hover:opacity-100'}`}>
                          {isDone ? 'Done ✓' : 'Log filing →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[12px] font-medium text-primary mb-3">Quick actions</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map(({ icon: Icon, label, to }) => (
                  <button
                    key={label}
                    onClick={() => navigate({ to })}
                    className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg hover:bg-orange-tint hover:border-orange-border transition-colors"
                  >
                    <Icon className="w-4 h-4 text-orange" />
                    <span className="text-[11px] font-medium text-primary flex-1 text-left">{label}</span>
                    <ArrowRight className="w-3 h-3 text-muted" />
                  </button>
                ))}
              </div>
            </div>

            {/* Your entities */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] font-medium text-primary">Your entities</div>
                <div className="text-[10px] text-muted">{myEntities.length} entities</div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {myEntities.map(e => (
                  <button
                    key={e.id}
                    onClick={() => setDrawerEntity(e)}
                    className={`text-left p-2.5 rounded-md border ${
                      e.isIncoming
                        ? 'border-dashed border-orange bg-card'
                        : e.isFlagged
                          ? 'bg-orange-tint border-orange-border'
                          : 'bg-card border-border'
                    }`}
                  >
                    <div className="text-[11px] font-medium text-primary leading-[1.3]">{e.name}</div>
                    <div className="text-[9px] text-muted mt-0.5">{e.code}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Gauge value={e.complianceScore} />
                      {entityPill(e)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[280px] flex-shrink-0 space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[11px] font-medium text-primary pb-2 border-b border-border">Upcoming deadlines</div>
              <div className="divide-y divide-border">
                {deadlines.map(f => {
                  const days = Math.ceil((new Date(f.dueDate).getTime() - TODAY.getTime()) / 86400000);
                  const color = days < 0 ? 'text-red' : days < 30 ? 'text-amber' : 'text-muted';
                  return (
                    <div key={f.id} className="py-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-orange-tint text-orange text-[9px]">{f.type.split(' ')[0]}</span>
                        <span className="text-[10px] font-medium text-primary truncate flex-1">{f.entityName}</span>
                        <span className={`text-[10px] ${color}`}>{days < 0 ? `${Math.abs(days)}d over` : `${days}d`}</span>
                      </div>
                      <div className="text-[9px] text-muted mt-0.5">{fmtShort(f.dueDate)}</div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => navigate({ to: '/deadlines' })} className="text-[10px] text-orange mt-2">View all deadlines →</button>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[11px] font-medium text-primary pb-2 border-b border-border">Active alerts</div>
              <div className="divide-y divide-border">
                {alerts.map(a => (
                  <div key={a.title} className="py-2 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                    <div className="text-[10px] font-medium text-primary">{a.title}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate({ to: '/alerts' })} className="text-[10px] text-orange mt-2">View all alerts →</button>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[11px] font-medium text-primary pb-2 border-b border-border">Recent activity</div>
              <div className="divide-y divide-border">
                {activity.map((a, i) => {
                  const u = users.find(x => x.id === a.user);
                  return (
                    <div key={i} className="py-2 flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-medium flex-shrink-0 ${u?.avatarColor ?? 'bg-muted'}`}>
                        {u?.initials ?? 'SY'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-primary">{u?.name.split(' ')[0] ?? 'System'} · {a.text}</div>
                      </div>
                      <div className="text-[9px] text-muted whitespace-nowrap">{a.time}</div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => navigate({ to: '/audit-trail' })} className="text-[10px] text-orange mt-2">View full audit trail →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Log filing modal */}
      {modalTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/35" onClick={() => setModalTask(null)} />
          <div className="relative z-10 bg-card rounded-xl w-[380px] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[13px] font-medium text-primary">Log filing — {modalTask.entityName}</div>
                <div className="text-[11px] text-muted">{modalTask.type} · Cluster {modalTask.cluster}</div>
              </div>
              <button onClick={() => setModalTask(null)} className="text-muted hover:text-primary"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 mt-4">
              <div>
                <label className="text-[10px] text-muted">Filing type</label>
                <select disabled className="w-full mt-1 px-2 py-2 border border-border rounded-lg text-[11px] bg-background text-muted">
                  <option>{modalTask.type}</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted">Entity</label>
                <select disabled className="w-full mt-1 px-2 py-2 border border-border rounded-lg text-[11px] bg-background text-muted">
                  <option>{modalTask.entityName}</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-muted">Receipt number</label>
                <input
                  value={receipt}
                  onChange={e => setReceipt(e.target.value)}
                  placeholder="e.g. BIPA/2026/CLB/0218"
                  className="w-full mt-1 px-2 py-2 border border-border rounded-lg text-[11px]"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted">Filing date</label>
                <input type="date" defaultValue="2026-07-28" className="w-full mt-1 px-2 py-2 border border-border rounded-lg text-[11px]" />
              </div>
              <div className="border border-dashed border-border rounded-lg p-4 text-center">
                <Upload className="w-5 h-5 text-muted mx-auto mb-1" />
                <div className="text-[10px] text-muted">Upload PDF confirmation from portal</div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setModalTask(null)} className="flex-1 py-2 border border-border rounded-lg text-[11px] text-muted">Cancel</button>
              <button onClick={confirmLog} className="flex-1 py-2 bg-orange text-white rounded-lg text-[11px] font-medium">Confirm & log</button>
            </div>
          </div>
        </div>
      )}

      <EntityDrawer entity={drawerEntity} onClose={() => setDrawerEntity(null)} />
    </div>
  );
}

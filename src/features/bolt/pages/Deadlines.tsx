import { useMemo, useState } from 'react';
import { AlertTriangle, Clock, ClipboardList, UploadCloud } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import { filings as allFilings, Filing } from '../data/filings';
import { users } from '../data/users';
import Topbar from '../components/layout/Topbar';
import Modal from '../components/ui/Modal';

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

const TYPE_GROUPS: Record<string, string> = {
  BIPA: 'BIPA Annual Return',
  NTB: 'NTB Statutory Levy',
  MoF: 'MoF Report',
  FIC: 'FIC Compliance Return',
  BO: 'BO Declaration',
};

function Avatar({ id }: { id: string }) {
  const u = users.find(x => x.id === id);
  if (!u) return null;
  return (
    <span
      title={u.name}
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[8px] font-medium ${u.avatarColor}`}
    >
      {u.initials}
    </span>
  );
}

function ClusterBadge({ cluster }: { cluster: string }) {
  return (
    <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-muted/10 text-muted">
      Cluster {cluster}
    </span>
  );
}

interface RowProps {
  filing: Filing;
  variant: 'overdue' | 'due' | 'upcoming';
  onLog: (f: Filing) => void;
}

function DeadlineRow({ filing, variant, onLog }: RowProps) {
  const diff = daysBetween(filing.dueDate);
  const config = {
    overdue: {
      border: 'border-l-red', icon: AlertTriangle, circle: 'bg-red-tint text-red',
      text: 'text-red', label: `Due ${fmt(filing.dueDate)} · ${Math.abs(diff)} days overdue`,
    },
    due: {
      border: 'border-l-amber', icon: Clock, circle: 'bg-amber-tint text-amber',
      text: 'text-amber', label: `Due ${fmt(filing.dueDate)} · ${Math.max(diff, 0)} days remaining`,
    },
    upcoming: {
      border: 'border-l-border', icon: ClipboardList, circle: 'bg-background text-muted',
      text: 'text-muted', label: `Due ${fmt(filing.dueDate)} · ${Math.max(diff, 0)} days remaining`,
    },
  }[variant];
  const Icon = config.icon;

  return (
    <div className={`bg-card border border-border border-l-[3px] ${config.border} rounded-lg px-4 py-3 flex items-center gap-3`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.circle}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-medium text-primary truncate">{filing.entityName}</div>
        <div className="text-[10px] text-muted">{filing.type}</div>
        <div className={`text-[10px] ${config.text}`}>{config.label}</div>
      </div>
      <ClusterBadge cluster={filing.cluster} />
      <Avatar id={filing.assignee} />
      {variant === 'upcoming' ? (
        <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-muted/10 text-muted">
          Upcoming
        </span>
      ) : (
        <button
          onClick={() => onLog(filing)}
          className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium hover:opacity-90"
        >
          Log filing
        </button>
      )}
    </div>
  );
}

function SectionLabel({ tint, text, label, count }: { tint: string; text: string; label: string; count: number }) {
  return (
    <div className={`${tint} rounded-lg px-3 py-2 flex items-center gap-2`}>
      <span className={`text-[11px] font-medium ${text}`}>{label}</span>
      <span className={`inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-card ${text}`}>{count}</span>
    </div>
  );
}

export default function Deadlines() {
  const { canRead } = useUser();
  const { showToast } = useToast();

  const [logged, setLogged] = useState<string[]>([]);
  const [cluster, setCluster] = useState('all');
  const [admin, setAdmin] = useState('all');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');

  const [modalFiling, setModalFiling] = useState<Filing | null>(null);
  const [receipt, setReceipt] = useState('');
  const [filingDate, setFilingDate] = useState('2026-08-04');

  const visible = useMemo(
    () => allFilings.filter(f => canRead(f.cluster) && !logged.includes(f.id)),
    [canRead, logged]
  );

  const filtered = visible.filter(f => {
    if (cluster !== 'all' && f.cluster !== cluster) return false;
    if (admin !== 'all' && f.assignee !== admin) return false;
    if (type !== 'all' && f.type !== TYPE_GROUPS[type]) return false;
    return true;
  });

  const overdue = filtered.filter(f => f.status === 'overdue');
  const dueSoon = filtered.filter(f => f.status === 'due soon' && daysBetween(f.dueDate) <= 31);
  const upcoming = filtered.filter(f => f.status === 'pending' && daysBetween(f.dueDate) <= 90 && daysBetween(f.dueDate) >= 0);

  const showOverdue = status === 'all' || status === 'overdue';
  const showDue = status === 'all' || status === 'due soon';
  const showUpcoming = status === 'all' || status === 'pending';

  const adminStats = users.filter(u => u.type === 'cosec').map(u => ({
    user: u,
    count: visible.filter(f => f.assignee === u.id && f.status === 'overdue').length,
  }));
  const maxAdmin = Math.max(1, ...adminStats.map(a => a.count));
  const barColors: Record<string, string> = { fabiola: 'bg-orange', hilma: 'bg-green', jemilah: 'bg-blue' };

  const openModal = (f: Filing) => {
    setModalFiling(f);
    setReceipt('');
    setFilingDate('2026-08-04');
  };

  const confirmLog = () => {
    if (!modalFiling) return;
    setLogged(prev => [...prev, modalFiling.id]);
    setModalFiling(null);
    showToast('Filing logged · Audit trail updated');
  };

  return (
    <div>
      <Topbar title="Deadlines" />

      <div className="p-6 flex gap-6 items-start">
        <div className="flex-1 space-y-5 min-w-0">
          <p className="text-[11px] text-muted">
            All upcoming and overdue compliance deadlines — Gondwana Holdings
          </p>

          {/* Filter bar */}
          <div className="bg-card border border-border rounded-lg p-3 flex gap-3 flex-wrap">
            <select value={cluster} onChange={e => setCluster(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card">
              <option value="all">All clusters</option>
              {['A', 'B', 'C', 'D', 'E'].map(c => <option key={c} value={c}>Cluster {c}</option>)}
            </select>
            <select value={admin} onChange={e => setAdmin(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card">
              <option value="all">All admins</option>
              <option value="fabiola">Fabiola</option>
              <option value="hilma">Hilma</option>
              <option value="jemilah">Jemilah</option>
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card">
              <option value="all">All types</option>
              {Object.keys(TYPE_GROUPS).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card">
              <option value="all">All statuses</option>
              <option value="overdue">Overdue</option>
              <option value="due soon">Due soon</option>
              <option value="pending">Upcoming</option>
            </select>
          </div>

          {showOverdue && (
            <section className="space-y-2">
              <SectionLabel tint="bg-red-tint" text="text-red" label="Overdue" count={overdue.length} />
              {overdue.length === 0 && <p className="text-[11px] text-muted px-1">Nothing overdue.</p>}
              {overdue.map(f => <DeadlineRow key={f.id} filing={f} variant="overdue" onLog={openModal} />)}
            </section>
          )}

          {showDue && (
            <section className="space-y-2">
              <SectionLabel tint="bg-amber-tint" text="text-amber" label="Due this month" count={dueSoon.length} />
              {dueSoon.length === 0 && <p className="text-[11px] text-muted px-1">Nothing due this month.</p>}
              {dueSoon.map(f => <DeadlineRow key={f.id} filing={f} variant="due" onLog={openModal} />)}
            </section>
          )}

          {showUpcoming && (
            <section className="space-y-2">
              <SectionLabel tint="bg-background" text="text-muted" label="Next 90 days" count={upcoming.length} />
              {upcoming.length === 0 && <p className="text-[11px] text-muted px-1">Nothing in the next 90 days.</p>}
              {upcoming.map(f => <DeadlineRow key={f.id} filing={f} variant="upcoming" onLog={openModal} />)}
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <aside className="w-[220px] shrink-0 space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-[11px] font-medium text-primary">Summary</h3>
            {[
              { label: 'Overdue', value: overdue.length, color: 'text-red' },
              { label: 'Due this month', value: dueSoon.length, color: 'text-amber' },
              { label: 'Next 90 days', value: upcoming.length, color: 'text-blue' },
              { label: 'Total upcoming', value: dueSoon.length + upcoming.length, color: 'text-primary' },
            ].map(s => (
              <div key={s.label} className="flex items-baseline justify-between">
                <span className="text-[10px] text-muted">{s.label}</span>
                <span className={`text-[18px] font-medium ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h3 className="text-[11px] font-medium text-primary">By administrator</h3>
            {adminStats.map(({ user, count }) => (
              <div key={user.id} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">{user.name.split(' ')[0]}</span>
                  <span className="text-primary font-medium">{count}</span>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                  <div className={`h-full ${barColors[user.id] || 'bg-muted'}`} style={{ width: `${(count / maxAdmin) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <h3 className="text-[11px] font-medium text-primary">By filing type</h3>
            {Object.entries(TYPE_GROUPS).map(([short, full]) => (
              <div key={short} className="flex justify-between text-[10px]">
                <span className="text-muted">{short === 'BO' ? 'BO Declaration' : short}</span>
                <span className="text-primary font-medium">{visible.filter(f => f.type === full).length}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <Modal
        isOpen={!!modalFiling}
        onClose={() => setModalFiling(null)}
        title={`Log filing — ${modalFiling?.entityName ?? ''}`}
        maxWidth="max-w-[420px]"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] text-muted mb-1">Filing type</label>
            <select disabled value={modalFiling?.type ?? ''} className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background text-muted">
              <option>{modalFiling?.type}</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted mb-1">Entity</label>
            <select disabled value={modalFiling?.entityName ?? ''} className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background text-muted">
              <option>{modalFiling?.entityName}</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-muted mb-1">Receipt number</label>
            <input value={receipt} onChange={e => setReceipt(e.target.value)} placeholder="e.g. BIPA-2026-0421"
              className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-card" />
          </div>
          <div>
            <label className="block text-[10px] text-muted mb-1">Filing date</label>
            <input type="date" value={filingDate} onChange={e => setFilingDate(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-card" />
          </div>
          <div className="border border-dashed border-border rounded-lg p-4 flex flex-col items-center gap-1 text-muted">
            <UploadCloud className="w-5 h-5" />
            <span className="text-[10px]">Upload PDF confirmation</span>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={() => setModalFiling(null)} className="px-3 py-1.5 border border-border rounded text-[11px] text-muted hover:bg-background">
              Cancel
            </button>
            <button onClick={confirmLog} className="px-3 py-1.5 bg-orange text-white rounded text-[11px] font-medium hover:opacity-90">
              Confirm &amp; log
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

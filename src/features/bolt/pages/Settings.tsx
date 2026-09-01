import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Download } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import { users } from '../data/users';

type Access = 'write' | 'read' | 'none';

const MATRIX: { cluster: string; fabiola: Access; hilma: Access; jemilah: Access }[] = [
  { cluster: 'A', fabiola: 'write', hilma: 'read', jemilah: 'read' },
  { cluster: 'B', fabiola: 'read', hilma: 'none', jemilah: 'write' },
  { cluster: 'C', fabiola: 'read', hilma: 'write', jemilah: 'none' },
  { cluster: 'D', fabiola: 'read', hilma: 'write', jemilah: 'none' },
  { cluster: 'E', fabiola: 'read', hilma: 'none', jemilah: 'write' },
];

const ACCESS_PILL: Record<Access, { label: string; cls: string }> = {
  write: { label: 'Full write', cls: 'bg-green-tint text-green' },
  read: { label: 'Read only', cls: 'bg-blue-tint text-blue' },
  none: { label: 'Disabled', cls: 'bg-muted/10 text-muted' },
};

const QUICK_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Registers', to: '/registers' },
  { label: 'Board pack', to: '/board-pack' },
  { label: 'Minutes', to: '/minutes' },
  { label: 'Governance', to: '/governance' },
  { label: 'Audit trail', to: '/audit-trail' },
] as const;

function scopeText(userId: string) {
  const u = users.find(x => x.id === userId)!;
  const parts: string[] = [];
  if (u.writeAccess.length) parts.push(`${u.writeAccess.join(',')} (write)`);
  if (u.readOnly.length) parts.push(`${u.readOnly.join(',')} (read)`);
  if (u.disabled.length) parts.push(`${u.disabled.join(',')} (none)`);
  return `Clusters: ${parts.join(' · ')}`;
}

function AccessPill({ access }: { access: Access }) {
  const p = ACCESS_PILL[access];
  return (
    <span className={`inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium ${p.cls}`}>{p.label}</span>
  );
}

const INITIAL_PREFS = [
  { id: 'overdue', label: 'Email — overdue filings', on: true },
  { id: 'flags', label: 'Email — compliance flags', on: true },
  { id: 'digest', label: 'Daily digest', on: false },
  { id: 'board', label: 'Board meeting reminders', on: true },
  { id: 'rsvp', label: 'Director RSVP notifications', on: true },
];

export default function Settings() {
  const { activeUser, setActiveUserById } = useUser();
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(INITIAL_PREFS);
  const [lastSync] = useState(() =>
    new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  );

  const togglePref = (id: string) =>
    setPrefs(p => p.map(x => (x.id === id ? { ...x, on: !x.on } : x)));

  const switchUser = (id: string, name: string) => {
    setActiveUserById(id);
    showToast(`${name} is now the active user`);
  };

  const appInfo: [string, string][] = [
    ['Version', '1.0.0'],
    ['Entity count', '33'],
    ['Clusters', '5'],
    ['CoSec users', '3'],
    ['Director users', '6'],
    ['Built for', 'Gondwana Holdings Ltd'],
    ['Registration', '2017/1055'],
    ['Last sync', lastSync],
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Topbar title="Settings" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 flex gap-5 items-start">
          <div className="w-full max-w-[680px] space-y-4">
            <p className="text-[11px] text-muted">
              Access control · User preferences · Application information
            </p>

            {/* Card 1 — Active session */}
            <section className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-[12px] font-medium text-primary">Active session</h2>
              </div>
              <div className="p-3 space-y-2">
                {users.map(u => {
                  const isActive = u.id === activeUser.id;
                  return (
                    <div
                      key={u.id}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${
                        isActive ? 'bg-orange-tint border-orange-border' : 'border-border'
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-medium shrink-0 ${u.avatarColor}`}>
                        {u.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-medium text-primary">
                          {u.name}
                          {u.id === 'jemilah' && <span className="text-muted font-normal"> · Incoming</span>}
                        </div>
                        <div className="text-[10px] text-muted">{u.role}</div>
                        <div className="text-[10px] text-muted">{scopeText(u.id)}</div>
                      </div>
                      {isActive ? (
                        <span className="inline-flex px-[7px] py-[2px] rounded-lg text-[10px] font-medium bg-card text-orange shrink-0">
                          Active
                        </span>
                      ) : (
                        <button
                          onClick={() => switchUser(u.id, u.name)}
                          className="px-3 py-1 rounded text-[10px] font-medium border border-border text-muted hover:text-primary shrink-0"
                        >
                          Switch to
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Card 2 — Access matrix */}
            <section className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-[12px] font-medium text-primary">Access permissions</h2>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-muted">
                    {['Cluster', 'Fabiola', 'Hilma', 'Jemilah'].map(h => (
                      <th key={h} className="px-4 py-2 font-medium border-b border-border">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map(row => (
                    <tr key={row.cluster} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 text-[11px] font-medium text-primary">{row.cluster}</td>
                      <td className="px-4 py-2"><AccessPill access={row.fabiola} /></td>
                      <td className="px-4 py-2"><AccessPill access={row.hilma} /></td>
                      <td className="px-4 py-2"><AccessPill access={row.jemilah} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Card 3 — Notifications */}
            <section className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-[12px] font-medium text-primary">Notifications</h2>
              </div>
              <div className="p-3 space-y-1">
                {prefs.map(p => (
                  <div key={p.id} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-background">
                    <span className="text-[11px] text-primary">{p.label}</span>
                    <button
                      onClick={() => togglePref(p.id)}
                      aria-pressed={p.on}
                      className={`inline-flex items-center w-10 h-[20px] rounded-full px-[2px] transition-colors ${
                        p.on ? 'bg-orange justify-end' : 'bg-card border border-border justify-start'
                      }`}
                    >
                      <span className={`w-[15px] h-[15px] rounded-full ${p.on ? 'bg-white' : 'bg-muted/40'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Card 4 — Application info */}
            <section className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-[12px] font-medium text-primary">Application</h2>
              </div>
              <div className="p-4 space-y-2">
                {appInfo.map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[11px]">
                    <span className="text-muted">{k}</span>
                    <span className="text-primary">{v}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="w-[240px] shrink-0 space-y-3">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-[11px] font-medium text-primary mb-2">Quick links</h3>
              <ul className="space-y-1">
                {QUICK_LINKS.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[11px] text-muted hover:text-orange">
                      → {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-[11px] font-medium text-primary mb-2">Export</h3>
              <div className="space-y-2">
                {['Export all registers', 'Export audit trail', 'Download board pack'].map(label => (
                  <button
                    key={label}
                    onClick={() => showToast(`${label} — preparing download`)}
                    className="w-full flex items-center gap-2 px-3 py-[6px] rounded border border-border text-[10px] font-medium text-muted hover:text-primary"
                  >
                    <Download className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
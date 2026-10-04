import { ReactNode, useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useAuditTrail } from '../../contexts/AuditTrailContext';

interface TopbarProps {
  title: string;
  actions?: ReactNode;
}

// STOPGAP: "last seen" stored per user id in localStorage (per-browser).
const seenKey = (userId: string) => `gondwana.filingNotifSeen.${userId}`;

function FilingBell() {
  const { activeUser } = useUser();
  const { events } = useAuditTrail();
  const [lastSeen, setLastSeen] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState<typeof events>([]);

  useEffect(() => {
    setLastSeen(window.localStorage.getItem(seenKey(activeUser.id)) ?? '');
    setOpen(false);
  }, [activeUser.id]);

  const unseen = events.filter(e => e.type === 'Filing' && e.createdAt && e.createdAt > lastSeen);

  const toggle = () => {
    if (!open) {
      setShown(unseen);
      const now = new Date().toISOString();
      try { window.localStorage.setItem(seenKey(activeUser.id), now); } catch { /* ignore */ }
      setLastSeen(now);
    }
    setOpen(o => !o);
  };

  return (
    <div className="relative">
      <button onClick={toggle} aria-label="Filing notifications" className="relative p-1.5 rounded-lg hover:bg-background text-muted">
        <Bell className="w-4 h-4" />
        {unseen.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-red text-white text-[9px] font-medium flex items-center justify-center">
            {unseen.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="px-3 py-2 border-b border-border text-[11px] font-medium text-primary">New filing activity</div>
          {shown.length === 0 ? (
            <p className="px-3 py-4 text-[11px] text-muted">No new filing activity.</p>
          ) : (
            <ul className="max-h-72 overflow-y-auto divide-y divide-border">
              {shown.map(e => (
                <li key={e.id} className="px-3 py-2">
                  <div className="text-[11px] font-medium text-primary">{e.entity}</div>
                  <div className="text-[11px] text-muted">{e.action}</div>
                  <div className="text-[10px] text-muted mt-0.5">{e.timestamp} · {e.actor}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function Topbar({ title, actions }: TopbarProps) {
  const { activeUser } = useUser();
  const isCosec = activeUser.type === 'cosec';
  return (
    <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <h1 className="text-[14px] font-medium text-primary">{title}</h1>
      <div className="flex items-center gap-2">
        {actions}
        {isCosec && <FilingBell />}
      </div>
    </header>
  );
}

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useDirector } from '../../contexts/DirectorContext';

export default function DirectorBanner() {
  const { activeUser } = useUser();
  const { minutes, rsvp, declarations } = useDirector();
  const [open, setOpen] = useState(false);

  const notifications = [
    ...minutes
      .filter((m) => m.status === 'pending')
      .map((m) => ({ id: m.id, text: `${m.title} minutes awaiting your review` })),
    ...(rsvp.status === 'pending'
      ? [{ id: 'rsvp', text: 'RSVP required — Q3 2026 Board Meeting, 28 Aug 2026' }]
      : []),
    ...declarations
      .filter((d) => d.status === 'due')
      .map((d) => ({ id: d.id, text: `${d.name} due ${d.due}` })),
  ];

  return (
    <div className="bg-orange text-white px-4 py-2 flex items-center justify-between text-[12px] relative">
      <span className="font-medium">Director portal — Gondwana Holdings Limited</span>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-white/15">
          {activeUser.name} · {activeUser.role}
        </span>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex items-center p-1 rounded hover:bg-white/15"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 rounded-full bg-white text-orange text-[9px] font-medium flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute right-0 top-8 w-[280px] bg-card border border-border rounded-md p-3 z-50 text-primary">
              <div className="text-[10px] uppercase text-muted mb-2">Notifications</div>
              {notifications.length === 0 ? (
                <div className="text-[11px] text-muted">Nothing outstanding</div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="text-[11px] py-1.5 border-b border-border last:border-0">
                    {n.text}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
          Live · Synced now
        </span>
      </div>
    </div>
  );
}

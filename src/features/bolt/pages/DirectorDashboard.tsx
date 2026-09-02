import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Card, Pill, todayLabel } from '../components/director/DirectorShared';
import { useMyEntities } from '../components/director/MyEntitiesCard';
import { useUser } from '../contexts/UserContext';
import { useDirector } from '../contexts/DirectorContext';
import { getClusterById } from '../data/clusters';

// Baseline outstanding items per director (FY2025/26 cycle)
const DIRECTOR_FLAGS: Record<string, { minutes: boolean; rsvp: boolean; coi: boolean }> = {
  dave: { minutes: true, rsvp: true, coi: false },
  gys: { minutes: false, rsvp: true, coi: false },
  james: { minutes: false, rsvp: true, coi: false },
  davidn: { minutes: true, rsvp: true, coi: true },
  hannes: { minutes: true, rsvp: true, coi: true },
  jaco: { minutes: false, rsvp: true, coi: false },
};

export default function DirectorDashboard() {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const { minutes, rsvp } = useDirector();
  const mine = useMyEntities();

  const isDirector = activeUser.type === 'director';
  useEffect(() => {
    if (!isDirector) navigate({ to: '/dashboard', replace: true });
  }, [isDirector, navigate]);
  if (!isDirector) return null;

  const flags = DIRECTOR_FLAGS[activeUser.id] ?? { minutes: false, rsvp: true, coi: false };
  const pendingMinutesItem = minutes.find((m) => m.status === 'pending');
  const minutesPending = flags.minutes && !!pendingMinutesItem;
  const rsvpPending = flags.rsvp && rsvp.status === 'pending';
  const coiPending = flags.coi;
  const total = (minutesPending ? 1 : 0) + (rsvpPending ? 1 : 0) + (coiPending ? 1 : 0);

  const firstName = activeUser.name.split(' ')[0];

  const rsvpLabel =
    rsvp.choice === 'in-person' ? 'Attending in person'
    : rsvp.choice === 'remote' ? 'Attending remotely'
    : rsvp.choice === 'apologies' ? 'Apologies sent'
    : null;
  const rsvpTone = rsvp.choice === 'apologies' ? 'red' : rsvp.choice === 'remote' ? 'blue' : 'green';

  return (
    <div>
      {/* Topbar */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-border bg-card">
        <div>
          <div className="text-[16px] font-medium text-primary">Good morning, {firstName}</div>
          <div className="text-[11px] text-muted mt-0.5">{activeUser.role}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-muted">{todayLabel}</div>
          <div className="text-[10px] text-muted mt-0.5">
            Cluster {activeUser.clusters.join(', ')} · {mine.length} entities
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {/* Attention box */}
        {total > 0 && (
          <div className="bg-orange-tint border border-orange/30 rounded-md px-4 py-3 flex items-center justify-between">
            <div className="text-[13px] font-medium text-orange">
              {total} item{total === 1 ? '' : 's'} require your attention
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-[16px] font-medium text-orange">{minutesPending ? 1 : 0}</div>
                <div className="text-[10px] text-muted">Minutes pending review</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-medium text-amber">{rsvpPending ? 1 : 0}</div>
                <div className="text-[10px] text-muted">RSVP outstanding</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-medium text-red">{coiPending ? 1 : 0}</div>
                <div className="text-[10px] text-muted">COI declaration due</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Card 1 — Minutes for review */}
            <Card accent={minutesPending} className="p-4">
              <div className="text-[12px] font-medium text-primary mb-3">Minutes for review</div>
              {minutesPending && pendingMinutesItem ? (
                <div className="bg-orange-tint rounded-md px-3 py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[12px] font-medium text-primary">{pendingMinutesItem.title}</div>
                    <div className="text-[10px] text-muted">
                      Sent by {pendingMinutesItem.sentBy} · {pendingMinutesItem.sentAgo}
                    </div>
                    <div className="text-[10px] text-amber mt-0.5">Respond by {pendingMinutesItem.respondBy}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Pill tone="amber">Awaiting</Pill>
                    <Link
                      to="/director-minutes"
                      className="px-3 py-1.5 rounded bg-orange text-white text-[11px] hover:opacity-90"
                    >
                      Review →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-green-tint rounded-md px-3 py-2.5 text-[11px] text-green">
                  ✓ No minutes awaiting review
                </div>
              )}
            </Card>

            {/* Card 2 — Board meetings */}
            <Card className="p-4">
              <div className="text-[12px] font-medium text-primary mb-3">Upcoming board meetings</div>
              <div className="border border-border rounded-md p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] font-medium text-primary">Q3 2026 Board Meeting</div>
                  <Pill tone="orange">28 August 2026</Pill>
                </div>
                <div className="text-[10px] text-muted">28 August 2026 · 18:00 WAT · Dave Smuts</div>
                <div className="flex items-center justify-between">
                  <Pill tone="green">Board pack · Available</Pill>
                  <button className="px-3 py-1 rounded border border-border text-[10px] text-primary hover:bg-black/5">
                    ⬇ Download
                  </button>
                </div>
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  {rsvpPending ? (
                    <>
                      <span className="text-[10px] text-amber">RSVP required by 21 Aug 2026</span>
                      <Link to="/director-meetings" className="text-[11px] text-orange hover:underline">
                        Go to RSVP →
                      </Link>
                    </>
                  ) : (
                    <>
                      <Pill tone={rsvpTone as 'green' | 'blue' | 'red'}>RSVP confirmed — {rsvpLabel}</Pill>
                      <Link to="/director-meetings" className="text-[11px] text-orange hover:underline">
                        Change RSVP
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* Card 3 — My entities */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] font-medium text-primary">My entities</div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted">{mine.length} entities</span>
                  <Link to="/director-entities" className="text-[11px] text-orange hover:underline">
                    View all →
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {mine.map((e) => (
                  <div key={e.id} className="border border-border rounded-md p-2.5">
                    <div className="text-[11px] font-medium text-primary truncate">{e.name}</div>
                    <div className="text-[10px] text-muted">
                      {e.code} · Cluster {e.cluster}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <Pill tone={e.status === 'compliant' ? 'green' : e.status === 'due soon' ? 'amber' : 'red'}>
                        {e.status}
                      </Pill>
                      <span className="text-[10px] text-muted">{e.complianceScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-muted mt-3">
                Read-only view — statutory records are maintained by the Company Secretary.
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
            {/* Card 1 — Pending items */}
            <Card className="p-4">
              <div className="text-[11px] font-medium text-primary mb-2">Pending items</div>
              {total === 0 ? (
                <div className="bg-green-tint rounded-md px-3 py-2 text-[11px] text-green">✓ All up to date</div>
              ) : (
                <div className="flex flex-col">
                  {minutesPending && (
                    <div className="flex items-center gap-2 py-2 border-b border-border">
                      <span className="w-2 h-2 rounded-full bg-red flex-shrink-0" />
                      <span className="text-[11px] text-primary flex-1">Minutes — Feb 2026 GM</span>
                      <Link to="/director-minutes" className="text-[10px] text-orange hover:underline">
                        Review →
                      </Link>
                    </div>
                  )}
                  {rsvpPending && (
                    <div className="flex items-center gap-2 py-2 border-b border-border last:border-0">
                      <span className="w-2 h-2 rounded-full bg-amber flex-shrink-0" />
                      <span className="text-[11px] text-primary flex-1">RSVP — 28 Aug 2026</span>
                      <Link to="/director-meetings" className="text-[10px] text-orange hover:underline">
                        RSVP →
                      </Link>
                    </div>
                  )}
                  {coiPending && (
                    <div className="flex items-center gap-2 py-2 border-b border-border last:border-0">
                      <span className="w-2 h-2 rounded-full bg-red flex-shrink-0" />
                      <span className="text-[11px] text-primary flex-1">COI declaration — FY2025</span>
                      <Link to="/director-declarations" className="text-[10px] text-orange hover:underline">
                        Declare →
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Card 2 — Notifications */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-medium text-primary">Notifications</div>
                <button className="text-[10px] text-orange hover:underline">Mark all read</button>
              </div>
              {[
                { icon: '📄', text: 'Minutes for review — Feb 2026 GM', meta: 'Fabiola Schrywer · 2 days ago', unread: true },
                { icon: '📅', text: 'Board meeting — 28 Aug 2026', meta: 'RSVP required · 5 days ago', unread: true },
                { icon: '✅', text: 'Board pack available — 9 documents', meta: '1 day ago', unread: false },
                { icon: '💬', text: 'COI declaration reminder — FY2025', meta: '1 week ago', unread: false },
              ].map((n) => (
                <div key={n.text} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                  <span className="text-[12px]">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-primary">{n.text}</div>
                    <div className="text-[10px] text-muted">{n.meta}</div>
                  </div>
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-orange mt-1.5 flex-shrink-0" />}
                </div>
              ))}
            </Card>

            {/* Card 3 — My profile */}
            <Card className="p-4">
              <div className="text-[11px] font-medium text-primary mb-2">Director profile</div>
              <div className="text-[12px] font-medium text-primary">{activeUser.name}</div>
              <div className="text-[10px] text-muted mb-2">{activeUser.role}</div>
              <div className="flex flex-wrap gap-1 mb-3">
                {activeUser.clusters.map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-full bg-orange-tint text-orange text-[10px]">
                    Cluster {c} · {getClusterById(c)?.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-border">
                <span className="text-[10px] text-muted">COI FY2025</span>
                {coiPending ? <Pill tone="amber">Outstanding</Pill> : <Pill tone="green">Filed</Pill>}
              </div>
              <div className="flex items-center justify-between py-1.5 border-t border-border">
                <span className="text-[10px] text-muted">Next meeting</span>
                <span className="text-[10px] text-primary">28 Aug 2026</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

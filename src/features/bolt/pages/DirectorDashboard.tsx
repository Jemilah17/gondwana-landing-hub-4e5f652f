import { Card, Pill, todayLabel } from '../components/director/DirectorShared';
import MinutesReviewCard from '../components/director/MinutesReviewCard';
import BoardMeetingCard from '../components/director/BoardMeetingCard';
import MyEntitiesCard, { useMyEntities } from '../components/director/MyEntitiesCard';
import { useUser } from '../contexts/UserContext';
import { useDirector } from '../contexts/DirectorContext';

export default function DirectorDashboard() {
  const { activeUser } = useUser();
  const { minutes, rsvp, declarations } = useDirector();
  const mine = useMyEntities();

  const pendingMinutes = minutes.filter((m) => m.status === 'pending').length;
  const pendingRsvp = rsvp.status === 'pending' ? 1 : 0;
  const dueDeclarations = declarations.filter((d) => d.status === 'due').length;
  const total = pendingMinutes + pendingRsvp + dueDeclarations;

  return (
    <div>
      <div className="flex items-start justify-between px-6 py-4 border-b border-border bg-card">
        <div>
          <div className="text-[16px] font-medium text-primary">Good morning, {activeUser.name}</div>
          <div className="text-[11px] text-muted mt-0.5">
            {activeUser.role} · {todayLabel}
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-tint text-orange text-[11px]">
          Cluster {activeUser.clusters.join(', ')} · {mine.length} entities
        </span>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {total > 0 && (
          <div className="bg-orange-tint border border-orange/30 rounded-md px-4 py-3 flex items-center justify-between">
            <div className="text-[13px] font-medium text-orange">
              {total} item{total === 1 ? '' : 's'} require your attention
            </div>
            <div className="flex gap-6">
              <div className="text-right">
                <div className="text-[16px] font-medium text-orange">{pendingMinutes}</div>
                <div className="text-[10px] text-muted">Minutes pending review</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-medium text-amber">{pendingRsvp}</div>
                <div className="text-[10px] text-muted">RSVPs outstanding</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-medium text-red">{dueDeclarations}</div>
                <div className="text-[10px] text-muted">Declarations due</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <MinutesReviewCard />
            <BoardMeetingCard />
            <MyEntitiesCard limit={6} />
          </div>

          <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
            <Card className="p-4">
              <div className="text-[10px] uppercase text-muted mb-2">My declarations</div>
              {declarations.map((d) => (
                <div key={d.id} className="py-2 border-b border-border last:border-0">
                  <div className="text-[11px] font-medium text-primary">{d.name}</div>
                  <div className="text-[10px] text-muted mb-1">Due {d.due}</div>
                  <Pill tone={d.status === 'due' ? 'red' : 'green'}>
                    {d.status === 'due' ? 'Action required' : 'Submitted ✓'}
                  </Pill>
                </div>
              ))}
            </Card>

            <Card className="p-4">
              <div className="text-[10px] uppercase text-muted mb-2">Board calendar</div>
              {[
                ['Q3 2026 Board Meeting', '28 Aug 2026'],
                ['Audit Risk & Opp Cttee', '14 Sep 2026'],
                ['Q4 2026 Board Meeting', '26 Nov 2026'],
              ].map(([name, date]) => (
                <div key={name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-[11px] text-primary">{name}</span>
                  <span className="text-[10px] text-muted">{date}</span>
                </div>
              ))}
            </Card>

            <Card className="p-4">
              <div className="text-[10px] uppercase text-muted mb-2">Contact</div>
              <div className="text-[11px] text-primary">Fabiola Schrywer</div>
              <div className="text-[10px] text-muted">Group Company Secretary</div>
              <div className="text-[10px] text-muted mt-1">cosec@gondwana-collection.com</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

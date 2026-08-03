import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import BoardMeetingCard from '../components/director/BoardMeetingCard';

export default function DirectorMeetings() {
  return (
    <div>
      <DirectorHeader title="Board meetings" subtitle="Your upcoming meetings, board packs and RSVP status" />
      <div className="p-6 flex flex-col gap-4">
        <BoardMeetingCard />
        <Card className="p-4">
          <div className="text-[12px] font-medium text-primary mb-3">Past meetings</div>
          {[
            ['Q2 2026 Board Meeting', '28 May 2026', 'Attended'],
            ['February 2026 General Meeting', '26 Feb 2026', 'Attended'],
            ['Q1 2026 Board Meeting', '19 Feb 2026', 'Apologies'],
          ].map(([name, date, status]) => (
            <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="text-[11px] font-medium text-primary">{name}</div>
                <div className="text-[10px] text-muted">{date}</div>
              </div>
              <Pill tone={status === 'Attended' ? 'green' : 'red'}>{status}</Pill>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import BoardMeetingCard from '../components/director/BoardMeetingCard';

const pastMeetings = [
  ['4th Annual General Meeting', '24 Jun 2021', 'Attended'],
  ['5th Annual General Meeting', '02 Jun 2022', 'Attended'],
  ['February 2026 General Meeting', '26 Feb 2026', 'Attended'],
];

export default function DirectorMeetings() {
  return (
    <div>
      <DirectorHeader
        title="Board meetings"
        subtitle="Your upcoming meetings, board packs and RSVP status"
      />
      <div className="p-6 flex flex-col gap-5">
        <section>
          <BoardMeetingCard />
        </section>

        <section>
          <div className="text-[11px] font-medium text-muted mb-2">Past meetings</div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Meeting</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Date</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pastMeetings.map(([name, date, status]) => (
                  <tr key={name} className="hover:bg-background">
                    <td className="px-4 py-3 text-[11px] font-medium text-primary">{name}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{date}</td>
                    <td className="px-4 py-3"><Pill tone="green">{status}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </div>
    </div>
  );
}

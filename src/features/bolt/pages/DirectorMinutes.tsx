import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import MinutesReviewCard from '../components/director/MinutesReviewCard';

const reviewed = [
  ['4th Annual General Meeting', '24 Jun 2021', 'Approved', '08 Jul 2021'],
  ['5th Annual General Meeting', '02 Jun 2022', 'Approved', '17 Jun 2022'],
  ['Q2 2026 Board Meeting', '28 May 2026', 'Approved', '11 Jun 2026'],
];

export default function DirectorMinutes() {
  return (
    <div>
      <DirectorHeader
        title="Minutes for review"
        subtitle="Minutes circulated to you by the Company Secretary for review and response"
      />
      <div className="p-6 flex flex-col gap-5">
        <MinutesReviewCard />

        <section>
          <div className="text-[11px] font-medium text-muted mb-2">Previously reviewed minutes</div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Meeting</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Date</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">My response</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Date submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reviewed.map(([name, date, response, submitted]) => (
                  <tr key={name} className="hover:bg-background">
                    <td className="px-4 py-3 text-[11px] font-medium text-primary">{name}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{date}</td>
                    <td className="px-4 py-3"><Pill tone="green">{response}</Pill></td>
                    <td className="px-4 py-3 text-[11px] text-muted">{submitted}</td>
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

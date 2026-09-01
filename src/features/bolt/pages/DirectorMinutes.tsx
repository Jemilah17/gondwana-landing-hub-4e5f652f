import { useState } from 'react';
import { Check, Pencil, MessageSquare, X } from 'lucide-react';
import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import { useDirector, type MinutesChoice } from '../contexts/DirectorContext';
import { useToast } from '../contexts/ToastContext';

const pastReviews = [
  ['5th Annual General Meeting', '02 Jun 2022', 'Approved', 'Jun 2022'],
  ['4th Annual General Meeting', '24 Jun 2021', 'Approved', 'Jun 2021'],
];

function FullMinutesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[560px] bg-card border-l border-border overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-[14px] font-medium text-primary">February 2026 General Meeting — Minutes</h2>
          <button onClick={onClose} className="text-muted hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 text-[11px] text-primary leading-relaxed">
          <div className="text-center mb-6">
            <div className="text-[14px] font-medium">Gondwana Holdings Limited</div>
            <div className="text-[10px] text-muted">Registration No. 2017/1055 · Gondwana House, Windhoek, Namibia</div>
          </div>
          <div className="text-[13px] font-medium mb-1">Minutes of the General Meeting</div>
          <div className="text-muted mb-4">Held on Thursday 26 February 2026 at 18:00 WAT · Gondwana House Boardroom, Windhoek</div>

          {[
            ['1. Welcome and constitution of meeting', 'The Chairperson, Dave Smuts, welcomed all members present and confirmed that a quorum was constituted in accordance with the Articles of Association. The meeting was declared duly convened.'],
            ['2. Attendance and apologies', 'Present: Dave Smuts (Chairperson), Jemilah Nujoma, Andries van Wyk, Sophia Kaluwa. Apologies received from Hilma Amutenya. The Company Secretary, Fabiola Schrywer, was in attendance.'],
            ['3. Confirmation of previous minutes', 'The minutes of the Annual General Meeting held on 02 June 2022 were taken as read and confirmed as a correct record of the proceedings.'],
            ['4. Matters arising', 'There were no matters arising from the previous minutes that were not covered by the agenda.'],
            ['5. Directors\' report', 'The directors\' report for the period under review was tabled and noted. The Chairperson highlighted continued performance across the hospitality portfolio and progress on compliance remediation in Cluster A.'],
            ['6. Financial statements', 'The annual financial statements for the year ended 31 December 2025 were presented. The meeting noted the statements and the auditor\'s unqualified opinion thereon.'],
            ['7. Ordinary resolution — adoption of financial statements', 'RESOLVED as an ordinary resolution that the annual financial statements for the year ended 31 December 2025, together with the reports of the directors and auditors, be and are hereby adopted. Carried unanimously.'],
            ['8. Ordinary resolution — re-election of directors', 'RESOLVED as an ordinary resolution that Jemilah Nujoma, who retires by rotation in terms of the Articles, be and is hereby re-elected as a director of the Company. Carried unanimously.'],
            ['9. Appointment of auditors', 'RESOLVED that the incumbent auditors be re-appointed for the ensuing financial year at a remuneration to be agreed by the directors. Carried unanimously.'],
            ['10. General business', 'No further business was raised by the members present.'],
            ['11. Closure', 'There being no further business, the Chairperson declared the meeting closed at 19:15.'],
          ].map(([title, body]) => (
            <div key={title} className="mb-4">
              <div className="font-medium text-[12px] mb-1">{title}</div>
              <div className="text-muted">{body}</div>
            </div>
          ))}

          <div className="mt-8 pt-4 border-t border-border grid grid-cols-2 gap-6">
            <div>
              <div className="border-b border-border h-8" />
              <div className="text-muted mt-1">Dave Smuts — Chairperson</div>
            </div>
            <div>
              <div className="border-b border-border h-8" />
              <div className="text-muted mt-1">Fabiola Schrywer — Company Secretary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectorMinutes() {
  const { minutes, submitMinutesResponse } = useDirector();
  const { showToast } = useToast();
  const [choice, setChoice] = useState<MinutesChoice | null>(null);
  const [note, setNote] = useState('');
  const [viewing, setViewing] = useState(false);

  const review = minutes.find((m) => m.id === 'feb-2026-gm');
  const pending = review?.status === 'pending';

  const submit = () => {
    if (!choice || !review) return;
    submitMinutesResponse(review.id, choice, note);
    showToast('Response submitted · CoSec notified');
  };

  const responseOptions = [
    { key: 'approve' as MinutesChoice, tint: '#EAF5EE', accent: '#2D7A4F', Icon: Check, title: 'Approve as is', body: 'Minutes accurately reflect the proceedings' },
    { key: 'corrections' as MinutesChoice, tint: '#FDF3E3', accent: '#B5791F', Icon: Pencil, title: 'Approve with minor corrections', body: 'I have minor typographical corrections' },
    { key: 'comment' as MinutesChoice, tint: '#FBF0EA', accent: '#D4652A', Icon: MessageSquare, title: 'I have comments or queries', body: 'I wish to raise a substantive point' },
  ];

  return (
    <div>
      <DirectorHeader
        title="Minutes for review"
        subtitle="Documents sent by the Company Secretary for your review and comment"
      />
      <div className="p-6 flex flex-col gap-5">
        {pending && (
          <div className="bg-orange-tint text-orange text-[11px] font-medium rounded-md px-3 py-2">
            1 set of minutes requires your response by 26 Jul 2026
          </div>
        )}

        {review && (
          <Card className="p-4" style={{ borderLeft: '3px solid #D4652A' }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[13px] font-medium text-primary">{review.title}</div>
                <div className="text-[10px] text-muted">{review.meta}</div>
                <div className="text-[10px] text-muted">Sent by {review.sentBy} · {review.sentAgo}</div>
                <div className="text-[10px] text-amber mt-0.5">Respond by {review.respondBy}</div>
              </div>
              {pending ? (
                <Pill tone="amber">Awaiting your response</Pill>
              ) : (
                <Pill tone="green">Response submitted</Pill>
              )}
            </div>

            <button
              onClick={() => setViewing(true)}
              className="w-full mt-3 h-9 rounded-md border border-border text-[11px] font-medium text-primary hover:bg-background"
            >
              View full minutes document
            </button>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-[12px] font-medium text-primary mb-3">Your response</div>
              {!pending && review.status === 'submitted' ? (
                <div className="rounded-md px-3 py-2.5" style={{ background: '#EAF5EE' }}>
                  <div className="text-[11px] font-medium" style={{ color: '#2D7A4F' }}>Response submitted ✓</div>
                  <div className="text-[10px] text-muted">Fabiola Schrywer has been notified</div>
                  {review.note && <div className="text-[10px] text-muted mt-1">"{review.note}"</div>}
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    {responseOptions.map((o) => {
                      const active = choice === o.key;
                      return (
                        <div key={o.key}>
                          <button
                            onClick={() => setChoice(o.key)}
                            className="w-full text-left rounded-md p-3 flex gap-2 items-start"
                            style={{ background: o.tint, border: `1px solid ${active ? o.accent : 'transparent'}` }}
                          >
                            <o.Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: o.accent }} />
                            <span className="flex-1">
                              <span className="block text-[12px] font-medium text-primary">{o.title}</span>
                              <span className="block text-[10px] text-muted">{o.body}</span>
                            </span>
                          </button>
                          {active && o.key !== 'approve' && (
                            <textarea
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              placeholder={o.key === 'corrections' ? 'Describe corrections...' : 'Describe your comment clearly...'}
                              rows={3}
                              className="w-full mt-2 border border-border rounded-md p-2 text-[11px] bg-card text-primary resize-none"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    disabled={!choice}
                    onClick={submit}
                    className="w-full mt-3 h-10 rounded-md bg-orange text-white text-[12px] font-medium disabled:opacity-50"
                  >
                    Submit response
                  </button>
                </>
              )}
            </div>
          </Card>
        )}

        <section>
          <div className="text-[12px] font-medium text-primary mb-2">Previously reviewed minutes</div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Meeting</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Date</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">My response</th>
                  <th className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pastReviews.map(([name, date, response, submitted]) => (
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

      {viewing && <FullMinutesPanel onClose={() => setViewing(false)} />}
    </div>
  );
}

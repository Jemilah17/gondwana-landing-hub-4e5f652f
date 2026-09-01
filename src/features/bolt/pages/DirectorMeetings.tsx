import { useState } from 'react';
import { Check, Smartphone, X, Download } from 'lucide-react';
import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import { useDirector, type RsvpChoice } from '../contexts/DirectorContext';
import { useToast } from '../contexts/ToastContext';

const labels: Record<RsvpChoice, string> = {
  'in-person': 'Attending in person',
  remote: 'Attending remotely',
  apologies: 'Sending apologies',
};

const pastMeetings = [
  ['February 2026 General Meeting', '26 Feb 2026', 'Attended'],
  ['5th Annual General Meeting', '02 Jun 2022', 'Attended'],
  ['4th Annual General Meeting', '24 Jun 2021', 'Attended'],
];

export default function DirectorMeetings() {
  const { rsvp, setRsvp } = useDirector();
  const { showToast } = useToast();
  const [choice, setChoice] = useState<RsvpChoice | null>(null);
  const [method, setMethod] = useState('Video call');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [changing, setChanging] = useState(false);

  const confirmed = rsvp.status === 'confirmed' && !changing && rsvp.choice;

  const confirm = () => {
    if (!choice) return;
    const detail =
      choice === 'remote'
        ? [method, location].filter(Boolean).join(' · ')
        : choice === 'apologies' && reason
          ? reason
          : '';
    setRsvp({ status: 'confirmed', choice, detail });
    setChanging(false);
    showToast('RSVP confirmed · Fabiola Schrywer notified');
  };

  const options = [
    { key: 'in-person' as RsvpChoice, tint: '#EAF5EE', accent: '#2D7A4F', Icon: Check, title: 'Attending in person', body: 'I will attend at the venue' },
    { key: 'remote' as RsvpChoice, tint: '#E8F1FB', accent: '#1A5FA5', Icon: Smartphone, title: 'Attending remotely', body: 'I will attend via video or telephone' },
    { key: 'apologies' as RsvpChoice, tint: '#FAEAEA', accent: '#B53A2F', Icon: X, title: 'Sending apologies', body: 'I am unable to attend' },
  ];

  return (
    <div>
      <DirectorHeader
        title="Board meetings"
        subtitle="Upcoming meetings, RSVP, and board pack access"
      />
      <div className="p-6 flex flex-col gap-6">
        <section>
          <div className="text-[11px] font-medium text-muted mb-2 uppercase">Upcoming</div>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-medium text-primary">Q3 2026 Board Meeting</div>
              <Pill tone="orange">28 August 2026</Pill>
            </div>

            <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[10px]">
              {[
                ['Date', 'Thursday 28 August 2026'],
                ['Time', '18:00 WAT'],
                ['Venue', 'Gondwana House Boardroom, Windhoek'],
                ['Chairperson', 'Dave Smuts'],
                ['Format', 'In person'],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="text-muted">{k}: </span>
                  <span className="text-primary">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-md px-3 py-2 flex items-center justify-between" style={{ background: '#EAF5EE' }}>
              <span className="text-[11px] font-medium" style={{ color: '#2D7A4F' }}>✓ Board pack available</span>
              <button className="flex items-center gap-1 px-2.5 py-1.5 border border-orange text-orange rounded-md text-[11px] font-medium hover:bg-orange-tint">
                <Download className="w-3 h-3" /> Download board pack (9 documents)
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-border">
              <div className="text-[12px] font-medium text-primary mb-3">Your RSVP</div>
              {confirmed ? (
                <div
                  className="rounded-md px-3 py-2.5 flex items-center gap-2 flex-wrap"
                  style={{
                    background: rsvp.choice === 'in-person' ? '#EAF5EE' : rsvp.choice === 'remote' ? '#E8F1FB' : '#FAEAEA',
                  }}
                >
                  <Pill tone={rsvp.choice === 'in-person' ? 'green' : rsvp.choice === 'remote' ? 'blue' : 'red'}>
                    RSVP confirmed — {labels[rsvp.choice!]}
                  </Pill>
                  {rsvp.detail && <span className="text-[10px] text-muted">{rsvp.detail}</span>}
                  <button
                    onClick={() => { setChanging(true); setChoice(rsvp.choice ?? null); }}
                    className="text-[10px] text-orange underline"
                  >
                    Change RSVP
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-amber-tint text-amber text-[11px] rounded-md px-3 py-2">
                    RSVP required by 21 August 2026
                  </div>

                  <div className="flex flex-col gap-2 mt-3">
                    {options.map((o) => {
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

                          {active && o.key === 'remote' && (
                            <div className="flex flex-col gap-2 mt-2">
                              <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className="border border-border rounded-md p-2 text-[11px] bg-card text-primary"
                              >
                                <option>Video call</option>
                                <option>Telephone</option>
                                <option>Other</option>
                              </select>
                              <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location, e.g. Cape Town, South Africa"
                                className="border border-border rounded-md p-2 text-[11px] bg-card text-primary"
                              />
                            </div>
                          )}

                          {active && o.key === 'apologies' && (
                            <input
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Reason (optional)"
                              className="border border-border rounded-md p-2 text-[11px] bg-card text-primary mt-2 w-full"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    disabled={!choice}
                    onClick={confirm}
                    className="w-full mt-3 h-10 rounded-md bg-orange text-white text-[12px] font-medium disabled:opacity-50"
                  >
                    Confirm RSVP
                  </button>
                </>
              )}
            </div>
          </Card>
        </section>

        <section>
          <div className="text-[12px] font-medium text-primary mb-2">Past meetings</div>
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

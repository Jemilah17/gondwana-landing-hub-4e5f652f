import { useState } from 'react';
import { Check, Smartphone, X, Download } from 'lucide-react';
import { Card, Pill } from './DirectorShared';
import { useDirector, type RsvpChoice } from '../../contexts/DirectorContext';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import { directors } from '../../data/users';

const labels: Record<RsvpChoice, string> = {
  'in-person': 'Attending in person',
  remote: 'Attending remotely',
  apologies: 'Apologies sent',
};

export default function BoardMeetingCard() {
  const { rsvp, setRsvp, packDistributed } = useDirector();
  const { activeUser } = useUser();
  const { showToast } = useToast();
  const [choice, setChoice] = useState<RsvpChoice | null>(null);
  const [method, setMethod] = useState('Video call');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [alternate, setAlternate] = useState('');
  const [changing, setChanging] = useState(false);

  const confirmed = rsvp.status === 'confirmed' && !changing;

  const confirm = () => {
    if (!choice) return;
    const detail =
      choice === 'remote'
        ? [method, location].filter(Boolean).join(' · ')
        : choice === 'apologies'
          ? [reason, alternate ? `Alternate: ${alternate}` : ''].filter(Boolean).join(' · ')
          : '';
    setRsvp({ status: 'confirmed', choice, detail });
    setChanging(false);
    showToast('RSVP confirmed · Fabiola Schrywer notified');
    setTimeout(
      () => showToast(`${activeUser.name} RSVP: ${labels[choice]} — 28 Aug 2026 board meeting`),
      600,
    );
  };

  return (
    <Card className="p-4">
      <div className="text-[12px] font-medium text-primary mb-3">Upcoming board meetings</div>

      <div className="border border-border rounded-md p-4">
        <div className="text-[12px] font-medium text-primary">Q3 2026 Board Meeting</div>
        <div className="text-[10px] text-muted">Gondwana Holdings Limited</div>

        <div className="grid grid-cols-2 gap-y-1 gap-x-4 mt-3 text-[10px]">
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

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          {packDistributed ? (
            <>
              <Pill tone="green">Board pack available</Pill>
              <button className="flex items-center gap-1 px-2 py-1 border border-border rounded-md text-[11px] text-primary hover:bg-black/[0.03]">
                <Download className="w-3 h-3" /> Download board pack
              </button>
            </>
          ) : (
            <Pill tone="gray">Board pack pending</Pill>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          {confirmed && rsvp.choice ? (
            <div className="flex items-center gap-2">
              <Pill tone={rsvp.choice === 'in-person' ? 'green' : rsvp.choice === 'remote' ? 'blue' : 'red'}>
                RSVP confirmed — {labels[rsvp.choice]}
              </Pill>
              {rsvp.detail && <span className="text-[10px] text-muted">{rsvp.detail}</span>}
              <button
                onClick={() => {
                  setChanging(true);
                  setChoice(rsvp.choice ?? null);
                }}
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
                {([
                  { key: 'in-person' as RsvpChoice, tint: '#EAF5EE', accent: '#2D7A4F', Icon: Check, title: 'Attending in person', body: 'I will attend in person at the venue' },
                  { key: 'remote' as RsvpChoice, tint: '#E8F1FB', accent: '#1A5FA5', Icon: Smartphone, title: 'Attending remotely', body: 'I will attend via video or telephone' },
                  { key: 'apologies' as RsvpChoice, tint: '#FAEAEA', accent: '#B53A2F', Icon: X, title: 'Sending apologies', body: 'I am unable to attend this meeting' },
                ]).map((o) => {
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
                            placeholder="e.g. Cape Town, South Africa"
                            className="border border-border rounded-md p-2 text-[11px] bg-card text-primary"
                          />
                        </div>
                      )}

                      {active && o.key === 'apologies' && (
                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Reason (optional)"
                            className="border border-border rounded-md p-2 text-[11px] bg-card text-primary"
                          />
                          <select
                            value={alternate}
                            onChange={(e) => setAlternate(e.target.value)}
                            className="border border-border rounded-md p-2 text-[11px] bg-card text-primary"
                          >
                            <option value="">Alternate director (optional)</option>
                            {directors
                              .filter((d) => d.id !== activeUser.id)
                              .map((d) => (
                                <option key={d.id} value={d.name}>
                                  {d.name}
                                </option>
                              ))}
                          </select>
                        </div>
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
      </div>
    </Card>
  );
}

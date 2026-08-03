import { useState } from 'react';
import { FileText, Check, Pencil, MessageSquare } from 'lucide-react';
import Drawer from '../ui/Drawer';
import { Card, Pill } from './DirectorShared';
import { useDirector, type MinutesChoice, type MinutesReview } from '../../contexts/DirectorContext';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';

const options: { key: MinutesChoice; title: string; body: string; tone: string; border: string; Icon: typeof Check }[] = [
  { key: 'approve', title: 'Approve as is', body: 'Minutes accurately reflect the meeting proceedings.', tone: '#EAF5EE', border: '#2D7A4F', Icon: Check },
  { key: 'corrections', title: 'Approve with minor corrections', body: 'I have noted typographical or minor factual corrections.', tone: '#FBF3E3', border: '#9A6E1A', Icon: Pencil },
  { key: 'comment', title: 'I have comments or queries', body: 'I wish to raise a point for the Company Secretary to address.', tone: '#FBF0EA', border: '#D4652A', Icon: MessageSquare },
];

function ReviewDrawer({ item, onClose }: { item: MinutesReview; onClose: () => void }) {
  const { submitMinutesResponse } = useDirector();
  const { activeUser } = useUser();
  const { showToast } = useToast();
  const [choice, setChoice] = useState<MinutesChoice | null>(null);
  const [note, setNote] = useState('');
  const [showDoc, setShowDoc] = useState(false);

  return (
    <Drawer isOpen onClose={onClose} title="Minutes review" width="w-[420px]">
      <div className="text-[14px] font-medium text-primary">{item.title}</div>
      <div className="text-[11px] text-muted mt-0.5">{item.meta}</div>
      <div className="text-[10px] text-muted mt-0.5">Sent by {item.sentBy} for your review</div>

      <button
        onClick={() => setShowDoc((v) => !v)}
        className="w-full mt-3 border border-border rounded-md py-2 text-[12px] text-primary hover:bg-black/[0.03]"
      >
        {showDoc ? 'Hide full minutes document' : 'View full minutes document'}
      </button>

      {showDoc && (
        <div className="mt-3 border border-border rounded-md p-4 bg-background text-[11px] text-primary leading-relaxed max-h-[280px] overflow-y-auto">
          <div className="text-center">
            <div className="text-[13px] font-medium tracking-[0.18em]">GONDWANA</div>
            <div className="text-orange text-[9px] tracking-[0.22em]">HOLDINGS LIMITED</div>
          </div>
          <div className="text-center text-[11px] font-medium mt-3 uppercase">
            Minutes of the February 2026 General Meeting
          </div>
          <p className="mt-3"><span className="font-medium">1. Opening and welcome.</span> The Chairperson, Mr Dave Smuts, opened the meeting at 18:00 WAT and welcomed those present.</p>
          <p className="mt-2"><span className="font-medium">2. Quorum.</span> The Company Secretary confirmed that a quorum was present in terms of the Articles of Association.</p>
          <p className="mt-2"><span className="font-medium">3. Notice of meeting.</span> The notice was taken as read.</p>
          <p className="mt-2"><span className="font-medium">4. Resolutions.</span> The resolutions tabled were carried by the required majority.</p>
          <p className="mt-2"><span className="font-medium">5. Closure.</span> There being no further business the Chairperson closed the meeting at 19:20 WAT.</p>
        </div>
      )}

      <div className="text-[12px] font-medium text-primary mt-5 mb-2">Your response</div>
      <div className="flex flex-col gap-2">
        {options.map((o) => {
          const active = choice === o.key;
          return (
            <div key={o.key}>
              <button
                onClick={() => setChoice(o.key)}
                className="w-full text-left rounded-md p-3 flex gap-2 items-start"
                style={{ background: o.tone, border: `1px solid ${active ? o.border : 'transparent'}` }}
              >
                <o.Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: o.border }} />
                <span className="flex-1">
                  <span className="block text-[12px] font-medium text-primary">{o.title}</span>
                  <span className="block text-[10px] text-muted">{o.body}</span>
                </span>
                <span
                  className="w-[14px] h-[14px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: `1px solid ${active ? o.border : '#D8D4CC'}`, background: active ? o.border : 'transparent' }}
                >
                  {active && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
              </button>
              {active && o.key !== 'approve' && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder={o.key === 'corrections' ? 'Describe corrections required...' : 'Describe your comment or query clearly...'}
                  className="w-full mt-2 border border-border rounded-md p-2 text-[11px] text-primary bg-card"
                />
              )}
            </div>
          );
        })}
      </div>

      <button
        disabled={!choice}
        onClick={() => {
          if (!choice) return;
          submitMinutesResponse(item.id, choice, note);
          onClose();
          showToast(`Response submitted · ${item.sentBy} has been notified`);
          setTimeout(() => showToast(`${activeUser.name} responded to Feb 2026 GM minutes`), 600);
        }}
        className="w-full mt-4 h-11 rounded-md bg-orange text-white text-[13px] font-medium disabled:opacity-50"
      >
        Submit response
      </button>
    </Drawer>
  );
}

export default function MinutesReviewCard() {
  const { minutes } = useDirector();
  const [openId, setOpenId] = useState<string | null>(null);
  const pending = minutes.filter((m) => m.status === 'pending');
  const active = minutes.find((m) => m.id === openId) ?? null;

  return (
    <Card accent={pending.length > 0} className="p-4">
      <div className="text-[12px] font-medium text-primary mb-3">Minutes for review</div>

      {pending.length === 0 ? (
        <div className="bg-green-tint text-green text-[11px] rounded-md p-3">
          ✓ You are up to date — no minutes awaiting your review
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        {minutes.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-3 p-3 rounded-md border border-border"
            style={{ background: m.status === 'pending' ? '#FBF0EA' : '#FFFFFF' }}
          >
            <span className="w-7 h-7 rounded-full bg-orange-tint text-orange flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-primary">{m.title}</div>
              <div className="text-[10px] text-muted">Sent by {m.sentBy} · {m.sentAgo}</div>
              {m.status === 'pending' ? (
                <div className="text-[10px] text-amber">Please review and respond by {m.respondBy}</div>
              ) : (
                <div className="text-[10px] text-green">
                  {m.choice === 'approve' ? 'Approved as is' : m.choice === 'corrections' ? 'Approved with minor corrections' : 'Comment submitted'}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {m.status === 'pending' ? (
                <>
                  <Pill tone="amber">Awaiting your response</Pill>
                  <button
                    onClick={() => setOpenId(m.id)}
                    className="px-3 py-1 rounded-md bg-orange text-white text-[11px]"
                  >
                    Review now →
                  </button>
                </>
              ) : (
                <Pill tone="green">Response submitted ✓</Pill>
              )}
            </div>
          </div>
        ))}
      </div>

      {active && <ReviewDrawer item={active} onClose={() => setOpenId(null)} />}
    </Card>
  );
}

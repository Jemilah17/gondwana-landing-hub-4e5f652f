import { useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';

const PENDING_IDS = ['davidn', 'hannes'];

const pastDeclarations = [
  ['FY2024', 'None declared', 'Mar 2025'],
  ['FY2023', 'None declared', 'Mar 2024'],
];

export default function DirectorDeclarations() {
  const { activeUser } = useUser();
  const { showToast } = useToast();

  const isPending = PENDING_IDS.includes(activeUser.id);
  const [submitted, setSubmitted] = useState(false);
  const [choice, setChoice] = useState<'none' | 'disclose' | null>(null);
  const [detail, setDetail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const canSubmit = choice !== null && confirmed && (choice === 'none' || detail.trim().length > 0);

  const submit = () => {
    setSubmitted(true);
    showToast('Submitted · Fabiola Schrywer notified');
  };

  const showForm = isPending && !submitted;

  return (
    <div>
      <DirectorHeader
        title="My declarations"
        subtitle="Conflict of interest declarations under King V and the Companies Act"
      />

      <div className="p-6 flex flex-col gap-5">
        <section className="space-y-2">
          <div className="text-[12px] font-medium text-primary">Current declaration</div>

          {showForm ? (
            <>
              <div className="bg-orange-tint text-orange text-[11px] rounded-md px-3 py-2 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                FY2025 declaration outstanding
              </div>

              <Card className="p-4 space-y-4">
                <div className="text-[12px] text-primary">
                  I, <span className="font-medium">{activeUser.name}</span>, declare that for FY2025:
                </div>

                <div className="flex flex-col gap-2">
                  {([
                    ['none', 'I have no conflicts of interest to declare'],
                    ['disclose', 'I wish to disclose an interest'],
                  ] as const).map(([key, label]) => (
                    <label
                      key={key}
                      className={`flex items-start gap-2 rounded-md p-3 cursor-pointer border ${
                        choice === key ? 'border-orange bg-orange-tint' : 'border-border bg-card'
                      }`}
                    >
                      <input
                        type="radio"
                        name="coi"
                        checked={choice === key}
                        onChange={() => setChoice(key)}
                        className="mt-0.5 accent-orange"
                      />
                      <span className="text-[12px] text-primary">{label}</span>
                    </label>
                  ))}
                </div>

                {choice === 'disclose' && (
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={4}
                    placeholder="Describe the nature and extent of the interest, the entity concerned and the period..."
                    className="w-full border border-border rounded-md p-2 text-[11px] text-primary bg-card"
                  />
                )}

                <label className="flex items-start gap-2 text-[11px] text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 accent-orange"
                  />
                  I confirm this declaration is accurate and complete
                </label>

                <button
                  disabled={!canSubmit}
                  onClick={submit}
                  className="w-full h-10 rounded-md bg-orange text-white text-[12px] font-medium disabled:opacity-50"
                >
                  Submit declaration
                </button>
              </Card>
            </>
          ) : (
            <Card className="p-4">
              <div className="bg-green-tint text-green text-[12px] rounded-md px-3 py-3 flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="block font-medium">FY2025 declaration submitted ✓</span>
                  <span className="block text-[10px] mt-0.5">
                    Submitted {submitted ? '04 Aug 2026' : '18 Mar 2026'} ·{' '}
                    {submitted && choice === 'disclose' ? 'Interest disclosed' : 'No conflicts declared'}
                  </span>
                </span>
              </div>
            </Card>
          )}
        </section>

        <section>
          <div className="text-[11px] font-medium text-muted mb-2">Past declarations</div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  {['FY', 'Status', 'Conflicts', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium text-muted uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pastDeclarations.map(([fy, conflicts, date]) => (
                  <tr key={fy} className="hover:bg-background">
                    <td className="px-4 py-3 text-[11px] font-medium text-primary">{fy}</td>
                    <td className="px-4 py-3"><Pill tone="green">Filed</Pill></td>
                    <td className="px-4 py-3 text-[11px] text-muted">{conflicts}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{date}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => showToast(`${fy} declaration opened — read only`)}
                        className="px-3 py-1 border border-border rounded text-[10px] text-muted hover:bg-background"
                      >
                        View
                      </button>
                    </td>
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

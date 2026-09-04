import { useMemo, useRef, useState } from 'react';
import {
  Plus, Download, Send, Loader2, Check, Clock, UploadCloud,
} from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import Modal from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { useUser } from '../contexts/UserContext';

interface DocRow {
  id: number;
  name: string;
  description: string;
  optional?: boolean;
  file?: string;
}

const initialDocs: DocRow[] = [
  { id: 1, name: 'Meeting notice and agenda', description: 'Formal notice per AoA Art. 14', file: 'Notice_BoardMeeting_28Aug2026.pdf' },
  { id: 2, name: 'Previous meeting minutes', description: 'Minutes of last meeting for adoption at this meeting', file: 'Minutes_BoardMeeting_May2026.pdf' },
  { id: 3, name: 'Management accounts', description: 'Latest financial report — J. Visser', file: 'ManagementAccounts_Jun2026.pdf' },
  { id: 4, name: 'Audit Risk & Opportunity Committee report', description: 'Quarterly committee report — J. Mnyupe', file: 'AROCReport_Q2_2026.pdf' },
  { id: 5, name: 'MD operational report', description: 'Group operational update — G. Joubert', file: 'MDReport_Jul2026.pdf' },
  { id: 6, name: 'People Committee report', description: 'HR and remuneration update — D. Namalenga', file: 'PeopleCommittee_Q2_2026.pdf' },
  { id: 7, name: 'Sustainability Committee report', description: 'ESG and conservation update — H. Gouws' },
  { id: 8, name: 'Risk register update', description: 'Updated enterprise risk register for board review' },
  { id: 9, name: 'Any other business papers', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

interface Director {
  initials: string;
  name: string;
  rsvp: string;
  tone: 'green' | 'amber' | 'blue' | 'gray';
  bg: string;
  fg: string;
}

const directors: Director[] = [
  { initials: 'DS', name: 'Dave Smuts', rsvp: 'Attending', tone: 'green', bg: '#FBF3E3', fg: '#9A6E1A' },
  { initials: 'GJ', name: 'Gys Joubert', rsvp: 'Attending', tone: 'green', bg: '#E8F1FB', fg: '#1A5FA5' },
  { initials: 'JM', name: 'James Mnyupe', rsvp: 'Attending', tone: 'green', bg: '#EAF5EE', fg: '#2D7A4F' },
  { initials: 'DN', name: 'David Namalenga', rsvp: 'Awaiting', tone: 'amber', bg: '#F0EBF8', fg: '#5B3D9A' },
  { initials: 'HG', name: 'Hannes Gouws', rsvp: 'Attending', tone: 'green', bg: '#FBF0EA', fg: '#D4652A' },
  { initials: 'JV', name: 'Jaco Visser', rsvp: 'Remote', tone: 'blue', bg: '#E1F5EE', fg: '#0F6E56' },
  { initials: 'FS', name: 'Fabiola Schrywer', rsvp: 'CoSec', tone: 'gray', bg: '#FBF0EA', fg: '#D4652A' },
];

const toneClass: Record<string, string> = {
  green: 'bg-green-tint text-green',
  amber: 'bg-amber-tint text-amber',
  blue: 'bg-blue-tint text-blue',
  gray: 'bg-background text-muted',
};

const history = [
  { meeting: 'Q2 2026 Board Meeting', date: '28 May 2026', docs: '8 docs', by: 'Fabiola' },
  { meeting: '5th AGM', date: '02 Jun 2022', docs: '12 docs', by: 'Fabiola' },
  { meeting: '4th AGM', date: '24 Jun 2021', docs: '10 docs', by: 'Fabiola' },
  { meeting: 'Feb 2026 GM', date: '26 Feb 2026', docs: '5 docs', by: 'Fabiola' },
];

function Pill({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${toneClass[tone]}`}>{children}</span>
  );
}

interface BoardPackRecord {
  meeting: string;
  date: string;
  time: string;
  venue: string;
  entity: string;
  chairperson: string;
  template: string;
}

const defaultPack: BoardPackRecord = {
  meeting: 'Q3 2026 Board Meeting',
  date: '2026-08-28',
  time: '18:00 WAT',
  venue: 'Gondwana House Boardroom, 42 Nelson Mandela Avenue, Windhoek',
  entity: 'Gondwana Holdings Ltd',
  chairperson: 'Dave Smuts',
  template: 'Standard board meeting (9 items)',
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

const templateOptions = [
  'Standard board meeting (9 items)',
  'AGM pack (12 items)',
  'GM pack (6 items)',
  'Committee meeting (5 items)',
];

const agmDocs: DocRow[] = [
  { id: 1, name: 'Notice of AGM', description: 'Formal notice per AoA Art. 14 — 21 clear days' },
  { id: 2, name: 'Previous AGM minutes', description: 'Minutes of last AGM for adoption' },
  { id: 3, name: 'Annual Financial Statements', description: 'Audited AFS for the financial year — J. Visser' },
  { id: 4, name: "Auditor's report", description: 'Independent auditor opinion — external auditors' },
  { id: 5, name: "Directors' report", description: 'Report of the board to members' },
  { id: 6, name: 'MD operational report', description: 'Group operational update — G. Joubert' },
  { id: 7, name: 'Audit Risk & Opportunity Committee report', description: 'Annual committee report — J. Mnyupe' },
  { id: 8, name: 'People Committee report', description: 'HR and remuneration report — D. Namalenga' },
  { id: 9, name: 'Sustainability Committee report', description: 'ESG and conservation report — H. Gouws' },
  { id: 10, name: 'Director rotation and re-election resolutions', description: 'Directors retiring by rotation per AoA Art. 24' },
  { id: 11, name: 'Special resolutions', description: 'Special resolutions tabled for member approval' },
  { id: 12, name: 'Proxy forms and voting papers', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

const gmDocs: DocRow[] = [
  { id: 1, name: 'Notice of General Meeting', description: 'Formal notice per AoA Art. 14' },
  { id: 2, name: 'Previous meeting minutes', description: 'Minutes of last GM for adoption' },
  { id: 3, name: 'Management accounts', description: 'Latest financial report — J. Visser' },
  { id: 4, name: 'MD operational report', description: 'Group operational update — G. Joubert' },
  { id: 5, name: 'Resolutions for consideration', description: 'Ordinary resolutions tabled for member approval' },
  { id: 6, name: 'Proxy forms', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

const committeeDocs: DocRow[] = [
  { id: 1, name: 'Meeting notice and agenda', description: 'Committee notice and agenda' },
  { id: 2, name: 'Previous committee minutes', description: 'Minutes of last committee meeting for adoption' },
  { id: 3, name: 'Committee report', description: 'Standing report for the period under review' },
  { id: 4, name: 'Matters arising schedule', description: 'Action tracker from previous meeting' },
  { id: 5, name: 'Supporting papers', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

const templateDocs: Record<string, DocRow[]> = {
  'Standard board meeting (9 items)': initialDocs,
  'AGM pack (12 items)': agmDocs,
  'GM pack (6 items)': gmDocs,
  'Committee meeting (5 items)': committeeDocs,
};

export default function BoardPack() {
  const { showToast } = useToast();
  const { canWrite } = useUser();
  const canCompile = canWrite('A');

  const [activePack, setActivePack] = useState<BoardPackRecord>(defaultPack);
  const [docs, setDocs] = useState<DocRow[]>(initialDocs);
  const [uploadFor, setUploadFor] = useState<DocRow | null>(null);
  const [newPackOpen, setNewPackOpen] = useState(false);
  const [distributeOpen, setDistributeOpen] = useState(false);
  const [compiling, setCompiling] = useState(false);
  const [compiled, setCompiled] = useState(false);
  const [distributed, setDistributed] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [recipients, setRecipients] = useState<string[]>(directors.map(d => d.initials));
  const fileRef = useRef<HTMLInputElement>(null);

  // New pack form (controlled)
  const emptyForm = { meeting: '', date: '', time: '18:00 WAT', venue: '', entity: 'Gondwana Holdings Ltd', chairperson: 'Dave Smuts', template: templateOptions[0] };
  const [form, setForm] = useState(emptyForm);
  const setField = (k: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const createPack = () => {
    if (!form.meeting || !form.date) return;
    const record: BoardPackRecord = { ...form, venue: form.venue || defaultPack.venue };
    setActivePack(record);
    const list = templateDocs[form.template] ?? initialDocs;
    setDocs(list.map(({ file: _file, ...d }) => d));
    setRecipients(directors.map(d => d.initials));
    setCompiled(false);
    setDistributed(null);
    setNote('');
    setNewPackOpen(false);
    setForm(emptyForm);
    showToast(`${record.meeting} created · Checklist and recipients reset`);
  };

  const received = docs.filter(d => d.file).length;
  const pct = Math.round((received / docs.length) * 100);
  const requiredDocs = docs.filter(d => !d.optional);
  const requiredReady = requiredDocs.every(d => d.file);

  const ringStyle = useMemo(
    () => ({ background: `conic-gradient(#D4652A ${pct * 3.6}deg, #EFECE6 0deg)` }),
    [pct]
  );

  const handleFile = (file: File) => {
    if (!uploadFor) return;
    const doc = uploadFor;
    const next = docs.map(d => (d.id === doc.id ? { ...d, file: file.name } : d));
    setDocs(next);
    setUploadFor(null);
    showToast(`${doc.name} uploaded · Pack is ${next.filter(d => d.file).length} of 9 complete`);
  };

  const compile = () => {
    setCompiling(true);
    setTimeout(() => {
      setCompiling(false);
      setCompiled(true);
      showToast('Board pack compiled · Ready for distribution');
    }, 1500);
  };

  const confirmDistribution = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setDistributed(`${date} at ${time}`);
    setDistributeOpen(false);
    showToast(`Board pack distributed · ${recipients.length} directors notified · Audit trail entry created`);
  };

  return (
    <div>
      <Topbar
        title="Board pack builder"
        actions={
          <button
            onClick={() => setNewPackOpen(true)}
            className="bg-orange text-white text-[12px] font-medium px-3 py-1.5 rounded hover:bg-[#B5531F]"
          >
            + New board pack
          </button>
        }
      />

      <div className="p-6">
        <p className="text-[11px] text-muted -mt-2 mb-4">
          Compile and distribute board packs for Gondwana Holdings Ltd meetings
        </p>

        {/* Active pack */}
        <div className="bg-card border border-border rounded-lg p-4 border-l-[3px] border-l-orange">
          <div className="text-[13px] font-medium text-primary">
            {activePack.meeting} — {formatDate(activePack.date)}
          </div>
          <div className="text-[11px] text-muted mt-0.5">
            {activePack.entity} · Chairperson: {activePack.chairperson} · {activePack.time} · {activePack.template}
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted mt-3 mb-1">
            <span>{received} of {docs.length} documents received</span>
            <span>{pct}% complete</span>
          </div>
          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-orange rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {compiled && !distributed && (
          <div className="mt-4 bg-green-tint border border-green/20 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[12px] text-green">
              ✓ Board pack compiled — {docs.length} documents · Ready for distribution
            </span>
            <div className="flex items-center gap-2">
              <button className="text-[11px] border border-border bg-card px-3 py-1.5 rounded text-primary hover:bg-background">
                <Download className="w-3 h-3 inline mr-1" /> Download board pack
              </button>
              <button
                onClick={() => setDistributeOpen(true)}
                className="text-[11px] bg-orange text-white px-3 py-1.5 rounded hover:bg-[#B5531F]"
              >
                Distribute to directors →
              </button>
            </div>
          </div>
        )}

        {distributed && (
          <div className="mt-4 bg-green-tint border border-green/20 rounded-lg px-4 py-3 text-[12px] text-green">
            ✓ Board pack distributed to {recipients.length} directors — {distributed} WAT
          </div>
        )}

        <div className="flex gap-4 mt-4 items-start">
          {/* Checklist */}
          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 pb-3">
                <div className="text-[12px] font-medium text-primary">Document checklist</div>
                <div className="text-[10px] text-muted mt-0.5">
                  Upload each document as it is received. Pack compiles when all required items are received.
                </div>
              </div>
              {docs.map((d, i) => (
                <div
                  key={d.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-border' : 'border-t border-border'}`}
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                      d.file ? 'bg-orange' : 'border border-[#D8D4CC]'
                    }`}
                  >
                    {d.file && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-primary">
                      {d.name}
                      {d.optional && <span className="text-[10px] text-muted font-normal ml-1">(Optional)</span>}
                    </div>
                    <div className="text-[10px] text-muted">{d.description}</div>
                    {d.file && (
                      <span className="inline-block mt-1 bg-green-tint text-green text-[10px] px-2 py-0.5 rounded">
                        {d.file}
                      </span>
                    )}
                  </div>
                  {d.file ? (
                    <Pill tone="green">Received ✓</Pill>
                  ) : (
                    <button
                      onClick={() => setUploadFor(d)}
                      className="text-[11px] border border-border px-2.5 py-1 rounded text-primary hover:bg-background"
                    >
                      Upload
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* History */}
            <div className="bg-card border border-border rounded-lg mt-4 p-4">
              <div className="text-[12px] font-medium text-primary mb-3">Previous board packs</div>
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] text-muted uppercase tracking-wider text-left">
                    <th className="pb-2 font-normal">Meeting</th>
                    <th className="pb-2 font-normal">Date</th>
                    <th className="pb-2 font-normal">Documents</th>
                    <th className="pb-2 font-normal">Compiled by</th>
                    <th className="pb-2 font-normal">Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {history.map(h => (
                    <tr key={h.meeting} className="border-t border-border">
                      <td className="py-2 text-[12px] text-primary font-medium">{h.meeting}</td>
                      <td className="py-2 text-[11px] text-muted">{h.date}</td>
                      <td className="py-2 text-[11px] text-muted">{h.docs}</td>
                      <td className="py-2 text-[11px] text-muted">{h.by}</td>
                      <td className="py-2"><Pill tone="green">Distributed</Pill></td>
                      <td className="py-2 text-right">
                        <button className="text-[11px] border border-border px-2.5 py-1 rounded text-primary hover:bg-background">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="w-[220px] flex-shrink-0 flex flex-col gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-2">Meeting details</div>
              {([
                ['Meeting', activePack.meeting],
                ['Date', formatDate(activePack.date)],
                ['Time', activePack.time],
                ['Venue', activePack.venue],
                ['Chairperson', activePack.chairperson],
                ['Entity', activePack.entity],
                ['Template', activePack.template],
              ] as [string, string][]).map(([k, v]) => (
                <div key={k} className="mb-2">
                  <div className="text-[10px] text-muted">{k}</div>
                  <div className="text-[11px] text-primary">{v}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-3">Pack status</div>
              <div className="flex flex-col items-center">
                <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center" style={ringStyle}>
                  <div className="w-[46px] h-[46px] rounded-full bg-card flex items-center justify-center text-[12px] font-medium text-primary">
                    {pct}%
                  </div>
                </div>
                <div className="text-[10px] text-muted mt-2">{received} of {docs.length} received</div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-green">✓ Received</span>
                  <span className="text-green">{received}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-amber">⏳ Pending</span>
                  <span className="text-amber">{docs.length - received}</span>
                </div>
                <div className="text-[10px] text-muted pt-1 border-t border-border">
                  Required before compile: items 1–8
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-2">Will be sent to</div>
              {directors.map(d => (
                <div key={d.initials} className="flex items-center gap-2 py-1">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium flex-shrink-0"
                    style={{ background: d.bg, color: d.fg }}
                  >
                    {d.initials}
                  </span>
                  <span className="text-[10px] font-medium text-primary flex-1 truncate">{d.name}</span>
                  {distributed ? <Pill tone="green">Sent ✓</Pill> : <Pill tone={d.tone}>{d.rsvp}</Pill>}
                </div>
              ))}
              <div className="text-[10px] text-muted mt-2">RSVP deadline: 21 August 2026</div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
              <button
                onClick={compile}
                disabled={!requiredReady || compiling || !canCompile}
                title={
                  !canCompile
                    ? 'You do not have compile rights for this cluster'
                    : !requiredReady
                      ? 'Upload all required documents first'
                      : undefined
                }
                className={`w-full h-10 rounded-lg bg-orange text-white text-[12px] font-medium flex items-center justify-center gap-2 ${
                  !requiredReady || !canCompile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B5531F]'
                }`}
              >
                {compiling && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {compiling ? 'Compiling...' : 'Compile pack'}
              </button>
              <button className="w-full h-9 rounded-lg border border-border text-[11px] text-primary hover:bg-background">
                Save progress
              </button>
              <button className="w-full h-9 rounded-lg border border-border text-[11px] text-primary hover:bg-background">
                Preview pack
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Upload modal */}
      <Modal isOpen={!!uploadFor} onClose={() => setUploadFor(null)} title={uploadFor?.name ?? ''}>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full h-20 border border-dashed border-border rounded-lg text-[11px] text-muted hover:border-orange hover:text-orange flex flex-col items-center justify-center gap-1"
        >
          <UploadCloud className="w-4 h-4" />
          Drop PDF here or click to browse
        </button>
      </Modal>

      {/* Distribute modal */}
      <Modal
        isOpen={distributeOpen}
        onClose={() => setDistributeOpen(false)}
        title="Distribute board pack"
        maxWidth="max-w-[440px]"
      >
        <div className="text-[11px] text-muted mb-3">{activePack.meeting} — {formatDate(activePack.date)}</div>
        <div className="border border-border rounded-lg divide-y divide-border mb-3">
          {directors.map(d => (
            <label key={d.initials} className="flex items-center gap-2 px-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={recipients.includes(d.initials)}
                onChange={e =>
                  setRecipients(prev =>
                    e.target.checked ? [...prev, d.initials] : prev.filter(x => x !== d.initials)
                  )
                }
                className="accent-orange"
              />
              <span className="text-[11px] text-primary flex-1">{d.name}</span>
              <Pill tone={d.tone}>{d.rsvp}</Pill>
            </label>
          ))}
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a note to directors (optional)..."
          className="w-full border border-border rounded-lg p-2 text-[11px] h-20 resize-none bg-card text-primary"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={confirmDistribution}
            className="flex-1 h-9 rounded-lg bg-orange text-white text-[12px] font-medium hover:bg-[#B5531F] flex items-center justify-center gap-1"
          >
            <Send className="w-3 h-3" /> Confirm distribution
          </button>
          <button
            onClick={() => setDistributeOpen(false)}
            className="flex-1 h-9 rounded-lg border border-border text-[12px] text-primary hover:bg-background"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* New pack modal */}
      <Modal isOpen={newPackOpen} onClose={() => setNewPackOpen(false)} title="New board pack" maxWidth="max-w-[420px]">
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Meeting</label>
            <input
              value={form.meeting}
              onChange={setField('meeting')}
              placeholder="e.g. Q4 2026 Board Meeting"
              className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={setField('date')}
                className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary"
              />
            </div>
            <div>
              <label className="text-[10px] text-muted uppercase tracking-wider">Time</label>
              <input
                value={form.time}
                onChange={setField('time')}
                placeholder="18:00 WAT"
                className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Venue</label>
            <input
              value={form.venue}
              onChange={setField('venue')}
              placeholder="Gondwana House Boardroom, Windhoek"
              className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Entity</label>
            <select value={form.entity} onChange={setField('entity')} className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary">
              <option>Gondwana Holdings Ltd</option>
              <option>Gondwana Collection Namibia (Pty) Ltd</option>
              <option>Gondwana Care Trust</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Chairperson</label>
            <select value={form.chairperson} onChange={setField('chairperson')} className="w-full border border-border rounded-lg px-2 py-1.5 text-[12px] mt-1 bg-card text-primary">
              {directors.slice(0, 6).map(d => (
                <option key={d.initials}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-[10px] text-muted uppercase tracking-wider mb-1">Pack template</div>
            {templateOptions.map((t) => (
              <label key={t} className="flex items-center gap-2 py-1 text-[11px] text-primary cursor-pointer">
                <input
                  type="radio"
                  name="template"
                  checked={form.template === t}
                  onChange={() => setForm(prev => ({ ...prev, template: t }))}
                  className="accent-orange"
                />
                {t}
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={createPack}
              disabled={!form.meeting || !form.date}
              className="flex-1 h-9 rounded-lg bg-orange text-white text-[12px] font-medium hover:bg-[#B5531F] disabled:opacity-50"
            >
              Create pack
            </button>
            <button
              onClick={() => setNewPackOpen(false)}
              className="flex-1 h-9 rounded-lg border border-border text-[12px] text-primary hover:bg-background"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

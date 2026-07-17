import { useRef, useState } from 'react';
import {
  Plus,
  ChevronRight,
  Flag,
  Lock,
  Download,
  UploadCloud,
  CheckCircle2,
  Circle,
  Trash2,
  Printer,
  ArrowLeft,
} from 'lucide-react';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';
import Topbar from '../components/layout/Topbar';

type Stage = 'Draft' | 'Circulated' | 'Reviewed' | 'Approved' | 'Signed';

interface MinuteRow {
  id: string;
  title: string;
  date: string;
  stage: Stage;
  flagged?: boolean;
}

const initialRows: MinuteRow[] = [
  { id: 'm1', title: 'February 2026 General Meeting', date: 'Feb 2026', stage: 'Draft', flagged: true },
  { id: 'm2', title: '4th Annual General Meeting', date: '24 Jun 2021', stage: 'Signed' },
  { id: 'm3', title: '5th Annual General Meeting', date: '02 Jun 2022', stage: 'Signed' },
  { id: 'm4', title: '3rd Annual General Meeting', date: '08 Apr 2020', stage: 'Signed' },
];

const stages: Stage[] = ['Draft', 'Circulated', 'Reviewed', 'Approved', 'Signed'];

function WorkflowBanner({ current }: { current: Stage }) {
  const currentIdx = stages.indexOf(current);
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="text-[10px] uppercase tracking-wider text-muted mb-3 font-medium">Minutes workflow</div>
      <div className="flex items-center">
        {stages.map((s, i) => {
          const active = i <= currentIdx;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-initial">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium border ${
                    active
                      ? 'bg-orange border-orange text-white'
                      : 'bg-background border-border text-muted'
                  }`}
                >
                  {i + 1}
                </div>
                <span className={`text-[12px] font-medium ${active ? 'text-primary' : 'text-muted'}`}>{s}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < currentIdx ? 'bg-orange' : 'bg-border'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StageBadge({ stage }: { stage: Stage }) {
  const map: Record<Stage, string> = {
    Draft: 'bg-orange-tint text-orange',
    Circulated: 'bg-amber-tint text-amber',
    Reviewed: 'bg-amber-tint text-amber',
    Approved: 'bg-green-tint text-green',
    Signed: 'bg-green-tint text-green',
  };
  return (
    <span className={`inline-flex px-2 py-[2px] rounded-lg text-[10px] font-medium ${map[stage]}`}>{stage}</span>
  );
}

const COMPANY = {
  name: 'Gondwana Holdings Limited',
  reg: '2017/1055',
  address: '42 Nelson Mandela Avenue, Windhoek',
  phone: '+264 61 427 200',
  web: 'www.gondwana-collection.com',
};

const ENTITIES = [
  'Gondwana Holdings Limited',
  'Gondwana Collection Namibia',
  'Gondwana Travel Centre',
  'Canyon Lodge',
  'Palmwag Lodge',
];

const MEETING_TYPES = ['Annual General Meeting', 'General Meeting', 'Board Meeting', 'Committee Meeting'];

interface Attendee {
  name: string;
  role: string;
  present: boolean;
  locked?: boolean;
}

const INITIAL_ATTENDEES: Attendee[] = [
  { name: 'Dave Smuts', role: 'Chairperson', present: true },
  { name: 'Gys Joubert', role: 'MD', present: true },
  { name: 'James Mnyupe', role: 'NED', present: true },
  { name: 'David Namalenga', role: 'NED', present: true },
  { name: 'Hannes Gouws', role: 'NED', present: false },
  { name: 'Jaco Visser', role: 'CFO', present: false },
  { name: 'Fabiola Schrywer', role: 'Company Secretary', present: true, locked: true },
];

const AGM_REFERENCE = [
  'Welcome & Notice of Meeting',
  'Quorum & Apologies',
  'Approval of prior minutes',
  'Chairperson report',
  'MD report',
  'CFO / Financial statements',
  'Auditor report',
  'Appointment of auditors',
  'Director elections',
  'Director re-elections',
  'Remuneration report',
  'Dividend declaration',
  'Special resolutions',
  'Ordinary resolutions',
  'Any other business',
  'Closure',
];

function Card({
  title,
  subtitle,
  tint,
  children,
}: {
  title?: string;
  subtitle?: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border rounded-lg p-5 ${
        tint ? 'bg-orange-tint border-orange/30' : 'bg-card border-border'
      }`}
    >
      {title && (
        <div className="mb-4">
          <div className="text-[13px] font-medium text-primary">{title}</div>
          {subtitle && <div className="text-[11px] text-muted mt-0.5">{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function LockedField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted mb-1 font-medium">{label}</div>
      <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
        <Lock className="w-3 h-3 text-muted flex-shrink-0" />
        <span className="text-[12px] text-primary truncate">{value}</span>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background text-primary focus:outline-none focus:border-orange"
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background text-primary focus:outline-none focus:border-orange"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function SetupView({
  onBack,
  onUploaded,
  onOpenFullMinutes,
}: {
  onBack: () => void;
  onUploaded: () => void;
  onOpenFullMinutes: () => void;
}) {
  const [entity, setEntity] = useState(ENTITIES[0]);
  const [meetingType, setMeetingType] = useState(MEETING_TYPES[1]);
  const [meetingNumber, setMeetingNumber] = useState('GM-2026-02');
  const [date, setDate] = useState('2026-02-15');
  const [time, setTime] = useState('10:00');
  const [venue, setVenue] = useState('Windhoek Head Office');
  const [chair, setChair] = useState('Dave Smuts');
  const [format, setFormat] = useState<'In person' | 'Virtual' | 'Hybrid'>('In person');

  const [attendees, setAttendees] = useState<Attendee[]>(INITIAL_ATTENDEES);
  const presentCount = attendees.filter((a) => a.present).length;
  const quorumOk = presentCount >= 3;

  const [agenda, setAgenda] = useState<string[]>([
    'Welcome and establishment of quorum',
    'Adoption of minutes of previous meeting',
    '',
    '',
    '',
  ]);

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedName, setUploadedName] = useState<string | null>(null);

  const toggleAttendee = (i: number) => {
    setAttendees((prev) =>
      prev.map((a, idx) => (idx === i && !a.locked ? { ...a, present: !a.present } : a)),
    );
  };

  const updateAgenda = (i: number, v: string) => {
    setAgenda((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  };

  const addAgenda = () => setAgenda((prev) => [...prev, '']);
  const removeAgenda = (i: number) => setAgenda((prev) => prev.filter((_, idx) => idx !== i));

  const generateDocx = async () => {
    const bold = (t: string) => new TextRun({ text: t, bold: true });
    const line = (t: string) => new Paragraph({ children: [new TextRun(t)] });

    const doc = new Document({
      styles: {
        default: { document: { run: { font: 'Inter', size: 22 } } },
      },
      sections: [
        {
          properties: {
            page: {
              size: { width: 12240, height: 15840 },
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
          },
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: COMPANY.name, bold: true, size: 32 })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `Reg. ${COMPANY.reg}`, size: 18 })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: COMPANY.address, size: 18 })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: `${COMPANY.phone}  ·  ${COMPANY.web}`, size: 18 })],
            }),
            new Paragraph({ children: [new TextRun('')] }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Minutes — ${meetingType}`, bold: true, size: 28 }),
              ],
            }),
            new Paragraph({ children: [new TextRun('')] }),
            new Paragraph({ children: [bold('Entity: '), new TextRun(entity)] }),
            new Paragraph({ children: [bold('Meeting no: '), new TextRun(meetingNumber)] }),
            new Paragraph({ children: [bold('Date: '), new TextRun(`${date} at ${time}`)] }),
            new Paragraph({ children: [bold('Venue: '), new TextRun(venue)] }),
            new Paragraph({ children: [bold('Format: '), new TextRun(format)] }),
            new Paragraph({ children: [bold('Chairperson: '), new TextRun(chair)] }),
            new Paragraph({ children: [new TextRun('')] }),
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              children: [new TextRun({ text: 'Attendees', bold: true })],
            }),
            ...attendees
              .filter((a) => a.present)
              .map((a) => line(`• ${a.name} — ${a.role}`)),
            new Paragraph({ children: [new TextRun('')] }),
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              children: [new TextRun({ text: 'Agenda', bold: true })],
            }),
            ...agenda
              .map((a, i) => (a.trim() ? line(`${i + 1}. ${a}`) : null))
              .filter((x): x is Paragraph => x !== null),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const safeType = meetingType.replace(/\s+/g, '');
    saveAs(blob, `Minutes_${safeType}_${date}.docx`);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadedName(f.name);
    setTimeout(() => onUploaded(), 600);
  };

  return (
    <div>
      <Topbar
        title="New minutes — Setup"
        actions={
          <button
            onClick={onBack}
            className="px-3 py-1.5 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
          >
            Back to register
          </button>
        }
      />
      <div className="p-6">
        <WorkflowBanner current="Draft" />

        <div className="grid grid-cols-12 gap-4">
          {/* Main column */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Card 1 */}
            <Card title="Company details" subtitle="Locked — sourced from Entities register">
              <div className="grid grid-cols-2 gap-3">
                <LockedField label="Entity" value={COMPANY.name} />
                <LockedField label="Registration" value={COMPANY.reg} />
                <LockedField label="Registered address" value={COMPANY.address} />
                <LockedField label="Phone" value={COMPANY.phone} />
                <div className="col-span-2">
                  <LockedField label="Website" value={COMPANY.web} />
                </div>
              </div>
            </Card>

            {/* Card 2 */}
            <Card title="Meeting information">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Entity">
                  <Select value={entity} onChange={setEntity} options={ENTITIES} />
                </Field>
                <Field label="Meeting type">
                  <Select value={meetingType} onChange={setMeetingType} options={MEETING_TYPES} />
                </Field>
                <Field label="Meeting number">
                  <Input value={meetingNumber} onChange={(e) => setMeetingNumber(e.target.value)} />
                </Field>
                <Field label="Chairperson">
                  <Input value={chair} onChange={(e) => setChair(e.target.value)} />
                </Field>
                <Field label="Date">
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Field>
                <Field label="Time">
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </Field>
                <div className="col-span-2">
                  <Field label="Venue">
                    <Input value={venue} onChange={(e) => setVenue(e.target.value)} />
                  </Field>
                </div>
                <div className="col-span-2">
                  <div className="text-[11px] font-medium text-muted mb-1">Format</div>
                  <div className="inline-flex border border-border rounded-lg overflow-hidden">
                    {(['In person', 'Virtual', 'Hybrid'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f)}
                        className={`px-3 py-1.5 text-[12px] font-medium ${
                          format === f
                            ? 'bg-orange text-white'
                            : 'bg-card text-primary hover:bg-background'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card title="Attendees" subtitle="Toggle directors present at the meeting">
              <div className="flex flex-wrap gap-2 mb-4">
                {attendees.map((a, i) => (
                  <button
                    key={a.name}
                    onClick={() => toggleAttendee(i)}
                    disabled={a.locked}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition ${
                      a.present
                        ? 'bg-orange-tint border-orange text-orange'
                        : 'bg-background border-border text-muted'
                    } ${a.locked ? 'opacity-100 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {a.locked && <Lock className="w-3 h-3" />}
                    <span>{a.name}</span>
                    <span className="text-[10px] text-muted">· {a.role}</span>
                  </button>
                ))}
              </div>
              <div
                className={`px-3 py-2 rounded-lg text-[12px] font-medium inline-flex items-center gap-2 ${
                  quorumOk
                    ? 'bg-green-tint text-green border border-green/30'
                    : 'bg-red-tint text-red border border-red/30'
                }`}
              >
                {quorumOk ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                Quorum: {presentCount} of {attendees.length} present ·{' '}
                {quorumOk ? 'Quorum met' : 'Below minimum (3)'}
              </div>
            </Card>

            {/* Card 4 */}
            <Card title="Agenda items">
              <div className="space-y-2">
                {agenda.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center text-[11px] font-medium text-muted flex-shrink-0">
                      {i + 1}
                    </div>
                    <Input
                      value={item}
                      onChange={(e) => updateAgenda(i, e.target.value)}
                      placeholder={`Agenda item ${i + 1}`}
                    />
                    {agenda.length > 1 && (
                      <button
                        onClick={() => removeAgenda(i)}
                        className="p-1.5 text-muted hover:text-red"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addAgenda}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
              >
                <Plus className="w-3.5 h-3.5" /> Add agenda item
              </button>
            </Card>

            {/* Card 5 */}
            <Card tint>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[13px] font-medium text-primary">Download Word template</div>
                  <div className="text-[11px] text-muted mt-0.5">
                    Pre-filled with company header, meeting details, attendees and agenda
                  </div>
                </div>
                <button
                  onClick={generateDocx}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange text-white rounded-lg text-[13px] font-medium hover:opacity-90"
                >
                  <Download className="w-4 h-4" /> Download Word template
                </button>
              </div>
            </Card>

            {/* Card 6 */}
            <Card title="Upload completed draft" subtitle="Advances the workflow to Circulated">
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:border-orange hover:bg-orange-tint/40 transition"
              >
                <UploadCloud className="w-8 h-8 text-muted" />
                <div className="text-[12px] font-medium text-primary">
                  {uploadedName ?? 'Drop .docx here or click to upload'}
                </div>
                <div className="text-[11px] text-muted">Max 20 MB · .docx only</div>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".docx"
                className="hidden"
                onChange={handleUpload}
              />
            </Card>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card title="Workflow stages">
              <ol className="space-y-2">
                {stages.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border ${
                        i === 0
                          ? 'bg-orange border-orange text-white'
                          : 'bg-background border-border text-muted'
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-[12px] ${i === 0 ? 'text-primary font-medium' : 'text-muted'}`}
                    >
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card title="Setup checklist">
              <ul className="space-y-2">
                {[
                  'Confirm company details',
                  'Fill meeting information',
                  'Select attendees & confirm quorum',
                  'Draft agenda items',
                  'Download template and circulate',
                ].map((c, i) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        i < 3 ? 'text-green' : 'text-muted'
                      }`}
                    />
                    <span className="text-[12px] text-primary">{c}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Reference: 4th AGM agenda" subtitle="16-item structure · 24 Jun 2021">
              <ol className="space-y-1">
                {AGM_REFERENCE.map((a, i) => (
                  <li
                    key={a}
                    className="flex gap-2 text-[11px] text-muted py-1 border-b border-border last:border-0"
                  >
                    <span className="w-5 text-right font-medium text-primary">{i + 1}.</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] font-medium text-muted mb-1">{label}</div>
      {children}
    </label>
  );
}

export default function Minutes() {
  const [view, setView] = useState<'list' | 'setup' | 'view'>('list');
  const [rows, setRows] = useState<MinuteRow[]>(initialRows);

  const advanceDraftToCirculated = () => {
    setRows((prev) =>
      prev.map((r) =>
        r.stage === 'Draft' ? { ...r, stage: 'Circulated', flagged: false } : r,
      ),
    );
    setView('list');
  };

  if (view === 'setup')
    return (
      <SetupView
        onBack={() => setView('list')}
        onUploaded={advanceDraftToCirculated}
        onOpenFullMinutes={() => setView('view')}
      />
    );
  if (view === 'view') return <ViewFullMinutes onBack={() => setView('list')} />;

  return (
    <div>
      <Topbar
        title="Minutes"
        actions={
          <button
            onClick={() => setView('setup')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" /> New minutes
          </button>
        }
      />
      <div className="p-6">
        <WorkflowBanner current="Draft" />

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="text-[13px] font-medium text-primary">Minutes register</div>
            <div className="text-[11px] text-muted">{rows.length} records</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Meeting</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Stage</th>
                <th className="px-4 py-2 w-32"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0 hover:bg-background">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {row.flagged && <Flag className="w-3.5 h-3.5 text-orange fill-orange" />}
                      <span className="text-[12px] font-medium text-primary">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted">{row.date}</td>
                  <td className="px-4 py-3"><StageBadge stage={row.stage} /></td>
                  <td className="px-4 py-3 text-right">
                    {row.stage === 'Draft' ? (
                      <button
                        onClick={() => setView('setup')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange text-white rounded-lg text-[11px] font-medium hover:opacity-90"
                      >
                        Continue <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => row.id === 'm2' && setView('view')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 border border-border text-primary rounded-lg text-[11px] font-medium hover:bg-background"
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
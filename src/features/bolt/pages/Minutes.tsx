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
  Check,
  X,
} from 'lucide-react';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import Topbar from '../components/layout/Topbar';
import { useToast } from '../contexts/ToastContext';

type Stage = 'Draft' | 'Circulated' | 'Reviewed' | 'Approved' | 'Signed';

interface MinuteRow {
  id: string;
  title: string;
  date: string;
  type: string;
  chairperson: string;
  stage: Stage;
  flagged?: boolean;
  signedDate?: string;
  signedFile?: string;
}

const initialRows: MinuteRow[] = [
  {
    id: 'm1',
    title: 'February 2026 General Meeting',
    date: '15 Feb 2026',
    type: 'General Meeting',
    chairperson: 'Dave Smuts',
    stage: 'Draft',
    flagged: true,
  },
  {
    id: 'm2',
    title: '4th Annual General Meeting',
    date: '24 Jun 2021',
    type: 'AGM',
    chairperson: 'S. Galloway',
    stage: 'Signed',
    signedDate: '24 Jun 2021',
    signedFile: '4th-AGM-signed.pdf',
  },
  {
    id: 'm3',
    title: '5th Annual General Meeting',
    date: '02 Jun 2022',
    type: 'AGM',
    chairperson: 'S. Galloway',
    stage: 'Signed',
    signedDate: '02 Jun 2022',
    signedFile: '5th-AGM-signed.pdf',
  },
  {
    id: 'm4',
    title: '3rd Annual General Meeting',
    date: '08 Apr 2020',
    type: 'AGM',
    chairperson: 'S. Galloway',
    stage: 'Signed',
    signedDate: '08 Apr 2020',
    signedFile: '3rd-AGM-signed.pdf',
  },
];

const stages: Stage[] = ['Draft', 'Circulated', 'Reviewed', 'Approved', 'Signed'];

function WorkflowBanner({ current }: { current: Stage }) {
  const currentIdx = stages.indexOf(current);
  const isSignedFinal = current === 'Signed';
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      <div className="text-[10px] uppercase tracking-wider text-muted mb-3 font-medium">Minutes workflow</div>
      <div className="flex items-center">
        {stages.map((s, i) => {
          const completed = i < currentIdx || (isSignedFinal && i <= currentIdx);
          const active = i === currentIdx && !isSignedFinal;
          return (
            <div key={s} className="flex items-center flex-1 last:flex-initial">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium border ${
                    completed
                      ? 'bg-green border-green text-white'
                      : active
                      ? 'bg-orange border-orange text-white'
                      : 'bg-background border-border text-muted'
                  }`}
                >
                  {completed ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-[12px] font-medium ${completed || active ? 'text-primary' : 'text-muted'}`}>{s}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`flex-1 h-px mx-3 ${i < currentIdx ? 'bg-green' : 'bg-border'}`} />
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

const LOGO_URL = 'https://www.gondwana-collection.com/images/gondwana-logo.png';

function LetterheadLogo() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex flex-col items-center leading-tight">
        <div
          style={{ color: '#3D2B1F', letterSpacing: '0.25em' }}
          className="text-[28px] font-bold"
        >
          GONDWANA
        </div>
        <div
          style={{ color: '#C4762A', letterSpacing: '0.28em' }}
          className="text-[13px] font-medium mt-1"
        >
          HOLDINGS LIMITED
        </div>
        <div
          style={{ color: '#6B6F68', letterSpacing: '0.3em' }}
          className="text-[9px] font-medium mt-1"
        >
          NAMIBIA
        </div>
      </div>
    );
  }
  return (
    <img
      src={LOGO_URL}
      alt="Gondwana Holdings Limited"
      onError={() => setFailed(true)}
      style={{ maxHeight: 84, width: 'auto' }}
    />
  );
}

function Letterhead({ title }: { title: string }) {
  return (
    <header className="mb-6">
      <div className="flex justify-center mb-3">
        <LetterheadLogo />
      </div>
      <div
        className="text-center"
        style={{ color: '#6B6F68', fontSize: 11, lineHeight: 1.5 }}
      >
        Tel: +264 61 427 200&nbsp;&nbsp;|&nbsp;&nbsp;Fax: +264 61 251 863
      </div>
      <div
        className="text-center"
        style={{ color: '#6B6F68', fontSize: 10, lineHeight: 1.5 }}
      >
        PO Box 80205&nbsp;&nbsp;|&nbsp;&nbsp;42 Nelson Mandela Avenue&nbsp;&nbsp;|&nbsp;&nbsp;Windhoek, Namibia&nbsp;&nbsp;|&nbsp;&nbsp;info@gondwana-collection.com
      </div>
      <div
        className="text-center"
        style={{ color: '#6B6F68', fontSize: 10, lineHeight: 1.5 }}
      >
        www.gondwana-collection.com
      </div>
      <div style={{ height: '0.5px', background: '#EFECE6', margin: '14px 0' }} />
      <h2
        className="text-center font-bold uppercase"
        style={{ color: '#1C1F1A', fontSize: 13, lineHeight: 1.45, letterSpacing: '0.02em' }}
      >
        {title}
      </h2>
      <div style={{ height: '0.5px', background: '#EFECE6', margin: '14px 0' }} />
    </header>
  );
}

async function fetchLogoBuffer(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(LOGO_URL, { mode: 'cors' });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

function docxCentered(text: string, opts: { size?: number; bold?: boolean; color?: string } = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text,
        size: opts.size ?? 18,
        bold: opts.bold,
        color: opts.color ?? '6B6F68',
        font: 'Inter',
      }),
    ],
  });
}

function docxDivider() {
  return new Paragraph({
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'EFECE6', space: 1 },
    },
  });
}

async function buildLetterheadParagraphs(title: string): Promise<Paragraph[]> {
  const paras: Paragraph[] = [];
  const logo = await fetchLogoBuffer();
  if (logo) {
    paras.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            type: 'png',
            data: logo,
            transformation: { width: 220, height: 90 },
            altText: {
              title: 'Gondwana Holdings Limited',
              description: 'Gondwana Holdings Limited logo',
              name: 'GondwanaLogo',
            },
          }),
        ],
      }),
    );
  } else {
    paras.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'G O N D W A N A', bold: true, size: 44, color: '3D2B1F', font: 'Inter' }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'H O L D I N G S   L I M I T E D', bold: true, size: 22, color: 'C4762A', font: 'Inter' }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'N A M I B I A', size: 14, color: '6B6F68', font: 'Inter' }),
        ],
      }),
    );
  }
  paras.push(
    new Paragraph({ children: [new TextRun('')] }),
    docxCentered('Tel: +264 61 427 200  |  Fax: +264 61 251 863', { size: 18 }),
    docxCentered(
      'PO Box 80205  |  42 Nelson Mandela Avenue  |  Windhoek, Namibia  |  info@gondwana-collection.com',
      { size: 16 },
    ),
    docxCentered('www.gondwana-collection.com', { size: 16 }),
    docxDivider(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: title.toUpperCase(), bold: true, size: 22, color: '1C1F1A', font: 'Inter' }),
      ],
    }),
    docxDivider(),
    new Paragraph({ children: [new TextRun('')] }),
  );
  return paras;
}

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

    const docTitle =
      meetingType === 'General Meeting'
        ? 'NOTICE OF THE GENERAL MEETING OF THE SHAREHOLDERS OF GONDWANA HOLDINGS LIMITED (REG. NO 2017/1055)'
        : `MINUTES OF THE ${meetingType.toUpperCase()} OF GONDWANA HOLDINGS LIMITED (REG. NO 2017/1055)`;
    const letterhead = await buildLetterheadParagraphs(docTitle);

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
            ...letterhead,
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
              <button
                onClick={onOpenFullMinutes}
                className="mt-3 text-[12px] font-medium text-orange hover:underline"
              >
                View full minutes →
              </button>
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

interface Resolution {
  code: string;
  text: string;
  for: number;
  against: number;
  abstain: number;
}

function ResolutionBox({ r }: { r: Resolution }) {
  return (
    <div className="bg-orange-tint border border-orange/30 rounded-lg p-4 my-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] font-medium text-orange uppercase tracking-wider">
          {r.code}
        </span>
        <span className="inline-flex px-2 py-[2px] rounded-lg text-[10px] font-medium bg-green-tint text-green">
          PASSED
        </span>
      </div>
      <p className="text-[12px] text-primary leading-relaxed mb-3">{r.text}</p>
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        <div className="bg-card border border-border rounded p-2">
          <div className="text-muted uppercase tracking-wider text-[9px] font-medium">For</div>
          <div className="text-green font-medium">{r.for}%</div>
        </div>
        <div className="bg-card border border-border rounded p-2">
          <div className="text-muted uppercase tracking-wider text-[9px] font-medium">Against</div>
          <div className="text-primary font-medium">{(100 - r.for - r.abstain).toFixed(1)}%</div>
        </div>
        <div className="bg-card border border-border rounded p-2">
          <div className="text-muted uppercase tracking-wider text-[9px] font-medium">Abstain</div>
          <div className="text-primary font-medium">{r.abstain}%</div>
        </div>
      </div>
    </div>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h3 className="text-[13px] font-medium text-primary mb-2">
        {n}. {title}
      </h3>
      <div className="text-[12px] text-primary leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function ViewFullMinutes({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <Topbar
        title="Minutes — 4th AGM"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to register
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>
        }
      />
      <div className="p-6">
        <article className="bg-card border border-border rounded-lg mx-auto p-10" style={{ maxWidth: 760 }}>
          <Letterhead title="DRAFT MINUTES OF THE ANNUAL GENERAL MEETING OF SHAREHOLDERS HOSTED BY THE BOARD OF DIRECTORS BY LIVE WEBINAR ON THURSDAY, 24 JUNE 18:00 AT GONDWANA HOUSE BOARDROOM, 42 NELSON MANDELA AVENUE, WINDHOEK, NAMIBIA" />

          <Section n={1} title="Welcome and opening">
            <p>
              The Chairperson, Mr S. Galloway, welcomed shareholders, directors and invited
              guests to the 4th Annual General Meeting of Gondwana Holdings Limited. He
              acknowledged the extraordinary context in which the meeting was being held, with
              the COVID-19 pandemic having profoundly affected the tourism industry, the
              Namibian economy and the personal lives of many stakeholders.
            </p>
            <p>
              A moment of silence was observed in memory of colleagues, family members and
              friends of the Gondwana community who had passed away during the preceding period.
            </p>
          </Section>

          <Section n={2} title="Quorum and notice of meeting">
            <p>
              The Company Secretary confirmed that proper notice of the meeting had been given
              in accordance with the Articles of Association. Proxy representation of 56.1% of
              the issued share capital was recorded, satisfying the quorum requirement set out
              in Article 15.2 of the Articles of Association. The Chairperson declared the
              meeting duly constituted.
            </p>
          </Section>

          <Section n={3} title="Adoption of the minutes of the 3rd AGM (08 April 2020)">
            <p>
              The minutes of the 3rd Annual General Meeting, held on 08 April 2020, were tabled.
              Shareholders having had the opportunity to review them, the minutes were adopted
              as a true and accurate record of that meeting, without amendment.
            </p>
          </Section>

          <Section n={4} title="Chairperson's overview">
            <p>
              Mr Galloway reflected on the 25-year history of Gondwana Collection Namibia,
              highlighting the group's resilience through multiple economic cycles. He noted
              with pride that despite the severe impact of COVID-19, no retrenchments had been
              carried out and that all permanent staff had been retained throughout the crisis.
            </p>
            <p>
              The Chairperson formally announced the appointment of Ms Fabiola Schrywer as
              co-custodian of the group's cultural and heritage stewardship function, in
              recognition of her long-standing contribution to the organisation.
            </p>
          </Section>

          <Section n={5} title="Finance report">
            <p>
              The Chief Financial Officer, Mr J. Visser, presented the finance report for the
              year under review. He reported a revenue decline of approximately 66% year-on-year,
              driven by border closures and the near-complete suspension of international
              tourism. Cost containment measures, debt restructuring and support from lenders
              had preserved the group's liquidity position and going-concern status.
            </p>
          </Section>

          <Section n={6} title="Approval of the Annual Financial Statements">
            <p>
              The audited Annual Financial Statements for the year were presented to shareholders
              for approval.
            </p>
            <ResolutionBox
              r={{
                code: 'OR-1',
                text: 'RESOLVED that the Annual Financial Statements of Gondwana Holdings Limited for the year under review, together with the reports of the directors and the auditors, be and are hereby received and approved.',
                for: 95.6,
                against: 3.9,
                abstain: 0.5,
              }}
            />
          </Section>

          <Section n={7} title="Appointment of auditors">
            <ResolutionBox
              r={{
                code: 'OR-2',
                text: 'RESOLVED that Ernst & Young be and are hereby reappointed as auditors of the Company for the ensuing financial year, and that the directors be authorised to determine their remuneration.',
                for: 99.6,
                against: 0.2,
                abstain: 0.2,
              }}
            />
          </Section>

          <Section n={8} title="Re-election of directors">
            <ResolutionBox
              r={{
                code: 'OR-3',
                text: 'RESOLVED that the directors retiring by rotation in accordance with the Articles of Association, being eligible and offering themselves for re-election, be and are hereby re-elected as directors of the Company.',
                for: 95.9,
                against: 3.6,
                abstain: 0.5,
              }}
            />
          </Section>

          <Section n={9} title="Directors' fees">
            <ResolutionBox
              r={{
                code: 'OR-4',
                text: 'RESOLVED that the non-executive directors\' fees be approved at N$10,000 per meeting attended, with effect from the date of this meeting.',
                for: 95.3,
                against: 4.2,
                abstain: 0.5,
              }}
            />
          </Section>

          <Section n={10} title="Employee share incentive scheme">
            <ResolutionBox
              r={{
                code: 'OR-5',
                text: 'RESOLVED that the directors be and are hereby authorised to implement the employee share incentive scheme, on the terms tabled and made available to shareholders.',
                for: 98.9,
                against: 0.8,
                abstain: 0.3,
              }}
            />
          </Section>

          <Section n={11} title="General authority — borrowing powers">
            <ResolutionBox
              r={{
                code: 'OR-6',
                text: 'RESOLVED that the directors be and are hereby granted a general authority to raise borrowings on behalf of the Company, subject to the limits set out in the Articles of Association and applicable law.',
                for: 98.3,
                against: 1.4,
                abstain: 0.3,
              }}
            />
          </Section>

          <Section n={12} title="Managing Director's report">
            <p>
              The Managing Director, Mr G. Joubert, reported on operational matters. He
              confirmed that the Business Interruption insurance claim had been lodged and
              was progressing through the insurers' assessment process. He further reported
              on the successful placement of a bond on the Namibian Stock Exchange (NSX),
              which had strengthened the group's medium-term funding base.
            </p>
          </Section>

          <Section n={13} title="Brand and marketing report">
            <p>
              Ms M. Goldbeck presented the brand and marketing update. The Gondwana Card
              loyalty programme had grown to more than 100,000 registered members, providing
              a strong direct-to-consumer platform to support the group's domestic tourism
              recovery strategy.
            </p>
          </Section>

          <Section n={14} title="Questions and answers">
            <p>
              A shareholder enquired about the group's approach to COVID-19 vaccination for
              staff and guests. The Chairperson responded that the group was following official
              guidance from the Ministry of Health and Social Services, was actively supporting
              staff access to vaccination, and would continue to review protocols as public
              health guidance evolved.
            </p>
          </Section>

          <Section n={15} title="Closing remarks">
            <p>
              The Chairperson thanked shareholders for their continued support, and the
              directors, management and staff for their commitment through an exceptionally
              difficult year. He expressed cautious optimism for the recovery of the tourism
              sector and the group's outlook.
            </p>
          </Section>

          <Section n={16} title="Adjournment">
            <p>
              There being no further business, the Chairperson declared the meeting closed and
              adjourned at 19:32.
            </p>
          </Section>

          {/* Signature block */}
          <div className="mt-10 pt-6 border-t border-border grid grid-cols-2 gap-8">
            <div>
              <div className="h-10 border-b border-primary" />
              <div className="text-[11px] text-muted mt-2">S. Galloway</div>
              <div className="text-[10px] text-muted">Chairperson</div>
            </div>
            <div>
              <div className="h-10 border-b border-primary" />
              <div className="text-[11px] text-muted mt-2">Date</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Minutes() {
  const [view, setView] = useState<'list' | 'setup' | 'view'>('list');
  const [rows, setRows] = useState<MinuteRow[]>(initialRows);
  const [panelRowId, setPanelRowId] = useState<string | null>(null);
  const { showToast } = useToast();

  const activeRow = rows.find((r) => r.id === panelRowId) ?? null;

  const advance = (id: string, next: Stage, toastMsg: string, extra?: Partial<MinuteRow>) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, stage: next, flagged: false, ...(extra ?? {}) }
          : r,
      ),
    );
    showToast(toastMsg);
  };

  if (view === 'setup')
    return (
      <SetupView
        onBack={() => setView('list')}
        onUploaded={() => {
          setRows((prev) =>
            prev.map((r) =>
              r.id === 'm1' ? { ...r, stage: 'Circulated', flagged: false } : r,
            ),
          );
          showToast('Minutes circulated · Stage 2 active');
          setView('list');
          setPanelRowId('m1');
        }}
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
        <WorkflowBanner current={activeRow?.stage ?? 'Draft'} />

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="text-[13px] font-medium text-primary">Minutes register</div>
            <div className="text-[11px] text-muted">{rows.length} records</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Meeting</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Chairperson</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Stage</th>
                <th className="text-left px-4 py-2 text-[10px] font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 w-36"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isSigned = row.stage === 'Signed';
                const rowBg = row.flagged
                  ? 'bg-[#FBF0EA] hover:bg-[#F7E6DB]'
                  : 'hover:bg-background';
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-border last:border-0 ${rowBg}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {row.flagged && <Flag className="w-3.5 h-3.5 text-orange fill-orange" />}
                        <span className="text-[12px] font-medium text-primary">{row.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] text-muted">{row.date}</td>
                    <td className="px-4 py-3 text-[12px] text-muted">{row.type}</td>
                    <td className="px-4 py-3 text-[12px] text-muted">{row.chairperson}</td>
                    <td className="px-4 py-3 text-[12px] text-primary">
                      Stage {stages.indexOf(row.stage) + 1} of 5
                    </td>
                    <td className="px-4 py-3"><StageBadge stage={row.stage} /></td>
                    <td className="px-4 py-3 text-right">
                      {isSigned ? (
                        <button
                          onClick={() => row.id === 'm2' && setView('view')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 border border-border text-primary rounded-lg text-[11px] font-medium hover:bg-background"
                        >
                          View <ChevronRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setPanelRowId(row.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange text-white rounded-lg text-[11px] font-medium hover:opacity-90"
                        >
                          Continue <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {activeRow && (
        <WorkflowPanel
          row={activeRow}
          onClose={() => setPanelRowId(null)}
          onAdvance={advance}
          onOpenSetup={() => setView('setup')}
        />
      )}
    </div>
  );
}

function WorkflowPanel({
  row,
  onClose,
  onAdvance,
  onOpenSetup,
}: {
  row: MinuteRow;
  onClose: () => void;
  onAdvance: (id: string, next: Stage, toastMsg: string, extra?: Partial<MinuteRow>) => void;
  onOpenSetup: () => void;
}) {
  const [draftFile, setDraftFile] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [adoptedAt, setAdoptedAt] = useState('');
  const [signedFile, setSignedFile] = useState<string | null>(null);
  const draftRef = useRef<HTMLInputElement>(null);
  const signedRef = useRef<HTMLInputElement>(null);

  const stageIdx = stages.indexOf(row.stage);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[400px] bg-card border-l border-border overflow-y-auto">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <div className="text-[13px] font-medium text-primary">{row.title}</div>
            <div className="text-[11px] text-muted mt-0.5">Stage {stageIdx + 1} of 5 · {row.stage}</div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Vertical stage progress */}
          <ol className="space-y-2 mb-2">
            {stages.map((s, i) => {
              const completed = i < stageIdx || (row.stage === 'Signed' && i <= stageIdx);
              const active = i === stageIdx && row.stage !== 'Signed';
              return (
                <li key={s} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border ${
                      completed
                        ? 'bg-green border-green text-white'
                        : active
                        ? 'bg-orange border-orange text-white'
                        : 'bg-background border-border text-muted'
                    }`}
                  >
                    {completed ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={`text-[12px] ${completed || active ? 'text-primary font-medium' : 'text-muted'}`}>{s}</span>
                </li>
              );
            })}
          </ol>

          {row.stage === 'Draft' && (
            <div className="space-y-3">
              <div className="text-[12px] text-primary">
                Upload completed minutes draft from Microsoft Word.
              </div>
              <button
                onClick={() => draftRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 hover:border-orange hover:bg-orange-tint/40"
              >
                <UploadCloud className="w-6 h-6 text-muted" />
                <div className="text-[12px] font-medium text-primary">
                  {draftFile ?? 'Upload draft (.docx or .pdf)'}
                </div>
              </button>
              <input
                ref={draftRef}
                type="file"
                accept=".docx,.pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setDraftFile(f.name);
                }}
              />
              {draftFile && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-green-tint text-green">
                  <CheckCircle2 className="w-3 h-3" /> {draftFile}
                </span>
              )}
              <div className="flex gap-2">
                <button
                  onClick={onOpenSetup}
                  className="px-3 py-2 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background"
                >
                  Open setup
                </button>
                <button
                  disabled={!draftFile}
                  onClick={() =>
                    onAdvance(row.id, 'Circulated', 'Minutes circulated · Stage 2 active')
                  }
                  className="flex-1 px-3 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Mark as circulated →
                </button>
              </div>
            </div>
          )}

          {row.stage === 'Circulated' && (
            <div className="space-y-3">
              <div className="text-[12px] text-primary">
                Draft sent to directors for review. Awaiting comments.
              </div>
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-[11px] text-primary">
                <div className="font-medium mb-1">Circulated to:</div>
                <div className="text-muted leading-relaxed">
                  Dave Smuts, Gys Joubert, James Mnyupe, David Namalenga, Hannes Gouws, Jaco Visser, Fabiola Schrywer
                </div>
                <div className="mt-2 text-muted">Date circulated: {new Date().toLocaleDateString()}</div>
              </div>
              <button
                onClick={() =>
                  onAdvance(row.id, 'Reviewed', 'Review complete · Stage 3 active')
                }
                className="w-full px-3 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
              >
                Mark as reviewed →
              </button>
            </div>
          )}

          {row.stage === 'Reviewed' && (
            <div className="space-y-3">
              <div className="text-[12px] text-primary">
                Director comments received and addressed. Ready for adoption.
              </div>
              <div>
                <div className="text-[11px] font-medium text-muted mb-1">Review notes</div>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Record any material changes made..."
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background text-primary focus:outline-none focus:border-orange"
                />
              </div>
              <button
                onClick={() =>
                  onAdvance(row.id, 'Approved', 'Minutes approved · Stage 4 active')
                }
                className="w-full px-3 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90"
              >
                Mark as approved →
              </button>
            </div>
          )}

          {row.stage === 'Approved' && (
            <div className="space-y-3">
              <div className="text-[12px] text-primary">
                Adopted at the next meeting as a true record. Awaiting chairperson signature.
              </div>
              <div>
                <div className="text-[11px] font-medium text-muted mb-1">Adopted at meeting</div>
                <input
                  value={adoptedAt}
                  onChange={(e) => setAdoptedAt(e.target.value)}
                  placeholder="e.g. 5th AGM — 02 June 2022"
                  className="w-full px-3 py-2 border border-border rounded-lg text-[12px] bg-background text-primary focus:outline-none focus:border-orange"
                />
              </div>
              <button
                onClick={() => signedRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center gap-2 hover:border-orange hover:bg-orange-tint/40"
              >
                <UploadCloud className="w-6 h-6 text-muted" />
                <div className="text-[12px] font-medium text-primary">
                  {signedFile ?? 'Upload signed minutes PDF'}
                </div>
              </button>
              <input
                ref={signedRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setSignedFile(f.name);
                }}
              />
              {signedFile && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-green-tint text-green">
                  <CheckCircle2 className="w-3 h-3" /> {signedFile}
                </span>
              )}
              <button
                disabled={!signedFile}
                onClick={() =>
                  onAdvance(row.id, 'Signed', 'Minutes signed · Record is permanent', {
                    signedDate: new Date().toLocaleDateString(),
                    signedFile: signedFile ?? undefined,
                  })
                }
                className="w-full px-3 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Mark as signed →
              </button>
            </div>
          )}

          {row.stage === 'Signed' && (
            <div className="space-y-3">
              <div className="rounded-lg border border-green/30 bg-green-tint p-4 text-[12px] text-primary leading-relaxed">
                <div className="flex items-center gap-2 font-medium text-green mb-1">
                  <CheckCircle2 className="w-4 h-4" /> Minutes are signed and permanently retained.
                </div>
                This record cannot be edited or deleted. Retained per Companies Act s.179 —
                5&nbsp;year minimum retention.
              </div>
              <div className="text-[11px] text-muted space-y-1">
                <div><span className="text-primary font-medium">Date signed:</span> {row.signedDate ?? '—'}</div>
                <div><span className="text-primary font-medium">Chairperson:</span> {row.chairperson}</div>
                <div><span className="text-primary font-medium">Document:</span> {row.signedFile ?? '—'}</div>
              </div>
              <button className="w-full px-3 py-2 border border-border rounded-lg text-[12px] font-medium text-primary hover:bg-background">
                View document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
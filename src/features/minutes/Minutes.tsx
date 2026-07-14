import { useRef, useState } from 'react';
import { TriangleAlert as AlertTriangle, ArrowLeft, Check, Download, Lock, Printer, Upload } from 'lucide-react';
import './Minutes.css';

type View = 'list' | 'setup' | 'view';

type Stage = 0 | 1 | 2 | 3 | 4 | 5;

const STAGE_NAMES = ['Draft', 'Circulated', 'Reviewed', 'Approved', 'Signed'];

const DIRECTORS = [
  'Dave Smuts',
  'Gys Joubert',
  'James Mnyupe',
  'David Namalenga',
  'Hannes Gouws',
  'Jaco Visser',
  'Fabiola Schrywer',
];

const ENTITIES = [
  'Gondwana Holdings Limited',
  'Gondwana Collection Namibia (Pty) Ltd',
  'GCN (Pty) Ltd',
  'Gondwana Care Trust',
];

type Row = {
  id: string;
  meeting: string;
  date: string;
  type: string;
  chair: string;
  resolutions: number;
  stage: Stage;
  flagged?: boolean;
};

const ROWS: Row[] = [
  { id: 'feb-2026-gm', meeting: 'Feb 2026 GM', date: '26 Feb 2026', type: 'GM', chair: 'Dave Smuts', resolutions: 1, stage: 1, flagged: true },
  { id: '4th-agm', meeting: '4th AGM', date: '24 Jun 2021', type: 'AGM', chair: 'S. Galloway', resolutions: 6, stage: 5 },
  { id: '5th-agm', meeting: '5th AGM', date: '02 Jun 2022', type: 'AGM', chair: 'S. Galloway', resolutions: 6, stage: 5 },
  { id: '3rd-agm', meeting: '3rd AGM', date: '08 Apr 2020', type: 'AGM', chair: 'S. Galloway', resolutions: 4, stage: 5 },
];

const REF_AGENDA: { n: number; text: string; presenter?: string }[] = [
  { n: 1, text: 'Welcome by Chairman', presenter: 'S. Galloway' },
  { n: 2, text: 'Establishment of quorum', presenter: 'S. Galloway' },
  { n: 3, text: 'Adoption of previous minutes', presenter: 'S. Galloway' },
  { n: 4, text: 'Chairman overview', presenter: 'S. Galloway' },
  { n: 5, text: 'Finance Report', presenter: 'J. Visser' },
  { n: 6, text: 'Approval of AFS', presenter: 'OR-1 (95.6%)' },
  { n: 7, text: 'Appointment of Auditors', presenter: 'OR-2 (99.6%)' },
  { n: 8, text: 'Re-election of Directors', presenter: 'OR-3 (95.9%)' },
  { n: 9, text: 'Directors remuneration', presenter: 'OR-4 (95.3%)' },
  { n: 10, text: 'Employee share scheme', presenter: 'OR-5 (98.9%)' },
  { n: 11, text: 'Borrowing powers', presenter: 'OR-6 (98.3%)' },
  { n: 12, text: 'MD Report', presenter: 'G. Joubert' },
  { n: 13, text: 'Brand & Marketing', presenter: 'M. Goldbeck' },
  { n: 14, text: 'Q&A session' },
  { n: 15, text: 'Closing remarks' },
  { n: 16, text: 'Adjourned 19:32' },
];

type AgendaItem = { title: string; presenter?: string; body?: { p: string }[]; resolution?: { label: string; text: string; votes: { for: string; against: string; abstain: string } } };

const FULL_AGENDA: AgendaItem[] = [
  {
    title: 'WELCOME BY THE CHAIRMAN', presenter: 'S. Galloway',
    body: [{ p: "The Chairman welcomed shareholders to the fourth AGM. The meeting was deliberately delayed to June to give shareholders a better sense of what the next year holds. With the Third COVID wave fully upon us this was unfortunately not possible. Condolences expressed to families affected by COVID-19. A moment of silence was observed." }],
  },
  {
    title: 'ESTABLISHMENT OF A QUORUM', presenter: 'S. Galloway',
    body: [{ p: "Quorum: 3 members per Article 15.2 of the Articles of Association. 56.1% of proxy representation duly submitted. Attendance register enclosed." }],
  },
  {
    title: 'ADOPTION OF MINUTES OF PREVIOUS AGM', presenter: 'S. Galloway',
    body: [{ p: "Minutes of the 3rd AGM held 08 April 2020 approved by members present." }],
  },
  {
    title: 'OVERVIEW BY THE CHAIRMAN', presenter: 'S. Galloway',
    body: [{ p: "Most challenging year in Gondwana's 25-year history. Year of reflection, resilience and recovery. Not a single person retrenched. Directors and committee members waived all fees. Special thanks to Fabiola as effective co-custodian of corporate governance and capable legal advisor. No dividends declared for FY2020 ending 31 October 2020." }],
  },
  {
    title: 'FINANCE REPORT', presenter: 'J. Visser',
    body: [
      { p: "Revenue dropped 66% due to COVID-19. Capital investments: Etosha King Nehale Lodge, Camping2Go, renovations at Namib Desert Lodge, Etosha Safari Lodge, Palmwag and Omarunga. N$30M profit budgeted for FY2021. Audit Risk and Opportunity Committee invaluable — James Mnyupe and Arne Stier singled out." },
      { p: "Q: What was the other comprehensive income? A: Property revaluation every 3 years by independent valuator. Two properties valued higher." },
    ],
  },
  {
    title: 'APPROVAL OF AFS', presenter: 'J. Visser',
    body: [{ p: "AFS for year ended 31 October 2020 approved by Board on 30 March 2021." }],
    resolution: { label: 'ORDINARY RESOLUTION 1', text: "RESOLVED THAT the audited AFS of Gondwana Holdings Limited and subsidiaries for the year ending 31 October 2020 are approved, effective 24 June 2021.", votes: { for: '95.6%', against: '3.7%', abstain: '0.7%' } },
  },
  {
    title: 'APPOINTMENT OF AUDITORS', presenter: 'S. Galloway',
    body: [{ p: "Ernst and Young Namibia proposed for reappointment for period ending 31 October 2021, on recommendation of the Audit, Risk and Opportunity Committee." }],
    resolution: { label: 'ORDINARY RESOLUTION 2', text: "RESOLVED THAT Ernst and Young Namibia is re-appointed as external auditor for period ending 31 October 2021, effective 24 June 2021.", votes: { for: '99.6%', against: '0%', abstain: '0.4%' } },
  },
  {
    title: 'RETIREMENT BY ROTATION AND RE-APPOINTMENT', presenter: 'S. Galloway',
    body: [{ p: "S.S. Galloway and D. Namalenga retired by rotation per Article 24 and offered themselves for re-election." }],
    resolution: { label: 'ORDINARY RESOLUTION 3', text: "RESOLVED THAT S.S. Galloway and D. Namalenga be re-elected to the Board, effective 24 June 2021.", votes: { for: '95.9%', against: '3.7%', abstain: '0.4%' } },
  },
  {
    title: 'DIRECTORS REMUNERATION', presenter: 'S. Galloway',
    body: [{ p: "NEDs and committee members waived fees since April 2020. Waiver remains until financial recovery. Board fee: N$10,000 per meeting. Committee fee: N$5,000 per meeting." }],
    resolution: { label: 'ORDINARY RESOLUTION 4', text: "RESOLVED THAT NED remuneration remains N$10,000 per Board meeting and N$5,000 per committee meeting for FY ending 31 October 2021 pending reinstatement.", votes: { for: '95.3%', against: '0.7%', abstain: '4.0%' } },
  },
  {
    title: 'EMPLOYEE SHARE INCENTIVE SCHEME', presenter: 'S. Galloway',
    body: [{ p: "Amendment: GCN (Pty) Ltd purchases shares at market value from GHL for distribution to employees at no cost except tax liability at vesting. Max 7% of total shareholding. Principles: wealth creation, financial education, retention, incentivisation." }],
    resolution: { label: 'ORDINARY RESOLUTION 5', text: "RESOLVED THAT the scheme be amended to approve market-value purchase of shares by GCN (Pty) Ltd for awarding to employees at no cost except tax.", votes: { for: '98.9%', against: '0%', abstain: '1.1%' } },
  },
  {
    title: 'DIRECTORS BORROWING POWERS', presenter: 'S. Galloway',
    body: [{ p: "Per Article 13 of Articles of Association." }],
    resolution: { label: 'ORDINARY RESOLUTION 6', text: "RESOLVED THAT shareholders mandate the Board to exercise borrowing powers per Article 13.", votes: { for: '98.3%', against: '0%', abstain: '1.7%' } },
  },
  {
    title: 'MD REPORT', presenter: 'G. Joubert',
    body: [{ p: "Staff capacity down ~25%, 270+ positions vacant. BI claim against Hollard active — Hannes Gouws managing. NSX bond programme approved December 2020. Gondwana Care Trust providing community support. Positive medium and long-term outlook." }],
  },
  {
    title: 'BRAND AND MARKETING', presenter: 'M. Goldbeck',
    body: [{ p: "Gondwana Card approaching 100,000 cardholders. The Narrative online curio webstore launched. Namibia Nature Parks book published (Helge Dencker). The Colourful World of the Owambo (Willie Olivier). Gondwana 7 Marathon in development. KykNet Elders series partnership." }],
  },
  {
    title: 'QUESTION AND ANSWER', presenter: '',
    body: [
      { p: "Q: Mandatory employee vaccination?" },
      { p: "A (Chairman): Board mandated management to obtain formal legal opinion." },
      { p: "A (Joubert): Management encouraged vaccination, provided transport and medical professional support." },
    ],
  },
  {
    title: 'CLOSING REMARKS', presenter: 'S. Galloway',
    body: [{ p: "With potential listing in mind, important to develop balanced, independent and diverse Board. Shareholders invited to nominate directors sharing the Gondwana DNA." }],
  },
  {
    title: 'CLOSURE OF MEETING', presenter: '',
    body: [{ p: "The meeting adjourned at 19:32." }],
  },
];

function Workflow({ stage }: { stage: Stage }) {
  const activeIndex = stage === 0 ? 0 : stage - 1;
  return (
    <div className="min-workflow">
      {STAGE_NAMES.map((name, i) => {
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending';
        return (
          <div className="min-step" key={name}>
            <div className={`min-step-dot ${state}`}>
              {state === 'done' ? <Check size={14} /> : i + 1}
            </div>
            <div>
              <div className="min-step-label">{name}</div>
              <div className={`min-step-meta ${state}`}>
                {state === 'done' ? 'Complete' : state === 'active' ? 'In progress' : 'Pending'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Minutes() {
  const [activeView, setActiveView] = useState<View>('list');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // setup state
  const [meetingType, setMeetingType] = useState('GM');
  const [meetingDate, setMeetingDate] = useState('2026-02-26');
  const [present, setPresent] = useState<Set<string>>(
    new Set(['Dave Smuts', 'Gys Joubert', 'James Mnyupe', 'David Namalenga'])
  );
  const [agenda, setAgenda] = useState<string[]>([
    'Welcome and establishment of quorum',
    'Adoption of minutes of previous meeting',
    '',
    '',
    '',
  ]);
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false, false, false]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [workflowStage, setWorkflowStage] = useState<Stage>(0);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4000);
  };

  const presentCount = present.size;
  const quorumMet = presentCount >= 3;
  const checklistDone = checklist.filter(Boolean).length;

  const startNew = () => {
    setWorkflowStage(0);
    setUploadedFile(null);
    setChecklist([false, false, false, false, false]);
    setAgenda(['Welcome and establishment of quorum', 'Adoption of minutes of previous meeting', '', '', '']);
    setActiveView('setup');
  };

  const continueDraft = () => {
    setWorkflowStage(1);
    setUploadedFile(null);
    setActiveView('setup');
  };

  const viewMeeting = () => {
    setActiveView('view');
  };

  if (activeView === 'view') {
    return (
      <div className="min-page">
        <div className="min-body">
          <div className="min-view-head">
            <button className="min-back" onClick={() => setActiveView('list')}>
              <ArrowLeft size={15} /> Back to minutes
            </button>
            <button className="min-btn min-btn-ghost" onClick={() => window.print()}>
              <Printer size={15} /> Print
            </button>
          </div>
          <div className="min-doc">
            <div className="min-doc-header">
              <div className="min-doc-company">Gondwana Holdings Limited</div>
              <div className="min-doc-contact">
                Tel: +264 61 427 200 | 42 Nelson Mandela Avenue, Windhoek, Namibia | info@gondwana-collection.com<br />
                www.gondwana-collection.com
              </div>
            </div>
            <hr className="min-divider" />
            <div className="min-doc-meeting-title">
              Draft minutes of the Annual General Meeting of Shareholders hosted by the Board of Directors by live webinar on Thursday, 24 June 18:00 at Gondwana House Boardroom, 42 Nelson Mandela Avenue, Windhoek, Namibia
            </div>
            <hr className="min-divider" />
            {FULL_AGENDA.map((item, i) => (
              <div className="min-agenda-item" key={i}>
                <div className="min-agenda-item-head">
                  <div className="min-agenda-item-title">{i + 1}. {item.title}</div>
                  {item.presenter ? <div className="min-agenda-item-presenter">— {item.presenter}</div> : null}
                </div>
                {item.body ? (
                  <div className="min-agenda-item-body">
                    {item.body.map((para, j) => (
                      <p key={j} className="qa">{para.p}</p>
                    ))}
                  </div>
                ) : null}
                {item.resolution ? (
                  <div className="min-resolution">
                    <div className="min-resolution-label">{item.resolution.label}</div>
                    <div className="min-resolution-text">{item.resolution.text}</div>
                    <div className="min-resolution-votes">
                      <span>FOR: {item.resolution.votes.for}</span>
                      <span>AGAINST: {item.resolution.votes.against}</span>
                      <span>ABSTAIN: {item.resolution.votes.abstain}</span>
                    </div>
                    <div className="min-resolution-result">
                      <span className="min-pill min-pill-green">PASSED ✓</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            <div className="min-sig">
              <hr className="min-divider" />
              <div style={{ fontSize: 12.5, color: 'var(--neutral-700)' }}>Confirmed as a true record of the proceedings:</div>
              <div className="min-sig-line" />
              <div className="min-sig-name">S. Galloway</div>
              <div className="min-sig-role">Chairman · Gondwana Holdings Limited</div>
              <div className="min-sig-date">Date: _______________</div>
            </div>
          </div>
        </div>
        {toast && <div className="min-toast ok">{toast}</div>}
      </div>
    );
  }

  if (activeView === 'setup') {
    const handleDownload = () => {
      const safeType = meetingType.replace(/[^a-z0-9]/gi, '');
      const safeDate = meetingDate || 'date';
      const content = [
        'GONDWANA HOLDINGS LIMITED',
        'Minutes — ' + meetingType + ' — ' + meetingDate,
        '',
        'Company: Gondwana Holdings Limited',
        'Reg no: 2017/1055',
        'Address: 42 Nelson Mandela Avenue, Windhoek, Namibia',
        'Tel: +264 61 427 200',
        'Website: www.gondwana-collection.com',
        '',
        'Attendees present:',
        ...DIRECTORS.filter((d) => present.has(d)).map((d) => '  - ' + d),
        '',
        'Agenda:',
        ...agenda.filter(Boolean).map((a, i) => `  ${i + 1}. ${a}`),
        '',
        '--- Draft minutes below ---',
        '',
      ].join('\n');
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Minutes_${safeType}_${safeDate}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Template downloaded. Draft in Word, then upload the completed draft below.');
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadedFile(file.name);
      setWorkflowStage(1);
      showToast('Draft uploaded. Workflow advanced to Stage 1 — ready to circulate.');
    };

    const togglePresent = (d: string) => {
      setPresent((prev) => {
        const next = new Set(prev);
        if (next.has(d)) next.delete(d);
        else next.add(d);
        return next;
      });
    };

    return (
      <div className="min-page">
        <div className="min-body">
          <button className="min-back" onClick={() => setActiveView('list')}>
            <ArrowLeft size={15} /> Back to minutes
          </button>

          <div className="min-setup">
            <div className="min-setup-left">
              {/* Card 1 — Company details */}
              <div className="min-card">
                <h3 className="min-card-title">Company details</h3>
                <div className="min-grid-2">
                  <div className="min-field">
                    <div className="min-label">Company</div>
                    <div className="min-input min-input-locked"><span className="v">Gondwana Holdings Limited</span><Lock size={13} /></div>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Reg no</div>
                    <div className="min-input min-input-locked"><span className="v">2017/1055</span><Lock size={13} /></div>
                  </div>
                  <div className="min-field" style={{ gridColumn: '1 / -1' }}>
                    <div className="min-label">Address</div>
                    <div className="min-input min-input-locked"><span className="v">42 Nelson Mandela Avenue, Windhoek, Namibia</span><Lock size={13} /></div>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Tel</div>
                    <div className="min-input min-input-locked"><span className="v">+264 61 427 200</span><Lock size={13} /></div>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Website</div>
                    <div className="min-input min-input-locked"><span className="v">www.gondwana-collection.com</span><Lock size={13} /></div>
                  </div>
                </div>
                <div className="min-card-note">Company details auto-populated from entity register</div>
              </div>

              {/* Card 2 — Meeting information */}
              <div className="min-card">
                <h3 className="min-card-title">Meeting information</h3>
                <div className="min-grid-2">
                  <div className="min-field" style={{ gridColumn: '1 / -1' }}>
                    <div className="min-label">Entity</div>
                    <select className="min-select" defaultValue={ENTITIES[0]}>
                      {ENTITIES.map((e) => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Meeting type</div>
                    <select className="min-select" value={meetingType} onChange={(e) => setMeetingType(e.target.value)}>
                      <option>AGM</option><option>GM</option><option>Board</option><option>Committee</option>
                    </select>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Meeting number</div>
                    <input className="min-input" placeholder="e.g. 4th" defaultValue="4th" />
                  </div>
                  <div className="min-field">
                    <div className="min-label">Date</div>
                    <input type="date" className="min-input" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
                  </div>
                  <div className="min-field">
                    <div className="min-label">Time</div>
                    <input type="time" className="min-input" defaultValue="18:00" />
                  </div>
                  <div className="min-field" style={{ gridColumn: '1 / -1' }}>
                    <div className="min-label">Venue</div>
                    <input className="min-input" defaultValue="Gondwana House Boardroom, 42 Nelson Mandela Avenue, Windhoek" />
                  </div>
                  <div className="min-field">
                    <div className="min-label">Chairperson</div>
                    <select className="min-select" defaultValue="Dave Smuts">
                      {DIRECTORS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="min-field">
                    <div className="min-label">Format</div>
                    <div className="min-toggle">
                      {['In person', 'Virtual', 'Hybrid'].map((f, i) => (
                        <button key={f} className={'min-toggle-opt' + (i === 0 ? ' on' : '')}>{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 — Attendees */}
              <div className="min-card">
                <h3 className="min-card-title">Attendees</h3>
                <div className="min-chip-label">Directors present</div>
                <div className="min-chips">
                  {DIRECTORS.map((d) => {
                    const isPresent = present.has(d);
                    return (
                      <button
                        key={d}
                        className={'min-chip ' + (isPresent ? 'present' : 'absent')}
                        onClick={() => togglePresent(d)}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
                <div className={'min-quorum ' + (quorumMet ? 'ok' : 'fail')}>
                  <Check size={15} />
                  {quorumMet ? `Quorum of 3 met ✓ (${presentCount} present)` : 'Quorum not met'}
                </div>
              </div>

              {/* Card 4 — Agenda items */}
              <div className="min-card">
                <h3 className="min-card-title">Agenda items</h3>
                <p className="min-card-desc">List agenda items here. Full minutes are drafted in Microsoft Word using the template below.</p>
                {agenda.map((item, i) => (
                  <div className="min-agenda-row" key={i}>
                    <span className="min-agenda-num">{i + 1}.</span>
                    <input
                      className="min-input"
                      value={item}
                      placeholder="Agenda item"
                      onChange={(e) => setAgenda((prev) => prev.map((a, idx) => idx === i ? e.target.value : a))}
                    />
                  </div>
                ))}
                <button className="min-agenda-add" onClick={() => setAgenda((prev) => [...prev, ''])}>
                  + Add agenda item
                </button>
              </div>

              {/* Card 5 — Generate template */}
              <div className="min-card min-card-tinted">
                <h3 className="min-card-title">Generate Word template</h3>
                <p className="min-card-desc">Downloads a pre-filled .docx file with company letterhead, meeting details, attendee list, and agenda structure ready to complete in Microsoft Word.</p>
                <button className="min-btn min-btn-primary min-btn-lg" onClick={handleDownload}>
                  <Download size={17} /> Download Word template (.docx)
                </button>
              </div>

              {/* Card 6 — Upload draft */}
              <div className="min-card">
                <h3 className="min-card-title">Upload completed draft</h3>
                {uploadedFile ? (
                  <div className="min-uploaded">
                    <Check size={16} color="var(--success-600)" />
                    <span style={{ fontSize: 13, color: 'var(--neutral-700)' }}>{uploadedFile}</span>
                    <span className="min-pill min-pill-green" style={{ marginLeft: 'auto' }}>Uploaded</span>
                  </div>
                ) : (
                  <label className="min-upload">
                    <input type="file" accept=".doc,.docx,.pdf" style={{ display: 'none' }} onChange={handleUpload} />
                    <Upload size={26} className="min-upload-icon" />
                    <div className="min-upload-title">Upload completed draft (Word or PDF)</div>
                  </label>
                )}
              </div>
            </div>

            <div className="min-setup-right">
              {/* Workflow progress */}
              <div className="min-card">
                <h3 className="min-card-title">Workflow progress</h3>
                <div style={{ marginTop: 12 }}><Workflow stage={workflowStage} /></div>
              </div>

              {/* Checklist */}
              <div className="min-card">
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--neutral-600)', marginBottom: 6 }}>Before circulating</div>
                {[
                  'Company details confirmed',
                  'Meeting details complete',
                  'Attendees confirmed and quorum met',
                  'Agenda items listed',
                  'Word template downloaded and draft uploaded',
                ].map((label, i) => (
                  <div key={i} className={'min-check' + (checklist[i] ? ' on' : '')} onClick={() => setChecklist((prev) => prev.map((c, idx) => idx === i ? !c : c))}>
                    <div className="min-check-box">{checklist[i] ? <Check size={12} color="#fff" /> : null}</div>
                    <div className="min-check-text">{label}</div>
                  </div>
                ))}
                <div className="min-check-progress">{checklistDone} of 5 complete</div>
              </div>

              {/* Reference */}
              <div className="min-card">
                <div className="min-ref-title">Standard AGM agenda (24 Jun 2021)</div>
                <div className="min-ref-list">
                  {REF_AGENDA.map((r) => (
                    <div className="min-ref-row" key={r.n}>
                      {r.n}. {r.text}{r.presenter ? ` — ${r.presenter}` : ''}
                    </div>
                  ))}
                </div>
                <button className="min-btn min-btn-link" onClick={() => viewMeeting()} style={{ marginTop: 10 }}>
                  View full minutes →
                </button>
              </div>
            </div>
          </div>
        </div>
        {toast && <div className="min-toast ok">{toast}</div>}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="min-page">
      <div className="min-topbar">
        <div>
          <div className="min-topbar-title">Minutes register</div>
          <div className="min-topbar-sub">Meeting minutes and approval workflow</div>
        </div>
        <button className="min-btn min-btn-primary" onClick={startNew}>
          + New minutes
        </button>
      </div>
      <div className="min-body">
        <div className="min-alert">
          <AlertTriangle size={18} className="min-alert-icon" />
          <span>February 2026 GM minutes are in draft. Action required.</span>
        </div>

        <Workflow stage={1} />

        <div className="min-table-wrap">
          <table className="min-table">
            <thead>
              <tr>
                <th>Meeting</th><th>Date</th><th>Type</th><th>Chair</th><th>Resolutions</th><th>Stage</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const stageComplete = row.stage === 5;
                return (
                  <tr key={row.id} className={row.flagged ? 'min-row-flagged' : ''}>
                    <td style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{row.meeting}</td>
                    <td>{row.date}</td>
                    <td>{row.type}</td>
                    <td>{row.chair}</td>
                    <td>{row.resolutions}</td>
                    <td className="min-stage-cell">
                      <div className="s-name">Stage {stageComplete ? 5 : row.stage}</div>
                      <div className={'s-status ' + (stageComplete ? 'done' : 'active')}>
                        {stageComplete ? 'complete' : 'active'}
                      </div>
                    </td>
                    <td>
                      <span className={'min-pill ' + (stageComplete ? 'min-pill-green' : 'min-pill-amber')}>
                        {stageComplete ? 'Signed' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      {row.flagged ? (
                        <button className="min-btn min-btn-primary" onClick={continueDraft}>Continue</button>
                      ) : (
                        <button className="min-btn min-btn-ghost" onClick={() => viewMeeting()}>View</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="min-footer-note">Minutes retained permanently per Companies Act s.179</div>
      </div>
      {toast && <div className="min-toast ok">{toast}</div>}
    </div>
  );
}

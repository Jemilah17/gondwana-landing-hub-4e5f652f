import type { BoardPackRecord, DocRow } from '../contexts/BoardPackContext';

export const standardDocs: DocRow[] = [
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

export const agmDocs: DocRow[] = [
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

export const gmDocs: DocRow[] = [
  { id: 1, name: 'Notice of General Meeting', description: 'Formal notice per AoA Art. 14' },
  { id: 2, name: 'Previous meeting minutes', description: 'Minutes of last GM for adoption' },
  { id: 3, name: 'Management accounts', description: 'Latest financial report — J. Visser' },
  { id: 4, name: 'MD operational report', description: 'Group operational update — G. Joubert' },
  { id: 5, name: 'Resolutions for consideration', description: 'Ordinary resolutions tabled for member approval' },
  { id: 6, name: 'Proxy forms', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

export const committeeDocs: DocRow[] = [
  { id: 1, name: 'Meeting notice and agenda', description: 'Committee notice and agenda' },
  { id: 2, name: 'Previous committee minutes', description: 'Minutes of last committee meeting for adoption' },
  { id: 3, name: 'Committee report', description: 'Standing report for the period under review' },
  { id: 4, name: 'Matters arising schedule', description: 'Action tracker from previous meeting' },
  { id: 5, name: 'Supporting papers', description: 'Supporting papers for specific agenda items (optional)', optional: true },
];

export const templateOptions = [
  'Standard board meeting (9 items)',
  'AGM pack (12 items)',
  'GM pack (6 items)',
  'Committee meeting (5 items)',
];

export const templateDocs: Record<string, DocRow[]> = {
  'Standard board meeting (9 items)': standardDocs,
  'AGM pack (12 items)': agmDocs,
  'GM pack (6 items)': gmDocs,
  'Committee meeting (5 items)': committeeDocs,
};

export const defaultPack: BoardPackRecord = {
  id: 'pack-q3-2026',
  meeting: 'Q3 2026 Board Meeting',
  date: '2026-08-28',
  time: '18:00 WAT',
  venue: 'Gondwana House Boardroom, 42 Nelson Mandela Avenue, Windhoek',
  entity: 'Gondwana Holdings Ltd',
  chairperson: 'Dave Smuts',
  template: 'Standard board meeting (9 items)',
};

export const defaultRecipients = ['DS', 'GJ', 'JM', 'DN', 'HG', 'JV', 'FS'];

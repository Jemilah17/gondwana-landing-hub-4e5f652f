export interface Committee {
  id: string;
  name: string;
  chair: string;
  members: string[];
  meets: string;
  quorum: number;
  termsOfReference: 'current' | 'review due';
  lastMeeting: string;
  nextMeeting: string;
  stripeColor: string;
  focus?: string;
}

export const committees: Committee[] = [
  {
    id: 'audit-risk',
    name: 'Audit, Risk & Opportunity Committee',
    chair: 'James Mnyupe',
    members: ['James Mnyupe', 'Dave Smuts', 'David Namalenga', 'Hannes Gouws', 'Jaco Visser'],
    meets: 'Quarterly',
    quorum: 3,
    termsOfReference: 'current',
    lastMeeting: 'Q2 2026',
    nextMeeting: '28 Aug 2026',
    stripeColor: 'border-l-amber',
  },
  {
    id: 'people',
    name: 'People Committee',
    chair: 'David Namalenga',
    members: ['David Namalenga', 'Fabiola Schrywer', 'Gys Joubert'],
    meets: 'Bi-annual',
    quorum: 2,
    termsOfReference: 'current',
    lastMeeting: 'H1 2026',
    nextMeeting: 'Nov 2026',
    stripeColor: 'border-l-green',
    focus: 'Remuneration, HR, equity',
  },
  {
    id: 'sustainability',
    name: 'Sustainability Committee',
    chair: 'Hannes Gouws',
    members: ['Hannes Gouws', 'James Mnyupe', 'Fabiola Schrywer', 'Gys Joubert'],
    meets: 'Quarterly',
    quorum: 2,
    termsOfReference: 'review due',
    lastMeeting: 'Q2 2026',
    nextMeeting: '25 Sep 2026',
    stripeColor: 'border-l-teal',
    focus: 'ESG, conservation, environmental',
  },
];

export interface Director {
  name: string;
  role: string;
  appointed: string;
  basis: string;
  clusters: string;
  status: 'active' | 'retired';
}

export const directors: Director[] = [
  { name: 'Dave Smuts', role: 'Chairperson', appointed: '2025', basis: 'NED Independent', clusters: 'A, C', status: 'active' },
  { name: 'Gys Joubert', role: 'MD', appointed: 'Pre-2018', basis: 'Executive', clusters: 'All', status: 'active' },
  { name: 'James Mnyupe', role: 'Audit Risk Opp Cttee Chair', appointed: 'Pre-2021, re-elected 02 Jun 2022', basis: 'NED Independent', clusters: 'A, D', status: 'active' },
  { name: 'David Namalenga', role: 'Independent NED', appointed: 'Pre-2021, re-elected 24 Jun 2021', basis: 'NED Independent', clusters: 'B, D', status: 'active' },
  { name: 'Hannes Gouws', role: 'NED BI litigation', appointed: 'Pre-2021', basis: 'NED', clusters: 'A, C, E', status: 'active' },
  { name: 'Jaco Visser', role: 'CFO', appointed: 'Pre-2021', basis: 'Executive', clusters: 'B, C, E', status: 'active' },
  { name: 'Steve Galloway', role: 'Former Chairman', appointed: 'Former', basis: 'Former', clusters: 'Former', status: 'retired' },
  { name: 'Fabiola Schrywer', role: 'Company Secretary', appointed: 'Pre-2021', basis: 'Officer', clusters: 'All', status: 'active' },
];

export interface Risk {
  id: number;
  category: string;
  description: string;
  owner: string;
  likelihood: number;
  impact: number;
  inherentScore: number;
  mitigation: string;
  residualScore: number;
  committee: string;
  status: 'critical' | 'high' | 'medium' | 'low';
}

export const risks: Risk[] = [
  { id: 1, category: 'Compliance', description: 'FATF grey-listing - Namibia grey-listed Feb 2024', owner: 'Fabiola', likelihood: 4, impact: 4, inherentScore: 16, mitigation: 'FIC remediation 8/12 done', residualScore: 8, committee: 'Audit Risk Opp', status: 'critical' },
  { id: 2, category: 'Financial', description: 'Hollard BI claim - Business interruption litigation', owner: 'Hannes Gouws', likelihood: 3, impact: 4, inherentScore: 12, mitigation: 'Legal team + Gouws', residualScore: 6, committee: 'Audit Risk Opp', status: 'high' },
  { id: 3, category: 'Financial', description: 'NSX bond maturing 2026', owner: 'Jaco Visser', likelihood: 3, impact: 3, inherentScore: 9, mitigation: 'Refinancing plan', residualScore: 4, committee: 'Audit Risk Opp', status: 'high' },
  { id: 4, category: 'Compliance', description: 'Cross-border Chobe/Zambezi border regulations', owner: 'Jemilah', likelihood: 2, impact: 3, inherentScore: 6, mitigation: 'Bi-annual review', residualScore: 3, committee: 'Audit Risk Opp', status: 'medium' },
  { id: 5, category: 'Operational', description: 'Key person risk - Gys Joubert MD dependency', owner: 'Dave Smuts', likelihood: 2, impact: 3, inherentScore: 6, mitigation: 'Succession planning', residualScore: 4, committee: 'Full board', status: 'medium' },
  { id: 6, category: 'Technology', description: 'Cybersecurity threats', owner: 'Jaco Visser', likelihood: 3, impact: 4, inherentScore: 12, mitigation: 'IT security framework', residualScore: 6, committee: 'Audit Risk Opp', status: 'high' },
  { id: 7, category: 'Environmental', description: 'Climate risk to lodges', owner: 'Hannes Gouws', likelihood: 2, impact: 3, inherentScore: 6, mitigation: 'Sustainability program', residualScore: 3, committee: 'Sustainability', status: 'medium' },
];

export interface Policy {
  id: string;
  name: string;
  version: string;
  effectiveDate: string;
  approvalResolution: string;
  nextReview: string;
  status: 'current' | 'review due' | 'expired' | 'draft';
  isFlagged?: boolean;
}

export const policies: Policy[] = [
  { id: 'pol-001', name: 'Code of Ethics', version: 'v2.1', effectiveDate: '2024-03-01', approvalResolution: 'OR-2022-001', nextReview: '2026-03-01', status: 'current' },
  { id: 'pol-002', name: 'Conflict of Interest', version: 'v1.3', effectiveDate: '2023-06-15', approvalResolution: 'OR-2023-004', nextReview: '2025-06-15', status: 'review due' },
  { id: 'pol-003', name: 'Remuneration', version: 'v2.0', effectiveDate: '2022-06-02', approvalResolution: 'OR-2022-004', nextReview: '2026-06-02', status: 'current' },
  { id: 'pol-004', name: 'AML/CFT', version: 'v3.1', effectiveDate: '2024-06-01', approvalResolution: 'Board resolution', nextReview: '2025-06-01', status: 'review due' },
  { id: 'pol-005', name: 'Sanctions', version: 'v2.0', effectiveDate: '2024-06-01', approvalResolution: 'Board resolution', nextReview: '2026-06-01', status: 'current' },
  { id: 'pol-006', name: 'Whistleblower', version: 'v1.0', effectiveDate: '2023-01-15', approvalResolution: 'Board resolution', nextReview: '2025-01-15', status: 'expired' },
  { id: 'pol-007', name: 'Data Privacy', version: 'v1.0', effectiveDate: '2023-03-01', approvalResolution: 'Board resolution', nextReview: '2025-03-01', status: 'review due' },
  { id: 'pol-008', name: 'IT & AI Governance', version: 'Draft', effectiveDate: '—', approvalResolution: '—', nextReview: '2026-07-31', status: 'draft', isFlagged: true },
  { id: 'pol-009', name: 'Environmental', version: 'v1.1', effectiveDate: '2022-06-02', approvalResolution: 'Board resolution', nextReview: '2026-06-02', status: 'current' },
  { id: 'pol-010', name: 'Procurement', version: 'v1.0', effectiveDate: '2021-06-24', approvalResolution: 'Board resolution', nextReview: '2025-06-24', status: 'review due' },
  { id: 'pol-011', name: 'Share Trading', version: 'v1.0', effectiveDate: '2022-06-02', approvalResolution: 'Board resolution', nextReview: '2026-06-02', status: 'current' },
  { id: 'pol-012', name: 'Related Party Transactions', version: 'v1.0', effectiveDate: '2023-06-01', approvalResolution: 'Board resolution', nextReview: '2025-06-01', status: 'review due' },
];

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  entity: string;
  action: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  cluster: string;
}

export const auditEvents: AuditEvent[] = [
  { id: 'AT-0042', timestamp: '2026-06-25 07:14', actor: 'System', entity: 'All entities', action: 'Automated sanctions screening run', type: 'Sanctions', severity: 'critical', cluster: 'All' },
  { id: 'AT-0041', timestamp: '2026-06-25 08:32', actor: 'Fabiola', entity: 'Gondwana Travel Centre', action: 'Sanctions flag confirmed', type: 'Sanctions', severity: 'critical', cluster: 'Cluster A' },
  { id: 'AT-0040', timestamp: '2026-06-25 09:01', actor: 'Fabiola', entity: 'Gondwana Holdings', action: 'Proxy register updated 78.4%', type: 'Shareholder', severity: 'info', cluster: 'Cluster A' },
  { id: 'AT-0039', timestamp: '2026-06-24 16:45', actor: 'Gys Joubert', entity: 'Gondwana Holdings', action: 'OR-2026-001 signed', type: 'Resolution', severity: 'high', cluster: 'Cluster A' },
  { id: 'AT-0038', timestamp: '2026-06-24 11:10', actor: 'Jemilah', entity: 'Canyon Lodge', action: 'Board pack distributed Q3 2026', type: 'Board meeting', severity: 'info', cluster: 'Cluster B' },
  { id: 'AT-0037', timestamp: '2026-06-23 17:55', actor: 'System', entity: 'Kalahari Anib Lodge', action: 'BIPA return overdue 175 days', type: 'Compliance', severity: 'high', cluster: 'Cluster B' },
  { id: 'AT-0036', timestamp: '2026-06-22 09:30', actor: 'Hilma', entity: 'Palmwag Lodge', action: 'COI declaration filed Jaco Visser', type: 'Director', severity: 'low', cluster: 'Cluster C' },
  { id: 'AT-0035', timestamp: '2026-06-21 14:20', actor: 'Fabiola', entity: 'Gondwana Holdings', action: 'Shareholder register updated', type: 'Shareholder', severity: 'high', cluster: 'Cluster A' },
  { id: 'AT-0034', timestamp: '2026-06-21 11:00', actor: 'Jemilah', entity: 'Luna Namib Collection', action: 'New entity registered', type: 'Entity', severity: 'high', cluster: 'Cluster B' },
  { id: 'AT-0033', timestamp: '2026-06-20 16:50', actor: 'System', entity: 'Gondwana Collection Namibia', action: 'FIC remediation 8/12', type: 'Compliance', severity: 'high', cluster: 'Cluster A' },
];

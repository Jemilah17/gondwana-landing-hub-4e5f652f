export interface Filing {
  id: string;
  entityId: string;
  entityName: string;
  cluster: string;
  type: 'Companies Registry Annual Return' | 'Industry Statutory Levy' | 'Regulator Filing' | 'AML Compliance Return' | 'BO Declaration' | 'AGM' | 'Board Meeting' | 'Audit';
  dueDate: string;
  filedDate: string | null;
  receiptNumber: string | null;
  status: 'compliant' | 'due soon' | 'overdue' | 'filed' | 'pending';
  assignee: string;
  isFlagged?: boolean;
  // Consultant handoff tracking
  assignedTo: 'internal' | 'consultant';
  handoffStage: 'not_due' | 'handed_to_consultant' | 'filed_awaiting_proof' | 'confirmed_filed' | 'overdue_unconfirmed';
  handedOffDate: string | null;
  proofReceiptNumber: string | null; // reuses the receipt-capture pattern from Deadlines.tsx's modal
}

// Existing rows predate handoff tracking — derive sensible defaults so the
// data below stays unchanged.
type FilingRow = Omit<Filing, 'assignedTo' | 'handoffStage' | 'handedOffDate' | 'proofReceiptNumber'>;

const withHandoffDefaults = (f: FilingRow): Filing => {
  const assignedTo: Filing['assignedTo'] =
    f.type === 'Companies Registry Annual Return' || f.type === 'Industry Statutory Levy' ? 'consultant' : 'internal';

  const handoffStage: Filing['handoffStage'] =
    f.status === 'filed' ? 'confirmed_filed'
    : f.status === 'overdue' && assignedTo === 'consultant' ? 'overdue_unconfirmed'
    : 'not_due';

  return {
    ...f,
    assignedTo,
    handoffStage,
    handedOffDate: null,
    proofReceiptNumber: f.receiptNumber,
  };
};

const filingRows: FilingRow[] = [
  // Cluster A - Overdue
  { id: 'fil-001', entityId: 'mgh-003', entityName: 'Meridian Financial Services Ltd', cluster: 'A', type: 'Companies Registry Annual Return', dueDate: '2026-03-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'alex', isFlagged: true },
  { id: 'fil-002', entityId: 'mgh-001', entityName: 'Meridian Holdings Ltd', cluster: 'A', type: 'Industry Statutory Levy', dueDate: '2026-07-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'alex' },
  { id: 'fil-003', entityId: 'mgh-002', entityName: 'Meridian Group Holdings', cluster: 'A', type: 'BO Declaration', dueDate: '2026-02-28', filedDate: '2026-02-20', receiptNumber: 'BO-2026-0234', status: 'filed', assignee: 'alex' },
  { id: 'fil-p1', entityId: 'mgh-015', entityName: 'Crestview Properties (Pty) Ltd', cluster: 'A', type: 'Companies Registry Annual Return', dueDate: '2026-03-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'alex' },
  { id: 'fil-p2', entityId: 'mgh-015', entityName: 'Crestview Properties (Pty) Ltd', cluster: 'A', type: 'Industry Statutory Levy', dueDate: '2026-07-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'alex' },

  // Cluster B - Overdue and flagged
  { id: 'fil-004', entityId: 'mgh-008', entityName: 'Summit Engineering Ltd', cluster: 'B', type: 'Companies Registry Annual Return', dueDate: '2026-01-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'taylor', isFlagged: true },
  { id: 'fil-005', entityId: 'mgh-005', entityName: 'Northgate Manufacturing (Pty) Ltd', cluster: 'B', type: 'BO Declaration', dueDate: '2026-06-30', filedDate: '2026-06-15', receiptNumber: 'BO-2026-0567', status: 'filed', assignee: 'taylor' },
  { id: 'fil-006', entityId: 'mgh-004', entityName: 'Ironbridge Fabrication Ltd', cluster: 'B', type: 'Industry Statutory Levy', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'taylor' },

  // Cluster C - Overdue
  { id: 'fil-007', entityId: 'mgh-013', entityName: 'Harbour Freight Ltd', cluster: 'C', type: 'Companies Registry Annual Return', dueDate: '2025-12-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'jordan', isFlagged: true },
  { id: 'fil-008', entityId: 'mgh-021', entityName: 'Apex Warehousing Ltd', cluster: 'C', type: 'AML Compliance Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jordan' },
  { id: 'fil-009', entityId: 'mgh-019', entityName: 'Meridian Logistics Ltd', cluster: 'C', type: 'BO Declaration', dueDate: '2026-05-31', filedDate: '2026-05-20', receiptNumber: 'BO-2026-0890', status: 'filed', assignee: 'jordan' },

  // Cluster D
  { id: 'fil-010', entityId: 'mgh-025', entityName: 'Keystone Stores Ltd', cluster: 'D', type: 'Industry Statutory Levy', dueDate: '2026-09-15', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jordan' },
  { id: 'fil-011', entityId: 'mgh-009', entityName: 'Keystone Retail Ltd', cluster: 'D', type: 'BO Declaration', dueDate: '2026-04-30', filedDate: '2026-04-25', receiptNumber: 'BO-2026-1012', status: 'filed', assignee: 'jordan' },

  // Cluster E
  { id: 'fil-012', entityId: 'mgh-029', entityName: 'Beacon Facilities Services Ltd', cluster: 'E', type: 'Companies Registry Annual Return', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'taylor' },
  { id: 'fil-013', entityId: 'mgh-007', entityName: 'Lumen Technology Ltd', cluster: 'E', type: 'BO Declaration', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },

  // Additional filings for complexity
  { id: 'fil-014', entityId: 'mgh-012', entityName: 'Precision Components Ltd', cluster: 'B', type: 'AGM', dueDate: '2026-06-30', filedDate: '2026-06-24', receiptNumber: 'AGM-2026-003', status: 'filed', assignee: 'taylor' },
  { id: 'fil-015', entityId: 'mgh-024', entityName: 'Westbrook Developments Ltd', cluster: 'D', type: 'Audit', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },
  { id: 'fil-016', entityId: 'mgh-t01', entityName: 'Meridian Retirement Fund Trust', cluster: 'A', type: 'Regulator Filing', dueDate: '2026-12-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'alex' },
  { id: 'fil-017', entityId: 'mgh-027', entityName: 'Vertex Consulting Ltd', cluster: 'E', type: 'Companies Registry Annual Return', dueDate: '2026-11-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },

  // Cluster A additional filings
  { id: 'fil-018', entityId: 'mgh-001', entityName: 'Meridian Holdings Ltd', cluster: 'A', type: 'Companies Registry Annual Return', dueDate: '2026-06-30', filedDate: '2026-06-28', receiptNumber: 'GHL-Companies Registry-2026', status: 'filed', assignee: 'alex' },
  { id: 'fil-019', entityId: 'mgh-002', entityName: 'Meridian Group Holdings', cluster: 'A', type: 'Board Meeting', dueDate: '2026-08-28', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'alex' },

  // Cluster B additional filings
  { id: 'fil-020', entityId: 'mgh-005', entityName: 'Northgate Manufacturing (Pty) Ltd', cluster: 'B', type: 'Companies Registry Annual Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'taylor' },
  { id: 'fil-021', entityId: 'mgh-004', entityName: 'Ironbridge Fabrication Ltd', cluster: 'B', type: 'Companies Registry Annual Return', dueDate: '2026-06-15', filedDate: '2026-06-12', receiptNumber: 'SDL-Companies Registry-2026', status: 'filed', assignee: 'taylor' },
  { id: 'fil-022', entityId: 'mgh-012', entityName: 'Precision Components Ltd', cluster: 'B', type: 'Industry Statutory Levy', dueDate: '2026-07-25', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'taylor' },
  { id: 'fil-023', entityId: 'mgh-017', entityName: 'Northgate Plastics Ltd', cluster: 'B', type: 'Companies Registry Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },
  { id: 'fil-024', entityId: 'mgh-018', entityName: 'Northgate Packaging Ltd', cluster: 'B', type: 'Industry Statutory Levy', dueDate: '2026-08-15', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },
  { id: 'fil-025', entityId: 'mgh-006', entityName: 'Cornerstone Materials Ltd', cluster: 'B', type: 'Companies Registry Annual Return', dueDate: '2025-12-31', filedDate: '2025-12-28', receiptNumber: 'NDL-Companies Registry-2025', status: 'filed', assignee: 'taylor' },
  { id: 'fil-026', entityId: 'mgh-008', entityName: 'Summit Engineering Ltd', cluster: 'B', type: 'Industry Statutory Levy', dueDate: '2026-04-30', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'taylor' },
  { id: 'fil-027', entityId: 'mgh-005', entityName: 'Northgate Manufacturing (Pty) Ltd', cluster: 'B', type: 'Board Meeting', dueDate: '2026-08-28', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },

  // Cluster C additional filings
  { id: 'fil-028', entityId: 'mgh-019', entityName: 'Meridian Logistics Ltd', cluster: 'C', type: 'Companies Registry Annual Return', dueDate: '2026-03-31', filedDate: '2026-03-28', receiptNumber: 'TDS-Companies Registry-2026', status: 'filed', assignee: 'jordan' },
  { id: 'fil-029', entityId: 'mgh-020', entityName: 'Crossdock Partners JV', cluster: 'C', type: 'Industry Statutory Levy', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },
  { id: 'fil-030', entityId: 'mgh-021', entityName: 'Apex Warehousing Ltd', cluster: 'C', type: 'Companies Registry Annual Return', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },
  { id: 'fil-031', entityId: 'mgh-022', entityName: 'Swiftline Transport Ltd', cluster: 'C', type: 'Companies Registry Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },
  { id: 'fil-032', entityId: 'mgh-023', entityName: 'Linkway Couriers Ltd', cluster: 'C', type: 'AML Compliance Return', dueDate: '2026-12-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },

  // Cluster D additional filings
  { id: 'fil-033', entityId: 'mgh-009', entityName: 'Keystone Retail Ltd', cluster: 'D', type: 'Companies Registry Annual Return', dueDate: '2026-06-24', filedDate: '2026-06-20', receiptNumber: 'EKN-Companies Registry-2026', status: 'filed', assignee: 'jordan' },
  { id: 'fil-034', entityId: 'mgh-024', entityName: 'Westbrook Developments Ltd', cluster: 'D', type: 'Companies Registry Annual Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jordan' },
  { id: 'fil-035', entityId: 'mgh-026', entityName: 'Unity Retail Centres Ltd', cluster: 'D', type: 'Industry Statutory Levy', dueDate: '2026-07-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jordan' },
  { id: 'fil-036', entityId: 'mgh-009', entityName: 'Keystone Retail Ltd', cluster: 'D', type: 'Board Meeting', dueDate: '2026-09-15', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },
  { id: 'fil-e1', entityId: 'mgh-032', entityName: 'Cityline Property Fund Ltd', cluster: 'D', type: 'Companies Registry Annual Return', dueDate: '2026-04-15', filedDate: '2026-04-10', receiptNumber: 'Companies Registry/2026/EAL/0091', status: 'filed', assignee: 'jordan' },
  { id: 'fil-e2', entityId: 'mgh-032', entityName: 'Cityline Property Fund Ltd', cluster: 'D', type: 'Industry Statutory Levy', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jordan' },

  // Cluster E additional filings
  { id: 'fil-037', entityId: 'mgh-007', entityName: 'Lumen Technology Ltd', cluster: 'E', type: 'Companies Registry Annual Return', dueDate: '2026-06-30', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'taylor' },
  { id: 'fil-038', entityId: 'mgh-027', entityName: 'Vertex Consulting Ltd', cluster: 'E', type: 'Industry Statutory Levy', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'taylor' },
  { id: 'fil-039', entityId: 'mgh-028', entityName: 'Clearpath Software Ltd', cluster: 'E', type: 'Companies Registry Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },
  { id: 'fil-040', entityId: 'mgh-029', entityName: 'Beacon Facilities Services Ltd', cluster: 'E', type: 'AML Compliance Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'taylor' },
];

export const filings: Filing[] = filingRows.map(withHandoffDefaults);

export const getFilingsByEntity = (entityId: string): Filing[] => {
  return filings.filter(filing => filing.entityId === entityId);
};

export const getFilingsByCluster = (clusterId: string): Filing[] => {
  return filings.filter(filing => filing.cluster === clusterId);
};

export const getOverdueFilings = (): Filing[] => {
  return filings.filter(filing => filing.status === 'overdue');
};

export const getDueSoonFilings = (): Filing[] => {
  return filings.filter(filing => filing.status === 'due soon');
};

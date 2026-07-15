export interface Filing {
  id: string;
  entityId: string;
  entityName: string;
  cluster: string;
  type: 'BIPA Annual Return' | 'NTB Statutory Levy' | 'MoF Report' | 'FIC Compliance Return' | 'BO Declaration' | 'AGM' | 'Board Meeting' | 'Audit';
  dueDate: string;
  filedDate: string | null;
  receiptNumber: string | null;
  status: 'compliant' | 'due soon' | 'overdue' | 'filed' | 'pending';
  assignee: string;
  isFlagged?: boolean;
}

export const filings: Filing[] = [
  // Cluster A - Overdue
  { id: 'fil-001', entityId: 'gcn-003', entityName: 'Gondwana Travel Centre', cluster: 'A', type: 'BIPA Annual Return', dueDate: '2026-03-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'fabiola', isFlagged: true },
  { id: 'fil-002', entityId: 'gcn-001', entityName: 'Gondwana Holdings Ltd', cluster: 'A', type: 'NTB Statutory Levy', dueDate: '2026-07-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'fabiola' },
  { id: 'fil-003', entityId: 'gcn-002', entityName: 'Gondwana Collection Namibia', cluster: 'A', type: 'BO Declaration', dueDate: '2026-02-28', filedDate: '2026-02-20', receiptNumber: 'BO-2026-0234', status: 'filed', assignee: 'fabiola' },

  // Cluster B - Overdue and flagged
  { id: 'fil-004', entityId: 'gcn-008', entityName: 'Kalahari Anib Lodge', cluster: 'B', type: 'BIPA Annual Return', dueDate: '2026-01-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'jemilah', isFlagged: true },
  { id: 'fil-005', entityId: 'gcn-005', entityName: 'Canyon Lodge', cluster: 'B', type: 'BO Declaration', dueDate: '2026-06-30', filedDate: '2026-06-15', receiptNumber: 'BO-2026-0567', status: 'filed', assignee: 'jemilah' },
  { id: 'fil-006', entityId: 'gcn-004', entityName: 'Sossusvlei Dune Lodge', cluster: 'B', type: 'NTB Statutory Levy', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jemilah' },

  // Cluster C - Overdue
  { id: 'fil-007', entityId: 'gcn-013', entityName: 'Swakopmund Guesthouse & Spa', cluster: 'C', type: 'BIPA Annual Return', dueDate: '2025-12-31', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'hilma', isFlagged: true },
  { id: 'fil-008', entityId: 'gcn-021', entityName: 'Palmwag Lodge', cluster: 'C', type: 'FIC Compliance Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'hilma' },
  { id: 'fil-009', entityId: 'gcn-019', entityName: 'The Delight Swakopmund', cluster: 'C', type: 'BO Declaration', dueDate: '2026-05-31', filedDate: '2026-05-20', receiptNumber: 'BO-2026-0890', status: 'filed', assignee: 'hilma' },

  // Cluster D
  { id: 'fil-010', entityId: 'gcn-025', entityName: 'Etosha Safari Camp', cluster: 'D', type: 'NTB Statutory Levy', dueDate: '2026-09-15', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'hilma' },
  { id: 'fil-011', entityId: 'gcn-009', entityName: 'Etosha King Nehale', cluster: 'D', type: 'BO Declaration', dueDate: '2026-04-30', filedDate: '2026-04-25', receiptNumber: 'BO-2026-1012', status: 'filed', assignee: 'hilma' },

  // Cluster E
  { id: 'fil-012', entityId: 'gcn-029', entityName: 'Chobe River Camp', cluster: 'E', type: 'BIPA Annual Return', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jemilah' },
  { id: 'fil-013', entityId: 'gcn-007', entityName: 'Hakusembe River Lodge', cluster: 'E', type: 'BO Declaration', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },

  // Additional filings for complexity
  { id: 'fil-014', entityId: 'gcn-012', entityName: 'The Desert Grace', cluster: 'B', type: 'AGM', dueDate: '2026-06-30', filedDate: '2026-06-24', receiptNumber: 'AGM-2026-003', status: 'filed', assignee: 'jemilah' },
  { id: 'fil-015', entityId: 'gcn-024', entityName: 'Etosha Safari Lodge', cluster: 'D', type: 'Audit', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },
  { id: 'fil-016', entityId: 'gcn-t01', entityName: 'GCN Retirement Fund Trust', cluster: 'A', type: 'MoF Report', dueDate: '2026-12-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'fabiola' },
  { id: 'fil-017', entityId: 'gcn-027', entityName: 'Namushasha River Lodge', cluster: 'E', type: 'BIPA Annual Return', dueDate: '2026-11-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },

  // Cluster A additional filings
  { id: 'fil-018', entityId: 'gcn-001', entityName: 'Gondwana Holdings Ltd', cluster: 'A', type: 'BIPA Annual Return', dueDate: '2026-06-30', filedDate: '2026-06-28', receiptNumber: 'GHL-BIPA-2026', status: 'filed', assignee: 'fabiola' },
  { id: 'fil-019', entityId: 'gcn-002', entityName: 'Gondwana Collection Namibia', cluster: 'A', type: 'Board Meeting', dueDate: '2026-08-28', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'fabiola' },

  // Cluster B additional filings
  { id: 'fil-020', entityId: 'gcn-005', entityName: 'Canyon Lodge', cluster: 'B', type: 'BIPA Annual Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jemilah' },
  { id: 'fil-021', entityId: 'gcn-004', entityName: 'Sossusvlei Dune Lodge', cluster: 'B', type: 'BIPA Annual Return', dueDate: '2026-06-15', filedDate: '2026-06-12', receiptNumber: 'SDL-BIPA-2026', status: 'filed', assignee: 'jemilah' },
  { id: 'fil-022', entityId: 'gcn-012', entityName: 'The Desert Grace', cluster: 'B', type: 'NTB Statutory Levy', dueDate: '2026-07-25', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jemilah' },
  { id: 'fil-023', entityId: 'gcn-017', entityName: 'Canyon Village', cluster: 'B', type: 'BIPA Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },
  { id: 'fil-024', entityId: 'gcn-018', entityName: 'Canyon Roadhouse', cluster: 'B', type: 'NTB Statutory Levy', dueDate: '2026-08-15', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },
  { id: 'fil-025', entityId: 'gcn-006', entityName: 'Namib Desert Lodge', cluster: 'B', type: 'BIPA Annual Return', dueDate: '2025-12-31', filedDate: '2025-12-28', receiptNumber: 'NDL-BIPA-2025', status: 'filed', assignee: 'jemilah' },
  { id: 'fil-026', entityId: 'gcn-008', entityName: 'Kalahari Anib Lodge', cluster: 'B', type: 'NTB Statutory Levy', dueDate: '2026-04-30', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'jemilah' },
  { id: 'fil-027', entityId: 'gcn-005', entityName: 'Canyon Lodge', cluster: 'B', type: 'Board Meeting', dueDate: '2026-08-28', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },

  // Cluster C additional filings
  { id: 'fil-028', entityId: 'gcn-019', entityName: 'The Delight Swakopmund', cluster: 'C', type: 'BIPA Annual Return', dueDate: '2026-03-31', filedDate: '2026-03-28', receiptNumber: 'TDS-BIPA-2026', status: 'filed', assignee: 'hilma' },
  { id: 'fil-029', entityId: 'gcn-020', entityName: 'The Pearls', cluster: 'C', type: 'NTB Statutory Levy', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },
  { id: 'fil-030', entityId: 'gcn-021', entityName: 'Palmwag Lodge', cluster: 'C', type: 'BIPA Annual Return', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },
  { id: 'fil-031', entityId: 'gcn-022', entityName: 'Damara Mopane Lodge', cluster: 'C', type: 'BIPA Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },
  { id: 'fil-032', entityId: 'gcn-023', entityName: 'Omarunga Epupa Falls Camp', cluster: 'C', type: 'FIC Compliance Return', dueDate: '2026-12-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },

  // Cluster D additional filings
  { id: 'fil-033', entityId: 'gcn-009', entityName: 'Etosha King Nehale', cluster: 'D', type: 'BIPA Annual Return', dueDate: '2026-06-24', filedDate: '2026-06-20', receiptNumber: 'EKN-BIPA-2026', status: 'filed', assignee: 'hilma' },
  { id: 'fil-034', entityId: 'gcn-024', entityName: 'Etosha Safari Lodge', cluster: 'D', type: 'BIPA Annual Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'hilma' },
  { id: 'fil-035', entityId: 'gcn-026', entityName: 'Okapuka Safari Lodge', cluster: 'D', type: 'NTB Statutory Levy', dueDate: '2026-07-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'hilma' },
  { id: 'fil-036', entityId: 'gcn-009', entityName: 'Etosha King Nehale', cluster: 'D', type: 'Board Meeting', dueDate: '2026-09-15', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'hilma' },

  // Cluster E additional filings
  { id: 'fil-037', entityId: 'gcn-007', entityName: 'Hakusembe River Lodge', cluster: 'E', type: 'BIPA Annual Return', dueDate: '2026-06-30', filedDate: null, receiptNumber: null, status: 'overdue', assignee: 'jemilah' },
  { id: 'fil-038', entityId: 'gcn-027', entityName: 'Namushasha River Lodge', cluster: 'E', type: 'NTB Statutory Levy', dueDate: '2026-08-31', filedDate: null, receiptNumber: null, status: 'due soon', assignee: 'jemilah' },
  { id: 'fil-039', entityId: 'gcn-028', entityName: 'Zambezi Mubala Lodge', cluster: 'E', type: 'BIPA Annual Return', dueDate: '2026-10-31', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },
  { id: 'fil-040', entityId: 'gcn-029', entityName: 'Chobe River Camp', cluster: 'E', type: 'FIC Compliance Return', dueDate: '2026-09-30', filedDate: null, receiptNumber: null, status: 'pending', assignee: 'jemilah' },
];

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

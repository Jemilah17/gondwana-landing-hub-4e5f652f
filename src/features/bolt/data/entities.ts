export interface Entity {
  id: string;
  code: string;
  name: string;
  type: 'Holding' | 'Operating' | 'Lodge' | 'Hotel' | 'Camp' | 'DNFBP' | 'Trust' | 'Car rental' | 'Pods';
  cluster: string;
  region: string;
  complianceScore: number;
  status: 'compliant' | 'due soon' | 'overdue';
  assignee: string;
  incorporationDate: string;
  registrationNumber: string;
  isFlagged?: boolean;
  isIncoming?: boolean;
}

export const entities: Entity[] = [
  // Cluster A - Holdings & Corporate (Fabiola)
  { id: 'gcn-001', code: 'GCN-001', name: 'Gondwana Holdings Ltd', type: 'Holding', cluster: 'A', region: 'Khomas', complianceScore: 72, status: 'due soon', assignee: 'fabiola', incorporationDate: '2005-03-15', registrationNumber: '2005/0123' },
  { id: 'gcn-002', code: 'GCN-002', name: 'Gondwana Collection Namibia', type: 'Operating', cluster: 'A', region: 'Khomas', complianceScore: 85, status: 'compliant', assignee: 'fabiola', incorporationDate: '2010-06-20', registrationNumber: '2010/0456' },
  { id: 'gcn-003', code: 'GCN-003', name: 'Gondwana Travel Centre', type: 'DNFBP', cluster: 'A', region: 'Khomas', complianceScore: 55, status: 'overdue', assignee: 'fabiola', incorporationDate: '2012-01-10', registrationNumber: '2012/0789', isFlagged: true },
  { id: 'gcn-016', code: 'GCN-016', name: 'Namibia2Go', type: 'Car rental', cluster: 'A', region: 'Khomas', complianceScore: 74, status: 'due soon', assignee: 'fabiola', incorporationDate: '2018-05-22', registrationNumber: '2018/0345' },
  { id: 'gcn-t01', code: 'GCN-T01', name: 'GCN Retirement Fund Trust', type: 'Trust', cluster: 'A', region: 'Khomas', complianceScore: 100, status: 'compliant', assignee: 'fabiola', incorporationDate: '2015-11-30', registrationNumber: 'T2015/001' },

  // Cluster B - Southern Desert (Jemilah)
  { id: 'gcn-005', code: 'GCN-005', name: 'Canyon Lodge', type: 'Lodge', cluster: 'B', region: '//Karas', complianceScore: 88, status: 'compliant', assignee: 'jemilah', incorporationDate: '2008-04-12', registrationNumber: '2008/0111' },
  { id: 'gcn-008', code: 'GCN-008', name: 'Kalahari Anib Lodge', type: 'Lodge', cluster: 'B', region: 'Hardap', complianceScore: 34, status: 'overdue', assignee: 'jemilah', incorporationDate: '2014-07-08', registrationNumber: '2014/0222', isFlagged: true },
  { id: 'gcn-004', code: 'GCN-004', name: 'Sossusvlei Dune Lodge', type: 'Lodge', cluster: 'B', region: 'Hardap', complianceScore: 96, status: 'compliant', assignee: 'jemilah', incorporationDate: '2006-09-01', registrationNumber: '2006/0089' },
  { id: 'gcn-012', code: 'GCN-012', name: 'The Desert Grace', type: 'Lodge', cluster: 'B', region: 'Hardap', complianceScore: 90, status: 'compliant', assignee: 'jemilah', incorporationDate: '2017-03-20', registrationNumber: '2017/0156' },
  { id: 'gcn-017', code: 'GCN-017', name: 'Canyon Village', type: 'Lodge', cluster: 'B', region: '//Karas', complianceScore: 75, status: 'due soon', assignee: 'jemilah', incorporationDate: '2011-05-15', registrationNumber: '2011/0134' },
  { id: 'gcn-018', code: 'GCN-018', name: 'Canyon Roadhouse', type: 'Lodge', cluster: 'B', region: '//Karas', complianceScore: 68, status: 'due soon', assignee: 'jemilah', incorporationDate: '2009-08-22', registrationNumber: '2009/0100' },
  { id: 'gcn-006', code: 'GCN-006', name: 'Namib Desert Lodge', type: 'Lodge', cluster: 'B', region: 'Hardap', complianceScore: 82, status: 'compliant', assignee: 'jemilah', incorporationDate: '2007-02-28', registrationNumber: '2007/0067' },
  { id: 'luna-001', code: 'LUNA-001', name: 'Luna Namib Collection', type: 'Lodge', cluster: 'B', region: 'Hardap', complianceScore: 0, status: 'due soon', assignee: 'jemilah', incorporationDate: '2026-07-01', registrationNumber: '2026/0001', isIncoming: true },

  // Cluster C - Coastal & West (Hilma)
  { id: 'gcn-013', code: 'GCN-013', name: 'Swakopmund Guesthouse & Spa', type: 'Lodge', cluster: 'C', region: 'Erongo', complianceScore: 41, status: 'overdue', assignee: 'hilma', incorporationDate: '2013-04-10', registrationNumber: '2013/0189', isFlagged: true },
  { id: 'gcn-019', code: 'GCN-019', name: 'The Delight Swakopmund', type: 'Hotel', cluster: 'C', region: 'Erongo', complianceScore: 78, status: 'compliant', assignee: 'hilma', incorporationDate: '2016-06-18', registrationNumber: '2016/0234' },
  { id: 'gcn-020', code: 'GCN-020', name: 'The Pearls', type: 'Pods', cluster: 'C', region: 'Erongo', complianceScore: 90, status: 'compliant', assignee: 'hilma', incorporationDate: '2019-09-05', registrationNumber: '2019/0289' },
  { id: 'gcn-021', code: 'GCN-021', name: 'Palmwag Lodge', type: 'Lodge', cluster: 'C', region: 'Kunene', complianceScore: 82, status: 'compliant', assignee: 'hilma', incorporationDate: '2010-11-20', registrationNumber: '2010/0567' },
  { id: 'gcn-022', code: 'GCN-022', name: 'Damara Mopane Lodge', type: 'Lodge', cluster: 'C', region: 'Kunene', complianceScore: 65, status: 'due soon', assignee: 'hilma', incorporationDate: '2012-08-15', registrationNumber: '2012/0678' },
  { id: 'gcn-023', code: 'GCN-023', name: 'Omarunga Epupa Falls Camp', type: 'Camp', cluster: 'C', region: 'Kunene', complianceScore: 58, status: 'due soon', assignee: 'hilma', incorporationDate: '2014-02-28', registrationNumber: '2014/0890' },
  { id: 'admiral-001', code: 'ADM-001', name: 'The Admiral Walvis Bay', type: 'Hotel', cluster: 'C', region: 'Erongo', complianceScore: 0, status: 'due soon', assignee: 'hilma', incorporationDate: '2027-12-01', registrationNumber: '2027/0001', isIncoming: true },

  // Cluster D - Etosha & Northern (Hilma)
  { id: 'gcn-009', code: 'GCN-009', name: 'Etosha King Nehale', type: 'Lodge', cluster: 'D', region: 'Oshikoto', complianceScore: 78, status: 'compliant', assignee: 'hilma', incorporationDate: '2015-05-10', registrationNumber: '2015/0112' },
  { id: 'gcn-024', code: 'GCN-024', name: 'Etosha Safari Lodge', type: 'Lodge', cluster: 'D', region: 'Oshikoto', complianceScore: 88, status: 'compliant', assignee: 'hilma', incorporationDate: '2011-08-22', registrationNumber: '2011/0156' },
  { id: 'gcn-025', code: 'GCN-025', name: 'Etosha Safari Camp', type: 'Camp', cluster: 'D', region: 'Oshikoto', complianceScore: 65, status: 'due soon', assignee: 'hilma', incorporationDate: '2013-06-15', registrationNumber: '2013/0178' },
  { id: 'gcn-026', code: 'GCN-026', name: 'Okapuka Safari Lodge', type: 'Lodge', cluster: 'D', region: 'Khomas', complianceScore: 71, status: 'due soon', assignee: 'hilma', incorporationDate: '2016-04-20', registrationNumber: '2016/0201' },

  // Cluster E - Waterways (Jemilah)
  { id: 'gcn-007', code: 'GCN-007', name: 'Hakusembe River Lodge', type: 'Lodge', cluster: 'E', region: 'Kavango West', complianceScore: 62, status: 'due soon', assignee: 'jemilah', incorporationDate: '2009-05-18', registrationNumber: '2009/0078' },
  { id: 'gcn-027', code: 'GCN-027', name: 'Namushasha River Lodge', type: 'Lodge', cluster: 'E', region: 'Zambezi', complianceScore: 77, status: 'compliant', assignee: 'jemilah', incorporationDate: '2014-10-05', registrationNumber: '2014/0234' },
  { id: 'gcn-028', code: 'GCN-028', name: 'Zambezi Mubala Lodge', type: 'Lodge', cluster: 'E', region: 'Zambezi', complianceScore: 71, status: 'due soon', assignee: 'jemilah', incorporationDate: '2017-07-12', registrationNumber: '2017/0267' },
  { id: 'gcn-029', code: 'GCN-029', name: 'Chobe River Camp', type: 'Camp', cluster: 'E', region: 'Zambezi', complianceScore: 55, status: 'due soon', assignee: 'jemilah', incorporationDate: '2018-03-28', registrationNumber: '2018/0290' },
  { id: 'gcn-030', code: 'GCN-030', name: 'Kalahari Farmhouse', type: 'Lodge', cluster: 'E', region: 'Hardap', complianceScore: 80, status: 'compliant', assignee: 'jemilah', incorporationDate: '2012-12-10', registrationNumber: '2012/0345' },
];

export const getEntitiesByCluster = (clusterId: string): Entity[] => {
  return entities.filter(entity => entity.cluster === clusterId);
};

export const getEntityById = (id: string): Entity | undefined => {
  return entities.find(entity => entity.id === id);
};

export const getEntitiesByAssignee = (assigneeId: string): Entity[] => {
  return entities.filter(entity => entity.assignee === assigneeId);
};

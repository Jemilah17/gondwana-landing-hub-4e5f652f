export interface Entity {
  id: string;
  code: string;
  name: string;
  type: 'Holding' | 'Operating' | 'Subsidiary' | 'Property' | 'Operating' | 'Regulated' | 'Trust' | 'Logistics' | 'Joint venture';
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
  // Cluster A - Holdings & Corporate (Alex)
  { id: 'mgh-001', code: 'MGH-001', name: 'Meridian Holdings Ltd', type: 'Holding', cluster: 'A', region: 'Region 1', complianceScore: 72, status: 'due soon', assignee: 'alex', incorporationDate: '2005-03-15', registrationNumber: '2017/1055' },
  { id: 'mgh-002', code: 'MGH-002', name: 'Meridian Group Holdings', type: 'Operating', cluster: 'A', region: 'Region 1', complianceScore: 85, status: 'compliant', assignee: 'alex', incorporationDate: '2010-06-20', registrationNumber: '2010/0456' },
  { id: 'mgh-003', code: 'MGH-003', name: 'Meridian Financial Services Ltd', type: 'Regulated', cluster: 'A', region: 'Region 1', complianceScore: 55, status: 'overdue', assignee: 'alex', incorporationDate: '2012-01-10', registrationNumber: '2012/0789', isFlagged: true },
  { id: 'mgh-016', code: 'MGH-016', name: 'Apex Distribution Ltd', type: 'Logistics', cluster: 'A', region: 'Region 1', complianceScore: 74, status: 'due soon', assignee: 'alex', incorporationDate: '2018-05-22', registrationNumber: '2018/0345' },
  { id: 'mgh-015', code: 'MGH-015', name: 'Crestview Properties (Pty) Ltd', type: 'Operating', cluster: 'A', region: 'Region 1', complianceScore: 53, status: 'overdue', assignee: 'alex', incorporationDate: '2005-03-15', registrationNumber: 'CC/2005/00891', isFlagged: true },
  { id: 'mgh-t01', code: 'MGH-T01', name: 'Meridian Retirement Fund Trust', type: 'Trust', cluster: 'A', region: 'Region 1', complianceScore: 100, status: 'compliant', assignee: 'alex', incorporationDate: '2015-11-30', registrationNumber: 'T2015/001' },

  // Cluster B - Southern Desert (Taylor Morgan)
  { id: 'mgh-005', code: 'MGH-005', name: 'Northgate Manufacturing (Pty) Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 2', complianceScore: 88, status: 'compliant', assignee: 'taylor', incorporationDate: '2008-04-12', registrationNumber: '2008/0111' },
  { id: 'mgh-008', code: 'MGH-008', name: 'Summit Engineering Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 3', complianceScore: 34, status: 'overdue', assignee: 'taylor', incorporationDate: '2014-07-08', registrationNumber: '2014/0222', isFlagged: true },
  { id: 'mgh-004', code: 'MGH-004', name: 'Ironbridge Fabrication Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 3', complianceScore: 96, status: 'compliant', assignee: 'taylor', incorporationDate: '2006-09-01', registrationNumber: '2006/0089' },
  { id: 'mgh-012', code: 'MGH-012', name: 'Precision Components Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 3', complianceScore: 90, status: 'compliant', assignee: 'taylor', incorporationDate: '2017-03-20', registrationNumber: '2017/0156' },
  { id: 'mgh-017', code: 'MGH-017', name: 'Northgate Plastics Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 2', complianceScore: 75, status: 'due soon', assignee: 'taylor', incorporationDate: '2011-05-15', registrationNumber: '2011/0134' },
  { id: 'mgh-018', code: 'MGH-018', name: 'Northgate Packaging Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 2', complianceScore: 68, status: 'due soon', assignee: 'taylor', incorporationDate: '2009-08-22', registrationNumber: '2009/0100' },
  { id: 'mgh-010', code: 'MGH-010', name: 'Forgeline Industries Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 2', complianceScore: 79, status: 'compliant', assignee: 'taylor', incorporationDate: '2010-02-14', registrationNumber: '2010/0211' },
  { id: 'mgh-006', code: 'MGH-006', name: 'Cornerstone Materials Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 3', complianceScore: 82, status: 'compliant', assignee: 'taylor', incorporationDate: '2007-02-28', registrationNumber: '2007/0067' },
  { id: 'energy-001', code: 'MGH-033', name: 'Meridian Energy Ltd', type: 'Subsidiary', cluster: 'B', region: 'Region 3', complianceScore: 0, status: 'due soon', assignee: 'taylor', incorporationDate: '2026-07-01', registrationNumber: '2026/0001', isIncoming: true },

  // Cluster C - Coastal & West (Jordan)
  { id: 'mgh-013', code: 'MGH-013', name: 'Harbour Freight Ltd', type: 'Subsidiary', cluster: 'C', region: 'Region 4', complianceScore: 41, status: 'overdue', assignee: 'jordan', incorporationDate: '2013-04-10', registrationNumber: '2013/0189', isFlagged: true },
  { id: 'mgh-019', code: 'MGH-019', name: 'Meridian Logistics Ltd', type: 'Property', cluster: 'C', region: 'Region 4', complianceScore: 78, status: 'compliant', assignee: 'jordan', incorporationDate: '2016-06-18', registrationNumber: '2016/0234' },
  { id: 'mgh-020', code: 'MGH-020', name: 'Crossdock Partners JV', type: 'Joint venture', cluster: 'C', region: 'Region 4', complianceScore: 90, status: 'compliant', assignee: 'jordan', incorporationDate: '2019-09-05', registrationNumber: '2019/0289' },
  { id: 'mgh-021', code: 'MGH-021', name: 'Apex Warehousing Ltd', type: 'Subsidiary', cluster: 'C', region: 'Region 5', complianceScore: 82, status: 'compliant', assignee: 'jordan', incorporationDate: '2010-11-20', registrationNumber: '2010/0567' },
  { id: 'mgh-022', code: 'MGH-022', name: 'Swiftline Transport Ltd', type: 'Subsidiary', cluster: 'C', region: 'Region 5', complianceScore: 65, status: 'due soon', assignee: 'jordan', incorporationDate: '2012-08-15', registrationNumber: '2012/0678' },
  { id: 'mgh-023', code: 'MGH-023', name: 'Linkway Couriers Ltd', type: 'Operating', cluster: 'C', region: 'Region 5', complianceScore: 58, status: 'due soon', assignee: 'jordan', incorporationDate: '2014-02-28', registrationNumber: '2014/0890' },
  { id: 'datasvc-001', code: 'MGH-034', name: 'Meridian Data Services Ltd', type: 'Property', cluster: 'C', region: 'Region 4', complianceScore: 0, status: 'due soon', assignee: 'jordan', incorporationDate: '2027-12-01', registrationNumber: '2027/0001', isIncoming: true },

  // Cluster D - Etosha & Northern (Jordan)
  { id: 'mgh-009', code: 'MGH-009', name: 'Keystone Retail Ltd', type: 'Subsidiary', cluster: 'D', region: 'Region 6', complianceScore: 78, status: 'compliant', assignee: 'jordan', incorporationDate: '2015-05-10', registrationNumber: '2015/0112' },
  { id: 'mgh-024', code: 'MGH-024', name: 'Westbrook Developments Ltd', type: 'Subsidiary', cluster: 'D', region: 'Region 6', complianceScore: 88, status: 'compliant', assignee: 'jordan', incorporationDate: '2011-08-22', registrationNumber: '2011/0156' },
  { id: 'mgh-025', code: 'MGH-025', name: 'Keystone Stores Ltd', type: 'Operating', cluster: 'D', region: 'Region 6', complianceScore: 65, status: 'due soon', assignee: 'jordan', incorporationDate: '2013-06-15', registrationNumber: '2013/0178' },
  { id: 'mgh-026', code: 'MGH-026', name: 'Unity Retail Centres Ltd', type: 'Subsidiary', cluster: 'D', region: 'Region 1', complianceScore: 71, status: 'due soon', assignee: 'jordan', incorporationDate: '2016-04-20', registrationNumber: '2016/0201' },
  { id: 'mgh-032', code: 'MGH-032', name: 'Cityline Property Fund Ltd', type: 'Subsidiary', cluster: 'D', region: 'Region 6', complianceScore: 83, status: 'compliant', assignee: 'jordan', incorporationDate: '2019-04-15', registrationNumber: '2019/0178' },

  // Cluster E - Waterways (Taylor Morgan)
  { id: 'mgh-007', code: 'MGH-007', name: 'Lumen Technology Ltd', type: 'Subsidiary', cluster: 'E', region: 'Region 7', complianceScore: 62, status: 'due soon', assignee: 'taylor', incorporationDate: '2009-05-18', registrationNumber: '2009/0078' },
  { id: 'mgh-027', code: 'MGH-027', name: 'Vertex Consulting Ltd', type: 'Subsidiary', cluster: 'E', region: 'Region 8', complianceScore: 77, status: 'compliant', assignee: 'taylor', incorporationDate: '2014-10-05', registrationNumber: '2014/0234' },
  { id: 'mgh-028', code: 'MGH-028', name: 'Clearpath Software Ltd', type: 'Subsidiary', cluster: 'E', region: 'Region 8', complianceScore: 71, status: 'due soon', assignee: 'taylor', incorporationDate: '2017-07-12', registrationNumber: '2017/0267' },
  { id: 'mgh-029', code: 'MGH-029', name: 'Beacon Facilities Services Ltd', type: 'Operating', cluster: 'E', region: 'Region 8', complianceScore: 55, status: 'due soon', assignee: 'taylor', incorporationDate: '2018-03-28', registrationNumber: '2018/0290' },
  { id: 'mgh-030', code: 'MGH-030', name: 'Brightline Analytics Ltd', type: 'Subsidiary', cluster: 'E', region: 'Region 3', complianceScore: 80, status: 'compliant', assignee: 'taylor', incorporationDate: '2012-12-10', registrationNumber: '2012/0345' },
  { id: 'mgh-031', code: 'MGH-031', name: 'Sterling Support Services Ltd', type: 'Subsidiary', cluster: 'E', region: 'Region 7', complianceScore: 67, status: 'due soon', assignee: 'taylor', incorporationDate: '2016-08-19', registrationNumber: '2016/0312' },
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

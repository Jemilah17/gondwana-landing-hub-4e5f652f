import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { directors } from '../data/governance';

const tabs = [
  { id: 'members', label: 'Members', count: 4 },
  { id: 'directors', label: 'Directors', count: 8 },
  { id: 'beneficial', label: 'Beneficial owners', count: 7, alert: true },
  { id: 'resolutions', label: 'Resolutions', count: 12 },
  { id: 'coi', label: 'Conflict of interest', count: 7 },
  { id: 'minutes', label: 'Minutes', count: 4 },
  { id: 'debentures', label: 'Debentures', count: 2 },
  { id: 'auditors', label: 'Auditors', count: 3 },
];

const shareholders = [
  { id: 1, name: 'Gys Joubert', shares: '4,200,000', percentage: '7.6%', type: 'Ordinary', registered: '12 Apr 2018', status: 'active' },
  { id: 2, name: 'GCN Employee Share Scheme', shares: '3,850,000', percentage: '7.0%', type: 'Scheme', registered: '24 Jun 2021', status: 'active' },
  { id: 3, name: 'Feb 2026 GM placement', shares: '10,400,000', percentage: '18.9%', type: 'Ordinary', registered: '26 Feb 2026', status: 'pending', flagged: true },
  { id: 4, name: 'Remaining shareholders', shares: '36,550,000', percentage: '66.5%', type: 'Ordinary', registered: 'Various', status: 'active' },
];

const beneficialOwners = [
  { entity: 'Gondwana Holdings', bo: 'Gys Joubert et al', percentage: '>25%', receipt: 'BO-2026-0234', filedBy: 'Fabiola', status: 'filed' },
  { entity: 'Gondwana Travel Centre', bo: 'Multiple', percentage: 'Disclosure', receipt: 'BO-2026-0567', filedBy: 'Fabiola', status: 'filed' },
  { entity: 'Sossusvlei Dune Lodge', bo: 'Declared', percentage: 'Subsidiary', receipt: 'BO-2026-0345', filedBy: 'Jemilah', status: 'filed' },
  { entity: 'Canyon Lodge', bo: 'Pending', percentage: '—', receipt: '—', filedBy: '—', status: 'pending', flagged: true },
  { entity: 'Swakopmund Guesthouse', bo: 'Pending', percentage: '—', receipt: '—', filedBy: '—', status: 'pending', flagged: true },
  { entity: 'Hakusembe River Lodge', bo: 'Pending', percentage: '—', receipt: '—', filedBy: '—', status: 'pending', flagged: true },
];

const resolutions = [
  { ref: 'OR-2026-001', resolution: 'Share placement February 2026 GM', meeting: 'Feb 2026 GM', type: 'Ordinary', forPerc: '95%', effective: '26 Feb 2026', status: 'implementing', flagged: true },
  { ref: 'OR-2022-001', resolution: 'Re-elect directors', meeting: '5th AGM', type: 'Ordinary', forPerc: '99%', effective: '2 Jun 2022', status: 'done' },
  { ref: 'OR-2022-002', resolution: 'Appoint auditors', meeting: '5th AGM', type: 'Ordinary', forPerc: '100%', effective: '2 Jun 2022', status: 'done' },
  { ref: 'OR-2022-003', resolution: 'Approve fees', meeting: '5th AGM', type: 'Ordinary', forPerc: '97%', effective: '2 Jun 2022', status: 'done' },
];

const coiDeclarations = [
  { director: 'Dave Smuts', fy: 'FY2025', declared: 'None', received: '15 Jan 2026', filedBy: 'Fabiola', status: 'filed' },
  { director: 'Gys Joubert', fy: 'FY2025', declared: 'Related party - BI claim', received: '18 Jan 2026', filedBy: 'Fabiola', status: 'filed' },
  { director: 'James Mnyupe', fy: 'FY2025', declared: 'None', received: '20 Jan 2026', filedBy: 'Fabiola', status: 'filed' },
  { director: 'David Namalenga', fy: 'FY2025', declared: 'O/S', received: '—', filedBy: '—', status: 'outstanding', flagged: true },
  { director: 'Hannes Gouws', fy: 'FY2025', declared: 'O/S', received: '—', filedBy: '—', status: 'outstanding', flagged: true },
];

const minutes = [
  { meeting: 'February 2026 GM', date: '26 Feb 2026', type: 'General', chair: 'Dave Smuts', approvedAt: '—', status: 'draft', flagged: true },
  { meeting: '5th AGM', date: '2 Jun 2022', type: 'AGM', chair: 'Dave Smuts', approvedAt: 'AGM', status: 'final' },
  { meeting: '4th AGM', date: '24 Jun 2021', type: 'AGM', chair: 'Steve Galloway', approvedAt: 'AGM', status: 'final' },
];

const debentures = [
  { ref: 'GHL-BOND-001', holder: 'NSX Bond holders', value: 'N$25,000,000', issue: '01 Mar 2021', maturity: '01 Mar 2026', status: 'maturing', flagged: true },
  { ref: 'GHL-BOND-002', holder: 'NSX Bond holders', value: 'N$15,000,000', issue: '15 Jun 2021', maturity: '15 Jun 2026', status: 'active' },
];

const auditors = [
  { period: 'FY Oct 2023', auditor: 'Ernst & Young Namibia', resolution: 'Pending AGM', recommended: 'James Mnyupe', status: 'pending', flagged: true },
  { period: 'FY Oct 2022', auditor: 'Ernst & Young Namibia', resolution: 'OR-2022-002', recommended: 'James Mnyupe', status: 'completed' },
  { period: 'FY Oct 2021', auditor: 'Ernst & Young Namibia', resolution: 'OR-2021-002', recommended: 'Arne Stier', status: 'completed' },
];

export default function Registers() {
  const [activeTab, setActiveTab] = useState('members');

  return (
    <div>
      <Topbar title="Registers" />

      <div className="p-6">
        {/* Tabs */}
        <div className="flex border-b border-border mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-[11px] font-medium ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-orange -mb-px'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] ${
                tab.alert ? 'bg-red/10 text-red' : 'bg-muted/10 text-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Members tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="bg-orange-tint border border-orange-border rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange flex-shrink-0" />
              <div className="text-[11px] text-primary">
                <strong>February 2026 GM issued 10,400,000 new shares at N$10.00.</strong>
                <span className="text-muted"> Members register update pending.</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-background border-b border-border">
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">#</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Shareholder</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Shares</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">%</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Class</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Registered</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shareholders.map((sh, idx) => (
                    <tr key={sh.id} className={`hover:bg-background ${sh.flagged ? 'bg-orange-tint' : ''}`}>
                      <td className="px-4 py-3 text-[11px] text-muted">{String(idx + 1).padStart(3, '0')}</td>
                      <td className="px-4 py-3 text-[11px] text-primary font-medium">{sh.name}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{sh.shares}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{sh.percentage}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{sh.type}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{sh.registered}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={sh.status === 'active' ? 'active' : 'pending'} />
                      </td>
                      <td className="px-4 py-3">
                        {sh.flagged ? (
                          <button className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium">Update</button>
                        ) : (
                          <button className="px-3 py-1 border border-border text-muted rounded text-[10px]">View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Directors tab */}
        {activeTab === 'directors' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Appointed</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Basis</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Clusters</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {directors.map((dir, idx) => (
                  <tr key={idx} className={`hover:bg-background ${dir.name === 'Fabiola Schrywer' ? 'bg-orange-tint' : ''}`}>
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{dir.name}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{dir.role}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{dir.appointed}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{dir.basis}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{dir.clusters}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={dir.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 border border-border text-muted rounded text-[10px]">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Beneficial Owners tab */}
        {activeTab === 'beneficial' && (
          <div className="space-y-4">
            <div className="bg-red-tint border border-red/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red flex-shrink-0" />
              <div className="text-[11px] text-primary">
                <strong className="text-red">3 entities have no BO declaration</strong>
                <span className="text-muted"> — FATF grey-listing remediation obligation.</span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-background border-b border-border">
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Entity</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Beneficial owner</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">% basis</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">BIPA receipt</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Filed by</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {beneficialOwners.map((bo, idx) => (
                    <tr key={idx} className={`hover:bg-background ${bo.flagged ? 'bg-orange-tint' : ''}`}>
                      <td className="px-4 py-3 text-[11px] text-primary font-medium">{bo.entity}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{bo.bo}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{bo.percentage}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{bo.receipt}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{bo.filedBy}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={bo.status} />
                      </td>
                      <td className="px-4 py-3">
                        {bo.flagged ? (
                          <button className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium">Declare</button>
                        ) : (
                          <button className="px-3 py-1 border border-border text-muted rounded text-[10px]">View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs - simplified */}
        {activeTab === 'resolutions' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Ref</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Resolution</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Meeting</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">For %</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Effective</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {resolutions.map((res, idx) => (
                  <tr key={idx} className={`hover:bg-background ${res.flagged ? 'bg-orange-tint' : ''}`}>
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{res.ref}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{res.resolution}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{res.meeting}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{res.type}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{res.forPerc}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{res.effective}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={res.status === 'done' ? 'filed' : 'applying'} />
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-3 py-1 border border-border text-muted rounded text-[10px]">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Minutes, Debentures, Auditors tabs */}
        {activeTab === 'minutes' && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Meeting</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Chair</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Approved at</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {minutes.map((m, idx) => (
                  <tr key={idx} className={`hover:bg-background ${m.flagged ? 'bg-orange-tint' : ''}`}>
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{m.meeting}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{m.date}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{m.type}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{m.chair}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{m.approvedAt}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={m.status === 'final' ? 'filed' : 'draft'} />
                    </td>
                    <td className="px-4 py-3">
                      {m.flagged ? (
                        <button className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium">Draft →</button>
                      ) : (
                        <button className="px-3 py-1 border border-border text-muted rounded text-[10px]">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Right sidebar */}
        <div className="fixed right-0 top-[88px] bottom-0 w-[200px] bg-card border-l border-border p-4 overflow-y-auto hidden xl:block">
          <div className="space-y-4">
            <div className="bg-red-tint rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-red mb-2">Urgent items</h4>
              <div className="space-y-1 text-[10px] text-muted">
                <div>• BO pending (3)</div>
                <div>• COI outstanding (2)</div>
                <div>• Minutes draft (1)</div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Jump to entity</h4>
              <div className="space-y-1 text-[10px] text-muted">
                <div className="text-orange">Canyon Lodge (flagged)</div>
                <div>Gondwana Holdings</div>
                <div>Hakusembe</div>
                <div>Swakopmund Guesthouse</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

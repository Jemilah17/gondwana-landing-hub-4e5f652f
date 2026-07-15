import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { filings } from '../data/filings';
import { users } from '../data/users';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { Search } from 'lucide-react';

export default function Filings() {
  const { activeUser, canRead, canWrite } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const readableFilings = filings.filter(f => canRead(f.cluster));

  const filteredFilings = readableFilings.filter((filing) => {
    if (searchTerm && !filing.entityName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (clusterFilter !== 'all' && filing.cluster !== clusterFilter) return false;
    if (typeFilter !== 'all' && filing.type !== typeFilter) return false;
    if (statusFilter !== 'all' && filing.status !== statusFilter) return false;
    return true;
  });

  const statusCounts = {
    compliant: readableFilings.filter(f => f.status === 'compliant').length,
    dueSoon: readableFilings.filter(f => f.status === 'due soon').length,
    overdue: readableFilings.filter(f => f.status === 'overdue').length,
    pending: readableFilings.filter(f => f.status === 'pending').length,
  };
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <Topbar title="Filings" />

      <div className="p-6 space-y-4">
        {/* Status bar */}
        <div className="flex h-3 rounded-lg overflow-hidden">
          <div
            className="bg-green"
            style={{ width: `${(statusCounts.compliant / total) * 100}%` }}
          />
          <div
            className="bg-amber"
            style={{ width: `${(statusCounts.dueSoon / total) * 100}%` }}
          />
          <div
            className="bg-red"
            style={{ width: `${(statusCounts.overdue / total) * 100}%` }}
          />
          <div
            className="bg-muted"
            style={{ width: `${(statusCounts.pending / total) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green rounded-full" /> Compliant ({statusCounts.compliant})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber rounded-full" /> Due soon ({statusCounts.dueSoon})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red rounded-full" /> Overdue ({statusCounts.overdue})</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-muted rounded-full" /> Pending ({statusCounts.pending})</span>
        </div>

        {/* Filter bar */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search filings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-[12px] bg-card"
            />
          </div>
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All clusters</option>
            <option value="A">Cluster A</option>
            <option value="B">Cluster B</option>
            <option value="C">Cluster C</option>
            <option value="D">Cluster D</option>
            <option value="E">Cluster E</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All types</option>
            <option value="BIPA Annual Return">BIPA Annual Return</option>
            <option value="NTB Statutory Levy">NTB Statutory Levy</option>
            <option value="MoF Report">MoF Report</option>
            <option value="FIC Compliance Return">FIC Compliance Return</option>
            <option value="BO Declaration">BO Declaration</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All statuses</option>
            <option value="compliant">Compliant</option>
            <option value="due soon">Due soon</option>
            <option value="overdue">Overdue</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Filings table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">#</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Entity</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Cluster</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Due date</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Filed date</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Receipt</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Admin</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFilings.map((filing, idx) => {
                  const canEdit = canWrite(filing.cluster);
                  const assignee = users.find(u => u.id === filing.assignee);

                  return (
                    <tr
                      key={filing.id}
                      className={`hover:bg-background ${
                        filing.status === 'overdue' ? 'bg-orange-tint/50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-[11px] text-muted">{idx + 1}</td>
                      <td className="px-4 py-3 text-[11px] text-primary font-medium">{filing.entityName}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{filing.cluster}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">{filing.type}</td>
                      <td className="px-4 py-3 text-[11px] text-muted">
                        {new Date(filing.dueDate).toLocaleDateString('en-NA')}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted">
                        {filing.filedDate ? new Date(filing.filedDate).toLocaleDateString('en-NA') : '—'}
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted">{filing.receiptNumber || '—'}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={filing.status} />
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted">{assignee?.name.split(' ')[0]}</td>
                      <td className="px-4 py-3">
                        {canEdit && (filing.status === 'overdue' || filing.status === 'pending') ? (
                          <button className="px-3 py-1 bg-orange text-white rounded text-[10px] font-medium">
                            Log filing
                          </button>
                        ) : (
                          <button className="px-3 py-1 border border-border rounded text-[10px] text-muted hover:bg-background">
                            View
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
      </div>
    </div>
  );
}

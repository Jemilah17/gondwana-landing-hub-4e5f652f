import { useState, useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import { filings, Filing } from '../data/filings';
import { entities } from '../data/entities';
import { users } from '../data/users';
import { clusters } from '../data/clusters';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { Plus } from 'lucide-react';

const filingTypeColors: Record<string, string> = {
  'BIPA Annual Return': 'bg-orange-tint text-orange',
  'NTB Statutory Levy': 'bg-blue-tint text-blue',
  'MoF Report': 'bg-purple-tint text-purple',
  'FIC Compliance Return': 'bg-red-tint text-red',
  'AGM': 'bg-charcoal/10 text-charcoal',
  'Board Meeting': 'bg-green-tint text-green',
  'Audit': 'bg-amber-tint text-amber',
  'BO Declaration': 'bg-teal-tint text-teal',
};

const clusterColors: Record<string, string> = {
  'A': 'bg-orange-tint text-orange',
  'B': 'bg-amber-tint text-amber',
  'C': 'bg-blue-tint text-blue',
  'D': 'bg-green-tint text-green',
  'E': 'bg-teal-tint text-teal',
};

const adminColors: Record<string, string> = {
  'fabiola': 'bg-orange',
  'hilma': 'bg-green',
  'jemilah': 'bg-blue',
};

interface PopoverData {
  filing: Filing;
  position: { top: number; left: number };
}

export default function BoardCalendar() {
  const { canRead } = useUser();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCluster, setFilterCluster] = useState<string>('all');
  const [filterAdmin, setFilterAdmin] = useState<string>('all');
  const [selectedPill, setSelectedPill] = useState<PopoverData | null>(null);

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  // Group entities by cluster with their filings
  const entitiesByCluster = useMemo(() => {
    const filteredEntities = entities.filter(e => {
      if (filterCluster !== 'all' && e.cluster !== filterCluster) return false;
      if (filterAdmin !== 'all' && e.assignee !== filterAdmin) return false;
      return canRead(e.cluster);
    });

    const grouped: Record<string, typeof entities> = {};
    filteredEntities.forEach(entity => {
      if (!grouped[entity.cluster]) grouped[entity.cluster] = [];
      grouped[entity.cluster].push(entity);
    });
    return grouped;
  }, [filterCluster, filterAdmin, canRead]);

  // Metrics
  const metrics = useMemo(() => {
    const visibleFilings = filings.filter(f => canRead(f.cluster));
    const total = visibleFilings.length;
    const overdue = visibleFilings.filter(f => f.status === 'overdue').length;
    const dueSoon = visibleFilings.filter(f => f.status === 'due soon').length;
    const filed = visibleFilings.filter(f => f.status === 'filed').length;
    return { total, overdue, dueSoon, filed };
  }, [canRead]);

  // Upcoming deadlines
  const upcomingDeadlines = useMemo(() => {
    const now = new Date();
    return filings
      .filter(f => canRead(f.cluster) && f.status !== 'filed')
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5)
      .map(f => {
        const due = new Date(f.dueDate);
        const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { ...f, daysRemaining: days };
      });
  }, [canRead]);

  // Admin workload
  const adminWorkload = useMemo(() => {
    return users.map(user => {
      const userFilings = filings.filter(f => f.assignee === user.id && canRead(f.cluster));
      const userEntities = entities.filter(e => e.assignee === user.id && canRead(e.cluster));
      const filed = userFilings.filter(f => f.status === 'filed').length;
      const total = userFilings.length;
      const percent = total > 0 ? Math.round((filed / total) * 100) : 0;
      return {
        id: user.id,
        name: user.name,
        entityCount: userEntities.length,
        filed,
        total,
        percent,
      };
    });
  }, [canRead]);

  const getFilingPillStyle = (filing: Filing) => {
    const base = filingTypeColors[filing.type] || 'bg-muted/10 text-muted';
    if (filing.status === 'filed' || filing.status === 'compliant') {
      return base;
    }
    if (filing.status === 'overdue') {
      return `${base} border-l-[1.5px] border-l-red bg-red/5`;
    }
    if (filing.status === 'due soon') {
      return `${base} border-l-[1.5px] border-l-amber`;
    }
    return `${base} border border-dashed border-muted`;
  };

  const getFilingsForMonth = (entityId: string, monthIdx: number) => {
    return filings.filter(f => {
      if (f.entityId !== entityId) return false;
      const date = new Date(f.dueDate);
      const targetMonth = monthIdx < 6 ? monthIdx + 6 : monthIdx - 6;
      const targetYear = monthIdx < 6 ? 2025 : 2026;
      return date.getMonth() === targetMonth && date.getFullYear() === targetYear;
    });
  };

  const handlePillClick = (filing: Filing, event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setSelectedPill({
      filing,
      position: {
        top: rect.bottom + 4,
        left: Math.min(rect.left, window.innerWidth - 280),
      },
    });
  };

  const getAdminName = (clusterId: string) => {
    const cluster = clusters.find(c => c.id === clusterId);
    if (!cluster) return '';
    const user = users.find(u => u.id === cluster.admin);
    return user?.name || '';
  };

  const getAdminForEntity = (entityId: string) => {
    const entity = entities.find(e => e.id === entityId);
    if (!entity) return '';
    const user = users.find(u => u.id === entity.assignee);
    return user?.name || '';
  };

  return (
    <div className="pr-[220px]">
      <Topbar
        title="Board calendar"
        actions={
          <button className="px-3 py-1.5 bg-orange text-white rounded-lg text-[11px] font-medium flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add deadline
          </button>
        }
      />

      <div className="p-6">
        {/* Filter bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <select
              value={filterCluster}
              onChange={(e) => setFilterCluster(e.target.value)}
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
              value={filterAdmin}
              onChange={(e) => setFilterAdmin(e.target.value)}
              className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
            >
              <option value="all">All admins</option>
              <option value="fabiola">Fabiola Schrywer</option>
              <option value="hilma">Hilma Antinda</option>
              <option value="jemilah">Jemilah</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-[11px] ${viewMode === 'grid' ? 'bg-orange text-white' : 'bg-card border border-border text-muted'}`}
            >
              Month grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-[11px] ${viewMode === 'list' ? 'bg-orange text-white' : 'bg-card border border-border text-muted'}`}
            >
              List view
            </button>
          </div>
        </div>

        {/* Month grid */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[160px_repeat(12,1fr)] bg-background border-b border-border">
            <div className="px-3 py-2 text-[10px] font-medium text-muted border-r border-border">Entity</div>
            {months.map((month, idx) => (
              <div
                key={idx}
                className={`px-2 py-2 text-center text-[10px] font-medium border-r border-border last:border-r-0 ${
                  idx === 11 ? 'bg-orange-tint' : ''
                }`}
              >
                <div className="text-muted">{month}</div>
                <div className="text-primary text-[9px]">{idx < 6 ? 2025 : 2026}</div>
              </div>
            ))}
          </div>

          {/* Entity rows grouped by cluster */}
          {['A', 'B', 'C', 'D', 'E'].map((clusterId) => {
            const clusterEntities = entitiesByCluster[clusterId];
            if (!clusterEntities || clusterEntities.length === 0) return null;

            return (
              <div key={clusterId}>
                {/* Cluster divider row */}
                <div className="grid grid-cols-[160px_repeat(12,1fr)] bg-background border-b border-border">
                  <div className={`px-3 py-2 border-r border-border border-l-[4px] ${clusters.find(c => c.id === clusterId)?.stripeColor || 'border-l-muted'}`}>
                    <div className="text-[10px] font-medium text-primary">Cluster {clusterId}</div>
                    <div className="text-[9px] text-muted">{getAdminName(clusterId)}</div>
                  </div>
                  {months.map((_, idx) => (
                    <div key={idx} className="border-r border-border last:border-r-0 bg-background" />
                  ))}
                </div>

                {/* Entity rows */}
                {clusterEntities.map((entity) => (
                  <div
                    key={entity.id}
                    className={`grid grid-cols-[160px_repeat(12,1fr)] border-b border-border last:border-b-0 hover:bg-background/50`}
                  >
                    {/* Entity column */}
                    <div className="px-3 py-1.5 border-r border-border flex items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium text-primary truncate">{entity.name}</div>
                      </div>
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-medium flex-shrink-0 ${clusterColors[entity.cluster]}`}>
                        {entity.cluster}
                      </span>
                    </div>

                    {/* Month cells */}
                    {months.map((_, monthIdx) => {
                      const monthFilings = getFilingsForMonth(entity.id, monthIdx);
                      return (
                        <div
                          key={monthIdx}
                          className={`px-1 py-1 min-h-[32px] border-r border-border last:border-r-0 ${
                            monthIdx === 11 ? 'bg-orange-tint/50' : ''
                          }`}
                        >
                          {monthFilings.map((filing, fIdx) => (
                            <span
                              key={fIdx}
                              onClick={(e) => handlePillClick(filing, e)}
                              className={`inline-block px-1.5 py-0.5 rounded text-[9px] mb-0.5 cursor-pointer ${getFilingPillStyle(filing)}`}
                            >
                              {filing.type.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-muted">
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-orange-tint rounded" /> BIPA</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-blue-tint rounded" /> NTB</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-purple-tint rounded" /> MoF</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-red-tint rounded" /> FIC</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-teal-tint rounded" /> BO</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-green-tint rounded" /> Board</span>
          <span className="flex items-center gap-1"><span className="w-4 h-2 bg-amber-tint rounded" /> Audit</span>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="fixed right-0 top-[88px] bottom-0 w-[220px] bg-card border-l border-border p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Metrics cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-background rounded-lg p-3">
              <div className="text-[9px] text-muted">Total filings</div>
              <div className="text-[18px] font-medium text-primary">{metrics.total}</div>
            </div>
            <div className="bg-red-tint rounded-lg p-3">
              <div className="text-[9px] text-red">Overdue</div>
              <div className="text-[18px] font-medium text-red">{metrics.overdue}</div>
            </div>
            <div className="bg-amber-tint rounded-lg p-3">
              <div className="text-[9px] text-amber">Due soon</div>
              <div className="text-[18px] font-medium text-amber">{metrics.dueSoon}</div>
            </div>
            <div className="bg-green-tint rounded-lg p-3">
              <div className="text-[9px] text-green">Filed</div>
              <div className="text-[18px] font-medium text-green">{metrics.filed}</div>
            </div>
          </div>

          {/* Upcoming deadlines */}
          <div className="bg-background rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-primary mb-2">Upcoming deadlines</h4>
            <div className="space-y-2">
              {upcomingDeadlines.map((f) => (
                <div key={f.id} className="text-[10px]">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] ${filingTypeColors[f.type]}`}>
                      {f.type.split(' ')[0]}
                    </span>
                    <span className={`font-medium ${f.daysRemaining < 0 ? 'text-red' : f.daysRemaining < 30 ? 'text-amber' : 'text-muted'}`}>
                      {f.daysRemaining < 0 ? `${Math.abs(f.daysRemaining)}d overdue` : `${f.daysRemaining}d`}
                    </span>
                  </div>
                  <div className="text-muted truncate">{f.entityName}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin workload */}
          <div className="bg-background rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-primary mb-2">Admin workload</h4>
            <div className="space-y-3">
              {adminWorkload.map((admin) => (
                <div key={admin.id}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-primary font-medium">{admin.name}</span>
                    <span className="text-muted">{admin.filed}/{admin.total} filed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${adminColors[admin.id]}`}
                        style={{ width: `${admin.percent}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-muted w-[30px]">{admin.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popover */}
      {selectedPill && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setSelectedPill(null)}
          />
          <div
            className="fixed z-50 bg-card border border-border rounded-lg shadow-lg p-4 w-[260px]"
            style={{
              top: selectedPill.position.top,
              left: selectedPill.position.left,
            }}
          >
            <div className="space-y-3">
              <div>
                <div className="text-[11px] font-medium text-primary">{selectedPill.filing.entityName}</div>
                <div className="text-[10px] text-muted">{selectedPill.filing.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted">Due:</span>
                <span className="text-[10px] text-primary">{new Date(selectedPill.filing.dueDate).toLocaleDateString('en-NA', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                <StatusPill status={selectedPill.filing.status} />
              </div>
              <div className="text-[10px] text-muted">
                CoSec: {getAdminForEntity(selectedPill.filing.entityId)}
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-1.5 bg-orange text-white rounded-lg text-[10px] font-medium">
                  Log filing
                </button>
                <button className="px-3 py-1.5 border border-border rounded-lg text-[10px] text-muted hover:bg-background">
                  View
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

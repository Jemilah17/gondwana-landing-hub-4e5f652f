import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import { auditEvents } from '../data/governance';
import { Search, Download } from 'lucide-react';

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actorFilter, setActorFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const criticalCount = auditEvents.filter(e => e.severity === 'critical').length;
  const todayCount = auditEvents.filter(e => e.timestamp.startsWith('2026-06-25')).length;

  const filteredEvents = auditEvents.filter(event => {
    if (searchTerm && !event.action.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (actorFilter !== 'all' && event.actor !== actorFilter) return false;
    if (typeFilter !== 'all' && event.type !== typeFilter) return false;
    return true;
  });

  const severityConfig: Record<string, string> = {
    critical: 'bg-red/10 text-red',
    high: 'bg-orange/10 text-orange',
    medium: 'bg-amber/10 text-amber',
    low: 'bg-blue/10 text-blue',
    info: 'bg-muted/10 text-muted',
  };

  return (
    <div>
      <Topbar title="Audit trail" />

      <div className="p-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-primary">{auditEvents.length}</div>
            <div className="text-[10px] text-muted">Total events</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-red">{criticalCount}</div>
            <div className="text-[10px] text-muted">Critical flags</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-orange">{todayCount}</div>
            <div className="text-[10px] text-muted">Today's events</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-blue">3</div>
            <div className="text-[10px] text-muted">Active actors</div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex gap-3 flex-wrap mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-[12px] bg-card"
            />
          </div>
          <select
            value={actorFilter}
            onChange={(e) => setActorFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All actors</option>
            <option value="Fabiola">Fabiola</option>
            <option value="Hilma">Hilma</option>
            <option value="Jemilah">Jemilah</option>
            <option value="System">System</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All types</option>
            <option value="Sanctions">Sanctions</option>
            <option value="Compliance">Compliance</option>
            <option value="Resolution">Resolution</option>
            <option value="Entity">Entity</option>
          </select>
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-[12px] text-muted">
            Clear
          </button>
          <button className="px-4 py-2 bg-orange text-white rounded-lg text-[12px] font-medium flex items-center gap-1">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>

        {/* Events table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Timestamp</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Actor</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Entity</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Type</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Cluster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredEvents.map((event) => (
                <>
                  <tr
                    key={event.id}
                    onClick={() => setExpandedRow(expandedRow === event.id ? null : event.id)}
                    className={`hover:bg-background cursor-pointer ${
                      event.severity === 'critical' ? 'bg-red-tint/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-[11px] text-muted">{event.timestamp}</td>
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{event.actor}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{event.entity}</td>
                    <td className="px-4 py-3 text-[11px] text-primary">{event.action}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{event.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-medium ${severityConfig[event.severity]}`}>
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-muted">{event.cluster}</td>
                  </tr>
                  {expandedRow === event.id && (
                    <tr key={`${event.id}-detail`} className="bg-background">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-4 text-[11px]">
                          <div>
                            <span className="text-muted">Event ID:</span>
                            <span className="text-primary ml-1">{event.id}</span>
                          </div>
                          <div>
                            <span className="text-muted">SHA-256:</span>
                            <span className="text-primary ml-1">e3b0c4...</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-muted mt-2">
                          This record is immutable. Any attempt to modify it generates a new audit entry.
                        </p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-[11px] text-muted">Showing 1-10 of {auditEvents.length} events</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border rounded-lg text-[11px] text-muted bg-card">Previous</button>
            <button className="px-3 py-1.5 border border-border rounded-lg text-[11px] text-muted bg-card">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

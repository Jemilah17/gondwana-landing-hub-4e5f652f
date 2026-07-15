import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { ChevronDown, ChevronRight, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface Alert {
  id: string;
  severity: Severity;
  category: string;
  title: string;
  detail: string;
  dateRaised: string;
  assignee: { name: string; initials: string; color: string };
  resolved: boolean;
}

const alertsData: Alert[] = [
  // CRITICAL (red)
  { id: 'alt-001', severity: 'critical', category: 'Sanctions', title: 'UN Consolidated List match', detail: 'Canyon Lodge — Potential beneficial owner name match identified', dateRaised: '2026-06-15', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-002', severity: 'critical', category: 'Sanctions', title: 'OFAC SDN match', detail: 'Gondwana Travel Centre — Entity name similarity detected', dateRaised: '2026-06-12', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-003', severity: 'critical', category: 'BO Declaration', title: 'Beneficial owner declarations overdue', detail: 'Canyon Lodge, Swakopmund Guesthouse & Spa, Hakusembe River Lodge — 3 entities require immediate filing', dateRaised: '2026-06-01', assignee: { name: 'Jemilah', initials: 'JM', color: 'bg-blue' }, resolved: false },

  // HIGH (orange)
  { id: 'alt-004', severity: 'high', category: 'BIPA', title: 'Annual return overdue 175 days', detail: 'Kalahari Anib Lodge — Immediate remediation required', dateRaised: '2026-01-06', assignee: { name: 'Jemilah', initials: 'JM', color: 'bg-blue' }, resolved: false },
  { id: 'alt-005', severity: 'high', category: 'BIPA', title: 'Annual return overdue', detail: 'Swakopmund Guesthouse & Spa — Filing outstanding since Dec 2025', dateRaised: '2026-01-15', assignee: { name: 'Hilma Antinda', initials: 'HA', color: 'bg-green' }, resolved: false },
  { id: 'alt-006', severity: 'high', category: 'COI', title: 'Conflict of interest declaration outstanding', detail: 'Directors Namalenga and Gouws have not submitted COI declarations for FY2026', dateRaised: '2026-06-01', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-007', severity: 'high', category: 'Minutes', title: 'GM minutes draft status', detail: 'February 2026 General Meeting minutes remain in draft — board approval pending', dateRaised: '2026-04-01', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },

  // MEDIUM (amber)
  { id: 'alt-008', severity: 'medium', category: 'Policy', title: 'Policy review due', detail: 'Conflict of Interest policy — Annual review cycle overdue by 30 days', dateRaised: '2026-06-08', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-009', severity: 'medium', category: 'Policy', title: 'Policy review due', detail: 'Data Privacy policy — Annual review cycle due this quarter', dateRaised: '2026-06-15', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-010', severity: 'medium', category: 'NTB', title: 'Statutory levy due soon', detail: 'Hakusembe River Lodge — NTB levy payment due within 30 days', dateRaised: '2026-07-01', assignee: { name: 'Jemilah', initials: 'JM', color: 'bg-blue' }, resolved: false },

  // LOW (blue)
  { id: 'alt-011', severity: 'low', category: 'Board', title: 'Director skills matrix incomplete', detail: 'Annual skills assessment not completed for 2 directors', dateRaised: '2026-06-20', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },
  { id: 'alt-012', severity: 'low', category: 'Policy', title: 'IT & AI governance policy not drafted', detail: 'King IV recommendation — Policy framework pending development', dateRaised: '2026-05-15', assignee: { name: 'Fabiola Schrywer', initials: 'FS', color: 'bg-orange' }, resolved: false },

  // INFO (gray)
  { id: 'alt-013', severity: 'info', category: 'Onboarding', title: 'New entity opening July 2026', detail: 'Luna Namib Collection — Onboarding in progress, compliance setup underway', dateRaised: '2026-06-01', assignee: { name: 'Jemilah', initials: 'JM', color: 'bg-blue' }, resolved: false },
];

const severityConfig: Record<Severity, { label: string; headerBg: string; headerText: string; dotColor: string }> = {
  critical: { label: 'CRITICAL', headerBg: 'bg-red', headerText: 'text-white', dotColor: 'bg-red' },
  high: { label: 'HIGH', headerBg: 'bg-orange', headerText: 'text-white', dotColor: 'bg-orange' },
  medium: { label: 'MEDIUM', headerBg: 'bg-amber', headerText: 'text-white', dotColor: 'bg-amber' },
  low: { label: 'LOW', headerBg: 'bg-blue', headerText: 'text-white', dotColor: 'bg-blue' },
  info: { label: 'INFO', headerBg: 'bg-muted', headerText: 'text-white', dotColor: 'bg-muted' },
};

const severityOrder: Severity[] = ['critical', 'high', 'medium', 'low', 'info'];

export default function Alerts() {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(alertsData);
  const [expandedSections, setExpandedSections] = useState<Set<Severity>>(new Set(['critical', 'high']));

  const toggleSection = (severity: Severity) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(severity)) {
        next.delete(severity);
      } else {
        next.add(severity);
      }
      return next;
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    showToast('Alert resolved and logged to audit trail');
  };

  const getAlertsBySeverity = (severity: Severity) => alerts.filter(a => a.severity === severity);

  const metrics = {
    critical: getAlertsBySeverity('critical').filter(a => !a.resolved).length,
    high: getAlertsBySeverity('high').filter(a => !a.resolved).length,
    medium: getAlertsBySeverity('medium').filter(a => !a.resolved).length,
    low: getAlertsBySeverity('low').filter(a => !a.resolved).length,
    info: getAlertsBySeverity('info').filter(a => !a.resolved).length,
  };

  return (
    <div className="pr-[220px]">
      <Topbar title="Alerts" />

      <div className="p-6 space-y-4">
        {/* Top metrics */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-red-tint border border-red-border rounded-lg p-3">
            <div className="text-[9px] text-red font-medium">CRITICAL</div>
            <div className="text-[20px] font-medium text-red">{metrics.critical}</div>
          </div>
          <div className="bg-orange-tint border border-orange-border rounded-lg p-3">
            <div className="text-[9px] text-orange font-medium">HIGH</div>
            <div className="text-[20px] font-medium text-orange">{metrics.high}</div>
          </div>
          <div className="bg-amber-tint border border-amber-border rounded-lg p-3">
            <div className="text-[9px] text-amber font-medium">MEDIUM</div>
            <div className="text-[20px] font-medium text-amber">{metrics.medium}</div>
          </div>
          <div className="bg-blue-tint border border-blue-border rounded-lg p-3">
            <div className="text-[9px] text-blue font-medium">LOW</div>
            <div className="text-[20px] font-medium text-blue">{metrics.low}</div>
          </div>
        </div>

        {/* Alert sections */}
        <div className="space-y-3">
          {severityOrder.map((severity) => {
            const config = severityConfig[severity];
            const severityAlerts = getAlertsBySeverity(severity);
            const isExpanded = expandedSections.has(severity);

            if (severityAlerts.length === 0) return null;

            return (
              <div key={severity} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(severity)}
                  className={`w-full px-4 py-3 ${config.headerBg} ${config.headerText} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="text-[11px] font-medium">{config.label}</span>
                    <span className="text-[10px] opacity-80">{severityAlerts.length} alert{severityAlerts.length !== 1 ? 's' : ''}</span>
                  </div>
                  {severity === 'critical' && !severityAlerts.every(a => a.resolved) && (
                    <AlertTriangle className="w-4 h-4 animate-pulse" />
                  )}
                </button>

                {/* Section content */}
                {isExpanded && (
                  <div className="divide-y divide-border">
                    {severityAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`px-4 py-3 flex items-start gap-3 ${alert.resolved ? 'opacity-50' : ''}`}
                      >
                        {/* Severity dot */}
                        <div className={`w-2 h-2 rounded-full ${config.dotColor} mt-1.5 flex-shrink-0`} />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-primary">{alert.title}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] bg-muted/10 text-muted`}>
                              {alert.category}
                            </span>
                            {alert.resolved && <StatusPill status="filed" />}
                          </div>
                          <div className="text-[10px] text-muted mt-0.5">{alert.detail}</div>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[9px] text-muted">
                              {new Date(alert.dateRaised).toLocaleDateString('en-NA', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        {/* Assignee and action */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div
                            className={`w-6 h-6 ${alert.assignee.color} rounded-full flex items-center justify-center text-white text-[9px] font-medium`}
                            title={alert.assignee.name}
                          >
                            {alert.assignee.initials}
                          </div>
                          {!alert.resolved && (
                            <button
                              onClick={() => handleResolve(alert.id)}
                              className="px-2 py-1 border border-border rounded text-[9px] text-muted hover:bg-background"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="fixed right-0 top-[88px] bottom-0 w-[220px] bg-card border-l border-border p-4 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-[11px] font-medium text-primary">Alert summary</h3>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-tint rounded-lg p-3">
              <div className="text-[9px] text-red">Critical</div>
              <div className="text-[16px] font-medium text-red">{metrics.critical}</div>
            </div>
            <div className="bg-orange-tint rounded-lg p-3">
              <div className="text-[9px] text-orange">High</div>
              <div className="text-[16px] font-medium text-orange">{metrics.high}</div>
            </div>
            <div className="bg-amber-tint rounded-lg p-3">
              <div className="text-[9px] text-amber">Medium</div>
              <div className="text-[16px] font-medium text-amber">{metrics.medium}</div>
            </div>
            <div className="bg-blue-tint rounded-lg p-3">
              <div className="text-[9px] text-blue">Low</div>
              <div className="text-[16px] font-medium text-blue">{metrics.low}</div>
            </div>
          </div>

          {/* Total unresolved */}
          <div className="bg-background rounded-lg p-3">
            <div className="text-[9px] text-muted">Total unresolved</div>
            <div className="text-[20px] font-medium text-primary">
              {alerts.filter(a => !a.resolved).length}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-background rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-primary mb-2">Recently resolved</h4>
            <div className="space-y-2">
              {alerts.filter(a => a.resolved).slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green" />
                  <span className="text-[9px] text-muted truncate">{alert.title}</span>
                </div>
              ))}
              {alerts.filter(a => a.resolved).length === 0 && (
                <div className="text-[9px] text-muted">No alerts resolved yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

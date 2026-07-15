import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Entity } from '../../data/entities';
import { filings } from '../../data/filings';
import { users } from '../../data/users';
import { clusters } from '../../data/clusters';
import Drawer from './Drawer';
import StatusPill from './StatusPills';
import ComplianceGauge from './ComplianceGauge';
import { AlertTriangle, Upload, FileText, ArrowRight } from 'lucide-react';

interface EntityDrawerProps {
  entity: Entity | null;
  onClose: () => void;
}

const entityTypePill = (type: string) => {
  const colors: Record<string, string> = {
    Holding: 'bg-purple-tint text-purple',
    Operating: 'bg-blue-tint text-blue',
    Lodge: 'bg-green-tint text-green',
    Hotel: 'bg-blue-tint text-blue',
    Camp: 'bg-teal-tint text-teal',
    DNFBP: 'bg-amber-tint text-amber',
    Trust: 'bg-red-tint text-red',
    'Car rental': 'bg-orange-tint text-orange',
    Pods: 'bg-green-tint text-green',
  };
  return colors[type] || 'bg-muted/10 text-muted';
};

const clusterPill = (clusterId: string) => {
  const colors: Record<string, string> = {
    A: 'bg-orange-tint text-orange',
    B: 'bg-amber-tint text-amber',
    C: 'bg-blue-tint text-blue',
    D: 'bg-green-tint text-green',
    E: 'bg-teal-tint text-teal',
  };
  return colors[clusterId] || 'bg-muted/10 text-muted';
};

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

export default function EntityDrawer({ entity, onClose }: EntityDrawerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'filings' | 'documents' | 'actions'>('overview');
  const navigate = useNavigate();

  if (!entity) return null;

  const entityFilings = filings.filter(f => f.entityId === entity.id);
  const assignee = users.find(u => u.id === entity.assignee);
  const cluster = clusters.find(c => c.id === entity.cluster);

  return (
    <Drawer isOpen={!!entity} onClose={onClose} title="" width="w-[380px]">
      <div className="space-y-4 -mt-5">
        {/* Header */}
        <div className="pb-4 border-b border-border">
          <div className="text-[14px] font-medium text-primary">{entity.name}</div>
          <div className="text-[11px] text-muted mt-0.5">{entity.code}</div>
          <div className="flex items-center gap-2 mt-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${entityTypePill(entity.type)}`}>
              {entity.type}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${clusterPill(entity.cluster)}`}>
              Cluster {entity.cluster}
            </span>
            {assignee && (
              <div className="flex items-center gap-1 ml-auto">
                <div
                  className={`w-5 h-5 ${assignee.avatarColor} rounded-full flex items-center justify-center text-white text-[9px] font-medium`}
                >
                  {assignee.initials}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border -mx-5 px-5">
          {(['overview', 'filings', 'documents', 'actions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-[10px] font-medium border-b-2 -mb-px capitalize ${
                activeTab === tab
                  ? 'text-orange border-orange'
                  : 'text-muted border-transparent hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Compliance gauge */}
            <div className="flex items-center justify-between bg-background rounded-lg p-4">
              <div>
                <div className="text-[10px] text-muted">Compliance score</div>
                <div className="text-[24px] font-medium text-primary">{entity.complianceScore}%</div>
              </div>
              <ComplianceGauge percentage={entity.complianceScore} size={60} />
            </div>

            {/* Entity details */}
            <div className="space-y-3">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Registration number</span>
                <span className="text-primary">{entity.registrationNumber}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Incorporation date</span>
                <span className="text-primary">{new Date(entity.incorporationDate).toLocaleDateString('en-NA', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Region</span>
                <span className="text-primary">{entity.region}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-muted">Status</span>
                <StatusPill status={entity.status} />
              </div>
            </div>

            {/* Is flagged alert */}
            {entity.isFlagged && (
              <div className="bg-orange-tint border border-orange-border rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />
                <div className="text-[10px] text-primary">
                  <span className="font-medium text-orange">Flagged for attention</span>
                  <span className="text-muted"> — Requires immediate review</span>
                </div>
              </div>
            )}

            {/* Is incoming banner */}
            {entity.isIncoming && (
              <div className="border border-dashed border-orange rounded-lg p-3">
                <div className="text-[10px] text-orange font-medium">
                  Opening {entity.incorporationDate}
                </div>
                <div className="text-[9px] text-muted mt-0.5">New entity · Onboarding in progress</div>
              </div>
            )}
          </div>
        )}

        {/* Filings tab */}
        {activeTab === 'filings' && (
          <div className="space-y-3">
            {entityFilings.length > 0 ? (
              <>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[9px] text-muted pb-2">Type</th>
                      <th className="text-left text-[9px] text-muted pb-2">Due date</th>
                      <th className="text-left text-[9px] text-muted pb-2">Status</th>
                      <th className="text-right text-[9px] text-muted pb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {entityFilings.map((filing) => (
                      <tr key={filing.id}>
                        <td className="py-2">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] ${filingTypeColors[filing.type]}`}>
                            {filing.type.split(' ')[0]}
                          </span>
                        </td>
                        <td className="py-2 text-[10px] text-muted">
                          {new Date(filing.dueDate).toLocaleDateString('en-NA', { day: '2-digit', month: 'short' })}
                        </td>
                        <td className="py-2">
                          <StatusPill status={filing.status} />
                        </td>
                        <td className="py-2 text-right">
                          {filing.receiptNumber ? (
                            <span className="text-[9px] text-green">{filing.receiptNumber}</span>
                          ) : (
                            <span className="text-[9px] text-orange">Log</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="w-full px-3 py-2 bg-orange text-white rounded-lg text-[10px] font-medium flex items-center justify-center gap-1">
                  Log filing
                </button>
              </>
            ) : (
              <div className="text-center py-8 text-[10px] text-muted">No filings found for this entity</div>
            )}
          </div>
        )}

        {/* Documents tab */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-muted mx-auto mb-2" />
              <div className="text-[10px] text-muted">No documents uploaded</div>
            </div>
            <div className="border border-dashed border-border rounded-lg p-6 text-center hover:bg-background transition-colors">
              <Upload className="w-6 h-6 text-muted mx-auto mb-2" />
              <div className="text-[10px] text-muted">
                <span className="text-orange font-medium">Click to upload</span> or drag and drop
              </div>
              <div className="text-[9px] text-muted mt-1">PDF, DOC, DOCX up to 10MB</div>
            </div>
          </div>
        )}

        {/* Actions tab */}
        {activeTab === 'actions' && (
          <div className="space-y-2">
            <button className="w-full px-3 py-2.5 bg-orange text-white rounded-lg text-[10px] font-medium flex items-center justify-center gap-1">
              Log filing <ArrowRight className="w-3 h-3" />
            </button>
            <button className="w-full px-3 py-2.5 border border-border rounded-lg text-[10px] text-muted hover:bg-background flex items-center justify-center gap-1">
              <Upload className="w-3 h-3" /> Upload document
            </button>
            <button className="w-full px-3 py-2.5 border border-border rounded-lg text-[10px] text-muted hover:bg-background flex items-center justify-center gap-1">
              <FileText className="w-3 h-3" /> Add resolution
            </button>
            <button
              onClick={() => {
                onClose();
                navigate({ to: '/audit-trail' });
              }}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-[10px] text-muted hover:bg-background"
            >
              View audit trail
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

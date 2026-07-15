import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import Drawer from '../components/ui/Drawer';
import { policies } from '../data/governance';
import { AlertTriangle, Eye, RefreshCw } from 'lucide-react';

export default function PolicyRegister() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const policy = selectedPolicy ? policies.find(p => p.id === selectedPolicy) : null;
  const reviewCount = policies.filter(p => p.status === 'review due' || p.status === 'expired' || p.status === 'draft').length;

  return (
    <div>
      <Topbar title="Policy register" />

      <div className="p-6">
        {/* Alert strip */}
        <div className="bg-orange-tint border border-orange-border rounded-lg p-3 mb-6 text-[11px] text-primary">
          {reviewCount} policies require review or action
        </div>

        {/* Policy grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map((pol) => (
            <div
              key={pol.id}
              onClick={() => setSelectedPolicy(pol.id)}
              className={`bg-card border rounded-lg p-3.5 cursor-pointer ${
                pol.isFlagged
                  ? 'border-orange border-dashed bg-orange-tint'
                  : 'border-border hover:bg-background'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[12px] font-medium text-primary">{pol.name}</h3>
                <StatusPill status={pol.status} />
              </div>
              <div className="space-y-1.5 text-[10px] text-muted">
                <div className="flex justify-between">
                  <span>Version</span>
                  <span className="text-primary">{pol.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Effective</span>
                  <span className="text-primary">{pol.effectiveDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution</span>
                  <span className="text-primary">{pol.approvalResolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next review</span>
                  <span className={pol.status === 'review due' || pol.status === 'expired' ? 'text-orange font-medium' : 'text-primary'}>
                    {pol.nextReview}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <button className="flex-1 px-2 py-1.5 bg-background rounded text-[10px] text-muted">
                  <Eye className="w-3 h-3 inline mr-1" /> View
                </button>
                <button className="flex-1 px-2 py-1.5 bg-orange text-white rounded text-[10px]">
                  <RefreshCw className="w-3 h-3 inline mr-1" /> Update
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar */}
        <div className="fixed right-0 top-[88px] bottom-0 w-[200px] bg-card border-l border-border p-4 overflow-y-auto hidden xl:block">
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Review schedule</h4>
              <div className="space-y-1 text-[10px] text-muted">
                <div className="text-orange">Jul 2026 — IT & AI Governance</div>
                <div>Sep 2026 — Conflict of Interest</div>
                <div>Oct 2026 — AML/CFT</div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Policy stats</h4>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="text-center">
                  <div className="text-lg font-medium text-green">{policies.filter(p => p.status === 'current').length}</div>
                  <div className="text-muted">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-orange">{reviewCount}</div>
                  <div className="text-muted">Action</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version history drawer */}
      <Drawer
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={policy?.name || ''}
      >
        {policy && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <StatusPill status={policy.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-muted">Version</span>
                <p className="text-[12px] text-primary">{policy.version}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted">Effective</span>
                <p className="text-[12px] text-primary">{policy.effectiveDate}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted">Resolution</span>
                <p className="text-[12px] text-primary">{policy.approvalResolution}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted">Next review</span>
                <p className="text-[12px] text-primary">{policy.nextReview}</p>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full px-4 py-2 bg-orange text-white rounded-lg text-[11px] font-medium">
                View document
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

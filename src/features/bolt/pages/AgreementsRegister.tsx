import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import Drawer from '../components/ui/Drawer';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface Agreement {
  ref: string;
  type: string;
  parties: string;
  entity: string;
  entityCode: string;
  effectiveDate: string;
  expiryDate: string;
  noticePeriod: string;
  status: 'active' | 'expiring soon' | 'expired' | 'maturing' | 'under renewal';
  action: string;
  hasClaim?: boolean;
}

const agreements: Agreement[] = [
  {
    ref: 'LEASE-001',
    type: 'Lease agreement',
    parties: 'NamPark Authority & Canyon Lodge',
    entity: 'Canyon Lodge',
    entityCode: 'GCN-005',
    effectiveDate: '2015-01-01',
    expiryDate: '2027-12-31',
    noticePeriod: '90 days',
    status: 'active',
    action: 'View',
  },
  {
    ref: 'SERV-002',
    type: 'Service agreement',
    parties: 'Stier Vente & Gondwana Holdings',
    entity: 'Gondwana Holdings',
    entityCode: 'GCN-001',
    effectiveDate: '2022-06-01',
    expiryDate: '2025-06-01',
    noticePeriod: '30 days',
    status: 'expired',
    action: 'Renew',
  },
  {
    ref: 'CONS-003',
    type: 'Conservation agreement',
    parties: 'MET & Etosha King Nehale',
    entity: 'Etosha King Nehale',
    entityCode: 'GCN-009',
    effectiveDate: '2020-03-01',
    expiryDate: '2026-09-30',
    noticePeriod: '60 days',
    status: 'expiring soon',
    action: 'Review',
  },
  {
    ref: 'INSURE-004',
    type: 'Insurance policy',
    parties: 'Hollard & Gondwana Holdings',
    entity: 'Gondwana Holdings',
    entityCode: 'GCN-001',
    effectiveDate: '2021-03-01',
    expiryDate: '2026-03-01',
    noticePeriod: '30 days',
    status: 'active',
    action: 'View claim',
    hasClaim: true,
  },
  {
    ref: 'NSX-005',
    type: 'Bond documentation',
    parties: 'NSX & Gondwana Holdings',
    entity: 'Gondwana Holdings',
    entityCode: 'GCN-001',
    effectiveDate: '2021-03-01',
    expiryDate: '2026-03-01',
    noticePeriod: '60 days',
    status: 'maturing',
    action: 'View',
  },
  {
    ref: 'IP-006',
    type: 'IP licence',
    parties: 'GCN & The Narrative',
    entity: 'The Narrative',
    entityCode: 'GCN-002',
    effectiveDate: '2021-06-24',
    expiryDate: '2026-06-24',
    noticePeriod: '30 days',
    status: 'expiring soon',
    action: 'Review',
  },
];

const categoryBreakdown = [
  { type: 'Lease', count: 1 },
  { type: 'Service', count: 1 },
  { type: 'Conservation', count: 1 },
  { type: 'Insurance', count: 1 },
  { type: 'Bond', count: 1 },
  { type: 'IP', count: 1 },
];

function getDaysRemaining(expiryDate: string): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-NA', { day: '2-digit', month: 'short', year: 'numeric' });
}

const expiringAgreements = agreements
  .filter(a => {
    const days = getDaysRemaining(a.expiryDate);
    return days <= 90 && days > 0;
  })
  .sort((a, b) => getDaysRemaining(a.expiryDate) - getDaysRemaining(b.expiryDate))
  .slice(0, 3);

export default function AgreementsRegister() {
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(null);

  const handleRowClick = (agreement: Agreement) => {
    setSelectedAgreement(agreement);
  };

  const getActionClass = (action: string) => {
    if (action === 'Renew' || action === 'Review' || action === 'View claim') {
      return 'bg-orange text-white hover:bg-orange/90';
    }
    return 'border border-border text-muted hover:bg-background';
  };

  return (
    <div className="pr-[220px]">
      <Topbar title="Agreements register" />

      <div className="p-6 space-y-4">
        {/* Alert strip */}
        <div className="bg-orange-tint border border-orange-border rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange flex-shrink-0" />
          <div className="text-[11px] text-primary">
            <strong className="text-orange">3 agreements expiring within 90 days</strong>
            <span className="text-muted"> — Review and initiate renewal processes.</span>
          </div>
        </div>

        {/* Main table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Ref</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Agreement type</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Parties</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Entity</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Effective date</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Expiry date</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Notice period</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {agreements.map((agreement) => {
                const daysRemaining = getDaysRemaining(agreement.expiryDate);
                const isExpiring = daysRemaining <= 90 && daysRemaining > 0;

                return (
                  <tr
                    key={agreement.ref}
                    onClick={() => handleRowClick(agreement)}
                    className={`hover:bg-background cursor-pointer ${
                      isExpiring && agreement.status !== 'active' ? 'bg-orange-tint' :
                      agreement.status === 'expired' ? 'bg-red-tint' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{agreement.ref}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{agreement.type}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{agreement.parties}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{agreement.entityCode}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{formatDisplayDate(agreement.effectiveDate)}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{formatDisplayDate(agreement.expiryDate)}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{agreement.noticePeriod}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <StatusPill status={agreement.status} />
                        {agreement.hasClaim && (
                          <span className="text-[9px] text-orange font-medium">(BI claim)</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(agreement);
                        }}
                        className={`px-3 py-1 rounded text-[10px] font-medium ${getActionClass(agreement.action)}`}
                      >
                        {agreement.action}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="fixed right-0 top-[88px] bottom-0 w-[220px] bg-card border-l border-border p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Expiring agreements card */}
          <div className="bg-red-tint rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-red mb-2">3 expiring within 90 days</h4>
            <div className="space-y-2">
              {expiringAgreements.map((a) => {
                const days = getDaysRemaining(a.expiryDate);
                const isUrgent = days <= 30;
                return (
                  <div key={a.ref} className="text-[10px]">
                    <div className="font-medium text-primary">{a.ref}</div>
                    <div className={`flex items-center gap-1 ${isUrgent ? 'text-red' : 'text-amber'}`}>
                      <span className="text-muted">{a.type}</span>
                      <span>·</span>
                      <span className="font-medium">{days} days</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category breakdown card */}
          <div className="bg-background rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-primary mb-2">Category breakdown</h4>
            <div className="space-y-1">
              {categoryBreakdown.map((cat) => (
                <div key={cat.type} className="flex items-center justify-between text-[10px]">
                  <span className="text-muted">{cat.type}</span>
                  <span className="text-primary font-medium">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* External counsel card */}
          <div className="bg-background rounded-lg p-3">
            <h4 className="text-[10px] font-medium text-primary mb-2">External counsel</h4>
            <div className="text-[10px] text-muted space-y-1">
              <div className="font-medium text-primary">Stier Vente and Associates</div>
              <div>Windhoek, Namibia</div>
              <div className="flex items-center gap-1 text-orange">
                <ExternalLink className="w-3 h-3" />
                <span>Contact details</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement details drawer */}
      <Drawer
        isOpen={selectedAgreement !== null}
        onClose={() => setSelectedAgreement(null)}
        title={selectedAgreement?.ref || ''}
        width="w-[400px]"
      >
        {selectedAgreement && (
          <div className="space-y-5">
            {/* Basic details */}
            <div>
              <h3 className="text-[11px] font-medium text-primary mb-2">Agreement details</h3>
              <div className="bg-background rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Type</span>
                  <span className="text-primary">{selectedAgreement.type}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Parties</span>
                  <span className="text-primary text-right">{selectedAgreement.parties}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Entity</span>
                  <span className="text-primary">{selectedAgreement.entity} ({selectedAgreement.entityCode})</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Effective date</span>
                  <span className="text-primary">{formatDisplayDate(selectedAgreement.effectiveDate)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Expiry date</span>
                  <span className="text-primary">{formatDisplayDate(selectedAgreement.expiryDate)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Notice period</span>
                  <span className="text-primary">{selectedAgreement.noticePeriod}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Status</span>
                  <StatusPill status={selectedAgreement.status} />
                </div>
              </div>
            </div>

            {/* Key terms */}
            <div>
              <h3 className="text-[11px] font-medium text-primary mb-2">Key terms</h3>
              <div className="bg-background rounded-lg p-3 text-[10px] text-muted">
                <p>Agreement terms and conditions are documented in the master contract. Key commercial terms include pricing schedules, service level agreements, and termination provisions.</p>
              </div>
            </div>

            {/* Renewal history */}
            <div>
              <h3 className="text-[11px] font-medium text-primary mb-2">Renewal history</h3>
              <div className="bg-background rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Initial term</span>
                  <span className="text-primary">{formatDisplayDate(selectedAgreement.effectiveDate)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Last renewal</span>
                  <span className="text-muted">No renewals recorded</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Auto-renewal</span>
                  <span className="text-primary">No</span>
                </div>
              </div>
            </div>

            {/* Linked entity */}
            <div>
              <h3 className="text-[11px] font-medium text-primary mb-2">Linked entity</h3>
              <div className="bg-background rounded-lg p-3 flex items-center justify-between">
                <div className="text-[10px]">
                  <div className="text-primary font-medium">{selectedAgreement.entity}</div>
                  <div className="text-muted">{selectedAgreement.entityCode}</div>
                </div>
                <button className="text-[10px] text-orange font-medium">View entity</button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-[11px] font-medium text-primary mb-2">Notes</h3>
              <textarea
                className="w-full bg-background border border-border rounded-lg p-3 text-[10px] text-muted resize-none"
                rows={3}
                placeholder="Add notes about this agreement..."
                defaultValue={selectedAgreement.hasClaim ? 'BI claim active - awaiting resolution from Hollard.' : ''}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 px-4 py-2 border border-border rounded-lg text-[10px] text-muted hover:bg-background">
                Download PDF
              </button>
              <button className="flex-1 px-4 py-2 bg-orange text-white rounded-lg text-[10px] font-medium hover:bg-orange/90">
                Initiate renewal
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

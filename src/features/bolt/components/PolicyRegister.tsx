const policies = [
  { name: 'Code of Ethics', version: 'v3.2', approvalDate: '2025-10-15', resolutionRef: 'BR-2025-042', nextReview: '2026-10-15', status: 'current' },
  { name: 'Conflict of Interest Policy', version: 'v2.1', approvalDate: '2025-08-20', resolutionRef: 'BR-2025-038', nextReview: '2026-08-20', status: 'current' },
  { name: 'Remuneration Policy', version: 'v4.0', approvalDate: '2025-11-30', resolutionRef: 'BR-2025-048', nextReview: '2026-11-30', status: 'current' },
  { name: 'AML/CFT Policy', version: 'v2.5', approvalDate: '2025-06-10', resolutionRef: 'BR-2025-025', nextReview: '2026-07-15', status: 'review-due' },
  { name: 'Sanctions Compliance Policy', version: 'v1.8', approvalDate: '2025-09-05', resolutionRef: 'BR-2025-040', nextReview: '2026-09-05', status: 'current' },
  { name: 'Whistleblower Policy', version: 'v2.0', approvalDate: '2025-07-22', resolutionRef: 'BR-2025-032', nextReview: '2026-07-22', status: 'current' },
  { name: 'Data Privacy Policy', version: 'v3.0', approvalDate: '2025-12-12', resolutionRef: 'BR-2025-050', nextReview: '2026-12-12', status: 'current' },
  { name: 'IT & AI Governance Policy', version: 'v1.0', approvalDate: '2026-02-28', resolutionRef: 'BR-2026-008', nextReview: '2027-02-28', status: 'current' },
  { name: 'Environmental Sustainability Policy', version: 'v2.2', approvalDate: '2025-11-15', resolutionRef: 'BR-2025-046', nextReview: '2026-11-15', status: 'current' },
  { name: 'Procurement Policy', version: 'v1.5', approvalDate: '2026-01-20', resolutionRef: 'BR-2026-003', nextReview: '2027-01-20', status: 'current' },
];

const statusConfig = {
  'current': { label: 'Current', bg: 'bg-green/10', text: 'text-green', border: 'border-green' },
  'review-due': { label: 'Review Due', bg: 'bg-orange-tint', text: 'text-orange', border: 'border-orange' },
  'draft': { label: 'Draft', bg: 'bg-muted/10', text: 'text-muted', border: 'border-muted' },
};

export default function PolicyRegister() {
  const currentCount = policies.filter(p => p.status === 'current').length;
  const reviewDueCount = policies.filter(p => p.status === 'review-due').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-medium text-primary">Policy Register</h2>
          <p className="text-sm text-muted mt-1">Governance policies and procedures for Gondwana Holdings Limited</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-green">{currentCount}</div>
            <div className="text-xs text-muted">Current</div>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-lg font-medium text-orange">{reviewDueCount}</div>
            <div className="text-xs text-muted">Review Due</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy) => (
          <div
            key={policy.name}
            className={`bg-card border rounded-lg p-4 ${
              policy.status === 'review-due' ? 'border-orange' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-primary">{policy.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[policy.status as keyof typeof statusConfig].bg} ${statusConfig[policy.status as keyof typeof statusConfig].text}`}>
                {statusConfig[policy.status as keyof typeof statusConfig].label}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-muted">Version</span>
                <span className="text-xs text-primary">{policy.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted">Approval Date</span>
                <span className="text-xs text-primary">{new Date(policy.approvalDate).toLocaleDateString('en-NA')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted">Resolution Ref</span>
                <span className="text-xs text-primary">{policy.resolutionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted">Next Review</span>
                <span className={`text-xs ${
                  policy.status === 'review-due' ? 'text-orange font-medium' : 'text-primary'
                }`}>
                  {new Date(policy.nextReview).toLocaleDateString('en-NA')}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <button className="text-xs text-orange font-medium">View Document</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

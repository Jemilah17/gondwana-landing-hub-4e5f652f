const stakeholderEngagements = [
  { group: 'Board of Directors', contact: 'Gys Joubert (CEO)', method: 'Board meetings', frequency: 'Monthly', lastEngagement: '2026-06-28', issues: 'Q2 performance review', response: 'Strategic decisions made', nextDate: '2026-07-28' },
  { group: 'Shareholders', contact: 'Company Secretary', method: 'AGM / Circulars', frequency: 'Annual + as needed', lastEngagement: '2026-05-15', issues: 'Dividend declaration', response: 'Approved at AGM', nextDate: '2027-05-15' },
  { group: 'FIC (Financial Intelligence Centre)', contact: 'Head of Compliance', method: 'Reports / Audits', frequency: 'Quarterly', lastEngagement: '2026-06-01', issues: 'AML compliance review', response: 'All findings addressed', nextDate: '2026-09-01' },
  { group: 'BIPA (Business Intellectual Property Authority)', contact: 'Legal Counsel', method: 'Filings / Updates', frequency: 'Annual', lastEngagement: '2025-12-10', issues: 'IP registrations', response: 'Renewals completed', nextDate: '2026-12-10' },
  { group: 'NTB (Namibia Tourism Board)', contact: 'Operations Director', method: 'Licencing meetings', frequency: 'Semi-annual', lastEngagement: '2026-03-20', issues: 'License renewals', response: 'All licenses current', nextDate: '2026-09-20' },
  { group: 'NSX (Namibia Stock Exchange)', contact: 'CFO', method: 'Regulatory filings', frequency: 'Quarterly', lastEngagement: '2026-06-30', issues: 'Quarterly reporting', response: 'Submitted on time', nextDate: '2026-09-30' },
  { group: 'Conservation Partners', contact: 'Sustainability Manager', method: 'Partnership meetings', frequency: 'Quarterly', lastEngagement: '2026-05-10', issues: 'Chobe conservation project', response: 'MOU renewed', nextDate: '2026-08-10' },
  { group: 'Community Leaders (Zambezi)', contact: 'Community Liaison', method: 'Community forums', frequency: 'Monthly', lastEngagement: '2026-06-25', issues: 'Employment opportunities', response: 'Recruitment plan shared', nextDate: '2026-07-25' },
];

const stakeholderGroups = [
  { name: 'Board', color: 'bg-orange', level: 'inner', count: 7 },
  { name: 'Shareholders', color: 'bg-blue', level: 'second', count: '960+' },
  { name: 'Regulators', color: 'bg-green', level: 'third', count: '4' },
  { name: 'Community', color: 'bg-amber', level: 'outer', count: 'Multiple' },
];

export default function StakeholderRegister() {
  const stakeholderLevels = [
    { label: 'Board', description: '7 directors providing strategic oversight', size: 'w-24 h-24', color: 'bg-orange' },
    { label: 'Shareholders', description: '960+ shareholders across Namibia', size: 'w-40 h-40', color: 'bg-blue/20 border-blue' },
    { label: 'Regulators', description: 'FIC, BIPA, NTB, NSX', size: 'w-56 h-56', color: 'bg-green/10 border-green' },
    { label: 'Community', description: 'Conservation & local communities', size: 'w-72 h-72', color: 'bg-amber/10 border-amber' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Stakeholder Register</h2>
        <p className="text-sm text-muted mt-1">Stakeholder identification and engagement tracking for Gondwana Holdings Limited</p>
      </div>

      {/* Concentric Circle Map */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-medium text-primary mb-4">Stakeholder Relationship Map</h3>
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer: Community */}
            <div className="w-72 h-72 rounded-full border-2 border-amber border-dashed flex items-center justify-center relative">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-amber font-medium bg-card px-2">Community & Conservation</span>

              {/* Third: Regulators */}
              <div className="w-56 h-56 rounded-full border-2 border-green flex items-center justify-center relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-green font-medium bg-card px-2">Regulators (4)</span>

                {/* Second: Shareholders */}
                <div className="w-40 h-40 rounded-full border-2 border-blue flex items-center justify-center relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-blue font-medium bg-card px-2">Shareholders (960+)</span>

                  {/* Inner: Board */}
                  <div className="w-24 h-24 rounded-full bg-orange flex items-center justify-center relative">
                    <div className="text-center">
                      <span className="text-xs text-white font-medium block">Board</span>
                      <span className="text-xs text-white/80">7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {stakeholderGroups.map((group) => (
            <div key={group.name} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${group.color}`} />
              <span className="text-xs text-muted">{group.name} ({group.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Tracker Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background">
          <h3 className="text-sm font-medium text-primary">Engagement Tracker</h3>
          <p className="text-xs text-muted mt-1">Stakeholder engagement activities and follow-up actions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Stakeholder Group</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Frequency</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Last Engagement</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Issues</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Response</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Next Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stakeholderEngagements.map((engagement, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-background ${
                    engagement.group.includes('FIC') || engagement.group.includes('NSX') ? 'bg-orange-tint/20' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-primary font-medium">{engagement.group}</td>
                  <td className="px-4 py-3 text-sm text-muted">{engagement.contact}</td>
                  <td className="px-4 py-3 text-sm text-muted">{engagement.method}</td>
                  <td className="px-4 py-3 text-sm text-muted">{engagement.frequency}</td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(engagement.lastEngagement).toLocaleDateString('en-NA')}</td>
                  <td className="px-4 py-3 text-sm text-muted max-w-xs">{engagement.issues}</td>
                  <td className="px-4 py-3 text-sm text-muted max-w-xs">{engagement.response}</td>
                  <td className="px-4 py-3 text-sm text-orange font-medium">{new Date(engagement.nextDate).toLocaleDateString('en-NA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const stakeholderGroups = [
  {
    ring: 'inner',
    name: 'Board of Directors',
    members: ['Dave Smuts', 'Gys Joubert', 'James Mnyupe', 'David Namalenga', 'Hannes Gouws', 'Jaco Visser', 'Fabiola Schrywer'],
  },
  {
    ring: 'second',
    name: 'Shareholders',
    members: ['960+ Shareholders', 'Nedbank Namibia (custodian)', 'GEPF (via asset managers)'],
  },
  {
    ring: 'third',
    name: 'Regulators',
    members: ['FIC (Financial Intelligence Centre)', 'BIPA (Business and Intellectual Property Authority)', 'NTB (Namibia Tourism Board)', 'NSX (Namibian Stock Exchange)'],
  },
  {
    ring: 'outer',
    name: 'Community & Conservation',
    members: ['Namibian Communities', 'Conservation Organizations', 'Tourism Associations', 'Local SME Partners'],
  },
];

const engagementLog = [
  { stakeholder: 'NSX', contact: 'Listings Department', method: 'Quarterly compliance call', frequency: 'Quarterly', lastEngagement: '2026-06-30', issues: 'None', response: 'Compliant', nextDate: '2026-09-30' },
  { stakeholder: 'FIC', contact: 'Compliance Officer', method: 'AML reporting submission', frequency: 'Monthly', lastEngagement: '2026-06-28', issues: 'Enhanced monitoring requested', response: 'Submitted additional documentation', nextDate: '2026-07-31' },
  { stakeholder: 'NTB', contact: 'Registration Division', method: 'License renewal coordination', frequency: 'Annual', lastEngagement: '2026-03-15', issues: 'None', response: 'All licenses current', nextDate: '2027-03-31' },
  { stakeholder: 'Shareholders', contact: 'Company Secretary', method: 'AGM and circulars', frequency: 'Annual + as needed', lastEngagement: '2026-04-28', issues: 'Remuneration policy questions', response: 'Detailed response provided', nextDate: '2027-04-30' },
  { stakeholder: 'Community - Erongo', contact: 'Regional Coordinator', method: 'Community liaison meeting', frequency: 'Quarterly', lastEngagement: '2026-05-20', issues: 'Employment opportunities', response: 'Local hiring initiative launched', nextDate: '2026-08-20' },
  { stakeholder: 'Conservation Orgs', contact: 'Namibia Nature Foundation', method: 'Partnership review', frequency: 'Bi-annual', lastEngagement: '2026-04-10', issues: 'Wildlife corridor concerns', response: 'Environmental assessment commissioned', nextDate: '2026-10-10' },
  { stakeholder: 'BIPA', contact: 'Registrar of Companies', method: 'Annual return filing', frequency: 'Annual', lastEngagement: '2026-02-28', issues: 'None', response: 'All 33 entities filed', nextDate: '2027-02-28' },
];

const ringColors = {
  inner: { bg: 'bg-orange text-white', border: 'border-orange' },
  second: { bg: 'bg-teal text-white', border: 'border-teal' },
  third: { bg: 'bg-charcoal text-white', border: 'border-charcoal' },
  outer: { bg: 'bg-muted text-white', border: 'border-muted' },
};

const ringLabels = {
  inner: 'Board',
  second: 'Shareholders',
  third: 'Regulators',
  outer: 'Community',
};

export default function StakeholderRegisterTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Stakeholder Register</h2>
        <p className="text-sm text-muted mt-1">Stakeholder mapping and engagement tracking for Gondwana Holdings Limited</p>
      </div>

      {/* Concentric Circle Map */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-medium text-primary mb-6">Stakeholder Concentric Map</h3>
        <div className="flex justify-center">
          <div className="relative w-80 h-80">
            {/* Outer ring - Community */}
            <div className="absolute inset-0 rounded-full border-2 border-muted flex items-center justify-center">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted font-medium">{ringLabels.outer}</div>
            </div>

            {/* Third ring - Regulators */}
            <div className="absolute inset-8 rounded-full border-2 border-charcoal bg-charcoal/10 flex items-center justify-center">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-charcoal font-medium">{ringLabels.third}</div>
            </div>

            {/* Second ring - Shareholders */}
            <div className="absolute inset-16 rounded-full border-2 border-teal bg-teal/10 flex items-center justify-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-teal font-medium">{ringLabels.second}</div>
            </div>

            {/* Inner ring - Board */}
            <div className="absolute inset-24 rounded-full border-2 border-orange bg-orange flex items-center justify-center">
              <span className="text-xs text-white font-medium">{ringLabels.inner}</span>
            </div>

            {/* Center point */}
            <div className="absolute inset-[48%] rounded-full bg-primary"></div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {Object.entries(ringColors).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${config.bg}`}></div>
              <span className="text-xs text-muted">{ringLabels[key as keyof typeof ringLabels]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Groups Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stakeholderGroups.map((group) => (
          <div key={group.name} className="bg-card border border-border rounded-lg p-4">
            <div className={`inline-flex px-2 py-1 text-xs rounded ${ringColors[group.ring as keyof typeof ringColors].bg}`}>
              {group.name}
            </div>
            <ul className="mt-3 space-y-1">
              {group.members.map((member) => (
                <li key={member} className="text-xs text-primary">{member}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Engagement Tracker */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-primary">Engagement Tracker</h3>
          <p className="text-xs text-muted mt-1">Stakeholder engagement log and follow-ups</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Stakeholder</th>
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
              {engagementLog.map((log, idx) => (
                <tr key={idx} className={`hover:bg-background ${log.issues !== 'None' ? 'bg-orange-tint/30' : ''}`}>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{log.stakeholder}</td>
                  <td className="px-4 py-3 text-sm text-muted">{log.contact}</td>
                  <td className="px-4 py-3 text-sm text-muted">{log.method}</td>
                  <td className="px-4 py-3 text-sm text-muted">{log.frequency}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(log.lastEngagement).toLocaleDateString('en-NA')}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{log.issues}</td>
                  <td className="px-4 py-3 text-sm text-muted">{log.response}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(log.nextDate).toLocaleDateString('en-NA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

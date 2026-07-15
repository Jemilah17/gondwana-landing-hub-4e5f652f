import { TrendingUp, DollarSign } from 'lucide-react';

const remunerationPolicy = {
  version: 'v4.0',
  approvalDate: '2025-11-30',
  resolutionRef: 'BR-2025-048',
  nextReview: '2026-11-30',
  nextAdvisoryVote: '2027-04-30',
  status: 'current',
};

const directorFees = [
  { type: 'Board Meeting Attendance', amount: 'N$10,000', frequency: 'Per meeting', notes: 'Ordinary and special board meetings' },
  { type: 'Committee Meeting Attendance', amount: 'N$5,000', frequency: 'Per meeting', notes: 'Audit, People, Sustainability committees' },
  { type: 'Chair Premium (Board)', amount: 'N$15,000', frequency: 'Per meeting', notes: 'Chair of the Board' },
  { type: 'Chair Premium (Committee)', amount: 'N$7,500', frequency: 'Per meeting', notes: 'Chairs of Board committees' },
  { type: 'Travel Allowance', amount: 'Reimbursed', frequency: 'Actual costs', notes: 'Directors based outside Windhoek' },
];

const advisoryVotes = [
  { year: '2026', voteDate: '2026-04-28', result: 'Approved', votesFor: '94.2%', votesAgainst: '3.1%', abstentions: '2.7%', status: 'passed' },
  { year: '2025', voteDate: '2025-04-22', result: 'Approved', votesFor: '91.8%', votesAgainst: '5.4%', abstentions: '2.8%', status: 'passed' },
  { year: '2024', voteDate: '2024-04-18', result: 'Approved', votesFor: '96.1%', votesAgainst: '2.2%', abstentions: '1.7%', status: 'passed' },
];

const statusConfig = {
  current: { label: 'Current', bg: 'bg-green/10', text: 'text-green' },
  passed: { label: 'Passed', bg: 'bg-green/10', text: 'text-green' },
  pending: { label: 'Pending', bg: 'bg-amber/10', text: 'text-amber' },
};

export default function RemunerationTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Remuneration Governance</h2>
        <p className="text-sm text-muted mt-1">Director remuneration framework for Gondwana Holdings Limited</p>
      </div>

      {/* Remuneration Policy Card */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-green/10 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-green" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary">Remuneration Policy</h3>
              <p className="text-xs text-muted mt-1">Approved by Board Resolution {remunerationPolicy.resolutionRef}</p>
            </div>
          </div>
          <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[remunerationPolicy.status as keyof typeof statusConfig].bg} ${statusConfig[remunerationPolicy.status as keyof typeof statusConfig].text}`}>
            {statusConfig[remunerationPolicy.status as keyof typeof statusConfig].label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted">Version</p>
            <p className="text-sm text-primary font-medium">{remunerationPolicy.version}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Approval Date</p>
            <p className="text-sm text-primary">{new Date(remunerationPolicy.approvalDate).toLocaleDateString('en-NA')}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Resolution Ref</p>
            <p className="text-sm text-primary">{remunerationPolicy.resolutionRef}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Next Advisory Vote</p>
            <p className="text-sm text-primary">{new Date(remunerationPolicy.nextAdvisoryVote).toLocaleDateString('en-NA')}</p>
          </div>
        </div>
      </div>

      {/* Directors' Fees Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-primary">Directors' Fees</h3>
          <p className="text-xs text-muted mt-1">Board and committee attendance fees</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Fee Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Frequency</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {directorFees.map((fee, idx) => (
                <tr key={idx} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{fee.type}</td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{fee.amount}</td>
                  <td className="px-4 py-3 text-sm text-muted">{fee.frequency}</td>
                  <td className="px-4 py-3 text-sm text-muted">{fee.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory Vote Tracker */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted" />
            <h3 className="text-sm font-medium text-primary">Advisory Shareholder Vote Tracker</h3>
          </div>
          <p className="text-xs text-muted mt-1">Annual non-binding advisory votes on remuneration policy</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Year</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Vote Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Result</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">For</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Against</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Abstentions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {advisoryVotes.map((vote) => (
                <tr key={vote.year} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{vote.year}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(vote.voteDate).toLocaleDateString('en-NA')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[vote.status as keyof typeof statusConfig].bg} ${statusConfig[vote.status as keyof typeof statusConfig].text}`}>
                      {vote.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-green font-medium">{vote.votesFor}</td>
                  <td className="px-4 py-3 text-center text-sm text-red">{vote.votesAgainst}</td>
                  <td className="px-4 py-3 text-center text-sm text-muted">{vote.abstentions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { DollarSign, Users, Calendar } from 'lucide-react';

const directors = [
  'Dave Smuts',
  'Gys Joubert',
  'James Mnyupe',
  'David Namalenga',
  'Hannes Gouws',
  'Jaco Visser',
  'Fabiola Schrywer',
];

const shareholderVotes = [
  { year: '2024', date: '2024-05-15', agenda: 'Annual directors fees adjustment', outcome: 'Approved', votes: '94%', attendance: '89%' },
  { year: '2023', date: '2023-05-18', agenda: 'Remuneration policy amendment', outcome: 'Approved', votes: '91%', attendance: '86%' },
  { year: '2022', date: '2022-05-20', agenda: 'Committee fee structure', outcome: 'Approved', votes: '96%', attendance: '92%' },
];

export default function RemunerationGovernance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Remuneration Governance</h2>
        <p className="text-sm text-muted mt-1">Directors remuneration policy and shareholder advisory votes</p>
      </div>

      {/* Remuneration Policy Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-blue" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-primary">Directors Remuneration Policy</h3>
            <p className="text-xs text-muted mt-1">Approved by Board Resolution OR-2022-004</p>
          </div>
          <div className="bg-green/10 text-green px-3 py-1 rounded text-xs font-medium">
            Current
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-background rounded-lg p-3">
            <span className="text-xs text-muted">Version</span>
            <p className="text-sm text-primary mt-1">v4.0</p>
          </div>
          <div className="bg-background rounded-lg p-3">
            <span className="text-xs text-muted">Approval Date</span>
            <p className="text-sm text-primary mt-1">30 November 2025</p>
          </div>
          <div className="bg-background rounded-lg p-3">
            <span className="text-xs text-muted">Next Advisory Vote</span>
            <p className="text-sm text-primary mt-1">AGM 2026</p>
          </div>
        </div>
      </div>

      {/* Directors Fees Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background">
          <h3 className="text-sm font-medium text-primary">Directors Fees Structure</h3>
          <p className="text-xs text-muted mt-1">Per meeting fees as per OR-2022-004</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Meeting Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Fee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Resolution Reference</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Effective Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background">
                <td className="px-4 py-3 text-sm text-primary">Board Meeting</td>
                <td className="px-4 py-3 text-sm text-primary font-medium">N$ 10,000</td>
                <td className="px-4 py-3 text-sm text-muted">OR-2022-004</td>
                <td className="px-4 py-3 text-sm text-muted">1 April 2022</td>
              </tr>
              <tr className="hover:bg-background">
                <td className="px-4 py-3 text-sm text-primary">Committee Meeting (per committee)</td>
                <td className="px-4 py-3 text-sm text-primary font-medium">N$ 5,000</td>
                <td className="px-4 py-3 text-sm text-muted">OR-2022-004</td>
                <td className="px-4 py-3 text-sm text-muted">1 April 2022</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Annual Estimate Card */}
      <div className="bg-orange-tint border border-orange/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-orange">Next Annual Review</h4>
            <p className="text-xs text-muted mt-1">Annual directors fees review scheduled for Q4 2026, subject to shareholder advisory vote at AGM.</p>
          </div>
        </div>
      </div>

      {/* Shareholder Advisory Vote Tracker */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background flex items-center gap-2">
          <Users className="w-4 h-4 text-muted" />
          <div>
            <h3 className="text-sm font-medium text-primary">Advisory Shareholder Vote Tracker</h3>
            <p className="text-xs text-muted mt-1">Non-binding advisory votes on remuneration policy</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">AGM Year</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Agenda Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Outcome</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Votes For</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shareholderVotes.map((vote) => (
                <tr key={vote.year} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{vote.year}</td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(vote.date).toLocaleDateString('en-NA')}</td>
                  <td className="px-4 py-3 text-sm text-muted">{vote.agenda}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs rounded bg-green/10 text-green">
                      {vote.outcome}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-green font-medium">{vote.votes}</td>
                  <td className="px-4 py-3 text-sm text-muted">{vote.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

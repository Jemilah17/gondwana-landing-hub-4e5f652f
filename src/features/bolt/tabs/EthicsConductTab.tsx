import { CheckCircle, AlertCircle } from 'lucide-react';

const ethicsCode = {
  name: 'Code of Ethics',
  version: 'v3.2',
  approvalDate: '2025-10-15',
  resolutionRef: 'BR-2025-042',
  nextReview: '2026-10-15',
  status: 'current',
};

const directors = [
  { name: 'Dave Smuts', signedDate: '2026-01-15', renewalDue: '2027-01-15', status: 'current' },
  { name: 'Gys Joubert', signedDate: '2026-01-20', renewalDue: '2027-01-20', status: 'current' },
  { name: 'James Mnyupe', signedDate: '2026-02-01', renewalDue: '2027-02-01', status: 'current' },
  { name: 'David Namalenga', signedDate: '2026-01-18', renewalDue: '2027-01-18', status: 'current' },
  { name: 'Hannes Gouws', signedDate: '2026-01-22', renewalDue: '2027-01-22', status: 'current' },
  { name: 'Jaco Visser', signedDate: '2026-02-10', renewalDue: '2027-02-10', status: 'current' },
  { name: 'Fabiola Schrywer', signedDate: '2026-01-25', renewalDue: '2027-01-25', status: 'current' },
];

const trainingLog = [
  { date: '2026-03-15', topic: 'Code of Ethics Annual Refresher', facilitator: 'Fabiola Schrywer', attendees: 7, completion: '100%' },
  { date: '2025-09-20', topic: 'Conflict of Interest Training', facilitator: 'James Mnyupe', attendees: 7, completion: '100%' },
  { date: '2025-06-12', topic: 'Whistleblower Procedures', facilitator: 'Dave Smuts', attendees: 6, completion: '86%' },
  { date: '2025-03-10', topic: 'King IV Governance Principles', facilitator: 'External: PwC', attendees: 7, completion: '100%' },
];

const statusConfig = {
  current: { label: 'Current', bg: 'bg-green/10', text: 'text-green' },
  overdue: { label: 'Overdue', bg: 'bg-red/10', text: 'text-red' },
  pending: { label: 'Pending', bg: 'bg-amber/10', text: 'text-amber' },
};

export default function EthicsConductTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Ethics & Conduct</h2>
        <p className="text-sm text-muted mt-1">Ethics framework and compliance for Gondwana Holdings Limited</p>
      </div>

      {/* Code of Ethics Status Card */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-green/10 rounded-lg p-2">
              <CheckCircle className="w-5 h-5 text-green" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary">{ethicsCode.name}</h3>
              <p className="text-xs text-muted mt-1">Approved by Board Resolution {ethicsCode.resolutionRef}</p>
            </div>
          </div>
          <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[ethicsCode.status as keyof typeof statusConfig].bg} ${statusConfig[ethicsCode.status as keyof typeof statusConfig].text}`}>
            {statusConfig[ethicsCode.status as keyof typeof statusConfig].label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted">Version</p>
            <p className="text-sm text-primary font-medium">{ethicsCode.version}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Approval Date</p>
            <p className="text-sm text-primary">{new Date(ethicsCode.approvalDate).toLocaleDateString('en-NA')}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Resolution Ref</p>
            <p className="text-sm text-primary">{ethicsCode.resolutionRef}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Next Review</p>
            <p className="text-sm text-primary">{new Date(ethicsCode.nextReview).toLocaleDateString('en-NA')}</p>
          </div>
        </div>
      </div>

      {/* Declaration Tracker */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-primary">Annual Declaration Tracker</h3>
          <p className="text-xs text-muted mt-1">Director conflict of interest declarations</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Signed Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Renewal Due</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {directors.map((director) => (
                <tr key={director.name} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{director.name}</td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(director.signedDate).toLocaleDateString('en-NA')}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(director.renewalDue).toLocaleDateString('en-NA')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[director.status as keyof typeof statusConfig].bg} ${statusConfig[director.status as keyof typeof statusConfig].text}`}>
                      {statusConfig[director.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethics Training Log */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-primary">Ethics Training Log</h3>
          <p className="text-xs text-muted mt-1">Board and senior management ethics training sessions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Topic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Facilitator</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Attendees</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {trainingLog.map((session, idx) => (
                <tr key={idx} className={`hover:bg-background ${session.completion !== '100%' ? 'bg-orange-tint/30' : ''}`}>
                  <td className="px-4 py-3 text-sm text-primary">
                    {new Date(session.date).toLocaleDateString('en-NA')}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">{session.topic}</td>
                  <td className="px-4 py-3 text-sm text-primary">{session.facilitator}</td>
                  <td className="px-4 py-3 text-center text-sm text-primary">{session.attendees}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${
                      session.completion === '100%' ? 'bg-green/10 text-green' : 'bg-amber/10 text-amber'
                    }`}>
                      {session.completion}
                    </span>
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

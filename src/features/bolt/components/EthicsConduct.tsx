import { CheckCircle, AlertCircle, FileCheck } from 'lucide-react';

const directors = [
  'Dave Smuts',
  'Gys Joubert',
  'James Mnyupe',
  'David Namalenga',
  'Hannes Gouws',
  'Jaco Visser',
  'Fabiola Schrywer',
];

const declarationTracker = directors.map((director, idx) => ({
  director,
  signedDate: idx < 6 ? '2026-01-15' : null,
  renewalDue: '2027-01-15',
  status: idx < 6 ? 'signed' : 'pending',
}));

const ethicsTraining = [
  { name: 'Annual Ethics Refresher 2026', date: '2026-03-20', attendees: 7, status: 'completed' },
  { name: 'Conflict of Interest Declaration', date: '2026-01-15', attendees: 6, status: 'completed' },
  { name: 'Whistleblower Awareness Session', date: '2025-11-10', attendees: 7, status: 'completed' },
  { name: 'Data Privacy Compliance', date: '2026-02-28', attendees: 7, status: 'completed' },
  { name: 'AML/CFT Updates 2026', date: '2026-06-15', attendees: 5, status: 'pending' },
];

const trainingStatusConfig = {
  completed: { label: 'Completed', bg: 'bg-green/10', text: 'text-green' },
  pending: { label: 'Pending', bg: 'bg-orange-tint', text: 'text-orange' },
};

export default function EthicsConduct() {
  const signedCount = declarationTracker.filter(d => d.status === 'signed').length;
  const pendingCount = declarationTracker.filter(d => d.status === 'pending').length;
  const completedTraining = ethicsTraining.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Ethics & Conduct</h2>
        <p className="text-sm text-muted mt-1">Ethics compliance and declaration tracking for Gondwana Holdings Limited</p>
      </div>

      {/* Code of Ethics Status Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-primary">Code of Ethics</h3>
            <p className="text-xs text-muted mt-1">Current version approved by Board Resolution BR-2025-042</p>
            <div className="flex items-center gap-4 mt-3">
              <div>
                <span className="text-xs text-muted">Version</span>
                <p className="text-sm text-primary">v3.2</p>
              </div>
              <div>
                <span className="text-xs text-muted">Approved</span>
                <p className="text-sm text-primary">15 October 2025</p>
              </div>
              <div>
                <span className="text-xs text-muted">Next Review</span>
                <p className="text-sm text-primary">15 October 2026</p>
              </div>
            </div>
          </div>
          <div className="bg-green/10 text-green px-3 py-1 rounded text-xs font-medium">
            Active
          </div>
        </div>
      </div>

      {/* Declaration Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green/10 border border-green/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green" />
            <span className="text-lg font-medium text-green">{signedCount}</span>
          </div>
          <p className="text-xs text-green mt-1">Directors Signed</p>
        </div>
        <div className="bg-orange-tint border border-orange/30 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange" />
            <span className="text-lg font-medium text-orange">{pendingCount}</span>
          </div>
          <p className="text-xs text-orange mt-1">Pending Signatures</p>
        </div>
      </div>

      {/* Declaration Tracker Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background">
          <h3 className="text-sm font-medium text-primary">Declaration Tracker</h3>
          <p className="text-xs text-muted mt-1">Annual Code of Ethics acknowledgment</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Signed Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Annual Renewal Due</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {declarationTracker.map((item) => (
                <tr
                  key={item.director}
                  className={`hover:bg-background ${
                    item.status === 'pending' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-primary font-medium">{item.director}</td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {item.signedDate ? new Date(item.signedDate).toLocaleDateString('en-NA') : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(item.renewalDue).toLocaleDateString('en-NA')}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${
                      item.status === 'signed'
                        ? 'bg-green/10 text-green'
                        : 'bg-orange-tint text-orange'
                    }`}>
                      {item.status === 'signed' && <CheckCircle className="w-3 h-3" />}
                      {item.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                      {item.status === 'signed' ? 'Signed' : 'Pending'}
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
        <div className="px-4 py-3 border-b border-border bg-background flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-primary">Ethics Training Log</h3>
            <p className="text-xs text-muted mt-1">{completedTraining} of {ethicsTraining.length} sessions completed</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Training Session</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Attendees</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ethicsTraining.map((training, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-background ${
                    training.status === 'pending' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-primary">{training.name}</td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(training.date).toLocaleDateString('en-NA')}</td>
                  <td className="px-4 py-3 text-sm text-muted">{training.attendees}/7</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${trainingStatusConfig[training.status as keyof typeof trainingStatusConfig].bg} ${trainingStatusConfig[training.status as keyof typeof trainingStatusConfig].text}`}>
                      {trainingStatusConfig[training.status as keyof typeof trainingStatusConfig].label}
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

import { useState } from 'react';
import Modal from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';

interface RotationRow {
  director: string;
  role: string;
  appointed: string;
  lastElected: string;
  rotationDue: string;
  status: 'on-track' | 'overdue' | 'executive-exempt' | 'officer';
  action: string;
  flagged?: boolean;
}

const rotationRows: RotationRow[] = [
  {
    director: 'Dave Smuts',
    role: 'Chairperson',
    appointed: '2025',
    lastElected: '2025',
    rotationDue: '2028 (est.)',
    status: 'on-track',
    action: 'View',
    flagged: false,
  },
  {
    director: 'Gys Joubert',
    role: 'Managing Director',
    appointed: 'Pre-2018',
    lastElected: 'N/A — Executive',
    rotationDue: 'Exempt',
    status: 'executive-exempt',
    action: 'View',
    flagged: false,
  },
  {
    director: 'James Mnyupe',
    role: 'NED Independent',
    appointed: 'Pre-2021',
    lastElected: '02 Jun 2022',
    rotationDue: '2025 AGM [FLAGGED]',
    status: 'overdue',
    action: 'Schedule election',
    flagged: true,
  },
  {
    director: 'David Namalenga',
    role: 'NED Independent',
    appointed: 'Pre-2021',
    lastElected: '24 Jun 2021',
    rotationDue: '2024 AGM [FLAGGED]',
    status: 'overdue',
    action: 'Schedule election',
    flagged: true,
  },
  {
    director: 'Hannes Gouws',
    role: 'NED',
    appointed: 'Pre-2021',
    lastElected: 'Jun 2022',
    rotationDue: '2025 AGM [FLAGGED]',
    status: 'overdue',
    action: 'Schedule election',
    flagged: true,
  },
  {
    director: 'Jaco Visser',
    role: 'CFO · Executive',
    appointed: 'Pre-2021',
    lastElected: 'N/A — Executive',
    rotationDue: 'Exempt',
    status: 'executive-exempt',
    action: 'View',
    flagged: false,
  },
  {
    director: 'Fabiola Schrywer',
    role: 'Company Secretary',
    appointed: 'Pre-2021',
    lastElected: 'N/A — Officer',
    rotationDue: 'Not applicable',
    status: 'officer',
    action: 'View',
    flagged: false,
  },
];

const historyRows = [
  { director: 'S. Galloway', retiredAt: '4th AGM Jun 2021', reElected: 'Yes', votePct: '95.9%' },
  { director: 'D. Namalenga', retiredAt: '4th AGM Jun 2021', reElected: 'Yes', votePct: '95.9%' },
  { director: 'J. Mnyupe', retiredAt: '5th AGM Jun 2022', reElected: 'Yes', votePct: 'Passed' },
];

const statusConfig = {
  'on-track': { label: 'On track', bg: 'bg-green/10', text: 'text-green' },
  overdue: { label: 'Overdue', bg: 'bg-red/10', text: 'text-red' },
  'executive-exempt': { label: 'Executive exempt', bg: 'bg-muted/20', text: 'text-muted' },
  officer: { label: 'Officer', bg: 'bg-muted/20', text: 'text-muted' },
};

export default function DirectorRotationTab() {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);

  const openSchedule = (director: string) => {
    setSelectedDirector(director);
    setModalOpen(true);
  };

  const confirmSchedule = () => {
    setModalOpen(false);
    showToast('Added to AGM agenda');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Director Rotation Tracker</h2>
        <p className="text-sm text-muted mt-1">Retirement by rotation tracking for Gondwana Holdings Limited</p>
      </div>

      {/* Alert */}
      <div className="bg-orange-tint border border-orange-border rounded-lg p-4">
        <p className="text-sm text-primary">
          Per Article 24 of the Articles of Association, one third of directors retire by rotation at each AGM.{' '}
          <span className="font-medium">3 directors are currently overdue for rotation election</span> — action required at the next AGM.
        </p>
      </div>

      {/* Rotation Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-primary">Current director rotation status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Appointed</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Last elected</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Rotation due</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rotationRows.map((row, idx) => (
                <tr key={idx} className={`hover:bg-background ${row.flagged ? 'bg-orange-tint/40' : ''}`}>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{row.director}</td>
                  <td className="px-4 py-3 text-sm text-muted">{row.role}</td>
                  <td className="px-4 py-3 text-sm text-muted">{row.appointed}</td>
                  <td className="px-4 py-3 text-sm text-muted">{row.lastElected}</td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{row.rotationDue}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[row.status].bg} ${statusConfig[row.status].text}`}>
                      {statusConfig[row.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {row.action === 'Schedule election' ? (
                      <button
                        onClick={() => openSchedule(row.director)}
                        className="text-xs font-medium text-orange hover:underline"
                      >
                        {row.action}
                      </button>
                    ) : (
                      <button className="text-xs font-medium text-muted hover:text-primary">
                        {row.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-border bg-background">
          <p className="text-[10px] text-muted">
            Executive directors (MD and CFO) are exempt from retirement by rotation under standard Articles practice. The Company Secretary is an officer, not a director, and is not subject to rotation.
          </p>
        </div>
      </div>

      {/* Rotation History */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-[11px] font-medium text-primary uppercase tracking-wide">Recent rotations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Retired at</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Re-elected</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Vote %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {historyRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium">{row.director}</td>
                  <td className="px-4 py-3 text-sm text-muted">{row.retiredAt}</td>
                  <td className="px-4 py-3 text-sm text-green font-medium">{row.reElected}</td>
                  <td className="px-4 py-3 text-sm text-primary font-medium">{row.votePct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Election Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule rotation election"
      >
        <div className="space-y-4">
          <p className="text-sm text-primary">
            {selectedDirector ? (
              <>
                <span className="font-medium">{selectedDirector}</span> is overdue for rotation election. Add to next AGM agenda.
              </>
            ) : (
              'This director is overdue for rotation election. Add to next AGM agenda.'
            )}
          </p>
          <div className="flex gap-3">
            <button
              onClick={confirmSchedule}
              className="flex-1 bg-orange text-white rounded-lg px-4 py-2 text-[12px] font-medium hover:bg-orange/90"
            >
              Add to AGM agenda
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 border border-border text-primary rounded-lg px-4 py-2 text-[12px] font-medium hover:bg-background"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

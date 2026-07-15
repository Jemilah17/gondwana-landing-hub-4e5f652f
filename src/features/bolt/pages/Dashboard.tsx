import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import { entities, Entity } from '../data/entities';
import { filings, Filing } from '../data/filings';
import { clusters } from '../data/clusters';
import Topbar from '../components/layout/Topbar';
import Modal from '../components/ui/Modal';
import StatusPill from '../components/ui/StatusPills';
import ComplianceGauge from '../components/ui/ComplianceGauge';
import EntityDrawer from '../components/ui/EntityDrawer';
import { AlertTriangle, Clock, ArrowRight, Upload, Lock } from 'lucide-react';

export default function Dashboard() {
  const { activeUser, canWrite, canRead } = useUser();
  const { showToast } = useToast();
  const [showLogFilingModal, setShowLogFilingModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Filing | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const userEntities = entities.filter(e => canRead(e.cluster));
  const overdueFilings = filings.filter(f => f.status === 'overdue' && canRead(f.cluster));
  const dueSoonFilings = filings.filter(f => f.status === 'due soon' && canRead(f.cluster));
  const onTrackFilings = filings.filter(f => f.status === 'compliant' && canRead(f.cluster));

  const attentionCount = overdueFilings.length + dueSoonFilings.length;

  const handleLogFiling = () => {
    if (selectedTask) {
      setCompletedTasks(prev => new Set(prev).add(selectedTask.id));
      setShowLogFilingModal(false);
      setSelectedTask(null);
      showToast('Filing logged · Entity updated · Audit trail entry created');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div>
      <Topbar
        title={`${getGreeting()}, ${activeUser.name.split(' ')[0]}`}
        actions={
          <span className="text-muted text-[12px]">
            {new Date().toLocaleDateString('en-NA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        }
      />

      <div className="p-6 space-y-6">
        {/* Today attention box */}
        <div className="bg-orange-tint border border-orange-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[12px] font-medium text-orange">
                {attentionCount} thing{attentionCount !== 1 ? 's' : ''} need your attention today
              </h2>
              <p className="text-[11px] text-muted mt-1">
                Overdue filings and items approaching deadlines
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-xl font-medium text-red">{overdueFilings.length}</div>
                <div className="text-[10px] text-muted">Overdue</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-amber">{dueSoonFilings.length}</div>
                <div className="text-[10px] text-muted">Due soon</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-green">{onTrackFilings.length}</div>
                <div className="text-[10px] text-muted">On track</div>
              </div>
            </div>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-card border border-border rounded-lg">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-[12px] font-medium text-primary">Today's tasks</h3>
          </div>
          <div className="divide-y divide-border">
            {[...overdueFilings, ...dueSoonFilings].slice(0, 4).map((filing) => {
              const isCompleted = completedTasks.has(filing.id);
              const entity = entities.find(e => e.id === filing.entityId);
              const cluster = clusters.find(c => c.id === filing.cluster);
              const canEdit = canWrite(filing.cluster);

              return (
                <div
                  key={filing.id}
                  className={`px-4 py-3 flex items-center gap-3 group hover:bg-background ${
                    isCompleted ? 'opacity-45' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      filing.status === 'overdue'
                        ? 'bg-red-tint text-red'
                        : 'bg-amber-tint text-amber'
                    }`}
                  >
                    {filing.status === 'overdue' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-primary">
                      {filing.type} — {filing.entityName}
                    </div>
                    <div className="text-[11px] text-muted mt-0.5">
                      Due {new Date(filing.dueDate).toLocaleDateString('en-NA')} · Cluster {filing.cluster}
                    </div>
                  </div>
                  {isCompleted ? (
                    <StatusPill status="filed" />
                  ) : (
                    <>
                      <StatusPill status={filing.status} />
                      {canEdit && (
                        <button
                          onClick={() => {
                            setSelectedTask(filing);
                            setShowLogFilingModal(true);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-orange text-[11px] font-medium flex items-center gap-1 transition-opacity"
                        >
                          Log filing <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Entity mini-grid */}
        <div>
          <h3 className="text-[12px] font-medium text-primary mb-3">Your entities</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {userEntities.map((entity) => {
              const cluster = clusters.find(c => c.id === entity.cluster);
              const canEdit = canWrite(entity.cluster);
              const isDisabled = !canEdit && activeUser.disabled.includes(entity.cluster);

              return (
                <div
                  key={entity.id}
                  onClick={() => !isDisabled && setSelectedEntity(entity)}
                  className={`bg-card border rounded-lg p-3.5 ${
                    entity.isFlagged
                      ? 'border-orange bg-orange-tint'
                      : entity.isIncoming
                      ? 'border-orange border-dashed'
                      : 'border-border'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-background'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[11px] font-medium text-primary">{entity.name}</div>
                      <div className="text-[9px] text-muted mt-0.5">
                        {entity.code} · {entity.region}
                      </div>
                    </div>
                    {isDisabled && <Lock className="w-3 h-3 text-muted" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <ComplianceGauge percentage={entity.complianceScore} size={44} />
                    <StatusPill status={entity.status} />
                  </div>
                  {entity.isIncoming && (
                    <span className="inline-block mt-2 text-[9px] text-orange font-medium">New · Incoming</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center text-[11px] text-muted">
          Other clusters managed by {activeUser.id === 'fabiola' ? 'Hilma and Jemilah' : activeUser.id === 'hilma' ? 'Fabiola and Jemilah' : 'Fabiola and Hilma'} —
          visible in group view · not editable here · audit trail updates automatically
        </div>
      </div>

      {/* Log Filing Modal */}
      <Modal
        isOpen={showLogFilingModal}
        onClose={() => setShowLogFilingModal(false)}
        title="Log filing"
      >
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-muted mb-1">Entity</label>
              <select className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background">
                <option>{selectedTask.entityName}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-muted mb-1">Filing type</label>
              <select className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background">
                <option>{selectedTask.type}</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-muted mb-1">Receipt number</label>
              <input
                type="text"
                placeholder="Enter receipt number"
                className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background"
              />
            </div>
            <div>
              <label className="block text-[11px] text-muted mb-1">Filing date</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background"
              />
            </div>
            <div>
              <label className="block text-[11px] text-muted mb-1">Upload confirmation</label>
              <div className="border border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-6 h-6 text-muted mx-auto mb-2" />
                <span className="text-[11px] text-muted">Drop document here or browse</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogFilingModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-[12px] text-muted hover:bg-background"
              >
                Cancel
              </button>
              <button
                onClick={handleLogFiling}
                className="flex-1 px-4 py-2 bg-orange text-white rounded-lg text-[12px] font-medium hover:bg-orange/90"
              >
                Confirm & log
              </button>
            </div>
          </div>
        )}
      </Modal>

      <EntityDrawer
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />
    </div>
  );
}

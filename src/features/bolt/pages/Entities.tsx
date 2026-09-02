import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { entities, Entity } from '../data/entities';
import { clusters } from '../data/clusters';
import { users } from '../data/users';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import ComplianceGauge from '../components/ui/ComplianceGauge';
import EntityDrawer from '../components/ui/EntityDrawer';
import { Search, Lock, Check } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function Entities() {
  const { activeUser, canWrite, canRead, isDisabled } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [clusterFilter, setClusterFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const { showToast } = useToast();

  const [onboarding, setOnboarding] = useState({
    luna: {
      incorporation: [
        { label: 'BIPA company registration', done: true },
        { label: 'Tax registration — NamRA', done: true },
        { label: 'NTB tourism registration', done: false },
      ],
      governance: [
        { label: 'First directors appointed', done: true },
        { label: 'COI declarations received', done: false },
        { label: 'BO declaration filed', done: false },
      ],
      operations: [
        { label: 'Bank account opened', done: false },
        { label: 'Insurance arranged', done: false },
        { label: 'First board meeting held', done: false },
      ],
    },
    admiral: {
      incorporation: [
        { label: 'BIPA company registration', done: true },
        { label: 'Tax registration', done: false },
        { label: 'NTB tourism registration', done: false },
      ],
      governance: [
        { label: 'First directors appointed', done: false },
        { label: 'COI declarations received', done: false },
        { label: 'BO declaration filed', done: false },
      ],
      operations: [
        { label: 'Bank account opened', done: false },
        { label: 'Insurance arranged', done: false },
        { label: 'First board meeting held', done: false },
      ],
    },
  });

  const toggleStep = (card: 'luna' | 'admiral', group: 'incorporation' | 'governance' | 'operations', index: number) => {
    setOnboarding(prev => {
      const next = { ...prev, [card]: { ...prev[card], [group]: [...prev[card][group]] } };
      const item = next[card][group][index];
      if (!item.done) {
        showToast('Step completed · Audit trail updated');
      }
      next[card][group][index] = { ...item, done: !item.done };
      return next;
    });
  };

  const getProgress = (card: 'luna' | 'admiral') => {
    const groups = Object.values(onboarding[card]);
    const total = groups.reduce((sum, g) => sum + g.length, 0);
    const done = groups.reduce((sum, g) => sum + g.filter(i => i.done).length, 0);
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const renderGroup = (card: 'luna' | 'admiral', group: 'incorporation' | 'governance' | 'operations') => (
    <div>
      <div className="text-[10px] font-medium text-primary mb-1.5 capitalize">{group}</div>
      <div className="space-y-1.5">
        {onboarding[card][group].map((item, idx) => (
          <button
            key={idx}
            onClick={() => toggleStep(card, group, idx)}
            className="flex items-center gap-2 w-full text-left"
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center ${item.done ? 'bg-green text-white' : 'border border-muted bg-white'}`}>
              {item.done && <Check className="w-3 h-3" />}
            </div>
            <span className={`text-[10px] ${item.done ? 'text-muted line-through' : 'text-primary'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const filteredEntities = entities.filter((entity) => {
    if (!canRead(entity.cluster)) return false;
    if (searchTerm && !entity.name.toLowerCase().includes(searchTerm.toLowerCase()) && !entity.code.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (clusterFilter !== 'all' && entity.cluster !== clusterFilter) return false;
    if (adminFilter !== 'all' && entity.assignee !== adminFilter) return false;
    if (statusFilter !== 'all' && entity.status !== statusFilter) return false;
    return true;
  });

  const entityTypePill = (type: string) => {
    const colors: Record<string, string> = {
      Holding: 'bg-purple-tint text-purple',
      Operating: 'bg-blue-tint text-blue',
      Lodge: 'bg-green-tint text-green',
      Hotel: 'bg-blue-tint text-blue',
      Camp: 'bg-teal-tint text-teal',
      DNFBP: 'bg-amber-tint text-amber',
      Trust: 'bg-red-tint text-red',
      'Car rental': 'bg-orange-tint text-orange',
      Pods: 'bg-green-tint text-green',
    };
    return colors[type] || 'bg-muted/10 text-muted';
  };

  return (
    <div>
      <Topbar title="Entities" />

      <div className="p-6 space-y-4">
        {/* Filter bar */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-[12px] bg-card"
            />
          </div>
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All clusters</option>
            <option value="A">Cluster A</option>
            <option value="B">Cluster B</option>
            <option value="C">Cluster C</option>
            <option value="D">Cluster D</option>
            <option value="E">Cluster E</option>
          </select>
          <select
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All admins</option>
            <option value="fabiola">Fabiola</option>
            <option value="hilma">Hilma</option>
            <option value="jemilah">Jemilah</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-[12px] bg-card"
          >
            <option value="all">All statuses</option>
            <option value="compliant">Compliant</option>
            <option value="due soon">Due soon</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Entity grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredEntities.map((entity) => {
            const cluster = clusters.find(c => c.id === entity.cluster);
            const assignee = users.find(u => u.id === entity.assignee);
            const canEdit = canWrite(entity.cluster);
            const disabled = isDisabled(entity.cluster);

            return (
              <div
                key={entity.id}
                onClick={() => !disabled && setSelectedEntity(entity)}
                className={`bg-card border rounded-lg p-3.5 cursor-pointer ${
                  entity.isFlagged
                    ? 'border-orange bg-orange-tint'
                    : entity.isIncoming
                    ? 'border-orange border-dashed'
                    : 'border-border'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-background'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-[11px] font-medium text-primary">{entity.name}</div>
                    <div className="text-[9px] text-muted mt-0.5">{entity.code}</div>
                  </div>
                  {disabled && <Lock className="w-3 h-3 text-muted" />}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${entityTypePill(entity.type)}`}>
                    {entity.type}
                  </span>
                  <span className="text-[9px] text-muted">{entity.region}</span>
                </div>
                <div className="flex items-center justify-between">
                  <ComplianceGauge percentage={entity.complianceScore} size={44} />
                  <div className="text-right">
                    <StatusPill status={entity.status} />
                    {assignee && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <div
                          className={`w-5 h-5 ${assignee.avatarColor} rounded-full flex items-center justify-center text-white text-[9px] font-medium`}
                        >
                          {assignee.initials}
                        </div>
                        <span className="text-[10px] text-muted">{assignee.name.split(' ')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EntityDrawer
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />
    </div>
  );
}

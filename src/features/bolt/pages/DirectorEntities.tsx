import { useState } from 'react';
import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import Drawer from '../components/ui/Drawer';
import ComplianceGauge from '../components/ui/ComplianceGauge';
import { useUser } from '../contexts/UserContext';
import { entities, Entity } from '../data/entities';
import { getClusterById } from '../data/clusters';
import { users } from '../data/users';

const meetings: Record<string, { last: string; next: string }> = {
  A: { last: '26 Feb 2026 — General Meeting', next: '28 Aug 2026 — Q3 Board Meeting' },
  B: { last: '19 Mar 2026 — Board Meeting', next: '11 Sep 2026 — Board Meeting' },
  C: { last: '05 Apr 2026 — Board Meeting', next: '02 Oct 2026 — Board Meeting' },
  D: { last: '22 Apr 2026 — Board Meeting', next: '15 Sep 2026 — Board Meeting' },
  E: { last: '14 May 2026 — Board Meeting', next: '30 Oct 2026 — Board Meeting' },
};

function tone(status: Entity['status']) {
  return status === 'compliant' ? 'green' : status === 'due soon' ? 'amber' : 'red';
}

export default function DirectorEntities() {
  const { activeUser } = useUser();
  const [selected, setSelected] = useState<Entity | null>(null);

  const mine = entities.filter((e) => activeUser.clusters.includes(e.cluster));
  const cosec = selected ? users.find((u) => u.id === selected.assignee) : undefined;
  const m = selected ? meetings[selected.cluster] : undefined;

  return (
    <div>
      <DirectorHeader
        title="My entities"
        subtitle={`Read-only view of the Gondwana entities within your remit · Cluster ${activeUser.clusters.join(', ')}`}
        right={<span className="text-[10px] text-muted">{mine.length} entities</span>}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {mine.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className="text-left bg-card border border-border rounded-md p-3 hover:border-orange transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-primary truncate">{e.name}</div>
                  <div className="text-[10px] text-muted">{e.code} · Cluster {e.cluster}</div>
                  <div className="mt-2">
                    <Pill tone={tone(e.status)}>{e.status}</Pill>
                  </div>
                </div>
                <ComplianceGauge percentage={e.complianceScore} />
              </div>
            </button>
          ))}
        </div>

        <div className="text-[10px] text-muted mt-4">
          Read-only view — statutory records are maintained by the Company Secretary.
        </div>
      </div>

      <Drawer
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        width="w-[420px]"
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-primary">{selected.name}</div>
                <div className="text-[10px] text-muted">{selected.code}</div>
              </div>
              <ComplianceGauge percentage={selected.complianceScore} size={56} />
            </div>

            <Pill tone={tone(selected.status)}>{selected.status}</Pill>

            <Card className="p-4 space-y-2">
              {[
                ['Region', selected.region],
                ['Type', selected.type],
                ['Cluster', `${selected.cluster} — ${getClusterById(selected.cluster)?.name ?? ''}`],
                ['Last meeting', m?.last ?? '—'],
                ['Next meeting', m?.next ?? '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 text-[11px]">
                  <span className="text-muted">{k}</span>
                  <span className="text-primary text-right">{v}</span>
                </div>
              ))}
            </Card>

            <div className="bg-blue-tint text-blue text-[11px] rounded-md px-3 py-2">
              Read only — managed by {cosec?.name ?? 'the Company Secretary'}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

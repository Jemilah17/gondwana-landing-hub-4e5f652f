import { Card, Pill } from './DirectorShared';
import { useUser } from '../../contexts/UserContext';
import { entities } from '../../data/entities';
import { getClusterById } from '../../data/clusters';

export function useMyEntities() {
  const { activeUser } = useUser();
  return entities.filter((e) => activeUser.clusters.includes(e.cluster));
}

export default function MyEntitiesCard({ limit }: { limit?: number }) {
  const mine = useMyEntities();
  const shown = limit ? mine.slice(0, limit) : mine;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] font-medium text-primary">My entities</div>
        <div className="text-[10px] text-muted">{mine.length} entities</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {shown.map((e) => (
          <div key={e.id} className="border border-border rounded-md p-3">
            <div className="text-[11px] font-medium text-primary truncate">{e.name}</div>
            <div className="text-[10px] text-muted">
              {e.code} · {e.type} · Cluster {e.cluster}
            </div>
            <div className="text-[10px] text-muted">{getClusterById(e.cluster)?.name}</div>
            <div className="mt-2 flex items-center justify-between">
              <Pill tone={e.status === 'compliant' ? 'green' : e.status === 'due soon' ? 'amber' : 'red'}>
                {e.status}
              </Pill>
              <span className="text-[10px] text-muted">{e.complianceScore}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-muted mt-3">Read-only view — statutory records are maintained by the Company Secretary.</div>
    </Card>
  );
}

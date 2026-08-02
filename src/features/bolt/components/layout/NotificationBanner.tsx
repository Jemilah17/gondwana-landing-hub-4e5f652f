import { useUser } from '../../contexts/UserContext';
import { entities } from '../../data/entities';
import { filings } from '../../data/filings';
import { clusters } from '../../data/clusters';

export default function NotificationBanner() {
  const { activeUser, canWrite } = useUser();

  const userEntities = entities.filter(e => canWrite(e.cluster));
  const userFilings = filings.filter(f => canWrite(f.cluster));

  const workloads = [
    { userId: 'fabiola', name: 'Fabiola', cluster: 'A', entities: 5, overdue: 3 },
    { userId: 'hilma', name: 'Hilma', cluster: 'C & D', entities: 11, due: '2 BIPA' },
    { userId: 'jemilah', name: 'Jemilah', cluster: 'B & E', entities: 13, flag: '1 BO declaration pending' },
  ];

  return (
    <div className="bg-orange text-white px-4 py-2 flex items-center justify-between text-[12px]">
      <div className="flex items-center gap-4">
        <span className="font-medium">Active workloads — Gondwana Holdings Ltd</span>
        <div className="flex gap-2">
          {workloads.map((w) => (
            <span
              key={w.userId}
              className={`px-3 py-1 rounded-full ${
                activeUser.id === w.userId
                  ? 'bg-white/25'
                  : 'bg-white/10'
              }`}
            >
              {w.name} — Cluster {w.cluster} · {w.entities} entities
              {w.overdue && ` · ${w.overdue} overdue filings`}
              {w.due && ` · ${w.due} due`}
              {w.flag && ` · ${w.flag} flag`}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
        <span>Live · Synced now</span>
      </div>
    </div>
  );
}

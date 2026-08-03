import { DirectorHeader } from '../components/director/DirectorShared';
import MyEntitiesCard from '../components/director/MyEntitiesCard';
import { useUser } from '../contexts/UserContext';

export default function DirectorEntities() {
  const { activeUser } = useUser();
  return (
    <div>
      <DirectorHeader
        title="My entities"
        subtitle={`Read-only view of the Gondwana entities within your remit · Cluster ${activeUser.clusters.join(', ')}`}
      />
      <div className="p-6">
        <MyEntitiesCard />
      </div>
    </div>
  );
}

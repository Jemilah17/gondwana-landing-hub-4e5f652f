import { DirectorHeader } from '../components/director/DirectorShared';
import MinutesReviewCard from '../components/director/MinutesReviewCard';

export default function DirectorMinutes() {
  return (
    <div>
      <DirectorHeader
        title="Minutes for review"
        subtitle="Minutes circulated to you by the Company Secretary for review and response"
      />
      <div className="p-6">
        <MinutesReviewCard />
      </div>
    </div>
  );
}

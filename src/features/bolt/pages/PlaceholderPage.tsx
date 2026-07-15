import Topbar from '../components/layout/Topbar';
import EmptyState from '../components/ui/EmptyState';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div>
      <Topbar title={title} />
      <div className="p-6">
        <EmptyState
          icon={Construction}
          title={`${title} coming soon`}
          description="This module is under development. Check back later for full functionality."
        />
      </div>
    </div>
  );
}

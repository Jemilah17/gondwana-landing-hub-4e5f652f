import { DirectorHeader, Card, Pill } from '../components/director/DirectorShared';
import { useDirector } from '../contexts/DirectorContext';
import { useToast } from '../contexts/ToastContext';

export default function DirectorDeclarations() {
  const { declarations, submitDeclaration } = useDirector();
  const { showToast } = useToast();

  return (
    <div>
      <DirectorHeader
        title="My declarations"
        subtitle="Conflict of interest, beneficial ownership and fit-and-proper declarations"
      />
      <div className="p-6">
        <Card className="p-4">
          {declarations.map((d) => (
            <div key={d.id} className="flex items-start justify-between py-3 border-b border-border last:border-0">
              <div>
                <div className="text-[12px] font-medium text-primary">{d.name}</div>
                <div className="text-[10px] text-muted">{d.description}</div>
                <div className="text-[10px] text-muted">Due {d.due}</div>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={d.status === 'due' ? 'red' : 'green'}>
                  {d.status === 'due' ? 'Action required' : 'Submitted ✓'}
                </Pill>
                {d.status === 'due' && (
                  <button
                    onClick={() => {
                      submitDeclaration(d.id);
                      showToast(`${d.name} submitted · Fabiola Schrywer notified`);
                    }}
                    className="px-3 py-1 rounded-md bg-orange text-white text-[11px]"
                  >
                    Complete →
                  </button>
                )}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

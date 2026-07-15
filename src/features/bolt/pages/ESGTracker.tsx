import Topbar from '../components/layout/Topbar';
import { TrendingUp, Minus } from 'lucide-react';

const capitals = [
  { name: 'Financial', status: 'strong', kpis: ['Revenue growth 12%', 'ROE 18%', 'Cash coverage 2.1x'] },
  { name: 'Manufactured', status: 'adequate', kpis: ['Asset utilisation 76%', 'Capex program on track', 'Maintenance backlog stable'] },
  { name: 'Intellectual', status: 'strong', kpis: ['Brand value +8%', 'IP portfolio current', 'Systems upgraded'] },
  { name: 'Human', status: 'adequate', kpis: ['Staff turnover 14%', 'Training 32 hrs avg', 'Engagement 72%'] },
  { name: 'Social & Relationship', status: 'concern', kpis: ['Community investment N$2.1m', 'Partner satisfaction 78%', 'Stakeholder relations stable'] },
  { name: 'Natural', status: 'adequate', kpis: ['Carbon intensity -5%', 'Water usage -8%', 'Biodiversity monitoring active'] },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  strong: { color: 'text-green', bg: 'bg-green/10' },
  adequate: { color: 'text-amber', bg: 'bg-amber/10' },
  concern: { color: 'text-red', bg: 'bg-red/10' },
};

export default function ESGTracker() {
  return (
    <div>
      <Topbar title="ESG tracker" />

      <div className="p-6 space-y-6">
        {/* Six capitals cards */}
        <div>
          <h3 className="text-[12px] font-medium text-primary mb-3">Six capitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capitals.map((capital) => (
              <div key={capital.name} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[11px] font-medium text-primary">{capital.name}</h4>
                  <span className={`px-2 py-1 rounded text-[9px] font-medium ${statusConfig[capital.status].bg} ${statusConfig[capital.status].color}`}>
                    {capital.status}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {capital.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[10px] text-muted">
                      {idx === 0 ? <TrendingUp className="w-3 h-3 text-green" /> : <Minus className="w-3 h-3" />}
                      {kpi}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Double materiality matrix */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-[12px] font-medium text-primary mb-4">Double materiality matrix</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] text-muted text-center mb-2">Impact on financial performance</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-20 border border-border rounded p-2">
                  <div className="text-[9px] text-muted">High</div>
                </div>
                <div className="h-20 border border-border rounded p-2 relative">
                  <div className="absolute top-4 left-3 w-4 h-4 bg-red rounded-full text-[7px] flex items-center justify-center text-white">1</div>
                </div>
                <div className="h-20 border border-border rounded p-2 relative">
                  <div className="absolute top-4 left-2 w-4 h-4 bg-orange rounded-full text-[7px] flex items-center justify-center text-white">2</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted text-center mb-2">Stakeholder assessment impact</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-20 border border-border rounded p-2 relative">
                  <div className="absolute top-4 left-2 w-4 h-4 bg-amber rounded-full text-[7px] flex items-center justify-center text-white">4</div>
                </div>
                <div className="h-20 border border-border rounded p-2 relative">
                  <div className="absolute top-6 left-3 w-4 h-4 bg-green rounded-full text-[7px] flex items-center justify-center text-white">3</div>
                </div>
                <div className="h-20 border border-border rounded p-2 relative">
                  <div className="absolute top-6 left-4 w-4 h-4 bg-teal rounded-full text-[7px] flex items-center justify-center text-white">5</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red rounded-full" /> 1. FATF compliance</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange rounded-full" /> 2. Climate risk</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green rounded-full" /> 3. Employee wellbeing</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber rounded-full" /> 4. Conservation</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-teal rounded-full" /> 5. Community</span>
          </div>
        </div>
      </div>
    </div>
  );
}

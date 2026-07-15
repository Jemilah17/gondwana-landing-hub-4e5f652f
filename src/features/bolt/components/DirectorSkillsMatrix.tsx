import { AlertTriangle } from 'lucide-react';

const directors = [
  'Dave Smuts',
  'Gys Joubert',
  'James Mnyupe',
  'David Namalenga',
  'Hannes Gouws',
  'Jaco Visser',
  'Fabiola Schrywer',
];

const competencies = [
  { key: 'finance', label: 'Finance' },
  { key: 'legal', label: 'Legal' },
  { key: 'risk', label: 'Risk' },
  { key: 'sustainability', label: 'Sustainability' },
  { key: 'tourism', label: 'Tourism Operations' },
  { key: 'hr', label: 'HR' },
  { key: 'it', label: 'IT' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'governance', label: 'Governance' },
];

// Skills data: 'full' (green), 'partial' (amber), 'gap' (gray outline)
const skillsMatrix: Record<string, Record<string, 'full' | 'partial' | 'gap'>> = {
  'Dave Smuts': { finance: 'full', legal: 'partial', risk: 'partial', sustainability: 'gap', tourism: 'gap', hr: 'gap', it: 'gap', strategy: 'full', governance: 'full' },
  'Gys Joubert': { finance: 'partial', legal: 'full', risk: 'partial', sustainability: 'gap', tourism: 'full', hr: 'gap', it: 'gap', strategy: 'full', governance: 'full' },
  'James Mnyupe': { finance: 'full', legal: 'gap', risk: 'full', sustainability: 'full', tourism: 'partial', hr: 'gap', it: 'partial', strategy: 'full', governance: 'full' },
  'David Namalenga': { finance: 'full', legal: 'partial', risk: 'partial', sustainability: 'partial', tourism: 'gap', hr: 'full', it: 'gap', strategy: 'partial', governance: 'full' },
  'Hannes Gouws': { finance: 'partial', legal: 'gap', risk: 'partial', sustainability: 'full', tourism: 'full', hr: 'partial', it: 'gap', strategy: 'full', governance: 'partial' },
  'Jaco Visser': { finance: 'partial', legal: 'gap', risk: 'gap', sustainability: 'partial', tourism: 'full', hr: 'gap', it: 'full', strategy: 'full', governance: 'partial' },
  'Fabiola Schrywer': { finance: 'partial', legal: 'partial', risk: 'gap', sustainability: 'full', tourism: 'gap', hr: 'full', it: 'partial', strategy: 'partial', governance: 'full' },
};

const skillLegend = {
  full: { label: 'Full', color: 'bg-green', border: 'border-green' },
  partial: { label: 'Partial', color: 'bg-amber', border: 'border-amber' },
  gap: { label: 'Gap', color: 'bg-transparent', border: 'border-muted' },
};

export default function DirectorSkillsMatrix() {
  // Calculate coverage per competency
  const competencyCoverage = competencies.map((comp) => {
    const fullCount = directors.filter((d) => skillsMatrix[d][comp.key] === 'full').length;
    const partialCount = directors.filter((d) => skillsMatrix[d][comp.key] === 'partial').length;
    const score = fullCount + partialCount * 0.5;
    return {
      ...comp,
      fullCount,
      partialCount,
      gapCount: directors.length - fullCount - partialCount,
      score,
      coverage: Math.round((score / directors.length) * 100),
    };
  });

  const gapsBelow3 = competencyCoverage.filter((c) => c.score < 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-primary">Director Skills Matrix</h2>
        <p className="text-sm text-muted mt-1">Board competency assessment for Gondwana Holdings Limited</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6">
        {Object.entries(skillLegend).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full border-2 ${config.color} ${config.border}`} />
            <span className="text-xs text-muted">{config.label}</span>
          </div>
        ))}
      </div>

      {/* Skills Matrix Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide sticky left-0 bg-background">Director</th>
                {competencies.map((comp) => (
                  <th key={comp.key} className="px-3 py-3 text-center text-xs font-medium text-muted uppercase tracking-wide min-w-[80px]">
                    {comp.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {directors.map((director) => (
                <tr key={director} className="hover:bg-background">
                  <td className="px-4 py-3 text-sm text-primary font-medium sticky left-0 bg-card">{director}</td>
                  {competencies.map((comp) => {
                    const skill = skillsMatrix[director][comp.key];
                    const config = skillLegend[skill];
                    return (
                      <td key={comp.key} className="px-3 py-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-4 h-4 rounded-full border-2 ${config.color} ${config.border}`}
                          title={`${comp.label}: ${config.label}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gap Analysis Card */}
      {gapsBelow3.length > 0 && (
        <div className="bg-orange-tint border border-orange/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-orange">Gap Analysis: Coverage Below 3</h3>
              <p className="text-xs text-muted mt-1">
                The following competencies have insufficient board coverage (less than 3 full-equivalent directors):
              </p>
              <ul className="mt-2 space-y-1">
                {gapsBelow3.map((gap) => (
                  <li key={gap.key} className="text-xs text-primary">
                    <span className="font-medium">{gap.label}</span>
                    <span className="text-muted"> — {gap.fullCount} full, {gap.partialCount} partial, {gap.gapCount} gaps ({gap.coverage}% coverage)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-primary mb-3">Competency Coverage Summary</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {competencyCoverage.map((comp) => (
            <div key={comp.key} className="text-center">
              <div className={`text-lg font-medium ${
                comp.coverage >= 70 ? 'text-green' : comp.coverage >= 40 ? 'text-amber' : 'text-red'
              }`}>
                {comp.coverage}%
              </div>
              <div className="text-xs text-muted mt-1">{comp.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

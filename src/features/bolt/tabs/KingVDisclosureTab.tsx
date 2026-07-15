import { Info } from 'lucide-react';

const kingVPrinciples = [
  { code: 'I', principle: 'Ethical leadership and good corporate citizenship', status: 'applied', evidence: 'Code of Ethics approved Oct 2025', director: 'Dave Smuts', reviewDate: '2026-03-15' },
  { code: 'II', principle: 'Board composition and effectiveness', status: 'applied', evidence: 'Board charter and skills matrix maintained', director: 'Gys Joubert', reviewDate: '2026-03-15' },
  { code: 'III', principle: 'Board committees and oversight functions', status: 'applied', evidence: 'Committee terms of reference', director: 'James Mnyupe', reviewDate: '2026-03-15' },
  { code: 'IV', principle: 'Appointments, performance and conflict management', status: 'partial', evidence: 'Performance evaluation framework pending', director: 'Fabiola Schrywer', reviewDate: '2026-06-30' },
  { code: 'V', principle: 'Risk governance and internal audit', status: 'applied', evidence: 'Risk register and audit charter', director: 'James Mnyupe', reviewDate: '2026-03-15' },
  { code: 'VI', principle: 'Remuneration governance', status: 'applied', evidence: 'Remuneration policy approved OR-2022-004', director: 'Fabiola Schrywer', reviewDate: '2026-03-15' },
  { code: 'VII', principle: 'Technology and information governance', status: 'partial', evidence: 'IT policy approved, AI framework pending', director: 'Jaco Visser', reviewDate: '2026-09-30' },
  { code: 'VIII', principle: 'Compliance governance', status: 'applied', evidence: 'Compliance monitoring framework', director: 'Dave Smuts', reviewDate: '2026-03-15' },
  { code: 'IX', principle: 'Stakeholder relationships', status: 'applied', evidence: 'Stakeholder register maintained', director: 'Hannes Gouws', reviewDate: '2026-03-15' },
  { code: 'X', principle: 'Integrated reporting and disclosure', status: 'partial', evidence: 'Annual report in development', director: 'Gys Joubert', reviewDate: '2026-12-31' },
  { code: 'XI', principle: 'ESE performance and sustainability reporting', status: 'not yet', evidence: 'Sustainability framework under development', director: 'James Mnyupe', reviewDate: '2026-12-31' },
  { code: 'XII', principle: 'Assurance and external audit', status: 'applied', evidence: 'External auditor engagement letter', director: 'James Mnyupe', reviewDate: '2026-03-15' },
  { code: 'XIII', principle: 'Board meetings and procedures', status: 'applied', evidence: 'Board meeting schedule and minutes', director: 'Dave Smuts', reviewDate: '2026-03-15' },
  { code: 'XIV', principle: 'Shareholder relations', status: 'applied', evidence: 'Shareholder communication policy', director: 'David Namalenga', reviewDate: '2026-03-15' },
  { code: 'XV', principle: 'Corporate disclosure', status: 'applied', evidence: 'NSX listing requirements compliance', director: 'Gys Joubert', reviewDate: '2026-03-15' },
  { code: 'XVI', principle: 'Organisational integrity and whistleblowing', status: 'applied', evidence: 'Whistleblower policy approved', director: 'Dave Smuts', reviewDate: '2026-03-15' },
];

const statusConfig = {
  applied: { label: 'Applied', bg: 'bg-green/10', text: 'text-green' },
  partial: { label: 'Partial', bg: 'bg-amber/10', text: 'text-amber' },
  'not yet': { label: 'Not Yet', bg: 'bg-muted/10', text: 'text-muted' },
};

export default function KingVDisclosureTab() {
  const appliedCount = kingVPrinciples.filter(p => p.status === 'applied').length;
  const partialCount = kingVPrinciples.filter(p => p.status === 'partial').length;
  const notYetCount = kingVPrinciples.filter(p => p.status === 'not yet').length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-medium text-primary">King V Disclosure Framework</h2>
          <p className="text-sm text-muted mt-1">King IV Report on Corporate Governance for South Africa, effective 1 January 2026</p>
        </div>
        <div className="flex items-center gap-1 text-orange">
          <Info className="w-4 h-4" />
          <span className="text-xs">16 Principles</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-medium text-green">{appliedCount}</div>
          <div className="text-sm text-muted mt-1">Applied</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-medium text-amber">{partialCount}</div>
          <div className="text-sm text-muted mt-1">Partial</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-medium text-muted">{notYetCount}</div>
          <div className="text-sm text-muted mt-1">Not Yet Applied</div>
        </div>
      </div>

      {/* Principles Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Principle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Evidence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Responsible Director</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wide">Review Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {kingVPrinciples.map((item) => (
                <tr
                  key={item.code}
                  className={`hover:bg-background ${
                    item.status === 'partial' || item.status === 'not yet' ? 'bg-orange-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-background border border-border rounded text-sm font-medium text-primary">
                      {item.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-primary">{item.principle}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs rounded ${statusConfig[item.status as keyof typeof statusConfig].bg} ${statusConfig[item.status as keyof typeof statusConfig].text}`}>
                      {statusConfig[item.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">{item.evidence}</td>
                  <td className="px-4 py-3 text-sm text-primary">{item.director}</td>
                  <td className="px-4 py-3 text-sm text-muted">{new Date(item.reviewDate).toLocaleDateString('en-NA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

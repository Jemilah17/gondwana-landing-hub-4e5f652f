import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import StatusPill from '../components/ui/StatusPills';
import { AlertTriangle } from 'lucide-react';

const kingVPrinciples = [
  { code: '1.1', title: 'Ethical and effective leadership', category: 'Ethical leadership', status: 'applied', evidence: 'Code of Ethics', responsible: 'Dave Smuts', reviewDate: 'Mar 2026' },
  { code: '1.2', title: 'Governance of ethics', category: 'Ethical leadership', status: 'applying', evidence: 'Ethics programme in development', responsible: 'Fabiola', reviewDate: 'Jun 2026' },
  { code: '2.1', title: 'Board composition', category: 'Governance structures', status: 'applied', evidence: 'Skills matrix maintained', responsible: 'Dave Smuts', reviewDate: 'Mar 2026' },
  { code: '3.1', title: 'Director development', category: 'Governance structures', status: 'not yet addressed', evidence: '—', responsible: 'Fabiola', reviewDate: 'Sep 2026' },
  { code: '4.1', title: 'Delegation and committees', category: 'Governance structures', status: 'applying', evidence: 'TOR under review', responsible: 'Fabiola', reviewDate: 'Jun 2026' },
  { code: '5.1', title: 'Risk governance', category: 'Risk', status: 'applying', evidence: 'Risk register active', responsible: 'James Mnyupe', reviewDate: 'Jun 2026' },
  { code: '6.1', title: 'Technology governance', category: 'Technology & AI', status: 'not yet addressed', evidence: 'IT policy draft', responsible: 'Gys Joubert', reviewDate: 'Sep 2026' },
  { code: '6.2', title: 'AI governance', category: 'Technology & AI', status: 'not yet addressed', evidence: '—', responsible: 'Fabiola', reviewDate: 'Dec 2026' },
  { code: '7.1', title: 'Compliance', category: 'Compliance', status: 'applied', evidence: 'Compliance framework', responsible: 'Fabiola', reviewDate: 'Mar 2026' },
  { code: '8.1', title: 'Remuneration', category: 'Remuneration', status: 'applying', evidence: 'Policy review pending', responsible: 'David Namalenga', reviewDate: 'Jun 2026' },
  { code: '9.1', title: 'Assurance', category: 'Audit', status: 'applied', evidence: 'External audit engagement', responsible: 'James Mnyupe', reviewDate: 'Mar 2026' },
  { code: '10.1', title: 'Stakeholder relations', category: 'Stakeholder', status: 'not yet addressed', evidence: 'Register maintained', responsible: 'Fabiola', reviewDate: 'Sep 2026' },
  { code: '11.1', title: 'Sustainability', category: 'Sustainability', status: 'applying', evidence: 'ESG framework in development', responsible: 'Hannes Gouws', reviewDate: 'Jun 2026' },
  { code: '12.1', title: 'Integrated reporting', category: 'Reporting', status: 'applying', evidence: 'Annual report', responsible: 'Fabiola', reviewDate: 'Jun 2026' },
  { code: '—', title: 'Double materiality', category: 'Sustainability', status: 'not yet addressed', evidence: '—', responsible: 'Fabiola', reviewDate: 'Dec 2026' },
];

export default function KingVFramework() {
  const appliedCount = kingVPrinciples.filter(p => p.status === 'applied').length;
  const applyingCount = kingVPrinciples.filter(p => p.status === 'applying').length;
  const notYetCount = kingVPrinciples.filter(p => p.status === 'not yet addressed').length;

  return (
    <div>
      <Topbar title="King V disclosure framework" />

      <div className="p-6">
        {/* Alert */}
        <div className="bg-orange-tint border border-orange-border rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange flex-shrink-0" />
          <div className="text-[11px] text-primary">
            <strong className="text-orange">King V effective 1 January 2026</strong>
            <span className="text-muted"> — current financial year. Apply and explain regime. Outcomes evidence required.</span>
          </div>
        </div>

        {/* Progress summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-green">{appliedCount}</div>
            <div className="text-[10px] text-muted mt-1">Applied</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-amber">{applyingCount}</div>
            <div className="text-[10px] text-muted mt-1">Applying</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-medium text-red">{notYetCount}</div>
            <div className="text-[10px] text-muted mt-1">Not yet addressed</div>
          </div>
        </div>

        {/* Principles table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background border-b border-border">
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">#</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Title</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Category</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Evidence</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Responsible</th>
                <th className="px-4 py-3 text-left text-[10px] text-muted uppercase">Review date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {kingVPrinciples.map((p) => (
                <tr
                  key={p.code}
                  className={`hover:bg-background ${
                    p.status === 'not yet addressed' ? 'bg-red-tint/30' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-[11px] text-primary font-medium">{p.code}</td>
                  <td className="px-4 py-3 text-[11px] text-primary">{p.title}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{p.category}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted">{p.evidence}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{p.responsible}</td>
                  <td className="px-4 py-3 text-[11px] text-muted">{p.reviewDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right sidebar */}
        <div className="fixed right-0 top-[88px] bottom-0 w-[200px] bg-card border-l border-border p-4 overflow-y-auto hidden xl:block">
          <div className="space-y-4">
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Evidence panel</h4>
              <div className="text-[10px] text-muted">Upload supporting documents per principle</div>
            </div>
            <div className="bg-background rounded-lg p-3">
              <h4 className="text-[10px] font-medium text-primary mb-2">Board resolution ref</h4>
              <div className="text-[10px] text-muted">Link governance documents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

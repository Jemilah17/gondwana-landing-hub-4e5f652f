import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useFilings } from '../contexts/FilingsContext';
import { useToast } from '../contexts/ToastContext';
import type { Filing } from '../data/filings';
import Topbar from '../components/layout/Topbar';
import HandoffPill from '../components/ui/HandoffPill';
import LogFilingModal from '../components/ui/LogFilingModal';
import { ArrowLeft, CheckCircle, UploadCloud } from 'lucide-react';

export default function ConsultantFilings() {
  const { filings, markFiledAwaitingProof, confirmFiled } = useFilings();
  const { showToast } = useToast();
  const [proofFiling, setProofFiling] = useState<Filing | null>(null);

  // The consultant sees all filings assigned to them, across every entity/cluster.
  const assigned = filings.filter(f => f.assignedTo === 'consultant');

  return (
    <div>
      <Topbar title="My filings" />

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted">
            All filings handed off to External CoSec Services — {assigned.length} assigned
          </p>
          <Link
            to="/consultant-dashboard"
            className="flex items-center gap-1 text-[11px] text-muted hover:text-primary"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to portal
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">#</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Entity</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Due date</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Handoff</th>
                  <th className="px-4 py-3 text-left text-[10px] font-medium text-muted uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assigned.map((filing, idx) => (
                  <tr
                    key={filing.id}
                    className={`hover:bg-background ${
                      filing.handoffStage === 'overdue_unconfirmed' ? 'bg-red/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-[11px] text-muted">{idx + 1}</td>
                    <td className="px-4 py-3 text-[11px] text-primary font-medium">{filing.entityName}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">{filing.type}</td>
                    <td className="px-4 py-3 text-[11px] text-muted">
                      {new Date(filing.dueDate).toLocaleDateString('en-NA')}
                    </td>
                    <td className="px-4 py-3"><HandoffPill stage={filing.handoffStage} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {(filing.handoffStage === 'handed_to_consultant' || filing.handoffStage === 'overdue_unconfirmed') && (
                          <button
                            onClick={() => {
                              markFiledAwaitingProof(filing.id);
                              showToast('Marked as filed · Upload proof to confirm');
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-blue text-white rounded text-[10px] font-medium"
                          >
                            <CheckCircle className="w-3 h-3" /> Mark filed
                          </button>
                        )}
                        {filing.handoffStage === 'filed_awaiting_proof' && (
                          <button
                            onClick={() => setProofFiling(filing)}
                            className="flex items-center gap-1 px-3 py-1 bg-orange text-white rounded text-[10px] font-medium"
                          >
                            <UploadCloud className="w-3 h-3" /> Upload proof
                          </button>
                        )}
                        {filing.handoffStage === 'confirmed_filed' && (
                          <span className="text-[10px] text-muted">Receipt {filing.proofReceiptNumber ?? filing.receiptNumber ?? '—'}</span>
                        )}
                        {filing.handoffStage === 'not_due' && (
                          <span className="text-[10px] text-muted">Awaiting handoff</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <LogFilingModal
        filing={proofFiling}
        onClose={() => setProofFiling(null)}
        onConfirm={(receiptNumber, filedDate) => {
          if (!proofFiling) return;
          // confirmFiled logs an audit-trail event under the active user's name,
          // so this shows up on /audit-trail and in the CoSec notification bell.
          confirmFiled(proofFiling.id, receiptNumber, filedDate);
          setProofFiling(null);
          showToast('Proof uploaded · Filing confirmed');
        }}
      />
    </div>
  );
}

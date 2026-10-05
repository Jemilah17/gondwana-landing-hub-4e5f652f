import { useEffect, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import Modal from './Modal';
import type { Filing } from '../../data/filings';

interface Props {
  filing: Filing | null;
  onClose: () => void;
  onConfirm: (receiptNumber: string, filedDate: string) => void;
}

export default function LogFilingModal({ filing, onClose, onConfirm }: Props) {
  const [receipt, setReceipt] = useState('');
  const [filingDate, setFilingDate] = useState('2026-08-04');

  useEffect(() => {
    if (filing) {
      setReceipt('');
      setFilingDate('2026-08-04');
    }
  }, [filing]);

  return (
    <Modal
      isOpen={!!filing}
      onClose={onClose}
      title={`Log filing — ${filing?.entityName ?? ''}`}
      maxWidth="max-w-[420px]"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] text-muted mb-1">Filing type</label>
          <select disabled value={filing?.type ?? ''} className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background text-muted">
            <option>{filing?.type}</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-muted mb-1">Entity</label>
          <select disabled value={filing?.entityName ?? ''} className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-background text-muted">
            <option>{filing?.entityName}</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] text-muted mb-1">Receipt number</label>
          <input value={receipt} onChange={e => setReceipt(e.target.value)} placeholder="e.g. BIPA-2026-0421"
            className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-card" />
        </div>
        <div>
          <label className="block text-[10px] text-muted mb-1">Filing date</label>
          <input type="date" value={filingDate} onChange={e => setFilingDate(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 text-[12px] bg-card" />
        </div>
        <div className="border border-dashed border-border rounded-lg p-4 flex flex-col items-center gap-1 text-muted">
          <UploadCloud className="w-5 h-5" />
          <span className="text-[10px]">Upload PDF confirmation</span>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className="px-3 py-1.5 border border-border rounded text-[11px] text-muted hover:bg-background">
            Cancel
          </button>
          <button
            onClick={() => filing && onConfirm(receipt.trim() || 'not supplied', filingDate)}
            className="px-3 py-1.5 bg-orange text-white rounded text-[11px] font-medium hover:opacity-90"
          >
            Confirm &amp; log
          </button>
        </div>
      </div>
    </Modal>
  );
}

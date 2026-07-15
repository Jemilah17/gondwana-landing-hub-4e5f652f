import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}

export default function Drawer({ isOpen, onClose, title, children, width = 'w-[360px]' }: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/35"
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 bg-card border-l border-border ${width} overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-[14px] font-medium text-primary">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

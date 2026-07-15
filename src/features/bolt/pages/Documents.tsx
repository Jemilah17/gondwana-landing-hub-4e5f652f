import { useState } from 'react';
import Topbar from '../components/layout/Topbar';
import { Search, Upload, Folder, FileText, Eye, Download } from 'lucide-react';

const documents = [
  { id: 1, name: 'MOI Gondwana Holdings', type: 'MOI & AoA', entity: 'Gondwana Holdings', version: 'v4.0', date: '15 Feb 2025', uploadedBy: 'Fabiola' },
  { id: 2, name: 'Annual Return 2025', type: 'Annual returns', entity: 'Gondwana Holdings', version: 'Final', date: '30 Oct 2025', uploadedBy: 'Fabiola' },
  { id: 3, name: 'Board Resolution OR-2026-001', type: 'Board resolutions', entity: 'Gondwana Holdings', version: 'Signed', date: '24 Jun 2026', uploadedBy: 'Gys Joubert' },
  { id: 4, name: 'AGM Minutes 2022', type: 'AGM docs', entity: 'Gondwana Holdings', version: 'Final', date: '2 Jun 2022', uploadedBy: 'Fabiola' },
  { id: 5, name: 'BIPA Confirmation Q1 2026', type: 'Regulatory', entity: 'Canyon Lodge', version: 'Filed', date: '31 Mar 2026', uploadedBy: 'Jemilah' },
];

const typeColors: Record<string, string> = {
  'Founding docs': 'bg-charcoal/10 text-charcoal',
  'MOI & AoA': 'bg-orange-tint text-orange',
  'Share certificates': 'bg-purple-tint text-purple',
  'Annual returns': 'bg-green-tint text-green',
  'Board resolutions': 'bg-blue-tint text-blue',
  'AGM docs': 'bg-amber-tint text-amber',
  'Regulatory': 'bg-red-tint text-red',
  'Contracts': 'bg-teal-tint text-teal',
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const filteredDocs = documents.filter(doc => {
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <Topbar title="Documents" />

      <div className="p-6 flex gap-6">
        {/* Folder tree */}
        <div className="w-[200px] flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-[10px] font-medium text-muted uppercase mb-2">Folders</div>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedFolder('all')}
                className={`w-full text-left px-2 py-1.5 rounded text-[11px] ${
                  selectedFolder === 'all' ? 'bg-orange text-white' : 'hover:bg-background'
                }`}
              >
                <Folder className="w-3 h-3 inline mr-1" /> All documents
              </button>
              <button className="w-full text-left px-2 py-1.5 rounded text-[11px] hover:bg-background text-muted">
                <Folder className="w-3 h-3 inline mr-1" /> Cluster A
              </button>
              <button className="w-full text-left px-2 py-1.5 rounded text-[11px] hover:bg-background text-muted">
                <Folder className="w-3 h-3 inline mr-1" /> Cluster B
              </button>
              <button className="w-full text-left px-2 py-1.5 rounded text-[11px] hover:bg-background text-muted">
                <Folder className="w-3 h-3 inline mr-1" /> Cluster C
              </button>
            </div>
          </div>
        </div>

        {/* Document grid */}
        <div className="flex-1">
          {/* Search and upload */}
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-[12px] bg-card"
              />
            </div>
          </div>

          {/* Upload zone */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 mb-6 text-center">
            <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-[12px] text-muted">Drop document here or <span className="text-orange">browse</span></p>
          </div>

          {/* Document cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-card border border-border rounded-lg p-3.5">
                <div className="flex items-start gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-primary truncate">{doc.name}</div>
                    <div className="text-[10px] text-muted">{doc.entity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] ${typeColors[doc.type] || 'bg-muted/10'}`}>
                    {doc.type}
                  </span>
                  <span className="text-[9px] text-muted">v{doc.version}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted mb-2">
                  <span>{doc.date}</span>
                  <span>by {doc.uploadedBy}</span>
                </div>
                <div className="flex gap-2 pt-2 border-t border-border">
                  <button className="flex-1 px-2 py-1 bg-orange text-white rounded text-[10px]">
                    <Eye className="w-3 h-3 inline" /> View
                  </button>
                  <button className="flex-1 px-2 py-1 border border-border rounded text-[10px] text-muted">
                    <Download className="w-3 h-3 inline" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

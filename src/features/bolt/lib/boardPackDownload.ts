import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import JSZip from 'jszip';

export interface PackMeta {
  meeting: string;
  date: string; // ISO or display string
  time?: string;
  venue?: string;
  entity: string;
  chairperson: string;
}

export interface PackDoc {
  name: string;
  description?: string;
  optional?: boolean;
  file?: string;
  blob?: File | Blob;
}

const ORANGE = rgb(0.831, 0.396, 0.165);
const CHARCOAL = rgb(0.11, 0.11, 0.1);
const MUTED = rgb(0.42, 0.41, 0.39);

const displayDate = (value: string) => {
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
  return isNaN(d.getTime())
    ? value
    : d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const slug = (s: string) =>
  s.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '') || 'BoardPack';

function wrap(text: string, max: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line.trim());
      line = w;
    } else line = `${line} ${w}`;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

async function buildCoverDoc(pack: PackMeta, docs: PackDoc[]) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${pack.meeting} — Board pack`);
  pdf.setAuthor(pack.entity);

  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  let page = pdf.addPage([595, 842]);
  const { width } = page.getSize();
  let y = 780;

  page.drawRectangle({ x: 0, y: 812, width, height: 30, color: ORANGE });
  page.drawText(pack.entity.toUpperCase(), {
    x: 48, y: 821, size: 10, font: bold, color: rgb(1, 1, 1),
  });

  page.drawText('BOARD PACK', { x: 48, y, size: 10, font: bold, color: ORANGE });
  y -= 32;
  for (const line of wrap(pack.meeting, 34)) {
    page.drawText(line, { x: 48, y, size: 22, font: bold, color: CHARCOAL });
    y -= 28;
  }
  y -= 6;

  const rows: [string, string][] = [
    ['Date', displayDate(pack.date)],
    ['Time', pack.time ?? '—'],
    ['Venue', pack.venue ?? '—'],
    ['Entity', pack.entity],
    ['Chairperson', pack.chairperson],
    ['Compiled', new Date().toLocaleString('en-GB')],
  ];
  for (const [k, v] of rows) {
    page.drawText(k, { x: 48, y, size: 9, font: bold, color: MUTED });
    let vy = y;
    for (const line of wrap(v, 60)) {
      page.drawText(line, { x: 150, y: vy, size: 10, font: regular, color: CHARCOAL });
      vy -= 14;
    }
    y = Math.min(y - 20, vy - 6);
  }

  y -= 10;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 0.7, color: ORANGE });
  y -= 26;
  page.drawText('DOCUMENT INDEX', { x: 48, y, size: 10, font: bold, color: ORANGE });
  y -= 22;

  docs.forEach((d, i) => {
    if (y < 80) {
      page = pdf.addPage([595, 842]);
      y = 780;
    }
    page.drawText(`${i + 1}.`, { x: 48, y, size: 10, font: bold, color: CHARCOAL });
    page.drawText(`${d.name}${d.optional ? ' (optional)' : ''}`, {
      x: 72, y, size: 10, font: bold, color: CHARCOAL,
    });
    y -= 13;
    if (d.description) {
      for (const line of wrap(d.description, 78)) {
        page.drawText(line, { x: 72, y, size: 8.5, font: regular, color: MUTED });
        y -= 11;
      }
    }
    page.drawText(d.file ? `Attached: ${d.file}` : 'Not yet received', {
      x: 72, y, size: 8.5, font: regular, color: d.file ? rgb(0.18, 0.48, 0.31) : rgb(0.71, 0.23, 0.18),
    });
    y -= 20;
  });

  return pdf;
}

const pdfBlob = (bytes: Uint8Array) =>
  new Blob([bytes.slice().buffer as ArrayBuffer], { type: 'application/pdf' });

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Builds a cover page and either merges the attached PDFs behind it (single PDF)
 * or packages the cover plus attachments into a .zip when merging is not possible.
 * Returns the filename that was downloaded.
 */
export async function downloadBoardPack(pack: PackMeta, docs: PackDoc[]): Promise<string> {
  const base = `${slug(pack.meeting)}_BoardPack`;
  const cover = await buildCoverDoc(pack, docs);
  const attached = docs.filter(d => d.blob);

  if (attached.length === 0) {
    triggerDownload(pdfBlob(await cover.save()), `${base}.pdf`);
    return `${base}.pdf`;
  }

  // Try merging every attachment as a PDF.
  const buffers = await Promise.all(attached.map(async d => ({ d, buf: await d.blob!.arrayBuffer() })));
  try {
    for (const { buf } of buffers) {
      const src = await PDFDocument.load(buf, { ignoreEncryption: true });
      const pages = await cover.copyPages(src, src.getPageIndices());
      pages.forEach(p => cover.addPage(p));
    }
    triggerDownload(pdfBlob(await cover.save()), `${base}.pdf`);
    return `${base}.pdf`;
  } catch {
    // Fallback: zip the cover page with the original attachments.
    const zip = new JSZip();
    const coverOnly = await buildCoverDoc(pack, docs);
    zip.file('00_Cover_and_index.pdf', await coverOnly.save());
    buffers.forEach(({ d, buf }, i) => {
      const n = String(i + 1).padStart(2, '0');
      zip.file(`${n}_${d.file ?? `${slug(d.name)}.pdf`}`, buf);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    triggerDownload(blob, `${base}.zip`);
    return `${base}.zip`;
  }
}

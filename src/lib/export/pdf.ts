import { renderToBuffer } from '@react-pdf/renderer';
import { PDFDocument } from './templates/pdf-document';
import type { DocumentSection } from '@/types/document.types';

export interface PDFMeta {
  title: string;
  date: string;
}

export async function renderDocumentToPDF(
  sections: DocumentSection[],
  meta: PDFMeta
): Promise<Buffer> {
  const element = PDFDocument({ sections, meta });
  const buffer = await renderToBuffer(element);
  return Buffer.from(buffer);
}

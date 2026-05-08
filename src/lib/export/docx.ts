import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import type { DocumentSection } from '@/types/document.types';

export interface DocxMeta {
  title: string;
  date: string;
}

export async function buildDocxDocument(
  sections: DocumentSection[],
  meta: DocxMeta
): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({
      text: meta.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: meta.date, color: '6b7280', size: 20 })],
      spacing: { after: 400 },
    }),
  ];

  for (const section of sections) {
    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 120 },
      })
    );

    const lines = section.content.split('\n');
    for (const line of lines) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: line, size: 22 })],
          spacing: { after: 80 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [{ children }],
    creator: 'DocuPilot AI',
    title: meta.title,
  });

  return Packer.toBuffer(doc);
}

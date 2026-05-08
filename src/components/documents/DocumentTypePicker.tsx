'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_DESCRIPTIONS,
  DOCUMENT_TYPE_ICONS,
} from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';

const TYPES: DocumentType[] = [
  'invoice', 'contract', 'nda', 'proposal', 'quotation',
  'scope', 'resume', 'cover-letter', 'employment-letter',
];

export function DocumentTypePicker() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {TYPES.map((type) => (
        <Card
          key={type}
          className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
          onClick={() => router.push(`/documents/new?type=${type}`)}
        >
          <CardContent className="pt-6">
            <div className="text-3xl mb-3">{DOCUMENT_TYPE_ICONS[type]}</div>
            <h3 className="font-semibold mb-1">{DOCUMENT_TYPE_LABELS[type]}</h3>
            <p className="text-sm text-muted-foreground">{DOCUMENT_TYPE_DESCRIPTIONS[type]}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_DESCRIPTIONS,
  DOCUMENT_TYPE_LUCIDE_ICONS,
  DOCUMENT_TYPE_COLORS,
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
      {TYPES.map((type) => {
        const TypeIcon = DOCUMENT_TYPE_LUCIDE_ICONS[type];
        return (
          <Card
            key={type}
            className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
            onClick={() => router.push(`/documents/new?type=${type}`)}
          >
            <CardContent className="pt-6 pb-5">
              <div
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                  DOCUMENT_TYPE_COLORS[type]
                )}
              >
                <TypeIcon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{DOCUMENT_TYPE_LABELS[type]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {DOCUMENT_TYPE_DESCRIPTIONS[type]}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

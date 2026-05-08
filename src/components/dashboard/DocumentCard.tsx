import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_LUCIDE_ICONS,
  DOCUMENT_TYPE_COLORS,
} from '@/types/document.types';
import { cn } from '@/lib/utils';
import type { DocumentMeta } from '@/types/document.types';

export function DocumentCard({ doc }: { doc: DocumentMeta }) {
  const TypeIcon = DOCUMENT_TYPE_LUCIDE_ICONS[doc.type];

  return (
    <Link href={`/documents/${doc.id}`}>
      <Card className="hover:shadow-md transition-all cursor-pointer h-full group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                DOCUMENT_TYPE_COLORS[doc.type]
              )}
            >
              <TypeIcon className="h-5 w-5" />
            </div>
            <Badge
              variant={doc.status === 'final' ? 'default' : 'outline'}
              className={cn(
                'text-xs',
                doc.status === 'final' &&
                  'bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:border-emerald-800'
              )}
            >
              {doc.status}
            </Badge>
          </div>
          <CardTitle className="text-sm font-semibold leading-tight mt-3 group-hover:text-primary transition-colors">
            {doc.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">{DOCUMENT_TYPE_LABELS[doc.type]}</span>
            <span>{formatDate(doc.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

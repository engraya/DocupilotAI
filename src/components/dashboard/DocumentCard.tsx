import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_ICONS } from '@/types/document.types';
import type { DocumentMeta } from '@/types/document.types';

export function DocumentCard({ doc }: { doc: DocumentMeta }) {
  return (
    <Link href={`/documents/${doc.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-2xl">{DOCUMENT_TYPE_ICONS[doc.type]}</span>
            <Badge variant={doc.status === 'final' ? 'default' : 'outline'} className="text-xs">
              {doc.status}
            </Badge>
          </div>
          <CardTitle className="text-base leading-tight mt-2">{doc.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{DOCUMENT_TYPE_LABELS[doc.type]}</span>
            <span>{formatDate(doc.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

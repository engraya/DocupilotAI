'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_ICONS } from '@/types/document.types';
import type { TemplateMeta } from '@/types/document.types';

export function TemplateCard({ template }: { template: TemplateMeta }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const useTemplate = async () => {
    setLoading(true);
    const res = await fetch(`/api/templates/${template.id}`, {
      method: 'POST',
    });
    if (res.ok) {
      const { document } = await res.json();
      router.push(`/documents/${document.id}`);
    }
    setLoading(false);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <span className="text-2xl">{DOCUMENT_TYPE_ICONS[template.type]}</span>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm leading-tight">{template.name}</CardTitle>
            <Badge variant="outline" className="text-xs mt-1">
              {DOCUMENT_TYPE_LABELS[template.type]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {template.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Used {template.use_count} times
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full"
          onClick={useTemplate}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
          Use Template
        </Button>
      </CardFooter>
    </Card>
  );
}

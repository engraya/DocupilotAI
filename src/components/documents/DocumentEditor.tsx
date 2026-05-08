'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { SectionBlock } from './SectionBlock';
import { ExportMenu } from './ExportMenu';
import { ShareDialog } from './ShareDialog';
import { SaveAsTemplateDialog } from '@/components/templates/SaveAsTemplateDialog';
import { Badge } from '@/components/ui/badge';
import type { DocumentSection, DocumentMeta } from '@/types/document.types';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import { formatDate } from '@/lib/utils';

export function DocumentEditor({ document }: { document: DocumentMeta }) {
  const [sections, setSections] = useState<DocumentSection[]>(
    document.content_json as DocumentSection[]
  );
  const [saving, setSaving] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSectionChange = useCallback(
    (id: string, updated: Partial<DocumentSection>) => {
      setSections((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
      );
    },
    []
  );

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setSaving(true);
      await fetch(`/api/documents/${document.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content_json: sections }),
      });
      setSaving(false);
    }, 1500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [sections, document.id]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b px-6 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-semibold text-base truncate">{document.title}</h1>
            <Badge variant="outline" className="text-xs shrink-0">
              {DOCUMENT_TYPE_LABELS[document.type]}
            </Badge>
            <span className="text-xs text-muted-foreground shrink-0">
              {formatDate(document.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {saving && <span className="text-xs text-muted-foreground">Saving…</span>}
          <SaveAsTemplateDialog document={document} />
          <ShareDialog documentId={document.id} />
          <ExportMenu
            documentId={document.id}
            sections={sections}
            title={document.title}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              onChange={handleSectionChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

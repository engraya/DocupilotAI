import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { Badge } from '@/components/ui/badge';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { TemplateMeta, DocumentSection } from '@/types/document.types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TemplatePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) notFound();

  const template = data as TemplateMeta;
  const sections = (template.content ?? []) as DocumentSection[];

  return (
    <>
      <TopNav title="Template Preview" />
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{template.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{DOCUMENT_TYPE_LABELS[template.type]}</Badge>
              {template.category && <Badge variant="secondary">{template.category}</Badge>}
              {template.is_public && <Badge className="bg-green-100 text-green-700 border-green-200">Public</Badge>}
            </div>
            {template.description && (
              <p className="text-muted-foreground text-sm">{template.description}</p>
            )}
            <p className="text-xs text-muted-foreground">Used {template.use_count} times</p>
          </div>
          <TemplateCard template={template} />
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Preview</h2>
          {sections.map((section) => (
            <div key={section.id} className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-base">{section.title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

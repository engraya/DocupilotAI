import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentType, TemplateMeta } from '@/types/document.types';
import { BookTemplate } from 'lucide-react';
import { cn } from '@/lib/utils';

const FILTER_TYPES: DocumentType[] = [
  'invoice', 'contract', 'nda', 'proposal', 'quotation',
  'scope', 'resume', 'cover-letter', 'employment-letter',
];

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase
    .from('templates')
    .select('*')
    .order('use_count', { ascending: false });

  if (user) {
    query = query.or(`is_public.eq.true,user_id.eq.${user.id}`);
  } else {
    query = query.eq('is_public', true);
  }

  if (type) query = query.eq('type', type);

  const { data: templates } = await query;

  return (
    <>
      <TopNav title="Templates" />
      <div className="p-6 space-y-6">
        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap">
          <a
            href="/templates"
            className={cn(
              'px-3.5 py-1.5 text-sm rounded-full font-medium transition-colors',
              !type
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            All
          </a>
          {FILTER_TYPES.map((t) => (
            <a
              key={t}
              href={`/templates?type=${t}`}
              className={cn(
                'px-3.5 py-1.5 text-sm rounded-full font-medium transition-colors',
                type === t
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {DOCUMENT_TYPE_LABELS[t]}
            </a>
          ))}
        </div>

        {templates && templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template as TemplateMeta} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl py-20 text-center bg-muted/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
              <BookTemplate className="h-7 w-7 text-primary/60" />
            </div>
            <p className="text-muted-foreground font-medium mb-1">No templates yet</p>
            <p className="text-sm text-muted-foreground/70">
              Create a document and save it as a template
            </p>
          </div>
        )}
      </div>
    </>
  );
}

import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentType, TemplateMeta } from '@/types/document.types';

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
        <div className="flex gap-2 flex-wrap">
          <a
            href="/templates"
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              !type ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            All
          </a>
          {FILTER_TYPES.map((t) => (
            <a
              key={t}
              href={`/templates?type=${t}`}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                type === t ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
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
          <div className="text-center py-16 text-muted-foreground">
            No templates yet. Create a document and save it as a template!
          </div>
        )}
      </div>
    </>
  );
}

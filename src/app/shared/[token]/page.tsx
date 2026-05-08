import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentSection, DocumentMeta } from '@/types/document.types';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function SharedDocumentPage({ params }: Props) {
  const { token } = await params;
  const supabase = await createServiceClient();

  const { data: share } = await supabase
    .from('document_shares')
    .select('*, documents(*)')
    .eq('share_token', token)
    .single();

  if (!share) notFound();

  if (share.expires_at && new Date(share.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold">Link Expired</p>
          <p className="text-muted-foreground text-sm">This share link is no longer valid.</p>
        </div>
      </div>
    );
  }

  await supabase
    .from('document_shares')
    .update({ view_count: (share.view_count ?? 0) + 1 })
    .eq('id', share.id);

  const document = share.documents as DocumentMeta;
  const sections = document.content_json as DocumentSection[];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center gap-3">
        <Logo />
        <Badge variant="outline" className="ml-auto text-xs">Read-only</Badge>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{document.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{DOCUMENT_TYPE_LABELS[document.type]}</span>
            <span>·</span>
            <span>{formatDate(document.created_at)}</span>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
              <div className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

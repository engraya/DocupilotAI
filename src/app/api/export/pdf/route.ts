import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { renderDocumentToPDF } from '@/lib/export/pdf';
import { formatDate } from '@/lib/utils';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { documentId } = await request.json();

  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single();

  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const buffer = await renderDocumentToPDF(document.content_json, {
    title: document.title,
    date: formatDate(document.created_at),
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(document.title)}.pdf"`,
    },
  });
}

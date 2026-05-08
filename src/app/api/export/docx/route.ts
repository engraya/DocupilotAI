import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { buildDocxDocument } from '@/lib/export/docx';
import { formatDate } from '@/lib/utils';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  if (profile?.tier !== 'premium' && profile?.tier !== 'admin') {
    return NextResponse.json({ error: 'Premium required' }, { status: 403 });
  }

  const { documentId } = await request.json();

  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single();

  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const buffer = await buildDocxDocument(document.content_json, {
    title: document.title,
    date: formatDate(document.created_at),
  });

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(document.title)}.docx"`,
    },
  });
}

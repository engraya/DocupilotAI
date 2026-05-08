import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { addDays } from 'date-fns';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const expiresInDays = body.expiresInDays ?? 30;

  const { data: doc } = await supabase
    .from('documents')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

  const { data: share, error } = await supabase
    .from('document_shares')
    .insert({
      document_id: id,
      expires_at: addDays(new Date(), expiresInDays).toISOString(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/shared/${share.share_token}`;

  return NextResponse.json({ share, shareUrl });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: shares } = await supabase
    .from('document_shares')
    .select('*')
    .eq('document_id', id)
    .order('created_at', { ascending: false });

  return NextResponse.json({ shares: shares ?? [] });
}

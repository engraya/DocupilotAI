import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ template: data });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// POST to /api/templates/[id] with body { action: 'fork' } forks the template
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: template } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const title = `${DOCUMENT_TYPE_LABELS[template.type as DocumentType]} — from template: ${template.name}`;

  const { data: document, error } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      type: template.type,
      title,
      form_data: {},
      content_json: template.content,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase
    .from('templates')
    .update({ use_count: (template.use_count ?? 0) + 1 })
    .eq('id', id);

  return NextResponse.json({ document });
}

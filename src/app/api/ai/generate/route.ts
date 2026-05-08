import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateDocument } from '@/lib/ai/gemini';
import { checkUsageLimit } from '@/lib/utils';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check + lazy reset monthly usage
  await supabase.rpc('reset_monthly_usage_if_due');

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, usage_count')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const { allowed } = checkUsageLimit(profile);
  if (!allowed) {
    return NextResponse.json({ error: 'limit_reached' }, { status: 402 });
  }

  const body = await request.json();
  const { documentType, formData } = body as {
    documentType: DocumentType;
    formData: Record<string, unknown>;
  };

  let sections;
  try {
    sections = await generateDocument(documentType, formData);
  } catch {
    return NextResponse.json({ error: 'AI generation failed. Please try again.' }, { status: 500 });
  }

  const title = `${DOCUMENT_TYPE_LABELS[documentType]} — ${new Date().toLocaleDateString()}`;

  const { data: document, error: dbError } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      type: documentType,
      title,
      form_data: formData,
      content_json: sections,
    })
    .select()
    .single();

  if (dbError) {
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
  }

  await supabase
    .from('profiles')
    .update({ usage_count: (profile.usage_count ?? 0) + 1 })
    .eq('id', user.id);

  return NextResponse.json({ document });
}

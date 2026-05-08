import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { editSection } from '@/lib/ai/gemini';
import { buildEditPrompt } from '@/lib/ai/edit-actions';
import type { AIEditAction } from '@/types/document.types';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action, sectionContent, targetLanguage } = await request.json() as {
    action: AIEditAction;
    sectionContent: string;
    targetLanguage?: string;
  };

  const prompt = buildEditPrompt(action, sectionContent, targetLanguage);

  let content: string;
  try {
    content = await editSection(prompt);
  } catch {
    return NextResponse.json({ error: 'Edit failed. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ content });
}

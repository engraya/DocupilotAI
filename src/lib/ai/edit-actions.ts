import type { AIEditAction } from '@/types/document.types';

export function buildEditPrompt(
  action: AIEditAction,
  content: string,
  targetLanguage?: string
): string {
  const instructions: Record<AIEditAction, string> = {
    rewrite:
      'Rewrite the following section to improve clarity, flow, and readability while preserving all facts and meaning. Keep professional tone.',
    simplify:
      'Rewrite the following section using simple, plain language. Target a Grade 8 reading level. Use short sentences and common words.',
    make_professional:
      'Rewrite the following section in formal, professional business English. Improve tone, vocabulary, and structure.',
    summarize:
      'Summarize the following section into 2–3 concise sentences that capture all essential points.',
    translate:
      `Translate the following section into ${targetLanguage || 'Spanish'}. Preserve the professional tone and all meaning.`,
  };

  return `${instructions[action]}

SECTION TO EDIT:
${content}

Return the result as a JSON object: {"content": "the edited text here"}`;
}

import { GoogleGenAI } from '@google/genai';
import type { DocumentType, DocumentSection } from '@/types/document.types';
import { AIError } from '@/types/ai.types';
import { buildPrompt, SYSTEM_INSTRUCTION } from './prompts/index';

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateDocument(
  type: DocumentType,
  formData: Record<string, unknown>
): Promise<DocumentSection[]> {
  const prompt = buildPrompt(type, formData);

  let text: string;
  try {
    const response = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    });
    text = response.text ?? '';
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gemini API error';
    throw new AIError(msg, true);
  }

  return parseSections(text);
}

export async function editSection(
  prompt: string
): Promise<string> {
  let text: string;
  try {
    const response = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a professional document editor. Return ONLY a valid JSON object with a "content" field containing the edited text. No markdown, no code blocks.',
        responseMimeType: 'application/json',
        temperature: 0.5,
        maxOutputTokens: 2048,
      },
    });
    text = response.text ?? '';
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Gemini API error';
    throw new AIError(msg, true);
  }

  try {
    const parsed = JSON.parse(text);
    return parsed.content ?? text;
  } catch {
    throw new AIError('Failed to parse edit response', false);
  }
}

function parseSections(text: string): DocumentSection[] {
  const clean = text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '');

  let parsed: unknown;
  try {
    parsed = JSON.parse(clean);
  } catch {
    throw new AIError('Failed to parse AI response as JSON', true);
  }

  if (!Array.isArray(parsed)) {
    throw new AIError('AI response is not an array', true);
  }

  return parsed.map((item: unknown, idx: number) => {
    if (typeof item !== 'object' || item === null) {
      throw new AIError('Invalid section format', false);
    }
    const s = item as Record<string, unknown>;
    return {
      id: String(s.id ?? `sec${idx}`),
      title: String(s.title ?? 'Section'),
      content: String(s.content ?? ''),
    };
  });
}

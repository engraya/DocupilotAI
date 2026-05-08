import type { DocumentType } from '@/types/document.types';
import { buildInvoicePrompt } from './invoice';
import { buildContractPrompt } from './contract';
import { buildNDAPrompt } from './nda';
import { buildProposalPrompt } from './proposal';
import { buildQuotationPrompt } from './quotation';
import { buildScopePrompt } from './scope';
import { buildResumePrompt } from './resume';
import { buildCoverLetterPrompt } from './cover-letter';
import { buildEmploymentLetterPrompt } from './employment-letter';

export const SYSTEM_INSTRUCTION = `You are an expert professional document writer specializing in business and legal documents.
Your task is to generate a complete, professional document as a JSON array of sections.

IMPORTANT: Return ONLY a valid JSON array. No markdown, no explanation, no code blocks. Just the raw JSON array.

Each section must be an object with exactly these fields:
- "id": a unique 8-character alphanumeric string (e.g. "a1b2c3d4")
- "title": the section heading as a string
- "content": the full section body as a string (use \\n for line breaks, use plain text or light markdown)

Example format:
[{"id":"a1b2c3d4","title":"Introduction","content":"This agreement is made between..."},{"id":"e5f6g7h8","title":"Payment Terms","content":"Payment is due within 30 days..."}]`;

type PromptBuilder = (formData: Record<string, unknown>) => string;

const promptRegistry: Record<DocumentType, PromptBuilder> = {
  invoice: buildInvoicePrompt,
  contract: buildContractPrompt,
  nda: buildNDAPrompt,
  proposal: buildProposalPrompt,
  quotation: buildQuotationPrompt,
  scope: buildScopePrompt,
  resume: buildResumePrompt,
  'cover-letter': buildCoverLetterPrompt,
  'employment-letter': buildEmploymentLetterPrompt,
};

export function buildPrompt(type: DocumentType, formData: Record<string, unknown>): string {
  return promptRegistry[type](formData);
}

import type { DocumentType } from '@/types/document.types';
import { invoiceSchema, invoiceFields } from './invoice';
import { contractSchema, contractFields } from './contract';
import { ndaSchema, ndaFields } from './nda';
import { proposalSchema, proposalFields } from './proposal';
import { quotationSchema, quotationFields } from './quotation';
import { scopeSchema, scopeFields } from './scope';
import { resumeSchema, resumeFields } from './resume';
import { coverLetterSchema, coverLetterFields } from './cover-letter';
import { employmentLetterSchema, employmentLetterFields } from './employment-letter';
import type { ZodSchema } from 'zod';

export interface FieldDescriptor {
  name: string;
  label: string;
  type: 'input' | 'textarea' | 'select';
  placeholder?: string;
  optional?: boolean;
  options?: { value: string; label: string }[];
}

export interface SchemaRegistry {
  schema: ZodSchema;
  fields: FieldDescriptor[];
  hasLineItems: boolean;
}

export const documentSchemaRegistry: Record<DocumentType, SchemaRegistry> = {
  invoice: { schema: invoiceSchema, fields: invoiceFields as FieldDescriptor[], hasLineItems: true },
  contract: { schema: contractSchema, fields: contractFields as FieldDescriptor[], hasLineItems: false },
  nda: { schema: ndaSchema, fields: ndaFields as FieldDescriptor[], hasLineItems: false },
  proposal: { schema: proposalSchema, fields: proposalFields as FieldDescriptor[], hasLineItems: false },
  quotation: { schema: quotationSchema, fields: quotationFields as FieldDescriptor[], hasLineItems: true },
  scope: { schema: scopeSchema, fields: scopeFields as FieldDescriptor[], hasLineItems: false },
  resume: { schema: resumeSchema, fields: resumeFields as FieldDescriptor[], hasLineItems: false },
  'cover-letter': { schema: coverLetterSchema, fields: coverLetterFields as FieldDescriptor[], hasLineItems: false },
  'employment-letter': { schema: employmentLetterSchema, fields: employmentLetterFields as FieldDescriptor[], hasLineItems: false },
};

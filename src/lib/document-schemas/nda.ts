import { z } from 'zod';

export const ndaSchema = z.object({
  disclosingParty: z.string().min(1, 'Required'),
  receivingParty: z.string().min(1, 'Required'),
  purpose: z.string().min(10, 'Required'),
  effectiveDate: z.string().min(1, 'Required'),
  duration: z.string().min(1, 'Required'),
  governingLaw: z.string().optional(),
  exclusions: z.string().optional(),
});

export type NDAFormData = z.infer<typeof ndaSchema>;

export const ndaFields = [
  { name: 'disclosingParty', label: 'Disclosing Party', type: 'input', placeholder: 'Acme Corp' },
  { name: 'receivingParty', label: 'Receiving Party', type: 'input', placeholder: 'Jane Smith' },
  { name: 'purpose', label: 'Purpose of Disclosure', type: 'textarea', placeholder: 'Evaluating a potential business partnership…' },
  { name: 'effectiveDate', label: 'Effective Date', type: 'input', placeholder: '2025-01-01' },
  { name: 'duration', label: 'Confidentiality Duration', type: 'input', placeholder: '2 years' },
  { name: 'governingLaw', label: 'Governing Law', type: 'input', placeholder: 'New York, USA', optional: true },
  { name: 'exclusions', label: 'Exclusions', type: 'textarea', placeholder: 'Information that is already public…', optional: true },
];

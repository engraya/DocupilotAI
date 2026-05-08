import { z } from 'zod';

export const quotationSchema = z.object({
  quotationNumber: z.string().min(1, 'Required'),
  issuerName: z.string().min(1, 'Required'),
  issuerEmail: z.string().email(),
  clientName: z.string().min(1, 'Required'),
  clientEmail: z.string().email(),
  validUntil: z.string().min(1, 'Required'),
  currency: z.string().default('USD'),
  taxRate: z.string().optional(),
  notes: z.string().optional(),
  lineItems: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.string().min(1),
      rate: z.string().min(1),
    })
  ).min(1),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;

export const quotationFields = [
  { name: 'quotationNumber', label: 'Quotation Number', type: 'input', placeholder: 'QUO-001' },
  { name: 'issuerName', label: 'Your Name / Company', type: 'input', placeholder: 'Acme Corp' },
  { name: 'issuerEmail', label: 'Your Email', type: 'input', placeholder: 'sales@acme.com' },
  { name: 'clientName', label: 'Client Name', type: 'input', placeholder: 'Client Corp' },
  { name: 'clientEmail', label: 'Client Email', type: 'input', placeholder: 'client@company.com' },
  { name: 'validUntil', label: 'Valid Until', type: 'input', placeholder: '2025-02-28' },
  { name: 'currency', label: 'Currency', type: 'input', placeholder: 'USD' },
  { name: 'taxRate', label: 'Tax Rate (%)', type: 'input', placeholder: '10', optional: true },
  { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Terms and conditions…', optional: true },
];

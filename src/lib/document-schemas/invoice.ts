import { z } from 'zod';

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Required'),
  issuerName: z.string().min(1, 'Required'),
  issuerEmail: z.string().email('Invalid email'),
  issuerAddress: z.string().optional(),
  clientName: z.string().min(1, 'Required'),
  clientEmail: z.string().email('Invalid email'),
  clientAddress: z.string().optional(),
  issueDate: z.string().min(1, 'Required'),
  dueDate: z.string().min(1, 'Required'),
  currency: z.string().default('USD'),
  taxRate: z.string().optional(),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  lineItems: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.string().min(1),
      rate: z.string().min(1),
    })
  ).min(1, 'At least one line item required'),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export const invoiceFields = [
  { name: 'invoiceNumber', label: 'Invoice Number', type: 'input', placeholder: 'INV-001' },
  { name: 'issuerName', label: 'Your Name / Company', type: 'input', placeholder: 'Acme Corp' },
  { name: 'issuerEmail', label: 'Your Email', type: 'input', placeholder: 'billing@acme.com' },
  { name: 'issuerAddress', label: 'Your Address', type: 'textarea', placeholder: '123 Main St…', optional: true },
  { name: 'clientName', label: 'Client Name', type: 'input', placeholder: 'Client Corp' },
  { name: 'clientEmail', label: 'Client Email', type: 'input', placeholder: 'client@company.com' },
  { name: 'clientAddress', label: 'Client Address', type: 'textarea', placeholder: '456 Client Ave…', optional: true },
  { name: 'issueDate', label: 'Issue Date', type: 'input', placeholder: '2025-01-01' },
  { name: 'dueDate', label: 'Due Date', type: 'input', placeholder: '2025-01-31' },
  { name: 'currency', label: 'Currency', type: 'input', placeholder: 'USD' },
  { name: 'taxRate', label: 'Tax Rate (%)', type: 'input', placeholder: '10', optional: true },
  { name: 'paymentTerms', label: 'Payment Terms', type: 'input', placeholder: 'Net 30', optional: true },
  { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes…', optional: true },
];

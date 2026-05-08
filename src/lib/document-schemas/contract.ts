import { z } from 'zod';

export const contractSchema = z.object({
  freelancerName: z.string().min(1, 'Required'),
  freelancerEmail: z.string().email(),
  clientName: z.string().min(1, 'Required'),
  clientEmail: z.string().email(),
  projectTitle: z.string().min(1, 'Required'),
  projectDescription: z.string().min(10, 'Please describe the project'),
  startDate: z.string().min(1, 'Required'),
  endDate: z.string().optional(),
  paymentAmount: z.string().min(1, 'Required'),
  paymentSchedule: z.string().min(1, 'Required'),
  revisions: z.string().optional(),
  deliverables: z.string().min(1, 'Required'),
  governingLaw: z.string().optional(),
});

export type ContractFormData = z.infer<typeof contractSchema>;

export const contractFields = [
  { name: 'freelancerName', label: 'Freelancer Name', type: 'input', placeholder: 'Jane Smith' },
  { name: 'freelancerEmail', label: 'Freelancer Email', type: 'input', placeholder: 'jane@example.com' },
  { name: 'clientName', label: 'Client Name', type: 'input', placeholder: 'Acme Corp' },
  { name: 'clientEmail', label: 'Client Email', type: 'input', placeholder: 'client@acme.com' },
  { name: 'projectTitle', label: 'Project Title', type: 'input', placeholder: 'Website Redesign' },
  { name: 'projectDescription', label: 'Project Description', type: 'textarea', placeholder: 'Describe the scope of work…' },
  { name: 'startDate', label: 'Start Date', type: 'input', placeholder: '2025-01-15' },
  { name: 'endDate', label: 'End Date', type: 'input', placeholder: '2025-03-31', optional: true },
  { name: 'paymentAmount', label: 'Total Payment', type: 'input', placeholder: '$5,000 USD' },
  { name: 'paymentSchedule', label: 'Payment Schedule', type: 'input', placeholder: '50% upfront, 50% on completion' },
  { name: 'deliverables', label: 'Deliverables', type: 'textarea', placeholder: 'List all deliverables…' },
  { name: 'revisions', label: 'Revision Policy', type: 'input', placeholder: 'Up to 3 rounds of revisions', optional: true },
  { name: 'governingLaw', label: 'Governing Law (State/Country)', type: 'input', placeholder: 'California, USA', optional: true },
];

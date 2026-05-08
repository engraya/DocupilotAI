import { z } from 'zod';

export const proposalSchema = z.object({
  senderName: z.string().min(1, 'Required'),
  senderCompany: z.string().optional(),
  clientName: z.string().min(1, 'Required'),
  projectTitle: z.string().min(1, 'Required'),
  problemStatement: z.string().min(10, 'Required'),
  proposedSolution: z.string().min(10, 'Required'),
  timeline: z.string().min(1, 'Required'),
  budget: z.string().min(1, 'Required'),
  qualifications: z.string().optional(),
  nextSteps: z.string().optional(),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;

export const proposalFields = [
  { name: 'senderName', label: 'Your Name', type: 'input', placeholder: 'Jane Smith' },
  { name: 'senderCompany', label: 'Your Company', type: 'input', placeholder: 'Acme Design Co.', optional: true },
  { name: 'clientName', label: 'Client Name', type: 'input', placeholder: 'BigCorp Inc.' },
  { name: 'projectTitle', label: 'Project Title', type: 'input', placeholder: 'Brand Redesign 2025' },
  { name: 'problemStatement', label: 'Problem / Challenge', type: 'textarea', placeholder: 'Describe the problem you are solving…' },
  { name: 'proposedSolution', label: 'Proposed Solution', type: 'textarea', placeholder: 'Describe your approach…' },
  { name: 'timeline', label: 'Project Timeline', type: 'input', placeholder: '8 weeks, starting Feb 1' },
  { name: 'budget', label: 'Budget', type: 'input', placeholder: '$12,000 USD' },
  { name: 'qualifications', label: 'Qualifications / Past Work', type: 'textarea', placeholder: 'Why you are the right choice…', optional: true },
  { name: 'nextSteps', label: 'Next Steps', type: 'textarea', placeholder: 'What happens after they say yes…', optional: true },
];

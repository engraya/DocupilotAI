import { z } from 'zod';

export const scopeSchema = z.object({
  projectTitle: z.string().min(1, 'Required'),
  clientName: z.string().min(1, 'Required'),
  preparedBy: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  overview: z.string().min(10, 'Required'),
  objectives: z.string().min(10, 'Required'),
  deliverables: z.string().min(10, 'Required'),
  outOfScope: z.string().optional(),
  timeline: z.string().min(1, 'Required'),
  assumptions: z.string().optional(),
  budget: z.string().optional(),
});

export type ScopeFormData = z.infer<typeof scopeSchema>;

export const scopeFields = [
  { name: 'projectTitle', label: 'Project Title', type: 'input', placeholder: 'E-commerce Platform Build' },
  { name: 'clientName', label: 'Client Name', type: 'input', placeholder: 'RetailCo Inc.' },
  { name: 'preparedBy', label: 'Prepared By', type: 'input', placeholder: 'Jane Smith / Acme Agency' },
  { name: 'date', label: 'Date', type: 'input', placeholder: '2025-01-15' },
  { name: 'overview', label: 'Project Overview', type: 'textarea', placeholder: 'High-level description of the project…' },
  { name: 'objectives', label: 'Objectives', type: 'textarea', placeholder: 'List the main goals and success criteria…' },
  { name: 'deliverables', label: 'Deliverables', type: 'textarea', placeholder: 'List all tangible outputs…' },
  { name: 'outOfScope', label: 'Out of Scope', type: 'textarea', placeholder: 'What is explicitly excluded…', optional: true },
  { name: 'timeline', label: 'Timeline / Milestones', type: 'textarea', placeholder: 'Phase 1: Jan–Feb, Phase 2: Mar–Apr…' },
  { name: 'assumptions', label: 'Assumptions', type: 'textarea', placeholder: 'Key assumptions the project relies on…', optional: true },
  { name: 'budget', label: 'Budget', type: 'input', placeholder: '$25,000 USD', optional: true },
];

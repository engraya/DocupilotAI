import { z } from 'zod';

export const coverLetterSchema = z.object({
  applicantName: z.string().min(1, 'Required'),
  applicantEmail: z.string().email(),
  jobTitle: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  hiringManagerName: z.string().optional(),
  whyInterested: z.string().min(20, 'Required'),
  relevantExperience: z.string().min(20, 'Required'),
  uniqueValue: z.string().optional(),
  callToAction: z.string().optional(),
});

export type CoverLetterFormData = z.infer<typeof coverLetterSchema>;

export const coverLetterFields = [
  { name: 'applicantName', label: 'Your Name', type: 'input', placeholder: 'Jane Smith' },
  { name: 'applicantEmail', label: 'Your Email', type: 'input', placeholder: 'jane@example.com' },
  { name: 'jobTitle', label: 'Job Title', type: 'input', placeholder: 'Senior Product Manager' },
  { name: 'companyName', label: 'Company Name', type: 'input', placeholder: 'Stripe' },
  { name: 'hiringManagerName', label: 'Hiring Manager Name', type: 'input', placeholder: 'John Doe (optional)', optional: true },
  { name: 'whyInterested', label: 'Why You Are Interested', type: 'textarea', placeholder: 'Why this role and company excite you…' },
  { name: 'relevantExperience', label: 'Relevant Experience', type: 'textarea', placeholder: 'Your most relevant achievements and skills…' },
  { name: 'uniqueValue', label: 'Your Unique Value', type: 'textarea', placeholder: 'What sets you apart…', optional: true },
  { name: 'callToAction', label: 'Call to Action', type: 'input', placeholder: 'I look forward to discussing…', optional: true },
];

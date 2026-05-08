import { z } from 'zod';

export const resumeSchema = z.object({
  fullName: z.string().min(1, 'Required'),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  targetRole: z.string().min(1, 'Required'),
  summary: z.string().min(20, 'Required'),
  experience: z.string().min(20, 'Describe your work experience'),
  education: z.string().min(10, 'Required'),
  skills: z.string().min(5, 'Required'),
  certifications: z.string().optional(),
  achievements: z.string().optional(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

export const resumeFields = [
  { name: 'fullName', label: 'Full Name', type: 'input', placeholder: 'Jane Smith' },
  { name: 'email', label: 'Email', type: 'input', placeholder: 'jane@example.com' },
  { name: 'phone', label: 'Phone', type: 'input', placeholder: '+1 555-000-1234', optional: true },
  { name: 'location', label: 'Location', type: 'input', placeholder: 'San Francisco, CA', optional: true },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'input', placeholder: 'linkedin.com/in/janesmith', optional: true },
  { name: 'targetRole', label: 'Target Role', type: 'input', placeholder: 'Senior Frontend Engineer' },
  { name: 'summary', label: 'Professional Summary', type: 'textarea', placeholder: '3–4 sentences about your experience and value…' },
  { name: 'experience', label: 'Work Experience', type: 'textarea', placeholder: 'Company, Role, Dates, Key achievements (use bullet points)…' },
  { name: 'education', label: 'Education', type: 'textarea', placeholder: 'Degree, School, Year…' },
  { name: 'skills', label: 'Skills', type: 'textarea', placeholder: 'React, TypeScript, Node.js, AWS…' },
  { name: 'certifications', label: 'Certifications', type: 'textarea', placeholder: 'AWS Certified, Google Cloud…', optional: true },
  { name: 'achievements', label: 'Awards / Achievements', type: 'textarea', placeholder: 'Hackathon winner, Forbes 30 Under 30…', optional: true },
];

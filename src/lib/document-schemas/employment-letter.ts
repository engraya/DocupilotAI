import { z } from 'zod';

export const employmentLetterSchema = z.object({
  letterType: z.enum(['offer', 'verification', 'experience']).default('offer'),
  employeeName: z.string().min(1, 'Required'),
  jobTitle: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  hrName: z.string().min(1, 'Required'),
  startDate: z.string().optional(),
  salary: z.string().optional(),
  employmentType: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type EmploymentLetterFormData = z.infer<typeof employmentLetterSchema>;

export const employmentLetterFields = [
  {
    name: 'letterType',
    label: 'Letter Type',
    type: 'select',
    options: [
      { value: 'offer', label: 'Offer Letter' },
      { value: 'verification', label: 'Employment Verification' },
      { value: 'experience', label: 'Experience Letter' },
    ],
  },
  { name: 'employeeName', label: 'Employee Name', type: 'input', placeholder: 'Jane Smith' },
  { name: 'jobTitle', label: 'Job Title', type: 'input', placeholder: 'Senior Engineer' },
  { name: 'companyName', label: 'Company Name', type: 'input', placeholder: 'Acme Corp' },
  { name: 'hrName', label: 'HR / Signatory Name', type: 'input', placeholder: 'John HR Manager' },
  { name: 'startDate', label: 'Start Date', type: 'input', placeholder: '2025-02-01', optional: true },
  { name: 'salary', label: 'Salary / Compensation', type: 'input', placeholder: '$90,000/year', optional: true },
  { name: 'employmentType', label: 'Employment Type', type: 'input', placeholder: 'Full-time, Permanent', optional: true },
  { name: 'additionalInfo', label: 'Additional Information', type: 'textarea', placeholder: 'Benefits, relocation package, etc.', optional: true },
];

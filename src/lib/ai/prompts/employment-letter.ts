export function buildEmploymentLetterPrompt(data: Record<string, unknown>): string {
  const typeLabels: Record<string, string> = {
    offer: 'job offer letter',
    verification: 'employment verification letter',
    experience: 'experience / reference letter',
  };

  const letterType = (data.letterType as string) || 'offer';

  return `Generate a formal ${typeLabels[letterType] || 'employment letter'} with the following details:

Company: ${data.companyName}
HR / Signatory: ${data.hrName}
Employee Name: ${data.employeeName}
Job Title: ${data.jobTitle}
Start Date: ${data.startDate || 'To be confirmed'}
Salary / Compensation: ${data.salary || 'As discussed'}
Employment Type: ${data.employmentType || 'Full-time'}
Additional Information: ${data.additionalInfo || 'None'}

Generate a complete, formal ${typeLabels[letterType]} on company letterhead format, including: Company Header, Date, Employee Address Block, Formal Greeting, ${letterType === 'offer' ? 'Role Details, Compensation & Benefits, Start Date, Acceptance Instructions' : letterType === 'verification' ? 'Employment Confirmation, Role & Dates, Compensation (if required)' : 'Duration of Employment, Role & Responsibilities, Performance Assessment'}, Closing, and Signature Block. Use professional corporate language.`;
}

export function buildCoverLetterPrompt(data: Record<string, unknown>): string {
  return `Generate a compelling, personalized cover letter with the following details:

Applicant: ${data.applicantName} (${data.applicantEmail})
Position: ${data.jobTitle}
Company: ${data.companyName}
Hiring Manager: ${data.hiringManagerName || 'Hiring Manager'}

Why Interested:
${data.whyInterested}

Relevant Experience:
${data.relevantExperience}

Unique Value: ${data.uniqueValue || 'To be highlighted'}
Call to Action: ${data.callToAction || 'I look forward to discussing this opportunity.'}

Generate a professional cover letter with the following sections: Header (contact info & date), Salutation, Opening Paragraph (hook + role interest), Body Paragraph 1 (relevant experience & achievements), Body Paragraph 2 (why this company & cultural fit), Closing Paragraph (call to action), and Professional Sign-off. Keep it concise, engaging, and no longer than one page.`;
}

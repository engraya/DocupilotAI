export function buildProposalPrompt(data: Record<string, unknown>): string {
  return `Generate a compelling business proposal with the following information:

Prepared By: ${data.senderName}${data.senderCompany ? ` (${data.senderCompany})` : ''}
Prepared For: ${data.clientName}
Project: ${data.projectTitle}

Problem/Challenge:
${data.problemStatement}

Proposed Solution:
${data.proposedSolution}

Timeline: ${data.timeline}
Budget: ${data.budget}

Qualifications: ${data.qualifications || 'To be included'}
Next Steps: ${data.nextSteps || 'Schedule a discovery call'}

Generate a professional proposal document including: Executive Summary, Problem Statement, Proposed Solution & Approach, Project Scope, Timeline & Milestones, Investment & Pricing, Our Qualifications, Terms & Conditions, and Next Steps.`;
}

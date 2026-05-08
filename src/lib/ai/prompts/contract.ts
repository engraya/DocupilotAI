export function buildContractPrompt(data: Record<string, unknown>): string {
  return `Generate a professional freelancer services contract with the following details:

PARTIES:
Freelancer: ${data.freelancerName} (${data.freelancerEmail})
Client: ${data.clientName} (${data.clientEmail})

PROJECT:
Title: ${data.projectTitle}
Description: ${data.projectDescription}
Start Date: ${data.startDate}
End Date: ${data.endDate || 'Upon project completion'}

FINANCIAL:
Total Payment: ${data.paymentAmount}
Payment Schedule: ${data.paymentSchedule}

DELIVERABLES:
${data.deliverables}

Revision Policy: ${data.revisions || 'Up to 2 rounds of revisions'}
Governing Law: ${data.governingLaw || 'To be specified'}

Generate a comprehensive freelancer contract including: Parties & Recitals, Scope of Work, Deliverables, Payment Terms, Intellectual Property, Revisions & Changes, Confidentiality, Termination, Governing Law, and Signatures section.`;
}

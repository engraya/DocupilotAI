export function buildNDAPrompt(data: Record<string, unknown>): string {
  return `Generate a professional Non-Disclosure Agreement (NDA) with the following details:

Disclosing Party: ${data.disclosingParty}
Receiving Party: ${data.receivingParty}
Purpose: ${data.purpose}
Effective Date: ${data.effectiveDate}
Confidentiality Duration: ${data.duration}
Governing Law: ${data.governingLaw || 'To be specified'}
Exclusions: ${data.exclusions || 'Standard exclusions apply'}

Generate a complete NDA including: Parties & Background, Definition of Confidential Information, Obligations of Receiving Party, Exclusions from Confidentiality, Term & Duration, Return of Information, Remedies, and Governing Law & Signatures.`;
}

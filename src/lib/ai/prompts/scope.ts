export function buildScopePrompt(data: Record<string, unknown>): string {
  return `Generate a detailed project scope of work document with the following information:

Project: ${data.projectTitle}
Client: ${data.clientName}
Prepared By: ${data.preparedBy}
Date: ${data.date}

Overview:
${data.overview}

Objectives:
${data.objectives}

Deliverables:
${data.deliverables}

Out of Scope: ${data.outOfScope || 'Not specified'}
Timeline & Milestones: ${data.timeline}
Assumptions: ${data.assumptions || 'None'}
Budget: ${data.budget || 'To be confirmed'}

Generate a comprehensive project scope document including: Project Overview, Goals & Objectives, In-Scope Work & Deliverables, Out of Scope, Project Timeline & Milestones, Assumptions & Dependencies, Budget Overview, Approval & Sign-off.`;
}

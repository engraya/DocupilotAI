export function buildResumePrompt(data: Record<string, unknown>): string {
  return `Generate a professional resume/CV for the following candidate:

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Location: ${data.location || 'N/A'}
LinkedIn: ${data.linkedin || 'N/A'}
Target Role: ${data.targetRole}

Professional Summary:
${data.summary}

Work Experience:
${data.experience}

Education:
${data.education}

Skills:
${data.skills}

Certifications: ${data.certifications || 'None'}
Achievements: ${data.achievements || 'None'}

Generate a polished resume with clearly formatted sections: Contact Information, Professional Summary, Work Experience, Education, Skills, Certifications (if any), and Achievements (if any). Make each bullet point achievement-oriented and quantified where possible.`;
}

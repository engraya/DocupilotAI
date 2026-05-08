export type DocumentType =
  | 'invoice'
  | 'contract'
  | 'nda'
  | 'proposal'
  | 'quotation'
  | 'scope'
  | 'resume'
  | 'cover-letter'
  | 'employment-letter';

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
}

export type AIEditAction =
  | 'rewrite'
  | 'simplify'
  | 'make_professional'
  | 'summarize'
  | 'translate';

export interface DocumentMeta {
  id: string;
  user_id: string;
  type: DocumentType;
  title: string;
  form_data: Record<string, unknown>;
  content_json: DocumentSection[];
  status: 'draft' | 'final';
  created_at: string;
  updated_at: string;
}

export interface TemplateMeta {
  id: string;
  user_id: string;
  name: string;
  type: DocumentType;
  description: string | null;
  content: DocumentSection[];
  is_public: boolean;
  category: string | null;
  use_count: number;
  created_at: string;
}

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  invoice: 'Invoice',
  contract: 'Freelancer Contract',
  nda: 'NDA',
  proposal: 'Proposal',
  quotation: 'Quotation',
  scope: 'Project Scope',
  resume: 'Resume',
  'cover-letter': 'Cover Letter',
  'employment-letter': 'Employment Letter',
};

export const DOCUMENT_TYPE_DESCRIPTIONS: Record<DocumentType, string> = {
  invoice: 'Professional billing document for clients',
  contract: 'Freelance service agreement with payment terms',
  nda: 'Non-disclosure agreement to protect confidential information',
  proposal: 'Business proposal to win clients and projects',
  quotation: 'Price quote for products or services',
  scope: 'Project scope of work with deliverables and timeline',
  resume: 'Professional resume / CV for job applications',
  'cover-letter': 'Compelling cover letter for job applications',
  'employment-letter': 'Employment verification or offer letter',
};

export const DOCUMENT_TYPE_ICONS: Record<DocumentType, string> = {
  invoice: '🧾',
  contract: '📋',
  nda: '🔒',
  proposal: '💼',
  quotation: '💰',
  scope: '📐',
  resume: '👤',
  'cover-letter': '✉️',
  'employment-letter': '🏢',
};

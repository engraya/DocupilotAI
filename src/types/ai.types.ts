import type { DocumentType, DocumentSection, AIEditAction } from './document.types';

export interface AIGenerateRequest {
  documentType: DocumentType;
  formData: Record<string, unknown>;
}

export interface AIGenerateResponse {
  sections: DocumentSection[];
  title: string;
}

export interface AIEditRequest {
  action: AIEditAction;
  sectionContent: string;
  targetLanguage?: string;
}

export interface AIEditResponse {
  content: string;
}

export class AIError extends Error {
  retryable: boolean;
  constructor(message: string, retryable = false) {
    super(message);
    this.name = 'AIError';
    this.retryable = retryable;
  }
}

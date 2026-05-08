'use client';

import { useState } from 'react';
import type { DocumentMeta, DocumentType } from '@/types/document.types';

export function useAIGenerate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (
    documentType: DocumentType,
    formData: Record<string, unknown>
  ): Promise<DocumentMeta | null> => {
    setLoading(true);
    setError(null);

    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentType, formData }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      if (data.error === 'limit_reached') {
        setError('limit_reached');
      } else {
        setError(data.error ?? 'Generation failed. Please try again.');
      }
      return null;
    }

    const data = await res.json();
    return data.document as DocumentMeta;
  };

  return { generate, loading, error };
}

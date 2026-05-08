import { TopNav } from '@/components/dashboard/TopNav';
import { DocumentTypePicker } from '@/components/documents/DocumentTypePicker';
import { DocumentForm } from '@/components/documents/DocumentForm';
import { DOCUMENT_TYPE_LABELS } from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';

interface Props {
  searchParams: Promise<{ type?: string }>;
}

export default async function NewDocumentPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const documentType = type as DocumentType | undefined;

  const validTypes: DocumentType[] = [
    'invoice', 'contract', 'nda', 'proposal', 'quotation',
    'scope', 'resume', 'cover-letter', 'employment-letter',
  ];
  const isValidType = documentType && validTypes.includes(documentType);

  if (!isValidType) {
    return (
      <>
        <TopNav title="New Document" />
        <div className="p-6">
          <p className="text-muted-foreground mb-6">Choose a document type to get started:</p>
          <DocumentTypePicker />
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav title={`New ${DOCUMENT_TYPE_LABELS[documentType]}`} />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-6 text-sm">
            Fill in the details below and AI will generate your professional document.
          </p>
          <DocumentForm documentType={documentType} />
        </div>
      </div>
    </>
  );
}

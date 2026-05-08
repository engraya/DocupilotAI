'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Copy, Loader2, ChevronDown } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { DocumentSection } from '@/types/document.types';
import { UpgradeDialog } from '@/components/billing/UpgradeDialog';
import { useSubscription } from '@/hooks/useSubscription';
import { cn } from '@/lib/utils';

interface ExportMenuProps {
  documentId: string;
  sections: DocumentSection[];
  title: string;
}

export function ExportMenu({ documentId, sections, title }: ExportMenuProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isPremium } = useSubscription();

  const downloadPDF = async () => {
    setLoading('pdf');
    const res = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId }),
    });
    if (res.ok) {
      const blob = await res.blob();
      saveAs(blob, `${title}.pdf`);
    }
    setLoading(null);
  };

  const downloadDOCX = async () => {
    if (!isPremium) {
      setShowUpgrade(true);
      return;
    }
    setLoading('docx');
    const res = await fetch('/api/export/docx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId }),
    });
    if (res.ok) {
      const blob = await res.blob();
      saveAs(blob, `${title}.docx`);
    }
    setLoading(null);
  };

  const copyText = async () => {
    const text = sections.map((s) => `${s.title}\n\n${s.content}`).join('\n\n---\n\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          disabled={!!loading}
        >
          <Download className="h-4 w-4 mr-2" />
          Export
          <ChevronDown className="h-3 w-3 ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={downloadPDF} disabled={!!loading}>
            {loading === 'pdf' ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            Download PDF
          </DropdownMenuItem>

          <DropdownMenuItem onClick={downloadDOCX} disabled={!!loading}>
            {loading === 'docx' ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2 text-blue-600" />
            )}
            Download DOCX
            {!isPremium && (
              <span className="ml-auto text-xs text-amber-600">Premium</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyText}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Text'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

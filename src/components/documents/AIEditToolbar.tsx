'use client';

import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Loader2, RefreshCw, BookOpen, Briefcase, AlignLeft, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AIEditAction } from '@/types/document.types';

const LANGUAGES = ['Spanish', 'French', 'German', 'Arabic', 'Chinese', 'Japanese', 'Portuguese', 'Italian'];

interface AIEditToolbarProps {
  sectionContent: string;
  onUpdate: (newContent: string) => void;
  onUndo: () => void;
  canUndo: boolean;
}

export function AIEditToolbar({ sectionContent, onUpdate, onUndo, canUndo }: AIEditToolbarProps) {
  const [loading, setLoading] = useState<AIEditAction | null>(null);

  const applyEdit = async (action: AIEditAction, targetLanguage?: string) => {
    setLoading(action);

    const res = await fetch('/api/ai/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, sectionContent, targetLanguage }),
    });

    setLoading(null);

    if (res.ok) {
      const { content } = await res.json();
      onUpdate(content);
    }
  };

  const isLoading = loading !== null;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs"
        onClick={() => applyEdit('rewrite')}
        disabled={isLoading}
      >
        {loading === 'rewrite' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
        Rewrite
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs"
        onClick={() => applyEdit('simplify')}
        disabled={isLoading}
      >
        {loading === 'simplify' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <BookOpen className="h-3 w-3 mr-1" />}
        Simplify
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs"
        onClick={() => applyEdit('make_professional')}
        disabled={isLoading}
      >
        {loading === 'make_professional' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Briefcase className="h-3 w-3 mr-1" />}
        Professional
      </Button>

      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs"
        onClick={() => applyEdit('summarize')}
        disabled={isLoading}
      >
        {loading === 'summarize' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <AlignLeft className="h-3 w-3 mr-1" />}
        Summarize
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-7 text-xs')}
          disabled={isLoading}
        >
          {loading === 'translate' ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
          Translate
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem key={lang} onClick={() => applyEdit('translate', lang)}>
              {lang}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {canUndo && (
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs ml-auto"
          onClick={onUndo}
        >
          Undo
        </Button>
      )}
    </div>
  );
}

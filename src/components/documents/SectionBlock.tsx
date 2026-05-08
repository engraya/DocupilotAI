'use client';

import { useRef, useState, useCallback } from 'react';
import { AIEditToolbar } from './AIEditToolbar';
import type { DocumentSection } from '@/types/document.types';

interface SectionBlockProps {
  section: DocumentSection;
  onChange: (id: string, updated: Partial<DocumentSection>) => void;
}

export function SectionBlock({ section, onChange }: SectionBlockProps) {
  const [hovered, setHovered] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const previousContent = useRef<string | null>(null);

  const handleContentChange = (value: string) => {
    onChange(section.id, { content: value });
  };

  const handleTitleChange = (value: string) => {
    onChange(section.id, { title: value });
  };

  const handleAIUpdate = useCallback(
    (newContent: string) => {
      previousContent.current = section.content;
      setCanUndo(true);
      onChange(section.id, { content: newContent });

      setTimeout(() => {
        setCanUndo(false);
        previousContent.current = null;
      }, 6000);
    },
    [section.content, section.id, onChange]
  );

  const handleUndo = () => {
    if (previousContent.current !== null) {
      onChange(section.id, { content: previousContent.current });
      previousContent.current = null;
      setCanUndo(false);
    }
  };

  return (
    <div
      className="border rounded-xl p-5 space-y-3 transition-all hover:shadow-sm hover:border-primary/25 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        className="w-full font-semibold text-base bg-transparent border-none outline-none focus:outline-none text-foreground placeholder:text-muted-foreground/50"
        value={section.title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Section title"
      />

      <textarea
        className="w-full text-sm text-muted-foreground bg-transparent border-none outline-none resize-none focus:outline-none min-h-[80px] leading-relaxed"
        value={section.content}
        onChange={(e) => {
          handleContentChange(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
        placeholder="Section content…"
        rows={4}
      />

      {(hovered || canUndo) && (
        <div className="border-t border-dashed border-border/60 pt-2.5">
          <AIEditToolbar
            sectionContent={section.content}
            onUpdate={handleAIUpdate}
            onUndo={handleUndo}
            canUndo={canUndo}
          />
        </div>
      )}
    </div>
  );
}

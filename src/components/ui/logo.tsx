import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-sm">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2.5C2 1.67 2.67 1 3.5 1H8.5L12 4.5V11.5C12 12.33 11.33 13 10.5 13H3.5C2.67 13 2 12.33 2 11.5V2.5Z" fill="white" fillOpacity="0.9"/>
          <path d="M8.5 1V4.5H12" stroke="white" strokeWidth="1" strokeOpacity="0.5" fill="none"/>
          <path d="M4.5 7.5H9.5M4.5 9.5H7.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6"/>
        </svg>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="font-bold text-base tracking-tight">DocuPilot</span>
        <span className="font-bold text-base tracking-tight text-primary">AI</span>
      </div>
    </div>
  );
}

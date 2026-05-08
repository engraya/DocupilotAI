import { Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { UserProfile } from '@/hooks/useUser';

export function UsageBadge({ profile }: { profile: UserProfile }) {
  if (profile.tier === 'premium' || profile.tier === 'admin') {
    return (
      <div className="rounded-lg bg-primary/8 border border-primary/15 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <p className="text-xs font-semibold text-primary">Unlimited documents</p>
        </div>
      </div>
    );
  }

  const FREE_LIMIT = 3;
  const used = profile.usage_count;
  const pct = Math.min(100, (used / FREE_LIMIT) * 100);
  const isWarning = pct >= 80;

  return (
    <div className="rounded-lg bg-muted px-3 py-2.5 space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground font-medium">Monthly usage</span>
        <span className={cn('font-semibold', isWarning && 'text-amber-600')}>
          {used} / {FREE_LIMIT}
        </span>
      </div>
      <Progress
        value={pct}
        className={cn(
          'h-1.5',
          isWarning && '**:data-[slot=progress-indicator]:bg-amber-500'
        )}
      />
    </div>
  );
}

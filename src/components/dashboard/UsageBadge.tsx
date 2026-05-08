import { Progress } from '@/components/ui/progress';
import type { UserProfile } from '@/hooks/useUser';

export function UsageBadge({ profile }: { profile: UserProfile }) {
  if (profile.tier === 'premium' || profile.tier === 'admin') {
    return (
      <div className="rounded-md bg-primary/10 px-3 py-2">
        <p className="text-xs font-medium text-primary">Unlimited documents</p>
      </div>
    );
  }

  const FREE_LIMIT = 3;
  const used = profile.usage_count;
  const pct = Math.min(100, (used / FREE_LIMIT) * 100);

  return (
    <div className="rounded-md bg-muted px-3 py-2 space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Documents this month</span>
        <span className="font-medium">
          {used} / {FREE_LIMIT}
        </span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  );
}

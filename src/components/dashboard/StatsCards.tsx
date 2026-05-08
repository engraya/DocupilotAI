import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserProfile } from '@/hooks/useUser';

export function StatsCards({
  profile,
  documentCount,
}: {
  profile: UserProfile;
  documentCount: number;
}) {
  const isPremium = profile.tier === 'premium' || profile.tier === 'admin';
  const remaining = isPremium ? '∞' : String(Math.max(0, 3 - profile.usage_count));
  const remainingNum = isPremium ? Infinity : Math.max(0, 3 - profile.usage_count);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Documents
            </CardTitle>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{documentCount}</div>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining This Month
            </CardTitle>
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center',
                remainingNum === 0
                  ? 'bg-destructive/10'
                  : 'bg-amber-500/10'
              )}
            >
              <Zap
                className={cn(
                  'h-4 w-4',
                  remainingNum === 0 ? 'text-destructive' : 'text-amber-500'
                )}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">{remaining}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {isPremium ? 'Unlimited plan' : 'of 3 free documents'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Plan
            </CardTitle>
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Crown className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight capitalize">{profile.tier}</div>
          {!isPremium && (
            <Link href="/settings/billing">
              <p className="text-xs text-primary mt-1 hover:underline cursor-pointer">
                Upgrade to Premium →
              </p>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Crown } from 'lucide-react';
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="h-4 w-4" /> Total Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{documentCount}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4" /> Remaining This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{remaining}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Crown className="h-4 w-4" /> Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold capitalize">{profile.tier}</p>
        </CardContent>
      </Card>
    </div>
  );
}

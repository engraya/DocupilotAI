import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  CreditCard,
  Shield,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const tier = profile?.tier ?? 'free';
  const isPremium = tier === 'premium' || tier === 'admin';
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : (profile?.email?.[0]?.toUpperCase() ?? 'U');

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  return (
    <>
      <TopNav title="Settings" />

      <div className="p-6 max-w-2xl space-y-6">

        {/* Profile hero card */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="h-20 bg-linear-to-br from-primary/20 via-primary/10 to-transparent" />
          <div className="px-6 pb-6 -mt-8">
            <div className="flex items-end justify-between gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-lg ring-4 ring-card shrink-0">
                {initials}
              </div>
              <Badge
                variant={isPremium ? 'default' : 'outline'}
                className="mb-1 gap-1.5 px-2.5 py-1"
              >
                {isPremium && <Sparkles className="h-3 w-3" />}
                <span className="capitalize">{tier}</span>
              </Badge>
            </div>
            <div className="mt-3">
              <h2 className="text-lg font-semibold leading-tight">
                {profile?.full_name ?? 'User'}
              </h2>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
              {memberSince && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  Member since {memberSince}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Account information */}
        <div className="rounded-xl border bg-card">
          <div className="px-6 py-4 flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Account Information</h3>
          </div>
          <Separator />
          <div className="px-6 py-2 divide-y divide-border">
            <div className="flex items-center gap-3 py-3.5">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
                <p className="text-sm font-medium truncate">{profile?.full_name ?? 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3.5">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Email Address</p>
                <p className="text-sm font-medium truncate">{profile?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-3.5">
              <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Account Type</p>
                <p className="text-sm font-medium capitalize">{tier} Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage summary */}
        {!isPremium && (
          <div className="rounded-xl border bg-card">
            <div className="px-6 py-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Usage This Month</h3>
            </div>
            <Separator />
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Documents generated</span>
                <span className="text-sm font-semibold tabular-nums">
                  {profile?.usage_count ?? 0}
                  <span className="text-muted-foreground font-normal"> / 3</span>
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(((profile?.usage_count ?? 0) / 3) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {3 - (profile?.usage_count ?? 0)} document{3 - (profile?.usage_count ?? 0) !== 1 ? 's' : ''} remaining this month
              </p>
            </div>
          </div>
        )}

        {/* Billing section */}
        <div className="rounded-xl border bg-card">
          <div className="px-6 py-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Subscription & Billing</h3>
          </div>
          <Separator />
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium capitalize">{tier} Plan</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPremium
                  ? 'Unlimited document generation'
                  : 'Up to 3 documents per month · Upgrade for unlimited access'}
              </p>
            </div>
            <Link href="/settings/billing" className="shrink-0">
              <Button variant="outline" size="sm" className="gap-1.5">
                Manage
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

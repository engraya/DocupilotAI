import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { PlanCard } from '@/components/billing/PlanCard';
import { BillingPortalButton } from '@/components/billing/BillingPortalButton';
import { Badge } from '@/components/ui/badge';
import { PLANS } from '@/types/stripe.types';
import { formatDate } from '@/lib/utils';

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single(),
  ]);

  const tier = profile?.tier ?? 'free';
  const isPremium = tier === 'premium' || tier === 'admin';

  return (
    <>
      <TopNav title="Billing" />
      <div className="p-6 max-w-3xl space-y-8">
        <section>
          <h2 className="text-base font-semibold mb-4">Current Plan</h2>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium capitalize">{tier} Plan</span>
                <Badge variant={isPremium ? 'default' : 'outline'}>{tier}</Badge>
              </div>
              {subscription && (
                <p className="text-sm text-muted-foreground">
                  Renews {formatDate(subscription.current_period_end)}
                  {subscription.cancel_at_period_end && ' · Cancels at end of period'}
                </p>
              )}
              {!isPremium && (
                <p className="text-sm text-muted-foreground">
                  {profile?.usage_count ?? 0}/3 documents used this month
                </p>
              )}
            </div>
            {isPremium && <BillingPortalButton />}
          </div>
        </section>

        {!isPremium && (
          <section>
            <h2 className="text-base font-semibold mb-4">Upgrade Your Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} currentTier={tier} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

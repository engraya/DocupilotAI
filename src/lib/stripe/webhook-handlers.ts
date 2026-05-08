import type Stripe from 'stripe';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: SupabaseClient
) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (!profile) return;

  await supabase.from('subscriptions').upsert({
    user_id: profile.id,
    stripe_subscription_id: subscriptionId,
    stripe_price_id: process.env.STRIPE_PREMIUM_PRICE_ID!,
    plan: 'premium',
    status: 'active',
    current_period_start: new Date().toISOString(),
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }, { onConflict: 'stripe_subscription_id' });

  await supabase
    .from('profiles')
    .update({ tier: 'premium' })
    .eq('id', profile.id);
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: SupabaseClient
) {
  const item = subscription.items.data[0];
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: item?.current_period_start
        ? new Date(item.current_period_start * 1000).toISOString()
        : new Date().toISOString(),
      current_period_end: item?.current_period_end
        ? new Date(item.current_period_end * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id);
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: SupabaseClient
) {
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!sub) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  await supabase
    .from('profiles')
    .update({ tier: 'free' })
    .eq('id', sub.user_id);
}

export async function handleInvoicePaid(
  invoice: Stripe.Invoice,
  supabase: SupabaseClient
) {
  const subscriptionId = invoice.parent?.subscription_details?.subscription;
  const subscriptionIdStr = typeof subscriptionId === 'string' ? subscriptionId : subscriptionId?.id;
  if (!subscriptionIdStr) return;

  await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_end: invoice.lines.data[0]?.period?.end
        ? new Date(invoice.lines.data[0].period.end * 1000).toISOString()
        : undefined,
    })
    .eq('stripe_subscription_id', subscriptionIdStr);
}

export async function handleInvoicePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: SupabaseClient
) {
  const subscriptionId = invoice.parent?.subscription_details?.subscription;
  const subscriptionIdStr = typeof subscriptionId === 'string' ? subscriptionId : subscriptionId?.id;
  if (!subscriptionIdStr) return;

  await supabase
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionIdStr);
}

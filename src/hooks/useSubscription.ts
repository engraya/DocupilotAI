'use client';

import { useUser } from './useUser';
import { checkUsageLimit } from '@/lib/utils';

export function useSubscription() {
  const { profile, loading } = useUser();

  const isPremium = profile?.tier === 'premium' || profile?.tier === 'admin';
  const usageLimit = profile ? checkUsageLimit(profile) : { allowed: true, remaining: 3 };

  return {
    tier: profile?.tier ?? 'free',
    isPremium,
    usageCount: profile?.usage_count ?? 0,
    usageAllowed: usageLimit.allowed,
    usageRemaining: usageLimit.remaining,
    loading,
  };
}

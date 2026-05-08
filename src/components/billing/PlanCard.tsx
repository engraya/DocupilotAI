'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Plan } from '@/types/stripe.types';

interface PlanCardProps {
  plan: Plan;
  currentTier: string;
  onUpgrade?: () => void;
}

export function PlanCard({ plan, currentTier, onUpgrade }: PlanCardProps) {
  const [loading, setLoading] = useState(false);
  const isCurrent = currentTier === plan.id;
  const isPremiumPlan = plan.id === 'premium';

  const handleUpgrade = async () => {
    if (!onUpgrade) {
      setLoading(true);
      const res = await fetch('/api/stripe/checkout', { method: 'POST' });
      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      }
      setLoading(false);
      return;
    }
    onUpgrade();
  };

  return (
    <Card
      className={cn(
        'flex flex-col relative overflow-hidden',
        isPremiumPlan && 'ring-2 ring-primary shadow-xl shadow-primary/15'
      )}
    >
      {isPremiumPlan ? (
        <div className="bg-brand-gradient px-6 py-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              {plan.name}
            </span>
            <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-full font-medium">
              Most Popular
            </span>
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-4xl font-bold text-white">${plan.price}</span>
            {plan.interval && (
              <span className="text-white/70 text-sm">/{plan.interval}</span>
            )}
          </div>
        </div>
      ) : (
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{plan.name}</CardTitle>
            {isCurrent && <Badge variant="outline">Current Plan</Badge>}
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-4xl font-bold">
              {plan.price === 0 ? 'Free' : `$${plan.price}`}
            </span>
            {plan.price === 0 ? (
              <span className="text-muted-foreground text-sm">forever</span>
            ) : plan.interval ? (
              <span className="text-muted-foreground text-sm">/{plan.interval}</span>
            ) : null}
          </div>
        </CardHeader>
      )}

      <CardContent className={cn('flex-1 pt-4', isPremiumPlan && 'pt-5')}>
        <ul className="space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm">
              <div
                className={cn(
                  'w-4 h-4 rounded-full flex items-center justify-center shrink-0',
                  isPremiumPlan ? 'bg-primary/10' : 'bg-muted'
                )}
              >
                <Check
                  className={cn(
                    'h-2.5 w-2.5',
                    isPremiumPlan ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        {isCurrent ? (
          <Button variant="outline" className="w-full" disabled>
            Current Plan
          </Button>
        ) : isPremiumPlan ? (
          <Button
            className="w-full gap-2 shadow-md shadow-primary/20"
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Upgrade to Premium
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

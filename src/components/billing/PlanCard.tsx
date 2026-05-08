'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
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
    <Card className={isPremiumPlan ? 'border-primary shadow-md relative overflow-hidden' : ''}>
      {isPremiumPlan && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
          Most Popular
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.name}</CardTitle>
          {isCurrent && <Badge variant="outline">Current Plan</Badge>}
        </div>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-bold">
            {plan.price === 0 ? 'Free' : `$${plan.price}`}
          </span>
          {plan.interval && (
            <span className="text-muted-foreground text-sm">/{plan.interval}</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0" />
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
          <Button className="w-full" onClick={handleUpgrade} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Upgrade to Premium
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

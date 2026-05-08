'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { PlanCard } from './PlanCard';
import { PLANS } from '@/types/stripe.types';
import { useSubscription } from '@/hooks/useSubscription';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeDialog({ open, onOpenChange }: UpgradeDialogProps) {
  const { tier } = useSubscription();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upgrade to Premium</DialogTitle>
          <DialogDescription>
            You&apos;ve reached your free plan limit. Upgrade for unlimited documents and more features.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <PlanCard
            plan={PLANS.find((p) => p.id === 'premium')!}
            currentTier={tier}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

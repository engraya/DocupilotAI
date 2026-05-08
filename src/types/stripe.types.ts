export type PlanTier = 'free' | 'premium' | 'admin';

export interface Plan {
  id: PlanTier;
  name: string;
  price: number;
  interval: 'month' | null;
  features: string[];
  limit: number | null;
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: null,
    features: [
      '3 documents per month',
      'All document types',
      'PDF export',
      'Shareable links',
      'AI editing assistant',
    ],
    limit: 3,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19,
    interval: 'month',
    features: [
      'Unlimited documents',
      'All document types',
      'PDF & DOCX export',
      'Shareable links',
      'AI editing assistant',
      'Template marketplace',
      'Priority AI generation',
    ],
    limit: null,
  },
];

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlanCard } from '@/components/billing/PlanCard';
import { PLANS } from '@/types/stripe.types';
import { Check } from 'lucide-react';

const COMPARISON = [
  { feature: 'Documents per month', free: '3', premium: 'Unlimited' },
  { feature: 'All 9 document types', free: '✓', premium: '✓' },
  { feature: 'AI section editing', free: '✓', premium: '✓' },
  { feature: 'PDF export', free: '✓', premium: '✓' },
  { feature: 'DOCX export', free: '—', premium: '✓' },
  { feature: 'Shareable links', free: '✓', premium: '✓' },
  { feature: 'Template marketplace', free: 'Browse only', premium: '✓' },
  { feature: 'Multilingual translation', free: '✓', premium: '✓' },
  { feature: 'Priority AI generation', free: '—', premium: '✓' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <span className="font-bold text-lg">DocuPilot AI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
            <Link href="/register"><Button size="sm">Get Started Free</Button></Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Start free. Upgrade when your business grows.</p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} currentTier="none" />
          ))}
        </div>

        {/* Feature comparison table */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Full Feature Comparison</h2>
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-6 py-4 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 font-medium">Free</th>
                  <th className="text-center px-6 py-4 font-medium text-primary">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ feature, free, premium }, idx) => (
                  <tr key={feature} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="px-6 py-3 text-muted-foreground">{feature}</td>
                    <td className="px-6 py-3 text-center">
                      {free === '✓' ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : free === '—' ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        free
                      )}
                    </td>
                    <td className="px-6 py-3 text-center font-medium">
                      {premium === '✓' ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        premium
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/register">
            <Button size="lg" className="px-10">Start for Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlanCard } from '@/components/billing/PlanCard';
import { PLANS } from '@/types/stripe.types';
import { Check, ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

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
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="ml-1">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
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
          <div className="border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  <th className="text-center px-6 py-4 font-semibold">Free</th>
                  <th className="text-center px-6 py-4 font-semibold text-primary">Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ feature, free, premium }, idx) => (
                  <tr key={feature} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="px-6 py-3.5 text-muted-foreground">{feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      {free === '✓' ? (
                        <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                      ) : free === '—' ? (
                        <span className="text-muted-foreground/50">—</span>
                      ) : (
                        <span className="text-xs font-medium">{free}</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-center font-medium">
                      {premium === '✓' ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <span className="text-xs text-primary font-semibold">{premium}</span>
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
            <Button size="lg" className="px-10 h-12 text-base shadow-lg shadow-primary/25">
              Start for Free
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required</p>
        </div>
      </div>
    </div>
  );
}

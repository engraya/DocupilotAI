import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_TYPE_LUCIDE_ICONS,
  DOCUMENT_TYPE_COLORS,
  DOCUMENT_TYPE_DESCRIPTIONS,
} from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';
import { PlanCard } from '@/components/billing/PlanCard';
import { PLANS } from '@/types/stripe.types';
import {
  Sparkles,
  FileText,
  Download,
  Zap,
  Shield,
  Globe,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DOC_TYPES: DocumentType[] = [
  'invoice', 'contract', 'nda', 'proposal', 'quotation',
  'scope', 'resume', 'cover-letter', 'employment-letter',
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: FileText,
    title: 'Choose Your Document',
    desc: 'Select from 9 professional document types. Each has smart fields tailored to its purpose.',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'AI Generates It',
    desc: 'Our AI writes a complete, professionally formatted document in seconds based on your details.',
  },
  {
    step: '03',
    icon: Download,
    title: 'Export & Share',
    desc: 'Download as PDF or DOCX, copy to clipboard, or share a read-only link instantly.',
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'AI-Powered',
    desc: 'Gemini AI generates legally styled, professional documents in under 10 seconds',
    color: 'bg-primary/10 text-primary',
    border: 'hover:border-primary/30',
  },
  {
    icon: FileText,
    title: 'Section Editing',
    desc: 'Edit any section individually with built-in AI writing tools',
    color: 'bg-violet-500/10 text-violet-600',
    border: 'hover:border-violet-300/50',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Your documents are private and protected with row-level security',
    color: 'bg-emerald-500/10 text-emerald-600',
    border: 'hover:border-emerald-300/50',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    desc: 'Translate any document section into 8+ languages with one click',
    color: 'bg-blue-500/10 text-blue-600',
    border: 'hover:border-blue-300/50',
  },
];

const TESTIMONIALS = [
  {
    quote: 'DocuPilot saves me 3–4 hours a week on client contracts. The quality is indistinguishable from what a lawyer would draft.',
    name: 'Sarah K.',
    role: 'Freelance Designer',
    initials: 'SK',
    color: 'bg-primary/10 text-primary',
  },
  {
    quote: 'I generated a complete NDA in 8 seconds. Used to take me 30 minutes searching templates. Incredible product.',
    name: 'Michael T.',
    role: 'Tech Founder',
    initials: 'MT',
    color: 'bg-violet-500/10 text-violet-600',
  },
  {
    quote: 'The AI-generated proposals look more professional than what I wrote myself. My close rate actually went up.',
    name: 'Priya R.',
    role: 'Marketing Consultant',
    initials: 'PR',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
];

const STATS = [
  { value: '9', label: 'Document Types' },
  { value: '<10s', label: 'Generation Time' },
  { value: 'PDF + DOCX', label: 'Export Formats' },
  { value: '8+', label: 'Languages' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1">
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="gap-1.5 ml-1">
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-8 text-center overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/7 blur-[120px]" />
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-violet-500/5 blur-[80px]" />
          <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-[80px]" />
        </div>

        {/* AI badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/20 px-4 py-1.5 mb-8">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-semibold text-primary">Powered by Gemini AI</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.06]">
          Professional Documents,
          <br />
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Generated in Seconds
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop spending hours on paperwork. DocuPilot AI generates contracts, invoices, NDAs,
          proposals, and more — professionally formatted and ready to send.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link href="/register">
            <Button size="lg" className="h-12 px-8 text-base gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Sparkles className="h-5 w-5" />
              Start for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2">
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-sm text-muted-foreground mb-16">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            3 free documents per month
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            No credit card required
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            Cancel anytime
          </span>
        </div>

        {/* Product Preview Mockup */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-x-16 -bottom-4 h-24 bg-primary/15 blur-3xl rounded-full" />
          <div className="relative border rounded-2xl bg-card shadow-2xl overflow-hidden text-left">
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex-1 mx-3">
                <div className="h-6 rounded-md bg-background/80 border text-xs text-muted-foreground flex items-center px-3 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Service Agreement · Generated in 3.2s
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 px-2.5 rounded-md bg-primary/10 text-xs font-medium text-primary flex items-center gap-1">
                  <Download className="h-3 w-3" /> PDF
                </div>
              </div>
            </div>
            {/* Document preview */}
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Service Agreement</p>
                  <p className="text-xs text-muted-foreground">Between Acme Corp and John Doe · AI-generated</p>
                </div>
                <div className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-500/20">
                  Ready to send
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-2.5 bg-muted rounded-full w-2/5" />
                  <div className="h-2 bg-muted/60 rounded-full w-full" />
                  <div className="h-2 bg-muted/60 rounded-full w-11/12" />
                  <div className="h-2 bg-muted/60 rounded-full w-4/5" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 bg-muted rounded-full w-1/3" />
                  <div className="h-2 bg-muted/60 rounded-full w-full" />
                  <div className="h-2 bg-muted/60 rounded-full w-5/6" />
                  <div className="h-2 bg-muted/60 rounded-full w-3/4" />
                </div>
              </div>
            </div>
            {/* Action bar */}
            <div className="flex items-center gap-4 px-5 sm:px-7 py-3.5 border-t bg-muted/20 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                <Download className="h-3.5 w-3.5" /> PDF
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                <FileText className="h-3.5 w-3.5" /> DOCX
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                <Globe className="h-3.5 w-3.5" /> Translate
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-primary font-medium cursor-default">
                <Sparkles className="h-3.5 w-3.5" /> Edit with AI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Document Types */}
      <section className="bg-muted/20 border-y border-border/60 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">9 Document Types</h2>
            <p className="text-muted-foreground">Every document your business needs, powered by AI</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {DOC_TYPES.map((type) => {
              const TypeIcon = DOCUMENT_TYPE_LUCIDE_ICONS[type];
              return (
                <Card
                  key={type}
                  className="hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <CardContent className="pt-5 pb-5">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                        DOCUMENT_TYPE_COLORS[type]
                      )}
                    >
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{DOCUMENT_TYPE_LABELS[type]}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {DOCUMENT_TYPE_DESCRIPTIONS[type]}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">From idea to professional document in 3 steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden sm:block absolute top-14 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="text-xs font-bold tracking-widest text-primary/40 mb-3 uppercase">{step}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 ring-1 ring-primary/15 shadow-sm">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/20 border-y border-border/60 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground">Built for freelancers, startups, and growing businesses</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color, border }) => (
              <div
                key={title}
                className={cn(
                  'rounded-2xl border bg-card p-6 text-center space-y-3 transition-all duration-200 hover:shadow-md',
                  border
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-2xl flex items-center justify-center mx-auto',
                    color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Loved by Professionals</h2>
            <p className="text-muted-foreground">See what people are saying about DocuPilot AI</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, name, role, initials, color }) => (
              <div
                key={name}
                className="rounded-2xl border bg-card p-6 flex flex-col gap-4 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 italic">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold', color)}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/20 border-y border-border/60 py-24" id="pricing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Simple Pricing</h2>
            <p className="text-muted-foreground">Start free, upgrade when you need more</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} currentTier="none" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-violet-500/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Ready to save hours on paperwork?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Join thousands of freelancers and businesses using DocuPilot AI to create
            professional documents in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register">
              <Button size="lg" className="h-12 px-10 text-base gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Sparkles className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · 3 documents free every month
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Logo />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DocuPilot AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
              <Link href="/register" className="hover:text-foreground transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

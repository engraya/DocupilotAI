import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_ICONS, DOCUMENT_TYPE_DESCRIPTIONS } from '@/types/document.types';
import type { DocumentType } from '@/types/document.types';
import { PlanCard } from '@/components/billing/PlanCard';
import { PLANS } from '@/types/stripe.types';
import { Sparkles, FileText, Download, Zap, Shield, Globe } from 'lucide-react';

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
  { icon: Zap, title: 'AI-Powered', desc: 'Gemini AI generates legally styled, professional documents instantly' },
  { icon: FileText, title: 'Section Editing', desc: 'Edit any section individually with built-in AI writing tools' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your documents are private and protected with row-level security' },
  { icon: Globe, title: 'Multilingual', desc: 'Translate any document section into 8+ languages with one click' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <span className="font-bold text-lg">DocuPilot AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/pricing">
              <Button variant="ghost" size="sm">Pricing</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <Badge variant="outline" className="mb-6 text-sm px-4 py-1">
          Powered by Gemini AI
        </Badge>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Professional Documents,
          <br />
          <span className="text-primary">Generated in Seconds</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop spending hours on paperwork. DocuPilot AI generates contracts, invoices, NDAs, proposals,
          and more — professionally formatted and ready to send.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="px-8">
              <Sparkles className="h-5 w-5 mr-2" />
              Start for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Sign in
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">3 free documents per month · No credit card required</p>
      </section>

      {/* Document Types */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">9 Document Types</h2>
        <p className="text-center text-muted-foreground mb-12">Every document your business needs, powered by AI</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {DOC_TYPES.map((type) => (
            <Card key={type} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5">
                <div className="text-3xl mb-3">{DOCUMENT_TYPE_ICONS[type]}</div>
                <h3 className="font-semibold text-sm mb-1">{DOCUMENT_TYPE_LABELS[type]}</h3>
                <p className="text-xs text-muted-foreground">{DOCUMENT_TYPE_DESCRIPTIONS[type]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-16">From idea to professional document in 3 steps</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-4">{step}</div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Everything You Need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center space-y-3">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/40 py-20" id="pricing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Start free, upgrade when you need more</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} currentTier="none" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to save hours on paperwork?</h2>
        <p className="text-xl text-muted-foreground mb-10">
          Join thousands of freelancers and businesses using DocuPilot AI.
        </p>
        <Link href="/register">
          <Button size="lg" className="px-10">
            <Sparkles className="h-5 w-5 mr-2" />
            Get Started Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>✈️</span>
            <span className="font-semibold">DocuPilot AI</span>
          </div>
          <p>© {new Date().getFullYear()} DocuPilot AI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/login" className="hover:text-foreground">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

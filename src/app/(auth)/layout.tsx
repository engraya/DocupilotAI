import type { Metadata } from 'next';
import { Sparkles, Shield, Download, Globe } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export const metadata: Metadata = {
  title: 'DocuPilot AI – Sign in',
};

const PANEL_FEATURES = [
  { icon: Sparkles, text: 'AI writes complete, professional documents instantly' },
  { icon: Shield, text: 'Your data is private and secured with row-level security' },
  { icon: Download, text: 'Export to PDF and DOCX with one click' },
  { icon: Globe, text: 'Translate any section into 8+ languages' },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel — desktop only */}
      <div className="hidden lg:flex lg:w-120 xl:w-135 shrink-0 bg-auth-panel flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Logo — white on indigo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 2.5C2 1.67 2.67 1 3.5 1H8.5L12 4.5V11.5C12 12.33 11.33 13 10.5 13H3.5C2.67 13 2 12.33 2 11.5V2.5Z" fill="white" fillOpacity="0.9"/>
              <path d="M8.5 1V4.5H12" stroke="white" strokeWidth="1" strokeOpacity="0.5" fill="none"/>
              <path d="M4.5 7.5H9.5M4.5 9.5H7.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6"/>
            </svg>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-bold text-lg text-white tracking-tight">DocuPilot</span>
            <span className="font-bold text-lg text-white/70 tracking-tight">AI</span>
          </div>
        </div>

        {/* Headline and features */}
        <div className="space-y-8 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-2">
              Professional documents,
            </h2>
            <h2 className="text-3xl font-bold text-indigo-200 leading-tight">
              generated in seconds.
            </h2>
          </div>
          <div className="space-y-4">
            {PANEL_FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <p className="text-indigo-100 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/10 relative z-10">
          <p className="text-white/90 text-sm italic mb-4">
            &ldquo;DocuPilot saves me 3–4 hours a week on client contracts. Incredible.&rdquo;
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-bold">
              S
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Sarah K.</p>
              <p className="text-indigo-200 text-xs">Freelance Designer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">
        {/* Mobile-only logo */}
        <div className="lg:hidden mb-8">
          <Logo />
        </div>

        <div className="w-full max-w-md">{children}</div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} DocuPilot AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}

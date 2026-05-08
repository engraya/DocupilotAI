import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DocuPilot AI – Sign in',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">✈️</span>
            <span className="text-2xl font-bold tracking-tight">DocuPilot AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            AI-powered professional document generation
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

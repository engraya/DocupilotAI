import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { MobileSidebarTrigger } from '@/components/dashboard/Sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { UserProfile } from '@/hooks/useUser';

export function TopNav({
  title,
  profile,
}: {
  title: string;
  profile?: UserProfile | null;
}) {
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm px-4 lg:px-6 py-3 flex items-center gap-3 sticky top-0 z-10">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="lg:hidden">
          <MobileSidebarTrigger profile={profile ?? null} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hidden sm:block">DocuPilot</span>
          <span className="text-muted-foreground hidden sm:block">/</span>
          <span className="font-semibold text-foreground">{title}</span>
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-1">
        <ThemeToggle />
        <Link href="/documents/new">
          <Button size="sm" className="gap-1.5">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">New Document</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}

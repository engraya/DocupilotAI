'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BookTemplate,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UsageBadge } from './UsageBadge';
import { Logo } from '@/components/ui/logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { UserProfile } from '@/hooks/useUser';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/templates', label: 'Templates', icon: BookTemplate },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
            pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function UserSection({ profile, onSignOut }: { profile: UserProfile | null; onSignOut: () => void }) {
  return (
    <div className="px-4 py-4 border-t border-sidebar-border space-y-3">
      {profile && <UsageBadge profile={profile} />}

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
          {profile?.full_name?.[0]?.toUpperCase() ?? profile?.email?.[0]?.toUpperCase() ?? 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{profile?.full_name ?? 'User'}</p>
          <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
        </div>
        <Badge
          variant={profile?.tier === 'premium' ? 'default' : 'outline'}
          className="text-xs shrink-0"
        >
          {profile?.tier ?? 'free'}
        </Badge>
      </div>

      <button
        onClick={onSignOut}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-full transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}

export function Sidebar({ profile }: { profile: UserProfile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col h-screen sticky top-0 shrink-0">
      <div className="flex items-center px-5 py-4 border-b border-sidebar-border">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <NavLinks pathname={pathname} />

      <UserSection profile={profile} onSignOut={signOut} />
    </aside>
  );
}

export function MobileSidebarTrigger({ profile }: { profile: UserProfile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Open navigation" />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-sidebar flex flex-col gap-0">
        <SheetHeader className="flex items-start px-5 py-4 border-b border-sidebar-border">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Link href="/">
            <Logo />
          </Link>
        </SheetHeader>

        <NavLinks pathname={pathname} />

        <UserSection profile={profile} onSignOut={signOut} />
      </SheetContent>
    </Sheet>
  );
}

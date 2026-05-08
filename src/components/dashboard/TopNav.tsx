import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function TopNav({ title }: { title: string }) {
  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <Link href="/documents/new">
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Document
        </Button>
      </Link>
    </header>
  );
}

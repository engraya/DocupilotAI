import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <>
      <TopNav title="Documents" />
      <div className="p-6">
        {documents && documents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-24 text-center">
            <p className="text-muted-foreground mb-4">No documents yet. Create your first one!</p>
            <Link href="/documents/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

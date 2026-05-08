import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, { data: documents }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(6),
  ]);

  return (
    <>
      <TopNav title="Dashboard" />
      <div className="p-6 space-y-8">
        {profile && (
          <StatsCards profile={profile} documentCount={documents?.length ?? 0} />
        )}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Recent Documents</h2>
            <Link href="/documents">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>

          {documents && documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-16 text-center">
              <p className="text-muted-foreground mb-4">No documents yet</p>
              <Link href="/documents/new">
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create your first document
                </Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

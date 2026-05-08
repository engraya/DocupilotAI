import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TopNav } from '@/components/dashboard/TopNav';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, ChevronRight } from 'lucide-react';

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
      <TopNav title="Dashboard" profile={profile} />
      <div className="p-6 space-y-8">
        {profile && (
          <StatsCards profile={profile} documentCount={documents?.length ?? 0} />
        )}

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold">Recent Documents</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Your latest work</p>
            </div>
            <Link href="/documents">
              <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
                View all
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {documents && documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-2xl py-20 text-center bg-muted/20">
              <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
                <FileText className="h-7 w-7 text-primary/60" />
              </div>
              <p className="text-muted-foreground font-medium mb-1">No documents yet</p>
              <p className="text-sm text-muted-foreground/70 mb-5">
                Create your first AI-generated document
              </p>
              <Link href="/documents/new">
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
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

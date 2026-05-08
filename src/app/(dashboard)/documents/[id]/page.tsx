import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DocumentEditor } from '@/components/documents/DocumentEditor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!document) notFound();

  return <DocumentEditor document={document} />;
}

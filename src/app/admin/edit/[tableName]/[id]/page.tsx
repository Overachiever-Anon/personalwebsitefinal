// src/app/admin/edit/[tableName]/[id]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { updateItem } from '@/app/admin/actions';
import EditForm from './edit-form';

export const dynamic = 'force-dynamic';

async function getItemData(tableName: string, id: string) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(`Error fetching item from ${tableName} with id ${id}:`, error);
    notFound();
  }

  return data;
}

export default async function EditItemPage({ params }: { params: { tableName: string; id: string } }) {
  const { tableName, id } = params;
  const item = await getItemData(tableName, id);

  const sectionTitleMap: { [key: string]: string } = {
    'blog_posts': 'Blog Post',
    'projects': 'Project',
    'code_items': 'Code Item',
    'research_notes': 'Research Note',
    'gameplay_items': 'Gameplay Clip',
  };

  const title = sectionTitleMap[tableName] || 'Item';

  return (
    <div className="container-main py-12">
      <h1 className="text-4xl font-bold mb-8">Edit {title}</h1>
      <div className="bg-card border border-border rounded-lg p-8">
        <EditForm item={item} tableName={tableName} action={updateItem} />
      </div>
    </div>
  );
}

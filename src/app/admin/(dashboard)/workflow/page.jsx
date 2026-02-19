import { createClient } from '@/lib/supabase/server';
import WorkflowClient from './WorkflowClient';

export const metadata = { title: 'Kelola Workflow - Admin Velora' };

export default async function AdminWorkflowPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('workflow_steps').select('*').order('sort_order', { ascending: true });
    return <WorkflowClient initialData={data || []} />;
}

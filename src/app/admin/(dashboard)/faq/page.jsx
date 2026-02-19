import { createClient } from '@/lib/supabase/server';
import FaqClient from './FaqClient';

export const metadata = { title: 'Kelola FAQ - Admin Velora' };

export default async function AdminFaqPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
    return <FaqClient initialData={data || []} />;
}

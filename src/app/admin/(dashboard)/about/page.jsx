import { createClient } from '@/lib/supabase/server';
import AboutClient from './AboutClient';

export const metadata = { title: 'Kelola About - Admin Velora' };

export default async function AdminAboutPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('about_content').select('*').order('created_at', { ascending: true });
    return <AboutClient initialData={data || []} />;
}

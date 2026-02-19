import { createClient } from '@/lib/supabase/server';
import FounderClient from './FounderClient';

export const metadata = { title: 'Kelola Founder - Admin Velora' };

export default async function AdminFounderPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('founder').select('*').limit(1).single();
    return <FounderClient initialData={data || null} />;
}

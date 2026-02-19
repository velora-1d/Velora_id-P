import { createClient } from '@/lib/supabase/server';
import ServicesClient from './ServicesClient';

export const metadata = { title: 'Kelola Services - Admin Velora' };

export default async function AdminServicesPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
    return <ServicesClient initialData={data || []} />;
}

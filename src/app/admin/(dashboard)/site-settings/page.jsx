import { createClient } from '@/lib/supabase/server';
import SiteSettingsClient from './SiteSettingsClient';

export const metadata = { title: 'Site Settings - Admin Velora' };

export default async function AdminSiteSettingsPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('*').order('sort_order', { ascending: true });
    return <SiteSettingsClient initialData={data || []} />;
}

import { createClient } from '@/lib/supabase/server';
import LegalitasClient from './LegalitasClient';

export const metadata = { title: 'Kelola Legalitas - Admin Velora' };

export default async function AdminLegalitasPage() {
    const supabase = await createClient();
    const { data } = await supabase.from('legalitas').select('*').limit(1).single();
    return <LegalitasClient initialData={data || null} />;
}

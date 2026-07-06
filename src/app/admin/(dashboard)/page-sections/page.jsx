import { createClient } from '@/lib/supabase/server';
import PageSectionsClient from './PageSectionsClient';

export const metadata = { title: 'Kelola Page Sections - Admin Velora' };

export default async function PageSectionsPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('page_sections')
        .select('*')
        .order('page_key', { ascending: true })
        .order('sort_order', { ascending: true });

    return <PageSectionsClient initialSections={data || []} />;
}

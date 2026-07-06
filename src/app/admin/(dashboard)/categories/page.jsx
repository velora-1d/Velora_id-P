import { createClient } from '@/lib/supabase/server';
import CategoriesClient from './CategoriesClient';

export const metadata = { title: 'Kelola Kategori - Admin Velora' };

export default async function CategoriesPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('categories')
        .select('*')
        .order('type', { ascending: true })
        .order('sort_order', { ascending: true });

    return <CategoriesClient initialCategories={data || []} />;
}

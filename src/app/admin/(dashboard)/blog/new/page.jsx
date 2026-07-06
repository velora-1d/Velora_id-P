import BlogFormClient from '../BlogFormClient';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Artikel Baru - Admin Velora' };

export default async function NewBlogPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('type', 'blog')
        .eq('published', true)
        .order('sort_order', { ascending: true });

    return <BlogFormClient categories={categories || []} />;
}

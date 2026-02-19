import { createClient } from '@/lib/supabase/server';
import BlogListClient from './BlogListClient';

export const metadata = { title: 'Kelola Blog - Admin Velora' };

export default async function AdminBlogPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    return <BlogListClient initialPosts={posts || []} />;
}

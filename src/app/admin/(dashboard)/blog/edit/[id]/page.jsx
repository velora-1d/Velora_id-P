import { createClient } from '@/lib/supabase/server';
import BlogFormClient from '../../BlogFormClient';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Artikel - Admin Velora' };

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const [{ data: post }, { data: categories }] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('id', id).single(),
        supabase.from('categories').select('*').eq('type', 'blog').eq('published', true).order('sort_order', { ascending: true }),
    ]);

    if (!post) notFound();

    return <BlogFormClient post={post} categories={categories || []} />;
}

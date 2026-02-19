import { createClient } from '@/lib/supabase/server';
import BlogFormClient from '../../BlogFormClient';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Artikel - Admin Velora' };

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();

    if (!post) notFound();

    return <BlogFormClient post={post} />;
}

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('blog_posts')
        .select('title')
        .eq('id', id)
        .single();

    return {
        title: post ? `${post.title} - Detail Artikel` : 'Detail Artikel Blog'
    };
}

export default async function AdminBlogDetailPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    return <BlogDetailClient post={post} />;
}

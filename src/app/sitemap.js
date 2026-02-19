import { createClient } from '@/lib/supabase/server';

export default async function sitemap() {
    const baseUrl = 'https://www.ve-lora.my.id';

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Dynamic blog post pages
    let blogPages = [];
    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('blog_posts')
            .select('slug, created_at, updated_at')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (data) {
            blogPages = data.map((post) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.updated_at || post.created_at),
                changeFrequency: 'monthly',
                priority: 0.7,
            }));
        }
    } catch {
        // If DB fails, return only static pages
    }

    return [...staticPages, ...blogPages];
}

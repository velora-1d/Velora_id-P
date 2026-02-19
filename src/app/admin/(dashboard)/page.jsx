import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = {
    title: 'Dashboard Admin - Velora',
};

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Fetch counts
    const [blogRes, portfolioRes, testimonialRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    ]);

    // Fetch recent messages
    const { data: recentMessages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    // Fetch recent blog posts
    const { data: recentPosts } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    const stats = {
        blog: blogRes.count || 0,
        portfolio: portfolioRes.count || 0,
        testimonials: testimonialRes.count || 0,
        messages: messagesRes.count || 0,
        unread: unreadRes.count || 0,
    };

    return <DashboardClient stats={stats} recentMessages={recentMessages || []} recentPosts={recentPosts || []} />;
}

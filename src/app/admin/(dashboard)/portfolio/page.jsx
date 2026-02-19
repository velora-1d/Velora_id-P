import { createClient } from '@/lib/supabase/server';
import PortfolioClient from './PortfolioClient';

export const metadata = { title: 'Kelola Portfolio - Admin Velora' };

export default async function AdminPortfolioPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

    return <PortfolioClient initialProjects={projects || []} />;
}

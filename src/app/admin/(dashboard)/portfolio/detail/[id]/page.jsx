import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import PortfolioDetailClient from './PortfolioDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: project } = await supabase
        .from('portfolio_projects')
        .select('title')
        .eq('id', id)
        .single();

    return {
        title: project ? `${project.title} - Detail Proyek Portofolio` : 'Detail Proyek Portofolio'
    };
}

export default async function AdminPortfolioDetailPage({ params }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: project, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !project) {
        notFound();
    }

    return <PortfolioDetailClient project={project} />;
}

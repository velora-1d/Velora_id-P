import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import PortfolioClient from './PortfolioClient';

export const metadata = { title: 'Kelola Portfolio - Admin Velora' };
export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
    const supabase = await createClient();
    const [{ data: projects }, { data: categories }] = await Promise.all([
        supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').eq('type', 'portfolio').eq('published', true).order('sort_order', { ascending: true }),
    ]);

    return (
        <Suspense fallback={<div className="p-12 text-center text-gray-500">Memuat portofolio...</div>}>
            <PortfolioClient initialProjects={projects || []} categories={categories || []} />
        </Suspense>
    );
}

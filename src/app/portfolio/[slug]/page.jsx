import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Layers, Lightbulb, MessageSquare, Target } from 'lucide-react';
import { getIcon } from '@/lib/icons';

export const dynamic = 'force-dynamic';

async function getProject(slug) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (data) return data;
    if (!/^[0-9a-f-]{36}$/i.test(slug)) return null;

    const { data: byId } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', slug)
        .eq('published', true)
        .single();

    return byId || null;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) return { title: 'Portfolio Tidak Ditemukan' };

    return {
        title: project.seo_title || `${project.title} | Portfolio Velora ID`,
        description: project.seo_description || project.description,
        openGraph: {
            title: project.seo_title || project.title,
            description: project.seo_description || project.description,
            images: project.image_url ? [{ url: project.image_url, width: 1200, height: 630, alt: project.title }] : [],
        },
        alternates: { canonical: `/portfolio/${project.slug || slug}` },
    };
}

export default async function PortfolioDetailPage({ params }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    const ProjectIcon = getIcon(project.icon_name || project.icon);
    const tech = (project.tech || '').split(',').map((item) => item.trim()).filter(Boolean);

    return (
        <div className="min-h-screen bg-[#faf9f7]">
            <div className="relative h-[54vh] min-h-[420px] overflow-hidden bg-gray-900">
                {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-80" />}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
                <div className="absolute inset-x-0 top-24">
                    <div className="container mx-auto px-4 sm:px-6">
                        <Link href="/#portfolio" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/20 transition-all">
                            <ArrowLeft className="w-4 h-4" />
                            Portfolio
                        </Link>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0">
                    <div className="container mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">{project.category}</span>
                                <span className="px-3 py-1 bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-200 text-xs font-semibold rounded-full">{project.client}</span>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                    <ProjectIcon className="w-7 h-7" />
                                </div>
                                <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{project.header_title || project.title}</h1>
                            </div>
                            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">{project.header_subtitle || project.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    <div className="space-y-6">
                        <section className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-teal-600" /> Ringkasan Project
                            </h2>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-amber-600" /> Tantangan</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{project.challenge}</p>
                            </section>
                            <section className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
                                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-teal-600" /> Solusi</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{project.solution}</p>
                            </section>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Layers className="w-5 h-5 text-gray-400" /> Tech Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                {tech.map((item) => <span key={item} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono">{item}</span>)}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-6">
                            <p className="text-gray-700 text-sm font-medium mb-4">Tertarik dengan project serupa?</p>
                            <a
                                href={`https://wa.me/6281320442174?text=${encodeURIComponent(`Halo Velora! Saya tertarik dengan project "${project.title}" yang ada di portfolio.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-500/20"
                            >
                                <MessageSquare className="w-5 h-5" />
                                Diskusi Project
                            </a>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

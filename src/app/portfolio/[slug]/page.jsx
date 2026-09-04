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
        <div className="min-h-screen bg-[#070C18] text-slate-100 relative overflow-hidden">
            {/* Hero Banner */}
            <div className="relative h-[52vh] min-h-[420px] overflow-hidden bg-slate-950 border-b border-white/[0.08]">
                {project.image_url && (
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover filter brightness-[0.45]"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-[#070C18]/60 to-transparent" />
                <div className="absolute inset-0 studio-grid-pattern opacity-10 pointer-events-none" />

                {/* Back Link */}
                <div className="absolute inset-x-0 top-8 z-10">
                    <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                        <Link
                            href="/#portfolio"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/[0.1] rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:border-blue-500/30 transition-all group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                            Kembali ke Portfolio
                        </Link>
                    </div>
                </div>

                {/* Header Metadata */}
                <div className="absolute inset-x-0 bottom-0">
                    <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 max-w-5xl">
                        <div className="max-w-3xl">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold rounded-lg uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <span className="px-3 py-1 bg-slate-800/80 backdrop-blur-md border border-white/[0.08] text-slate-300 text-xs font-mono font-medium rounded-lg">
                                    Klien: {project.client}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 backdrop-blur-md flex items-center justify-center text-blue-400 flex-shrink-0">
                                    <ProjectIcon className="w-6 h-6" />
                                </div>
                                <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                    {project.header_title || project.title}
                                </h1>
                            </div>

                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mt-2 text-justify">
                                {project.header_subtitle || project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-5xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                    {/* Left Column: Details */}
                    <div className="space-y-6">
                        <section className="studio-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/40">
                            <div className="flex items-center gap-2 mb-4">
                                <Briefcase className="w-5 h-5 text-blue-400" />
                                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">Ringkasan Sistem</h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base text-justify">{project.description}</p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <section className="studio-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="w-5 h-5 text-amber-400" />
                                    <h3 className="font-bold text-white text-base">Tantangan & Problem</h3>
                                </div>
                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">{project.challenge}</p>
                            </section>

                            <section className="studio-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Lightbulb className="w-5 h-5 text-emerald-400" />
                                    <h3 className="font-bold text-white text-base">Solusi Rekayasa</h3>
                                </div>
                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">{project.solution}</p>
                            </section>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="space-y-6">
                        <div className="studio-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/40">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="w-4 h-4 text-blue-400" />
                                <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Tech Stack</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tech.map((item) => (
                                    <span key={item} className="px-2.5 py-1 bg-slate-800/80 border border-white/[0.06] text-slate-300 rounded-lg text-xs font-mono">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl p-6 border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-slate-900/60 to-slate-900/40 backdrop-blur-xl">
                            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase font-semibold block mb-1">
                                Custom Development
                            </span>
                            <h3 className="font-heading text-base font-bold text-white mb-2">Tertarik dengan Sistem Sejenis?</h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-5">
                                Diskusikan spesifikasi kebutuhan digital Anda bersama tim arsitek kami via WhatsApp.
                            </p>
                            <a
                                href={`https://wa.me/6281320442174?text=${encodeURIComponent(`Halo Velora! Saya tertarik dengan sistem "${project.title}" yang ada di portfolio.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/25 transition-all"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Konsultasi Proyek
                            </a>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

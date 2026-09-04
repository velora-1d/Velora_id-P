import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Layers, Lightbulb, MessageSquare, Target, Monitor, Laptop, Smartphone, ExternalLink } from 'lucide-react';
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

                {/* Production Interface Showcase (Dual Screenshot Gallery) */}
                {(project.image_url || project.background_image_url) && (
                    <section className="mt-12 sm:mt-16 space-y-6">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">
                                    <Monitor className="w-3.5 h-3.5" />
                                    [ANTARMUKA_PRODUKSI_LIVE]
                                </div>
                                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                    Tangkapan Layar & Arsitektur Antarmuka
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">
                                    Dokumentasi visual implementasi nyata sistem di lingkungan operasional produksi.
                                </p>
                            </div>
                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Tervalidasi di Lingkungan Produksi
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* Web Dashboard View (8 cols if background_image_url exists, else 12) */}
                            {project.image_url && (
                                <div className={`${project.background_image_url ? 'lg:col-span-8' : 'lg:col-span-12'} studio-card rounded-3xl overflow-hidden border border-white/[0.1] bg-slate-900/50 shadow-2xl`}>
                                    {/* Browser Header Bar */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/[0.08] text-xs font-mono text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                            </div>
                                            <span className="text-slate-300 ml-2 font-mono text-[11px] truncate">
                                                https://{(project.slug || 'app').toLowerCase()}.velora.id/admin/dashboard
                                            </span>
                                        </div>
                                        <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                            Web Admin Console
                                        </span>
                                    </div>

                                    {/* Screenshot Container */}
                                    <div className="relative bg-slate-950 overflow-hidden group">
                                        <img
                                            src={project.image_url}
                                            alt={`${project.title} Web Dashboard`}
                                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                                        />
                                    </div>

                                    <div className="p-4 sm:p-5 bg-slate-900/70 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Laptop className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                            <span>Dashboard Administrasi &amp; Monitoring Pusat</span>
                                        </div>
                                        <a
                                            href={project.image_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-mono text-[11px]"
                                        >
                                            <span>Perbesar Layar</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Mobile App View (4 cols) */}
                            {project.background_image_url && (
                                <div className="lg:col-span-4 studio-card rounded-3xl overflow-hidden border border-white/[0.1] bg-slate-900/50 shadow-2xl flex flex-col">
                                    {/* Mobile Header Bar */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/[0.08] text-xs font-mono text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                                            <span className="text-slate-300 font-semibold text-[11px]">Minpo Mobile</span>
                                        </div>
                                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                            Flutter Client
                                        </span>
                                    </div>

                                    {/* Phone Frame */}
                                    <div className="p-4 bg-slate-950/80 flex items-center justify-center flex-1">
                                        <div className="relative rounded-[2rem] p-2 bg-slate-800/80 border-2 border-slate-700 shadow-2xl max-w-[280px] w-full">
                                            {/* Camera Notch / Island */}
                                            <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                                            </div>
                                            <div className="rounded-[1.4rem] overflow-hidden bg-slate-950 border border-white/10 group">
                                                <img
                                                    src={project.background_image_url}
                                                    alt={`${project.title} Mobile App`}
                                                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-5 bg-slate-900/70 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Smartphone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                            <span>Portal Pelanggan (Self-Service)</span>
                                        </div>
                                        <a
                                            href={project.background_image_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-mono text-[11px]"
                                        >
                                            <span>Perbesar Layar</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

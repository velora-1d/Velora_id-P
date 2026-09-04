'use client';

import { useState, useEffect } from 'react';
import { 
    ArrowRight, MessageSquare, Sparkles, 
    ShieldCheck, CheckCircle2, Zap, Database, 
    Layers, ChevronRight, Terminal, Activity,
    Globe, Smartphone, CreditCard
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import CountUp from '../animations/CountUp';

const fallbackStats = [
    { setting_value: '50', setting_label: 'Proyek Selesai', setting_suffix: '+' },
    { setting_value: '98', setting_label: 'Klien Puas', setting_suffix: '%' },
    { setting_value: '24', setting_label: 'SLA Support', setting_suffix: '/7' },
];

const Hero = () => {
    const [stats, setStats] = useState(fallbackStats);
    const [previewTab, setPreviewTab] = useState('sistem');
    const [heroData, setHeroData] = useState({
        title: 'Rekayasa Website &\nSistem Digital Presisi',
        subtitle: 'Kami merancang website kustom, sistem informasi pesantren/sekolah, dan aplikasi bisnis modern yang cepat, aman, serta terintegrasi payment gateway.',
    });

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .eq('published', true);
                
                if (!error && data && data.length > 0) {
                    const statItems = data.filter(item => item.setting_key.startsWith('hero_stat_'));
                    if (statItems.length > 0) {
                        setStats(statItems.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
                    }

                    const titleItem = data.find(item => item.setting_key === 'hero_title');
                    const subtitleItem = data.find(item => item.setting_key === 'hero_subtitle');

                    setHeroData({
                        title: titleItem?.setting_value || 'Rekayasa Website &\nSistem Digital Presisi',
                        subtitle: subtitleItem?.setting_value || 'Kami merancang website kustom, sistem informasi pesantren/sekolah, dan aplikasi bisnis modern yang cepat, aman, serta terintegrasi payment gateway.',
                    });
                }
            } catch { }
        };
        fetchHeroData();
    }, []);

    return (
        <section id="home" className="relative min-h-screen bg-[#070C18] text-white pt-28 lg:pt-36 pb-20 overflow-hidden flex flex-col justify-center">
            {/* Ambient Lighting & Atmosphere */}
            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>
            
            {/* Dual Radial Illumination: Cobalt Blue (Top Left) & Warm Orange (Bottom Right) */}
            <div className="absolute top-0 left-0 w-full lg:w-2/3 h-[550px] bg-[radial-gradient(ellipse_60%_50%_at_25%_20%,rgba(37,99,235,0.22),transparent)] pointer-events-none"></div>
            <div className="absolute bottom-10 right-0 w-full lg:w-1/2 h-[450px] bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(249,115,22,0.12),transparent)] pointer-events-none"></div>

            {/* Top Hairline Ambient Beam (Blue to Orange) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 via-orange-500/40 to-transparent"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.035]">
                <span className="text-[20vw] font-black text-white tracking-tighter leading-none select-none whitespace-nowrap">
                    VELORA
                </span>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Asymmetric Bold Typography & Content */}
                    <div className="lg:col-span-6 xl:col-span-7 text-left">
                        {/* Engineering Studio Badge */}
                        <ScrollReveal direction="down">
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs sm:text-sm text-blue-200 shadow-[0_0_20px_rgba(37,99,235,0.15)] mb-6 backdrop-blur-md">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                <span className="font-mono text-xs text-orange-400 font-bold tracking-wider">VELORA STUDIO</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-300 font-medium">Digital Product &amp; Systems Architecture</span>
                            </div>
                        </ScrollReveal>

                        {/* Main Headline */}
                        <ScrollReveal delay={0.1}>
                            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                                Rekayasa Website &amp; <br />
                                <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
                                    Sistem Digital
                                </span>{' '}
                                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent underline decoration-orange-500/40 decoration-wavy decoration-2 underline-offset-8">
                                    Presisi
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Subtitle / Paragraph */}
                        <ScrollReveal delay={0.2}>
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-justify max-w-xl mb-8">
                                {heroData.subtitle}
                            </p>
                        </ScrollReveal>

                        {/* Dual Action Buttons */}
                        <ScrollReveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center mb-10">
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] border border-blue-400/30 hover:border-orange-400/50 group hover:-translate-y-0.5"
                                >
                                    <MessageSquare className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                    <span>Konsultasi Proyek</span>
                                    <ArrowRight className="w-4 h-4 text-blue-200 group-hover:text-white transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base border border-slate-700/80 hover:border-orange-500/40 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 group"
                                >
                                    <Terminal className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                                    <span>Eksplorasi Portfolio</span>
                                </button>
                            </div>
                        </ScrollReveal>

                        {/* Integrated Stats KPI Strip (Rata Kiri) */}
                        <ScrollReveal delay={0.4}>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
                                {stats.map((stat, i) => (
                                    <div key={i} className="text-left">
                                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans flex items-baseline">
                                            <CountUp to={parseInt(stat.setting_value) || 0} />
                                            <span className={i === 0 ? "text-orange-400" : i === 1 ? "text-blue-400" : "text-emerald-400"}>
                                                {stat.setting_suffix}
                                            </span>
                                        </div>
                                        <div className="text-slate-400 text-xs font-medium mt-0.5">{stat.setting_label}</div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Capabilities & Standards Badges (Stack-Agnostic & Project-Tailored) */}
                        <ScrollReveal delay={0.5}>
                            <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 hover:border-blue-500/40 transition-colors">
                                    <Zap className="w-3.5 h-3.5 text-blue-400" /> Stack Kustom Fleksibel
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 hover:border-sky-500/40 transition-colors">
                                    <Database className="w-3.5 h-3.5 text-sky-400" /> Arsitektur Data Terukur
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 hover:border-orange-500/40 transition-colors">
                                    <CreditCard className="w-3.5 h-3.5 text-orange-400" /> Integrasi API &amp; Payment
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 hover:border-emerald-500/40 transition-colors">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Garansi &amp; Standar SLA
                                </span>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT COLUMN: Interactive Bespoke Command Center Preview */}
                    <div className="lg:col-span-6 xl:col-span-5 relative">
                        <ScrollReveal delay={0.3} direction="left">
                            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-orange-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-700/60">
                                <div className="rounded-xl bg-slate-950/95 backdrop-blur-xl overflow-hidden border border-slate-800/90">
                                    {/* Console Header */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-orange-400/80"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                            </div>
                                            <span className="ml-1.5 text-slate-400 text-[11px]">system.velora.id/hub</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                                            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                            <span>Active • 42ms</span>
                                        </div>
                                    </div>

                                    {/* Preview Switcher Tabs */}
                                    <div className="p-3 bg-slate-900/50 border-b border-slate-800/80">
                                        <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                                            <button
                                                onClick={() => setPreviewTab('sistem')}
                                                className={`py-1.5 px-2 rounded-md transition-all text-center ${previewTab === 'sistem' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                Sistem SPP &amp; Keuangan
                                            </button>
                                            <button
                                                onClick={() => setPreviewTab('compro')}
                                                className={`py-1.5 px-2 rounded-md transition-all text-center ${previewTab === 'compro' ? 'bg-orange-500 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                            >
                                                Website Company Profile
                                            </button>
                                        </div>
                                    </div>

                                    {/* Console Body */}
                                    <div className="p-5 sm:p-6 space-y-4">
                                        {previewTab === 'sistem' ? (
                                            <>
                                                {/* Metric 1: Financial Realization */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                                                        <span>Realisasi SPP Bulan Berjalan</span>
                                                        <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">+18.4% YoY</span>
                                                    </div>
                                                    <div className="flex items-baseline justify-between mb-2">
                                                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Rp 54.250.000</div>
                                                        <span className="text-xs font-mono text-orange-400 font-semibold">90.4% Target</span>
                                                    </div>
                                                    {/* Dual Color Progress Bar */}
                                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                                        <div className="bg-blue-500 h-full w-[70%]"></div>
                                                        <div className="bg-orange-500 h-full w-[20%]"></div>
                                                    </div>
                                                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                                                        <span>142 Santri/Siswa Lunas</span>
                                                        <span className="text-blue-400 font-mono">Auto-Reconciled</span>
                                                    </div>
                                                </div>

                                                {/* Metric 2: WhatsApp Billing Bot */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                            <span className="font-semibold text-slate-200">WhatsApp Billing Bot</span>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-emerald-400">0 Pending Queue</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed text-justify">
                                                        Invoice PDF digital resmi terkirim langsung ke nomor WhatsApp wali murid saat invoice terbit tanpa rekap manual.
                                                    </p>
                                                </div>

                                                {/* Metric 3: Multi-channel Gateway */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="text-xs text-slate-400 mb-2 font-medium">Kanal Pembayaran Otomatis</div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/70 border border-orange-700/60 text-orange-300 font-bold">QRIS All Bank</span>
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800 text-blue-300">BCA VA</span>
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800 text-blue-300">BRI VA</span>
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800 text-blue-300">Mandiri</span>
                                                    </div>
                                                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                                                        <span>Settlement Instan T+0</span>
                                                        <span className="text-emerald-400 font-semibold">Terenkripsi 256-bit</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Metric Tab Compro: PageSpeed */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="text-xs text-slate-400 mb-2">Google PageSpeed Insights</div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-4xl font-extrabold text-emerald-400">99</span>
                                                            <span className="text-xs text-slate-400">/ 100 Score</span>
                                                        </div>
                                                        <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-bold">Core Web Vitals Pass</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed text-justify">
                                                        Waktu muat di bawah 1 detik dengan Next.js Server Components untuk retensi calon klien dan ranking SEO Google tertinggi.
                                                    </p>
                                                </div>

                                                {/* Metric Tab Compro: SEO Schema */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                                                        <span className="font-semibold text-white">SEO &amp; Rich Snippets Schema</span>
                                                        <span className="text-blue-400 text-[11px] font-mono">JSON-LD</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed text-justify">
                                                        Lengkap dengan OpenGraph, JSON-LD Schema (Organization, FAQ, LocalBusiness), dan otomatis sitemap.xml.
                                                    </p>
                                                </div>

                                                {/* Metric Tab Compro: CMS Control */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                                                        <span className="font-semibold text-white">Dashboard CMS Kustom</span>
                                                        <span className="text-orange-400 text-[11px] font-mono">Instant Edit</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 leading-relaxed text-justify">
                                                        Perbarui portofolio, harga layanan, dan artikel blog langsung dari panel admin tanpa perlu memahami koding.
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;

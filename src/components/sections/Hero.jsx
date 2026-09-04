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
        <section id="home" className="relative min-h-screen bg-[#070C18] text-white pt-28 pb-20 overflow-hidden flex flex-col justify-center">
            {/* Subtle Engineering Grid & Top Radial Illumination */}
            <div className="absolute inset-0 studio-grid-pattern opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.22),transparent)] pointer-events-none"></div>
            
            {/* Top Hairline Ambient Beam */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    {/* Engineering Studio Badge */}
                    <ScrollReveal direction="down">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs sm:text-sm text-blue-200 shadow-[0_0_15px_rgba(37,99,235,0.15)] mb-6 sm:mb-8 backdrop-blur-md">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="font-mono text-xs text-blue-300 uppercase tracking-wider font-semibold">VELORA STUDIO</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-300 font-medium">Digital Product & Software Engineering</span>
                        </div>
                    </ScrollReveal>

                    {/* Main Headline */}
                    <ScrollReveal delay={0.1}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6 whitespace-pre-line">
                            {heroData.title}
                        </h1>
                    </ScrollReveal>

                    {/* Subtitle */}
                    <ScrollReveal delay={0.2}>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed font-normal max-w-2xl mx-auto mb-8 sm:mb-10">
                            {heroData.subtitle}
                        </p>
                    </ScrollReveal>

                    {/* Action Buttons */}
                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-[0_0_25px_rgba(37,99,235,0.35)] border border-blue-400/30 group"
                            >
                                <MessageSquare className="w-4 h-4 text-blue-200" />
                                <span>Konsultasi Proyek</span>
                                <ArrowRight className="w-4 h-4 text-blue-200 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800/90 active:bg-slate-900 text-slate-200 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base border border-slate-700/80 transition-all duration-200 backdrop-blur-sm"
                            >
                                <Terminal className="w-4 h-4 text-slate-400" />
                                <span>Eksplorasi Portfolio</span>
                            </button>
                        </div>
                    </ScrollReveal>

                    {/* Tech Badges Strip */}
                    <ScrollReveal delay={0.4}>
                        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-xs font-mono text-slate-400">
                            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-blue-400" /> Next.js 16
                            </span>
                            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                                <Database className="w-3.5 h-3.5 text-sky-400" /> PostgreSQL / Supabase
                            </span>
                            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Midtrans / Xendit Ready
                            </span>
                            <span className="px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> 100% Data Protection
                            </span>
                        </div>
                    </ScrollReveal>
                </div>

                {/* BESPOKE COMMAND CENTER PREVIEW (ANTI-AI SLOP LIVE MOCKUP) */}
                <ScrollReveal delay={0.5}>
                    <div className="max-w-4xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-700/50">
                        <div className="rounded-xl bg-slate-950/90 backdrop-blur-xl overflow-hidden border border-slate-800/80">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/70 border-b border-slate-800 text-xs font-mono text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                    </div>
                                    <span className="ml-2 text-slate-400 text-[11px] hidden sm:inline-block">system.velora.id/hub</span>
                                </div>

                                {/* Preview Switcher Tabs */}
                                <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                                    <button
                                        onClick={() => setPreviewTab('sistem')}
                                        className={`px-3 py-1 rounded-md transition-colors ${previewTab === 'sistem' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Sistem Bendahara & SPP
                                    </button>
                                    <button
                                        onClick={() => setPreviewTab('compro')}
                                        className={`px-3 py-1 rounded-md transition-colors ${previewTab === 'compro' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        Website Company Profile
                                    </button>
                                </div>

                                <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 text-[11px]">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>Active • 42ms</span>
                                </div>
                            </div>

                            {/* Window Body: Live Component Display */}
                            <div className="p-5 sm:p-7">
                                {previewTab === 'sistem' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Financial Metric Card */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                                                    <span>Realisasi SPP Bulan Ini</span>
                                                    <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">+18.4%</span>
                                                </div>
                                                <div className="text-2xl font-bold text-white tracking-tight">Rp 54.250.000</div>
                                                <div className="text-xs text-slate-500 mt-1">Target: Rp 60.000.000 (90.4%)</div>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                                <span>142 Santri Lunas</span>
                                                <span className="text-blue-400">Auto-Reconciled</span>
                                            </div>
                                        </div>

                                        {/* WhatsApp Automation Status */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                                                    <span>WhatsApp Billing Bot</span>
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                </div>
                                                <div className="text-sm font-semibold text-slate-200">Notifikasi Tagihan Otomatis</div>
                                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                                                    Invoice digital PDF otomatis terkirim langsung ke nomor WhatsApp wali murid saat invoice terbit.
                                                </p>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>0 Pending Queue</span>
                                            </div>
                                        </div>

                                        {/* Gateway & Uptime Card */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                                            <div>
                                                <div className="text-xs text-slate-400 mb-2">Payment Gateway Multi-Channel</div>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">QRIS</span>
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">BCA VA</span>
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">BRI VA</span>
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-blue-300">Mandiri</span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-3">Dana langsung masuk ke rekening lembaga secara realtime tanpa rekonsiliasi manual.</p>
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                                <span>Settlement T+0</span>
                                                <span className="text-emerald-400 font-semibold">100% Aman</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Performance Card */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                                            <div className="text-xs text-slate-400 mb-2">Google PageSpeed Insights</div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-emerald-400">99</span>
                                                <span className="text-xs text-slate-400">/ 100 Score</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">Core Web Vitals hijau. Loading di bawah 1 detik untuk retensi calon pelanggan maksimal.</p>
                                        </div>

                                        {/* SEO & Conversion Card */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                                            <div className="text-xs text-slate-400 mb-2">SEO & Structured Schema</div>
                                            <div className="text-sm font-semibold text-white">Google Rich Results Ready</div>
                                            <p className="text-xs text-slate-400 mt-2">Lengkap dengan OpenGraph, JSON-LD Schema (Organization, FAQ, LocalBusiness), dan sitemap otomatis.</p>
                                        </div>

                                        {/* CMS Control Card */}
                                        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
                                            <div className="text-xs text-slate-400 mb-2">Dashboard CMS Kustom</div>
                                            <div className="text-sm font-semibold text-white">Edit Konten Kapan Saja</div>
                                            <p className="text-xs text-slate-400 mt-2">Ubah banner, portfolio, harga layanan, dan artikel blog langsung dari panel admin tanpa menyentuh kode.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Elevated Stats Bento Strip */}
                <ScrollReveal delay={0.6}>
                    <div className="mt-12 sm:mt-16 max-w-3xl mx-auto rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-md">
                        <div className="grid grid-cols-3 divide-x divide-slate-800/80 text-center">
                            {stats.map((stat, i) => (
                                <div key={i} className="px-2 sm:px-4">
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1 font-sans">
                                        <CountUp to={parseInt(stat.setting_value) || 0} />{stat.setting_suffix}
                                    </div>
                                    <div className="text-slate-400 text-xs sm:text-sm font-medium">{stat.setting_label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Hero;

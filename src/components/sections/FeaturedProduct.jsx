'use client';

import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Users, Database, Wallet, FileText, CheckCircle2, Globe, ArrowRight, Sparkles, Zap, Shield, BarChart3 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = { Wallet, Users, GraduationCap, Database, FileText, Globe };

const fallbackFeatures = [
    {
        icon_name: 'Wallet', title: 'Sistem Bendahara',
        subtitle: 'Keuangan & Pembayaran',
        description: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA otomatis ke wali santri.',
        color_gradient: 'from-emerald-500 to-teal-600',
        border_color: 'border-emerald-200',
        bg_light: 'bg-emerald-50',
        text_color: 'text-emerald-600',
        highlights: ['Payment gateway Midtrans/Xendit', 'Invoice otomatis ke wali', 'Notifikasi WA real-time', 'Laporan keuangan harian/bulanan']
    },
    {
        icon_name: 'Users', title: 'Sistem Sekretaris',
        subtitle: 'Administrasi & Data',
        description: 'Master data santri lengkap: biodata, kelas, jurusan, mutasi, dan dokumen.',
        color_gradient: 'from-blue-500 to-indigo-600',
        border_color: 'border-blue-200',
        bg_light: 'bg-blue-50',
        text_color: 'text-blue-600',
        highlights: ['Database santri/siswa lengkap', 'Manajemen kelas & jurusan', 'Surat menyurat otomatis', 'Mutasi & alumni tracking']
    },
    {
        icon_name: 'GraduationCap', title: 'Sistem Pendidikan',
        subtitle: 'Akademik & Rapor',
        description: 'E-Rapor digital, perhitungan nilai nasional, ijazah digital yang sah.',
        color_gradient: 'from-sky-500 to-cyan-600',
        border_color: 'border-sky-200',
        bg_light: 'bg-sky-50',
        text_color: 'text-sky-600',
        highlights: ['E-Rapor Kurikulum Merdeka', 'Perhitungan nilai nasional', 'Ijazah & sertifikat digital', 'Absensi digital terintegrasi']
    },
];

const fallbackBenefits = [
    'Terintegrasi dalam satu platform',
    'Notifikasi real-time via WhatsApp',
    'Dashboard admin yang mudah digunakan',
    'Laporan keuangan otomatis',
    'Support & maintenance berkelanjutan',
    'Customizable sesuai kebutuhan'
];

const INTERVAL = 6000;

const FeaturedProduct = () => {
    const [features, setFeatures] = useState(fallbackFeatures);
    const [benefits, setBenefits] = useState(fallbackBenefits);
    const [activeTab, setActiveTab] = useState(0);
    const [paused, setPaused] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);
    const startRef = useRef(Date.now());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();
                const [featRes, benRes] = await Promise.all([
                    supabase.from('featured_products').select('*').eq('published', true).order('sort_order', { ascending: true }),
                    supabase.from('product_benefits').select('*').eq('published', true).order('sort_order', { ascending: true })
                ]);
                if (!featRes.error && featRes.data?.length > 0) {
                    setFeatures(featRes.data.map((f, i) => ({
                        ...fallbackFeatures[i],
                        ...f,
                        highlights: f.highlights || fallbackFeatures[i]?.highlights || []
                    })));
                }
                if (!benRes.error && benRes.data?.length > 0) setBenefits(benRes.data.map(b => b.benefit));
            } catch { }
        };
        fetchData();
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (paused) return;
        startRef.current = Date.now();

        const tick = () => {
            const pct = Math.min(((Date.now() - startRef.current) / INTERVAL) * 100, 100);
            setProgress(pct);
            if (pct < 100) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        const timer = setTimeout(() => {
            switchTab((activeTab + 1) % features.length);
        }, INTERVAL);

        return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current); };
    }, [activeTab, paused, features.length]);

    const switchTab = (idx) => {
        setTransitioning(true);
        setTimeout(() => {
            setActiveTab(idx);
            setProgress(0);
            startRef.current = Date.now();
            setTimeout(() => setTransitioning(false), 50);
        }, 200);
    };

    const handleTabClick = (idx) => {
        if (idx === activeTab) return;
        setPaused(false);
        switchTab(idx);
    };

    const active = features[activeTab];
    const Icon = iconMap[active?.icon_name] || Globe;

    return (
        <section
            id="featured"
            className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); startRef.current = Date.now(); }}
        >
            {/* Decorative bg */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 to-teal-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 text-primary rounded-full text-sm font-semibold mb-5 tracking-wide">
                            <Sparkles className="w-4 h-4" />
                            PRODUK UNGGULAN
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
                            Sistem Manajemen <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">Pesantren & Sekolah</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Solusi digital all-in-one untuk mengelola administrasi, keuangan, dan akademik lembaga pendidikan Anda.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* === TOP: 3 Horizontal Feature Cards === */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
                        {features.map((feat, idx) => {
                            const FIcon = iconMap[feat.icon_name] || Globe;
                            const isActive = idx === activeTab;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleTabClick(idx)}
                                    className={`relative text-left rounded-2xl p-5 sm:p-6 transition-all duration-400 overflow-hidden group ${isActive
                                        ? `bg-white shadow-xl shadow-gray-200/70 border-2 ${feat.border_color} scale-[1.02]`
                                        : 'bg-white/60 hover:bg-white border-2 border-transparent hover:border-gray-100 hover:shadow-lg'
                                        }`}
                                >
                                    {/* Progress bar */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 h-[3px] transition-none">
                                            <div className={`h-full bg-gradient-to-r ${feat.color_gradient} rounded-full`} style={{ width: `${progress}%` }}></div>
                                        </div>
                                    )}

                                    {/* Subtle bg glow for active */}
                                    {isActive && (
                                        <div className={`absolute top-0 right-0 w-32 h-32 ${feat.bg_light} rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-60`}></div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive
                                                ? `bg-gradient-to-br ${feat.color_gradient} shadow-lg`
                                                : 'bg-gray-100 group-hover:bg-gray-200'
                                                }`}>
                                                <FIcon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={1.5} />
                                            </div>
                                            {isActive && (
                                                <span className={`px-2.5 py-1 ${feat.bg_light} ${feat.text_color} rounded-full text-[10px] sm:text-xs font-semibold`}>
                                                    Aktif
                                                </span>
                                            )}
                                        </div>

                                        <h4 className={`font-bold text-base sm:text-lg mb-1 transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                            {feat.title}
                                        </h4>
                                        <p className={`text-xs sm:text-sm transition-colors ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {feat.subtitle || feat.description?.slice(0, 40) + '...'}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* === DETAIL CARD (full-width) === */}
                    <div className={`transition-all duration-300 ${transitioning ? 'opacity-0 scale-[0.98] translate-y-3' : 'opacity-100 scale-100 translate-y-0'}`}>
                        <div className={`relative bg-gradient-to-br ${active?.color_gradient} rounded-2xl sm:rounded-3xl overflow-hidden`}>
                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
                            <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                    {/* Left: Text */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />
                                            </div>
                                            <span className="px-3 py-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                                                {activeTab + 1} dari {features.length}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                                            {active?.title}
                                        </h3>
                                        <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                                            {active?.description}
                                        </p>

                                        <button
                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="inline-flex items-center gap-2 w-fit px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 hover:bg-white/90 rounded-full text-sm font-bold shadow-xl transition-all duration-300 hover:gap-3 hover:-translate-y-0.5"
                                        >
                                            Konsultasi Gratis
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Right: Highlights Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {(active?.highlights || []).map((h, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white/[0.12] backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 border border-white/[0.12] hover:bg-white/[0.18] transition-colors duration-200">
                                                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-white text-xs sm:text-sm font-medium leading-snug">{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === BOTTOM: Full System Banner === */}
                    <ScrollReveal width="100%" delay={0.2}>
                        <div className="mt-5 sm:mt-6">
                            <div className="relative bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                                <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/3"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-teal-500/10"></div>

                                <div className="relative z-10 p-6 sm:p-8 md:p-10">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
                                        <div className="flex items-center gap-4 flex-shrink-0">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                                                <Database className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                                Full System <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">Terintegrasi</span>
                                            </h3>
                                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                                Gabungkan Bendahara + Sekretaris + Pendidikan dalam satu platform dengan single sign-on dan reporting terpusat.
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex gap-6 sm:gap-8 flex-shrink-0">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <Zap className="w-4 h-4 text-amber-400" />
                                                    <span className="text-2xl sm:text-3xl font-extrabold text-white">3in1</span>
                                                </div>
                                                <span className="text-gray-500 text-xs">Platform</span>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <Shield className="w-4 h-4 text-emerald-400" />
                                                    <span className="text-2xl sm:text-3xl font-extrabold text-white">24/7</span>
                                                </div>
                                                <span className="text-gray-500 text-xs">Support</span>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-1 mb-1">
                                                    <BarChart3 className="w-4 h-4 text-blue-400" />
                                                    <span className="text-2xl sm:text-3xl font-extrabold text-white">99%</span>
                                                </div>
                                                <span className="text-gray-500 text-xs">Uptime</span>
                                            </div>
                                        </div>

                                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white rounded-full font-bold text-sm shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0 group-hover:gap-3">
                                            Hubungi Kami
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Benefits strip */}
                    <div className="mt-10 sm:mt-14">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                    <span className="text-gray-700 text-xs sm:text-sm font-medium leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;

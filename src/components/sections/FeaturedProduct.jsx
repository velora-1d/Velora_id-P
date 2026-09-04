'use client';

import { useState, useEffect, useRef } from 'react';
import { 
    GraduationCap, Users, Database, Wallet, FileText, 
    CheckCircle2, Globe, ArrowRight, Sparkles, Zap, 
    Shield, BarChart3, Layers, Bell, LayoutDashboard, 
    FileBarChart, Headphones, Settings, Terminal,
    Activity, Lock
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = { Wallet, Users, GraduationCap, Database, FileText, Globe };

const fallbackFeatures = [
    {
        icon_name: 'Wallet', 
        title: 'Sistem Bendahara & SPP',
        subtitle: 'Otomasi Keuangan & Kas Lembaga',
        description: 'Pembayaran digital multi-channel terintegrasi Midtrans/Xendit, tagihan SPP berkala, pencatatan kas masuk/keluar, dan notifikasi invoice WhatsApp otomatis langsung ke nomor orang tua/wali santri.',
        color_gradient: 'from-blue-600 to-slate-900',
        badge: 'MODUL_KEUANGAN',
        highlights: [
            'Payment Gateway QRIS & VA Bank (BCA, BRI, Mandiri)',
            'Notifikasi Tagihan WhatsApp Otomatis',
            'Rekonsiliasi Realtime Tanpa Cek Mutasi Manual',
            'Laporan Arus Kas & Tunggakan Sekali Klik'
        ]
    },
    {
        icon_name: 'Users', 
        title: 'Sistem Sekretariat & Santri',
        subtitle: 'Master Data & Administrasi Terpusat',
        description: 'Kelola seluruh biodata santri/siswa, rekam medis internal, kelas, asrama/jurusan, mutasi santri, surat menyurat resmi, hingga direktori alumni dalam satu basis data terenkripsi.',
        color_gradient: 'from-blue-600 to-slate-900',
        badge: 'MODUL_ADMINISTRASI',
        highlights: [
            'Master Data Santri & Riwayat Akademik Terpadu',
            'Manajemen Kamar, Asrama, & Kelas Dinamis',
            'Generator Surat Resmi & Kartu Pelajar Otomatis',
            'Pelacakan Mutasi & Arsip Dokumen Digital'
        ]
    },
    {
        icon_name: 'GraduationCap', 
        title: 'Sistem Akademik & E-Rapor',
        subtitle: 'Penilaian & Kurikulum Terstandar',
        description: 'Perhitungan nilai otomatis sesuai Kurikulum Merdeka dan standar kepesantrenan. Dilengkapi cetak rapor PDF legalitas, absensi harian per mapel, serta pencatatan hafalan/tahfidz.',
        color_gradient: 'from-blue-600 to-slate-900',
        badge: 'MODUL_AKADEMIK',
        highlights: [
            'E-Rapor Digital Kurikulum Merdeka & Kemenag',
            'Modul Setoran Hafalan / Tahfidz Realtime',
            'Input Nilai Guru Berbasis Bobot & KKM',
            'Akses Portal Nilai untuk Orang Tua'
        ]
    },
];

const fallbackBenefits = [
    { title: 'Terintegrasi dalam Satu Platform', desc: 'Seluruh sistem bendahara, tata usaha, dan akademik sinkron tanpa duplikasi data.', icon: Layers },
    { title: 'Notifikasi Realtime via WhatsApp', desc: 'Kirim pengumuman penting dan rincian SPP langsung ke chat orang tua/wali.', icon: Bell },
    { title: 'Panel Kontrol Intuitif', desc: 'Dirancang khusus agar staf TU dan bendahara dapat mengoperasikan tanpa keahlian IT.', icon: LayoutDashboard },
    { title: 'Laporan Keuangan Eksekutif', desc: 'Rekap harian, bulanan, dan tahunan siap cetak untuk pimpinan atau yayasan.', icon: FileBarChart },
    { title: 'Dukungan & Pemeliharaan 24/7', desc: 'Tim teknis Velora standby untuk pembaruan fitur, backup database, & konsultasi.', icon: Headphones },
    { title: 'Kustomisasi Alur Lembaga', desc: 'Fitur dan modul dapat disesuaikan dengan AD/ART atau SOP institusi Anda.', icon: Settings }
];

const INTERVAL = 7000;

const FeaturedProduct = () => {
    const [features, setFeatures] = useState(fallbackFeatures);
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
                const { data, error } = await supabase
                    .from('featured_products')
                    .select('*')
                    .eq('published', true)
                    .order('sort_order', { ascending: true });

                if (!error && data?.length > 0) {
                    setFeatures(data.map((f, i) => ({
                        ...fallbackFeatures[i],
                        ...f,
                        highlights: f.highlights || fallbackFeatures[i]?.highlights || []
                    })));
                }
            } catch { }
        };
        fetchData();
    }, []);

    // Auto-rotate progress timer
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
        }, 150);
    };

    const handleTabClick = (idx) => {
        if (idx === activeTab) return;
        setPaused(false);
        switchTab(idx);
    };

    const active = features[activeTab] || features[0];
    const Icon = iconMap[active?.icon_name] || Database;

    return (
        <section
            id="featured"
            className="py-24 sm:py-32 bg-[#080E1A] text-white relative border-t border-slate-800/80 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); startRef.current = Date.now(); }}
        >
            {/* Ambient Background Structure */}
            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(37,99,235,0.12),transparent)] pointer-events-none"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.03]">
                <span className="text-[18vw] font-black text-white tracking-tighter leading-none select-none whitespace-nowrap">
                    VELORA
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Section Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 uppercase tracking-widest mb-4">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            [PRODUK_UNGGULAN]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
                            Sistem Manajemen Terpadu <br className="hidden sm:block" />
                            <span className="text-blue-400">Pesantren & Sekolah Modern</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Ekosistem digital terpadu untuk menyederhanakan birokrasi, mengotomasi tagihan kas, dan mengamankan rekam akademik lembaga Anda.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* Top 3 Technical Tab Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        {features.map((feat, idx) => {
                            const FIcon = iconMap[feat.icon_name] || Database;
                            const isActive = idx === activeTab;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleTabClick(idx)}
                                    className={`relative text-left rounded-xl p-5 transition-all duration-200 overflow-hidden border ${
                                        isActive
                                            ? 'bg-slate-900 border-blue-500/80 shadow-[0_0_25px_rgba(37,99,235,0.2)]'
                                            : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                                    }`}
                                >
                                    {/* Progress line for active card */}
                                    {isActive && (
                                        <div className="absolute top-0 left-0 h-[2px] w-full bg-slate-800">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                            isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                                        }`}>
                                            <FIcon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                            isActive ? 'bg-blue-950 text-blue-300 border border-blue-800/60' : 'text-slate-500'
                                        }`}>
                                            MODUL 0{idx + 1}
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-base text-white mb-1 tracking-tight">
                                        {feat.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 line-clamp-1">
                                        {feat.subtitle}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Tab Main Detail Card (Bespoke Engineering Layout) */}
                    <div className={`transition-all duration-200 ${transitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
                        <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                {/* Left (Span 7): Overview & Description */}
                                <div className="lg:col-span-7">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">
                                                {active?.badge || 'ENTERPRISE'}
                                            </span>
                                            <span className="text-xs text-slate-500 font-mono">Modul {activeTab + 1} dari {features.length}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                                        {active?.title}
                                    </h3>
                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-justify mb-6 sm:mb-8">
                                        {active?.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4">
                                        <button
                                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-900/30 transition-all group"
                                        >
                                            <span>Minta Demo & Konsultasi</span>
                                            <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                            <Activity className="w-4 h-4 text-emerald-400" />
                                            <span>Uji Coba Langsung di Lembaga Anda</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right (Span 5): Key Capabilities Matrix */}
                                <div className="lg:col-span-5 space-y-2.5">
                                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Fitur Unggulan Modul:
                                    </div>
                                    {(active?.highlights || []).map((h, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-slate-950/70 rounded-xl p-3.5 border border-slate-800/90 hover:border-slate-700 transition-colors">
                                            <div className="w-5 h-5 rounded bg-blue-950 border border-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                                            </div>
                                            <span className="text-slate-200 text-xs sm:text-sm font-medium leading-snug">{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Integrated 3in1 Full Platform Hub */}
                    <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-900/40 p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
                                    <Database className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">Full System Terintegrasi</h4>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white font-semibold">ALL-IN-ONE</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                                        Hubungkan Bendahara, Sekretariat, dan Rapor Akademik dalam satu portal terpadu dengan Single Sign-On (SSO) dan audit log lengkap.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-center border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800 w-full lg:w-auto justify-between sm:justify-start">
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-white font-mono">100%</div>
                                    <div className="text-[11px] text-slate-400 font-mono">Data Terisolasi</div>
                                </div>
                                <div className="border-l border-slate-800 pl-6">
                                    <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">99.9%</div>
                                    <div className="text-[11px] text-slate-400 font-mono">Uptime Server</div>
                                </div>
                                <div className="border-l border-slate-800 pl-6">
                                    <div className="text-xl sm:text-2xl font-bold text-blue-400 font-mono">24/7</div>
                                    <div className="text-[11px] text-slate-400 font-mono">Support WA</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Value Pillars Grid (Anti-AI Slop: Clean Slate Architecture) */}
                    <div className="mt-14 sm:mt-18">
                        <div className="text-center mb-8">
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                [KEUNGGULAN_REKAYASA_VELORA]
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {fallbackBenefits.map((b, i) => {
                                const BIcon = b.icon;
                                return (
                                    <div
                                        key={i}
                                        className="group rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/40 p-5 transition-all duration-200"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 mb-3.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <BIcon className="w-5 h-5" />
                                        </div>
                                        <h5 className="font-bold text-sm sm:text-base text-white mb-1.5 tracking-tight group-hover:text-blue-300 transition-colors">
                                            {b.title}
                                        </h5>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            {b.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;

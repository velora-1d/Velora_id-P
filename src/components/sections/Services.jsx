'use client';

import { useState, useEffect } from 'react';
import {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText,
    ArrowRight, Layers, ChevronRight, Terminal,
    Zap, CheckCircle2, ShieldCheck, Activity
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText
};

const fallbackCategories = [
    {
        id: 'quick', name: 'Jasa Cepat & Deploy', tagline: 'Online Dalam Hitungan Jam',
        description: "Solusi cepat untuk kebutuhan peluncuran website mendesak, migrasi server, pasang SSL, atau maintenance darurat.",
        badge: 'FAST_TRACK',
        services: [
            { icon_name: 'Rocket', title: 'Deploy & Setup VPS', description: 'Laravel, Next.js, Node.js langsung online di VPS/Cloud pilihan Anda.', tag: 'Instant Launch' },
            { icon_name: 'Globe', title: 'Website Demo & Presentasi', description: 'Domain custom aktif dan siap diakses publik untuk pitching atau tugas.', tag: 'Public Link' },
            { icon_name: 'Shield', title: 'Domain Custom & SSL', description: 'Konfigurasi DNS Cloudflare, HTTPS Grade A+, enkripsi end-to-end.', tag: 'Security A+' },
            { icon_name: 'Server', title: 'Maintenance & Troubleshooting', description: 'Audit error log, optimasi performa server, dan backup berkala.', tag: 'Zero Downtime' },
        ]
    },
    {
        id: 'mid', name: 'Company Profile & Web App', tagline: 'Kredibilitas Bisnis & UMKM',
        description: "Website representasi resmi yang berdesain premium, berkecepatan tinggi, dan teroptimasi untuk konversi klien.",
        badge: 'HIGH_CONVERSION',
        services: [
            { icon_name: 'Building2', title: 'Company Profile Premium', description: 'Desain bespoke modern, copy persuasif, dan terintegrasi WhatsApp direct.', tag: 'SEO Optimized' },
            { icon_name: 'CreditCard', title: 'Integrasi Payment Gateway', description: 'Terima QRIS, Virtual Account, & e-wallet otomatis via Midtrans / Xendit.', tag: 'Auto Verify' },
            { icon_name: 'LayoutDashboard', title: 'Dashboard Admin & CMS', description: 'Kelola banner, portfolio, harga, dan artikel blog secara mandiri.', tag: 'Easy Control' },
            { icon_name: 'Globe', title: 'High-Converting Landing Page', description: 'Struktur halaman yang dirancang khusus untuk mengubah pengunjung menjadi pembeli.', tag: 'Fast Load' },
        ]
    },
    {
        id: 'premium', name: 'Sistem Pesantren & Sekolah', tagline: 'Enterprise-Grade Management',
        description: "Sistem digital terintegrasi untuk pengelolaan administrasi, keuangan bendahara, dan akademik lembaga pendidikan modern.",
        badge: 'FLAGSHIP_SYSTEM',
        services: [
            { icon_name: 'Database', title: 'Sistem Bendahara & SPP', description: 'Tagihan otomatis, notifikasi WhatsApp ke wali santri, dan rekonsiliasi realtime.', tag: 'Multi-Channel VA' },
            { icon_name: 'Users', title: 'Sistem Sekretariat & Santri', description: 'Database master santri/siswa, cetak kartu, mutasi, dan rekam berkas digital.', tag: 'Master Database' },
            { icon_name: 'GraduationCap', title: 'Sistem Pendidikan & E-Rapor', description: 'Penilaian Kurikulum Merdeka, cetak rapor instan, dan arsip nilai aman.', tag: 'Digital Report' },
            { icon_name: 'Briefcase', title: 'Sistem Terpadu (All-in-One)', description: 'Integrasi penuh seluruh departemen lembaga dengan hak akses multi-role (RBAC).', tag: 'Full Suite' },
        ]
    },
    {
        id: 'addon', name: 'Otomasi & Layanan Lanjutan', tagline: 'Efisiensi Tanpa Batas',
        description: "Tingkatkan produktivitas bisnis Anda dengan integrasi bot WhatsApp, otomasi pesan, dan optimasi SEO mesin pencari.",
        badge: 'AUTOMATION_HUB',
        services: [
            { icon_name: 'Search', title: 'Teknis SEO & Schema.org', description: 'Peningkatan peringkat pencarian Google dengan structured data JSON-LD.', tag: 'Top Ranking' },
            { icon_name: 'MessageSquare', title: 'WhatsApp Bot & Notifikasi', description: 'Kirim notifikasi transaksi, reminder jatuh tempo, & auto-reply 24/7.', tag: 'API Gateway' },
            { icon_name: 'FileText', title: 'Integrasi Formulir & Data', description: 'Hubungkan form pendaftaran ke Google Sheets, WhatsApp, & email seketika.', tag: 'Instant Sync' },
            { icon_name: 'Send', title: 'Audit Performa & Keamanan', description: 'Analisis celah keamanan, sanitasi query database, dan kompresi aset web.', tag: 'Hardened Code' },
        ]
    }
];

const Services = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [categories, setCategories] = useState(fallbackCategories);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('published', true)
                    .order('sort_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    const grouped = {};
                    data.forEach(s => {
                        const catId = s.category_id || 'mid';
                        if (!grouped[catId]) {
                            const fallback = fallbackCategories.find(c => c.id === catId);
                            grouped[catId] = {
                                id: catId,
                                name: s.category_name || fallback?.name || 'Layanan',
                                tagline: s.category_description || fallback?.tagline || '',
                                description: s.category_description || fallback?.description || '',
                                badge: fallback?.badge || 'ENGINEERING',
                                services: []
                            };
                        }
                        grouped[catId].services.push(s);
                    });
                    const cats = Object.values(grouped);
                    if (cats.length > 0) setCategories(cats);
                }
            } catch { }
        };
        fetchServices();
    }, []);

    const activeCategory = categories[activeTab] || categories[0];

    return (
        <section id="services" className="py-24 sm:py-32 bg-[#faf9f7] text-slate-900 relative border-t border-slate-200/80 overflow-hidden">
            {/* Subtle background ambient dot grid */}
            <div className="absolute inset-0 studio-grid-pattern-light opacity-50 pointer-events-none"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.03]">
                <span className="text-[18vw] font-black text-slate-900 tracking-tighter leading-none select-none whitespace-nowrap">
                    SERVICES
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Section Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 uppercase tracking-widest mb-4 shadow-sm">
                            <Layers className="w-3.5 h-3.5 text-blue-600" />
                            [LAYANAN_DIGITAL]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Katalog Solusi Rekayasa Digital
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Mulai dari peluncuran kilat, website representatif berkecepatan tinggi, hingga sistem tata kelola institusi terpadu.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Technical Category Segmented Control */}
                <ScrollReveal width="100%">
                    <div className="flex justify-center mb-10 sm:mb-12">
                        <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-100 border border-slate-200/90 gap-1 shadow-inner">
                            {categories.map((cat, index) => {
                                const isActive = activeTab === index;
                                return (
                                    <button
                                        key={cat.id || index}
                                        onClick={() => setActiveTab(index)}
                                        className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-400'}`}></span>
                                        <span>{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Bento Grid Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                    {/* Left: Interactive Category Overview Showcase (Span 5) */}
                    <div className="lg:col-span-5 rounded-3xl studio-card-light p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
                        {/* Top Ambient Glow */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded">
                                    {activeCategory.badge || 'PRODUKSI'}
                                </span>
                                <span className="text-xs text-slate-400 font-mono">0{activeTab + 1} / 0{categories.length}</span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                                {activeCategory.name}
                            </h3>
                            <p className="text-blue-600 text-xs sm:text-sm font-semibold mb-4">
                                {activeCategory.tagline}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 text-justify">
                                {activeCategory.description}
                            </p>

                            {/* Technical Architecture Feature Mini-card */}
                            <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-4 font-mono text-xs text-slate-700 space-y-2.5">
                                <div className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5 text-blue-600" /> Standar Eksekusi Velora:
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                                    <span className="text-slate-500">Garansi & Bugfix</span>
                                    <span className="text-emerald-600 font-semibold">Aktif 30-90 Hari</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-200/70 pb-1.5">
                                    <span className="text-slate-500">Stack Standar</span>
                                    <span className="text-blue-600 font-semibold">Clean Architecture</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Hak Milik Source Code</span>
                                    <span className="text-slate-900 font-semibold">100% Milik Klien</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-orange-500/20 group hover:-translate-y-0.5"
                            >
                                <span>Konsultasikan Kebutuhan</span>
                                <ArrowRight className="w-4 h-4 text-orange-100 transition-transform group-hover:translate-x-1" />
                            </a>
                            <span className="text-xs text-slate-500 hidden sm:inline-block">Konsultasi Tanpa Biaya</span>
                        </div>
                    </div>

                    {/* Right: Service Cards Matrix (Span 7) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCategory.services.map((service, idx) => {
                            const SIcon = iconMap[service.icon_name] || Layers;
                            return (
                                <div
                                    key={idx}
                                    className="group rounded-2xl studio-card-light hover:border-blue-500/40 p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                                                <SIcon className="w-5 h-5" />
                                            </div>
                                            {service.tag && (
                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                                                    {service.tag}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h4>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                                        <span className="flex items-center gap-1.5 text-emerald-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Siap Produksi
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;

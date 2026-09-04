'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Sparkles, MapPin, Zap, ChevronRight, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import { getIcon } from '@/lib/icons';

const fallbackProjects = [
    {
        title: "E-Commerce Multi-Channel Platform", 
        category: "Retail & E-Commerce", 
        client: "Fashion Hub Indonesia",
        description: "Platform e-commerce performa tinggi dengan integrasi auto-reconcile payment gateway, manajemen ribuan inventori varian, dan sinkronisasi pesanan ke marketplace.",
        challenge: "Klien membutuhkan sistem yang dapat mengelola ribuan produk dengan banyak varian dan integrasi ke marketplace.",
        solution: "Kami membangun platform custom dengan dashboard terpusat, sync otomatis ke Tokopedia/Shopee, dan laporan penjualan real-time.",
        tech: "Next.js 16, Node.js, PostgreSQL, Midtrans",
        image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=75", 
        icon_name: "ShoppingCart", 
        slug: 'e-commerce-platform'
    },
    {
        title: "Digital Banking & Treasury App", 
        category: "Finance & Banking", 
        client: "Bank Digital Nusantara",
        description: "Aplikasi perbankan dan pencatatan kas lembaga dengan autentikasi biometrik, laporan mutasi instan, dan otorisasi transaksi bertingkat.",
        challenge: "Membutuhkan keamanan tingkat tinggi dengan UX yang tetap mudah digunakan oleh semua kalangan.",
        solution: "Implementasi biometric authentication, end-to-end encryption, dengan UI/UX yang intuitif dan accessibility-friendly.",
        tech: "Flutter, Go, PostgreSQL, Redis",
        image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=75", 
        icon_name: "CreditCard", 
        slug: 'digital-banking-app'
    },
    {
        title: "Sistem Informasi & Rekam Medis RS", 
        category: "Healthcare", 
        client: "RS Sehat Sejahtera",
        description: "Sistem digitalisasi antrean pasien, integrasi bridging BPJS SatuSehat, dan sistem rekam medis elektronik (RME) terenkripsi.",
        challenge: "Sistem lama berbasis kertas menyebabkan keterlambatan layanan dan kehilangan data pasien.",
        solution: "Migrasi penuh ke sistem digital dengan modul pendaftaran, antrian, rekam medis, billing, dan telemedicine.",
        tech: "Laravel, React, MySQL, Docker",
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=75", 
        icon_name: "Building2", 
        slug: 'hospital-management-system'
    },
    {
        title: "Fleet & Logistics Tracking Engine", 
        category: "Logistics", 
        client: "Logistics Prima",
        description: "Sistem telematika dan tracking armada kendaraan realtime dengan algoritma optimasi rute bahan bakar dan notifikasi webhook pengiriman.",
        challenge: "Armada 200+ kendaraan sulit dipantau, banyak keterlambatan dan inefisiensi rute.",
        solution: "GPS tracking real-time, algoritma optimasi rute, dashboard monitoring, dan notifikasi otomatis ke pelanggan.",
        tech: "Python, FastAPI, PostgreSQL, Mapbox",
        image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=75", 
        icon_name: "Truck", 
        slug: 'fleet-management-system'
    },
    {
        title: "Learning & Academic Portal (Pesantren)", 
        category: "Education", 
        client: "Pesantren & EduTech Hub",
        description: "Portal akademik terintegrasi untuk ribuan santri dengan modul setoran hafalan Qur'an, absensi RFID, dan e-rapor Kurikulum Merdeka.",
        challenge: "Pandemi memaksa sekolah beralih online tanpa infrastruktur yang memadai.",
        solution: "LMS lengkap dengan video conference, bank soal, rapor digital, dan integrasi dengan sistem sekolah.",
        tech: "Next.js, Supabase, Tailwind, Cloudflare",
        image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=75", 
        icon_name: "GraduationCap", 
        slug: 'learning-management-system'
    },
    {
        title: "Executive Business Analytics Hub", 
        category: "Retail & E-Commerce", 
        client: "Retail Mart Group",
        description: "Dashboard analitik eksekutif dengan agregasi data penjualan multi-cabang, grafik prediktif inventori stok, dan laporan laba bersih realtime.",
        challenge: "Data penjualan tersebar di berbagai platform, sulit mengambil keputusan berbasis data.",
        solution: "Unified dashboard dengan integrasi multi-source, visualisasi data interaktif, dan AI recommendation engine.",
        tech: "React, Python, Tailwind, Supabase",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75", 
        icon_name: "BarChart3", 
        slug: 'business-analytics-dashboard'
    }
];

const Portfolio = () => {
    const [projects, setProjects] = useState(fallbackProjects);
    const [filter, setFilter] = useState('Semua');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('portfolio_projects')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) setProjects(data);
            } catch { }
        };
        fetchProjects();
    }, []);

    const categories = ['Semua', ...new Set(projects.map(p => p.category))];
    const filtered = filter === 'Semua' ? projects : projects.filter(p => p.category === filter);
    const featured = filtered[0];
    const rest = filtered.slice(1);

    const projectUrl = (project) => `/portfolio/${project.slug || project.id}`;

    return (
        <section id="portfolio" className="py-24 sm:py-32 bg-[#070C18] text-white relative border-t border-slate-800/80 overflow-hidden">
            {/* Subtle technical background grid */}
            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 uppercase tracking-widest mb-4">
                            <Layers className="w-3.5 h-3.5 text-blue-400" />
                            [SHOWCASE_PORTFOLIO]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Studi Kasus & Rekayasa Produk
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Kompilasi sistem informasi, platform e-commerce, dan aplikasi kustom yang telah kami selesaikan dengan arsitektur tangguh.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Segmented Controls */}
                <ScrollReveal width="100%">
                    <div className="flex justify-center mb-10 sm:mb-14">
                        <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-950 border border-slate-800 gap-1">
                            {categories.map(cat => {
                                const isActive = filter === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* FEATURED CASE STUDY (COMMAND CENTER DISPLAY) */}
                    {featured && (
                        <ScrollReveal width="100%">
                            <div className="mb-10 sm:mb-12 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 overflow-hidden shadow-2xl group">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                                    {/* Left (Span 7): Device / Screen Showcase */}
                                    <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-slate-950 flex flex-col justify-between">
                                        {/* Browser frame top */}
                                        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 z-10 text-[11px] font-mono text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                                                    <div className="w-2 h-2 rounded-full bg-amber-500/80"></div>
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
                                                </div>
                                                <span className="text-slate-400 ml-2 truncate max-w-[200px]">{featured.title.toLowerCase().replace(/\s+/g, '-')}.velora.id</span>
                                            </div>
                                            <span className="text-blue-400 font-semibold">[PRODUKSI_LIVE]</span>
                                        </div>

                                        <img
                                            src={featured.image_url || featured.image}
                                            alt={featured.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden"></div>
                                    </div>

                                    {/* Right (Span 5): Case Study Brief */}
                                    <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 rounded">
                                                    {featured.category}
                                                </span>
                                                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                    {featured.client}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-300 transition-colors">
                                                {featured.title}
                                            </h3>

                                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                                {featured.description}
                                            </p>

                                            {/* Stack Tag Chips */}
                                            <div className="mb-6">
                                                <span className="text-[11px] font-mono text-slate-500 block mb-2 uppercase tracking-wider">Teknologi yang Diterapkan:</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {featured.tech.split(',').map((t, i) => (
                                                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-blue-300">
                                                            {t.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                                            <Link
                                                href={projectUrl(featured)}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/30 group"
                                            >
                                                <span>Buka Studi Kasus</span>
                                                <ArrowRight className="w-4 h-4 text-blue-200 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                                                <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* REST OF PORTFOLIO (TECHNICAL GRID CARDS) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {rest.map((project, index) => {
                            const PIcon = getIcon(project.icon_name || project.icon);
                            return (
                                <ScrollReveal key={project.id || index} delay={index * 0.05} width="100%">
                                    <Link
                                        href={projectUrl(project)}
                                        className="rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/40 overflow-hidden flex flex-col justify-between transition-all duration-200 group h-full shadow-sm hover:shadow-xl hover:shadow-blue-950/20"
                                    >
                                        <div>
                                            {/* Preview Image with Subtle Frame */}
                                            <div className="h-44 sm:h-48 overflow-hidden bg-slate-950 relative border-b border-slate-800">
                                                <img
                                                    src={project.image_url || project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-300">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Details */}
                                            <div className="p-5">
                                                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                                                    <span>{project.client}</span>
                                                    {PIcon && <PIcon className="w-3.5 h-3.5 text-blue-400" />}
                                                </div>

                                                <h4 className="font-bold text-white text-base sm:text-lg mb-2 leading-snug group-hover:text-blue-300 transition-colors line-clamp-1">
                                                    {project.title}
                                                </h4>

                                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Footer with Stack and Action */}
                                        <div className="p-5 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono">
                                            <span className="text-slate-400 truncate max-w-[170px]">
                                                {project.tech}
                                            </span>
                                            <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                                <span>Detail</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

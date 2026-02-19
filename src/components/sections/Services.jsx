'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText,
    ArrowRight, Sparkles, ChevronRight
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
        id: 'quick', name: 'Jasa Cepat', tagline: 'Online dalam hitungan jam',
        gradient: 'from-emerald-500 to-teal-600', glow: 'emerald', ring: 'ring-emerald-500/30',
        services: [
            { icon_name: 'Rocket', title: 'Deploy Website', description: 'Laravel, React, HTML – langsung online di VPS dengan domain & SSL. Proses cepat dan terjamin.' },
            { icon_name: 'Globe', title: 'Website Tugas/Demo', description: 'Siap diakses publik untuk presentasi atau demo klien.' },
            { icon_name: 'Shield', title: 'Pasang Domain & SSL', description: 'HTTPS aktif, domain custom, siap live.' },
            { icon_name: 'Server', title: 'Maintenance Ringan', description: 'Cek server, perbaikan error, backup rutin.' },
        ]
    },
    {
        id: 'mid', name: 'Jasa Menengah', tagline: 'Solusi untuk UMKM & Lembaga',
        gradient: 'from-blue-500 to-indigo-600', glow: 'blue', ring: 'ring-blue-500/30',
        services: [
            { icon_name: 'Building2', title: 'Company Profile', description: 'Profil usaha/lembaga profesional dengan integrasi WhatsApp dan SEO-ready.' },
            { icon_name: 'CreditCard', title: 'Payment Gateway', description: 'Midtrans/Xendit dengan invoice otomatis & notifikasi WA.' },
            { icon_name: 'LayoutDashboard', title: 'Dashboard Admin', description: 'CRUD data, laporan, manajemen konten yang mudah.' },
            { icon_name: 'Globe', title: 'Landing Page', description: 'Halaman khusus untuk campaign marketing & lead generation.' },
        ]
    },
    {
        id: 'premium', name: 'Sistem Unggulan', tagline: 'Enterprise-grade untuk Sekolah & Pesantren',
        gradient: 'from-violet-500 to-purple-600', glow: 'violet', ring: 'ring-violet-500/30',
        services: [
            { icon_name: 'Database', title: 'Sistem Bendahara', description: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA ke wali santri.' },
            { icon_name: 'Users', title: 'Sistem Sekretaris', description: 'Master data santri/siswa, kelas, jurusan, mutasi lengkap.' },
            { icon_name: 'GraduationCap', title: 'Sistem Pendidikan', description: 'E-Rapor, perhitungan nilai nasional, ijazah digital.' },
            { icon_name: 'Briefcase', title: 'Full System', description: 'Bendahara + Sekretaris + Pendidikan dalam satu platform.' },
        ]
    },
    {
        id: 'addon', name: 'Jasa Tambahan', tagline: 'Boost performa & otomasi',
        gradient: 'from-amber-500 to-orange-600', glow: 'amber', ring: 'ring-amber-500/30',
        services: [
            { icon_name: 'Search', title: 'SEO Optimization', description: 'Optimasi mesin pencari, submit sitemap, analitik Google.' },
            { icon_name: 'FileText', title: 'Form Integration', description: 'Google Form → Sheets → Notifikasi Telegram otomatis.' },
            { icon_name: 'MessageSquare', title: 'WA Automation', description: 'Broadcast & auto-reply untuk komunikasi massal.' },
            { icon_name: 'Send', title: 'Hosting & Domain', description: 'Paket tahunan, perpanjangan, migrasi server.' },
        ]
    }
];

const INTERVAL = 5000;

const glowColors = {
    emerald: 'bg-emerald-500/20',
    blue: 'bg-blue-500/20',
    violet: 'bg-violet-500/20',
    amber: 'bg-amber-500/20',
};

const Services = () => {
    const [active, setActive] = useState(0);
    const [categories, setCategories] = useState(fallbackCategories);
    const [paused, setPaused] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);
    const startRef = useRef(Date.now());

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase.from('services').select('*').eq('published', true).order('sort_order', { ascending: true });
                if (!error && data && data.length > 0) {
                    const grouped = {};
                    data.forEach(s => {
                        if (!grouped[s.category_id]) {
                            grouped[s.category_id] = {
                                id: s.category_id, name: s.category_name, tagline: s.category_description,
                                gradient: s.category_gradient,
                                glow: s.category_gradient?.includes('emerald') ? 'emerald' : s.category_gradient?.includes('blue') ? 'blue' : s.category_gradient?.includes('violet') ? 'violet' : 'amber',
                                ring: `ring-${s.category_gradient?.includes('emerald') ? 'emerald' : s.category_gradient?.includes('blue') ? 'blue' : s.category_gradient?.includes('violet') ? 'violet' : 'amber'}-500/30`,
                                services: []
                            };
                        }
                        grouped[s.category_id].services.push(s);
                    });
                    const order = ['quick', 'mid', 'premium', 'addon'];
                    const sorted = order.filter(id => grouped[id]).map(id => grouped[id]);
                    if (sorted.length > 0) setCategories(sorted);
                }
            } catch { }
        };
        fetchServices();
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
            switchTo((active + 1) % categories.length);
        }, INTERVAL);

        return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current); };
    }, [active, paused, categories.length]);

    const switchTo = (idx) => {
        setTransitioning(true);
        setTimeout(() => {
            setActive(idx);
            setProgress(0);
            startRef.current = Date.now();
            setTimeout(() => setTransitioning(false), 50);
        }, 250);
    };

    const handleClick = (idx) => {
        if (idx === active) return;
        setPaused(false);
        switchTo(idx);
    };

    const cat = categories[active];
    const featured = cat?.services[0];
    const rest = cat?.services.slice(1) || [];

    return (
        <section
            id="services"
            className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); startRef.current = Date.now(); }}
        >
            {/* Ambient glow orbs */}
            <div className={`absolute top-1/4 -left-32 w-[500px] h-[500px] ${glowColors[cat?.glow] || 'bg-blue-500/20'} rounded-full blur-[120px] transition-colors duration-1000 pointer-events-none`}></div>
            <div className={`absolute bottom-1/4 -right-32 w-[400px] h-[400px] ${glowColors[cat?.glow] || 'bg-blue-500/20'} rounded-full blur-[100px] transition-colors duration-1000 pointer-events-none opacity-60`}></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm text-white/70 rounded-full text-sm font-medium mb-5 tracking-wide">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            LAYANAN KAMI
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 sm:mb-6 tracking-tight leading-tight">
                            Solusi Digital yang <br className="hidden sm:block" />
                            <span className={`bg-gradient-to-r ${cat?.gradient} bg-clip-text text-transparent transition-all duration-500`}>Mengubah Bisnis</span>
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Dari deploy cepat hingga sistem enterprise — kami siap membantu transformasi digital Anda.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Tabs — glassmorphism pills */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
                    {categories.map((c, i) => {
                        const isActive = i === active;
                        return (
                            <button
                                key={c.id}
                                onClick={() => handleClick(i)}
                                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 overflow-hidden ${isActive
                                    ? 'text-white shadow-lg shadow-white/5 scale-105 ring-2 ' + c.ring
                                    : 'text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
                                    }`}
                            >
                                {isActive && <div className={`absolute inset-0 bg-gradient-to-r ${c.gradient} opacity-90`}></div>}
                                {isActive && <div className="absolute bottom-0 left-0 h-[2px] bg-white/50 transition-none" style={{ width: `${progress}%` }}></div>}
                                <span className="relative z-10">{c.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tagline */}
                <div className={`text-center mb-8 sm:mb-12 transition-all duration-300 ${transitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-slate-500 text-base sm:text-lg font-medium">{cat?.tagline}</p>
                </div>

                {/* === BENTO GRID === */}
                <div className={`max-w-6xl mx-auto transition-all duration-400 ${transitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-auto">

                        {/* ===== FEATURED CARD (big glass) ===== */}
                        {featured && (
                            <div className="lg:col-span-7 lg:row-span-2">
                                <div className={`relative h-full bg-gradient-to-br ${cat?.gradient} rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-${cat?.glow}-500/20 min-h-[300px] sm:min-h-[380px]`}>
                                    {/* Glass overlay */}
                                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
                                    {/* Decorative */}
                                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
                                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-black/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
                                    {/* Grid pattern */}
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                    <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6 sm:mb-8">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                {(() => {
                                                    const I = iconMap[featured.icon_name] || Globe;
                                                    return <I className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />;
                                                })()}
                                            </div>
                                            <span className="px-3 py-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider">
                                                ⭐ Unggulan
                                            </span>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-end">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight">
                                                {featured.title}
                                            </h3>
                                            <p className="text-white/75 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mb-6 sm:mb-8">
                                                {featured.description}
                                            </p>
                                            <button
                                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="inline-flex items-center gap-2 w-fit px-5 sm:px-6 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3"
                                            >
                                                Konsultasi Gratis
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ===== STACKED CARDS (right side, 2 cards) ===== */}
                        {rest.slice(0, 2).map((svc, i) => {
                            const I = iconMap[svc.icon_name] || Globe;
                            return (
                                <div key={i} className="lg:col-span-5">
                                    <div className="group relative h-full bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden cursor-pointer"
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        {/* Hover glow */}
                                        <div className={`absolute -inset-1 bg-gradient-to-br ${cat?.gradient} opacity-0 group-hover:opacity-[0.06] blur-xl transition-opacity duration-500 rounded-2xl`}></div>

                                        <div className="relative z-10 p-5 sm:p-6 flex items-start gap-4">
                                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${cat?.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-500`}>
                                                <I className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-sm sm:text-base mb-1.5 group-hover:text-white/90 transition-colors">
                                                    {svc.title}
                                                </h4>
                                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-slate-300 transition-colors">
                                                    {svc.description}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white/50 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* ===== BOTTOM BANNER CARD (full-width) ===== */}
                        {rest[2] && (() => {
                            const svc = rest[2];
                            const I = iconMap[svc.icon_name] || Globe;
                            return (
                                <div className="lg:col-span-12">
                                    <div className="group relative bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden cursor-pointer"
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        {/* Hover glow */}
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${cat?.gradient} opacity-0 group-hover:opacity-[0.04] blur-xl transition-opacity duration-500 rounded-2xl`}></div>
                                        {/* Decorative gradient line */}
                                        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${cat?.gradient} to-transparent opacity-30`}></div>

                                        <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${cat?.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-500`}>
                                                <I className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-white/90 transition-colors">
                                                    {svc.title}
                                                </h4>
                                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                                                    {svc.description}
                                                </p>
                                            </div>
                                            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-sm font-semibold text-white transition-all duration-300 flex-shrink-0 group-hover:gap-3">
                                                Konsultasi
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8 sm:mt-12">
                    {categories.map((c, i) => (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            className={`rounded-full transition-all duration-500 ${i === active
                                ? `w-8 sm:w-10 h-2 bg-gradient-to-r ${c.gradient}`
                                : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                                }`}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 sm:mt-16 text-center">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Diskusikan Kebutuhan Anda
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;

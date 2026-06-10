'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, MessageSquare, ArrowRight, Layers, Sparkles, ShoppingCart, CreditCard, Building2, Truck, GraduationCap, BarChart3, MapPin, Zap, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = {
    'ShoppingCart': ShoppingCart,
    'CreditCard': CreditCard,
    'Building2': Building2,
    'Truck': Truck,
    'GraduationCap': GraduationCap,
    'BarChart3': BarChart3,
};

const fallbackProjects = [
    {
        title: "E-Commerce Platform", category: "Retail & E-Commerce", client: "Fashion Hub Indonesia",
        description: "Platform e-commerce multi-channel dengan integrasi payment gateway dan inventory management real-time.",
        challenge: "Klien membutuhkan sistem yang dapat mengelola ribuan produk dengan banyak varian dan integrasi ke marketplace.",
        solution: "Kami membangun platform custom dengan dashboard terpusat, sync otomatis ke Tokopedia/Shopee, dan laporan penjualan real-time.",
        tech: "React, Node.js, PostgreSQL",
        image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=70", icon: "ShoppingCart"
    },
    {
        title: "Digital Banking App", category: "Finance & Banking", client: "Bank Digital Nusantara",
        description: "Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investment tracking.",
        challenge: "Membutuhkan keamanan tingkat tinggi dengan UX yang tetap mudah digunakan oleh semua kalangan.",
        solution: "Implementasi biometric authentication, end-to-end encryption, dengan UI/UX yang intuitif dan accessibility-friendly.",
        tech: "Flutter, Go, MongoDB",
        image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=70", icon: "CreditCard"
    },
    {
        title: "Hospital Management System", category: "Healthcare", client: "RS Sehat Sejahtera",
        description: "Sistem informasi rumah sakit terintegrasi dengan rekam medis elektronik dan telemedicine.",
        challenge: "Sistem lama berbasis kertas menyebabkan keterlambatan layanan dan kehilangan data pasien.",
        solution: "Migrasi penuh ke sistem digital dengan modul pendaftaran, antrian, rekam medis, billing, dan telemedicine.",
        tech: "Laravel, Vue.js, MySQL",
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=70", icon: "Building2"
    },
    {
        title: "Fleet Management System", category: "Logistics", client: "Logistics Prima",
        description: "Sistem tracking armada real-time dengan optimasi rute dan manajemen pengiriman.",
        challenge: "Armada 200+ kendaraan sulit dipantau, banyak keterlambatan dan inefisiensi rute.",
        solution: "GPS tracking real-time, algoritma optimasi rute, dashboard monitoring, dan notifikasi otomatis ke pelanggan.",
        tech: "Python, Django, PostgreSQL",
        image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=70", icon: "Truck"
    },
    {
        title: "Learning Management System", category: "Education", client: "EduTech Indonesia",
        description: "Platform e-learning dengan virtual classroom, quiz interaktif, dan progress tracking.",
        challenge: "Pandemi memaksa sekolah beralih online tanpa infrastruktur yang memadai.",
        solution: "LMS lengkap dengan video conference, bank soal, rapor digital, dan integrasi dengan sistem sekolah.",
        tech: "Next.js, Firebase, WebRTC",
        image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=70", icon: "GraduationCap"
    },
    {
        title: "Business Analytics Dashboard", category: "Retail & E-Commerce", client: "Retail Mart Group",
        description: "Dashboard analytics real-time dengan AI-powered insights untuk pengambilan keputusan bisnis.",
        challenge: "Data penjualan tersebar di berbagai platform, sulit mengambil keputusan berbasis data.",
        solution: "Unified dashboard dengan integrasi multi-source, visualisasi data interaktif, dan AI recommendation engine.",
        tech: "React, Python, TensorFlow",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=70", icon: "BarChart3"
    }
];

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);
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

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    const handleWhatsApp = (project) => {
        const message = `Halo Velora! Saya tertarik dengan project "${project.title}" yang ada di portfolio. Bisa diskusi lebih lanjut?`;
        window.open(`https://wa.me/6281320442174?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section id="portfolio" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Subtle cross pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 12v8M12 16h8' stroke='%23000' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-14 sm:mb-18">
                        <div className="w-12 h-[2px] bg-gray-900 mb-6"></div>
                        <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" /> Portfolio
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight text-center">
                            Portfolio Kami
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed text-center">
                            Proyek-proyek transformasi digital yang telah kami selesaikan dengan sukses.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Pills */}
                <ScrollReveal width="100%">
                    <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* FEATURED — Overlapping Card Hero */}
                    {featured && (
                        <ScrollReveal width="100%">
                            <div
                                className="relative mb-8 cursor-pointer group"
                                onClick={() => openModal(featured)}
                            >
                                {/* Image */}
                                <div className="h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden">
                                    <img
                                        src={featured.image_url || featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlapping Card */}
                                <div className="relative mx-4 sm:mx-8 md:mx-12 -mt-20 sm:-mt-24">
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-bold rounded-md uppercase tracking-wider border border-teal-100">
                                                {featured.category}
                                            </span>
                                            <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[11px] font-bold rounded-md flex items-center gap-1 border border-amber-100">
                                                <Sparkles className="w-3 h-3" /> Featured
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                                            {featured.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 max-w-2xl">
                                            {featured.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {featured.client}</span>
                                                <span className="flex items-center gap-1.5 font-mono"><Zap className="w-3.5 h-3.5" /> {featured.tech}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* REST — Overlapping Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {rest.map((project, index) => {
                            const PIcon = iconMap[project.icon];
                            return (
                                <ScrollReveal key={project.id || index} delay={index * 0.08} width="100%">
                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => openModal(project)}
                                    >
                                        {/* Image */}
                                        <div className="h-48 sm:h-52 rounded-2xl overflow-hidden">
                                            <img
                                                src={project.image_url || project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Overlapping Content Card */}
                                        <div className="relative mx-3 -mt-10">
                                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                        {project.category}
                                                    </span>
                                                    {PIcon && <PIcon className="w-4 h-4 text-gray-300" />}
                                                </div>
                                                <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-snug group-hover:text-teal-600 transition-colors line-clamp-1">
                                                    {project.title}
                                                </h4>
                                                <p className="text-gray-400 text-xs mb-3">{project.client}</p>
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                                    {project.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                                    <p className="text-[10px] text-gray-400 font-mono truncate pr-2">
                                                        {project.tech}
                                                    </p>
                                                    <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 flex-shrink-0 group-hover:gap-2 transition-all">
                                                        Detail <ChevronRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {/* Hero Image */}
                        <div className="h-64 sm:h-72 relative overflow-hidden rounded-t-3xl">
                            <img src={selectedProject.image_url || selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                            <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 border border-white/20 hover:scale-105">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {selectedProject.category}
                                    </span>
                                    <span className="px-3 py-1 bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-200 text-xs font-semibold rounded-full">
                                        {selectedProject.client}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {(() => { const PIcon = iconMap[selectedProject.icon]; return PIcon ? <PIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} /> : null; })()}
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{selectedProject.title}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">{selectedProject.description}</p>

                            {/* Challenge & Solution Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-400 rounded-r-full"></div>
                                    <div className="pl-2">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                                                <Target className="w-4 h-4 text-amber-600" />
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm">Tantangan</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.challenge}</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-400 to-cyan-400 rounded-r-full"></div>
                                    <div className="pl-2">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                                                <Lightbulb className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm">Solusi</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
                                <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-gray-400" /> Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.split(', ').map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-mono font-medium text-gray-700 shadow-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-5 sm:p-6 border border-teal-100">
                                <p className="text-gray-700 text-sm font-medium mb-4">Tertarik dengan project serupa?</p>
                                <button
                                    onClick={() => handleWhatsApp(selectedProject)}
                                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Diskusikan Project Serupa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;

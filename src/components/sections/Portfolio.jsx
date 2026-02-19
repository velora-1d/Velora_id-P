'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, MessageSquare, ArrowRight, Layers, Sparkles, ShoppingCart, CreditCard, Building2, Truck, GraduationCap, BarChart3, MapPin, Zap, Target, Lightbulb } from 'lucide-react';
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
        image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80", icon: "ShoppingCart"
    },
    {
        title: "Digital Banking App", category: "Finance & Banking", client: "Bank Digital Nusantara",
        description: "Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investment tracking.",
        challenge: "Membutuhkan keamanan tingkat tinggi dengan UX yang tetap mudah digunakan oleh semua kalangan.",
        solution: "Implementasi biometric authentication, end-to-end encryption, dengan UI/UX yang intuitif dan accessibility-friendly.",
        tech: "Flutter, Go, MongoDB",
        image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", icon: "CreditCard"
    },
    {
        title: "Hospital Management System", category: "Healthcare", client: "RS Sehat Sejahtera",
        description: "Sistem informasi rumah sakit terintegrasi dengan rekam medis elektronik dan telemedicine.",
        challenge: "Sistem lama berbasis kertas menyebabkan keterlambatan layanan dan kehilangan data pasien.",
        solution: "Migrasi penuh ke sistem digital dengan modul pendaftaran, antrian, rekam medis, billing, dan telemedicine.",
        tech: "Laravel, Vue.js, MySQL",
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", icon: "Building2"
    },
    {
        title: "Fleet Management System", category: "Logistics", client: "Logistics Prima",
        description: "Sistem tracking armada real-time dengan optimasi rute dan manajemen pengiriman.",
        challenge: "Armada 200+ kendaraan sulit dipantau, banyak keterlambatan dan inefisiensi rute.",
        solution: "GPS tracking real-time, algoritma optimasi rute, dashboard monitoring, dan notifikasi otomatis ke pelanggan.",
        tech: "Python, Django, PostgreSQL",
        image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80", icon: "Truck"
    },
    {
        title: "Learning Management System", category: "Education", client: "EduTech Indonesia",
        description: "Platform e-learning dengan virtual classroom, quiz interaktif, dan progress tracking.",
        challenge: "Pandemi memaksa sekolah beralih online tanpa infrastruktur yang memadai.",
        solution: "LMS lengkap dengan video conference, bank soal, rapor digital, dan integrasi dengan sistem sekolah.",
        tech: "Next.js, Firebase, WebRTC",
        image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80", icon: "GraduationCap"
    },
    {
        title: "Business Analytics Dashboard", category: "Retail & E-Commerce", client: "Retail Mart Group",
        description: "Dashboard analytics real-time dengan AI-powered insights untuk pengambilan keputusan bisnis.",
        challenge: "Data tersebar di banyak sistem, sulit mendapat gambaran bisnis secara menyeluruh.",
        solution: "Data warehouse terpusat dengan visualisasi interaktif dan prediksi penjualan berbasis machine learning.",
        tech: "React, Python, TensorFlow",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", icon: "BarChart3"
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
        <section id="portfolio" className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 to-primary/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-5 tracking-wide">
                            <Layers className="w-4 h-4" />
                            PORTFOLIO
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">Portfolio Kami</h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Proyek-proyek transformasi digital yang telah kami selesaikan dengan sukses.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
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

                <div className="max-w-6xl mx-auto">
                    {/* FEATURED PROJECT — Hero Card */}
                    {featured && (
                        <ScrollReveal width="100%">
                            <div
                                className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-5 sm:mb-6 cursor-pointer group"
                                onClick={() => openModal(featured)}
                            >
                                <div className="aspect-[21/9] sm:aspect-[21/8] relative">
                                    <img
                                        src={featured.image_url || featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent"></div>

                                    <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end">
                                        <div className="max-w-xl">
                                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                                <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                                    {featured.category}
                                                </span>
                                                <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" /> Featured
                                                </span>
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                                                {featured.title}
                                            </h3>
                                            <p className="text-white/70 text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed line-clamp-2">
                                                {featured.description}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <span className="text-white/50 text-xs sm:text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {featured.client}</span>
                                                <span className="text-white/50 text-xs sm:text-sm font-mono flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {featured.tech}</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 right-6 sm:right-8 md:right-12">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* REST — Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {rest.map((project, index) => (
                            <ScrollReveal key={project.id || index} delay={index * 0.08} className="h-full">
                                <div
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
                                    onClick={() => openModal(project)}
                                >
                                    <div className="h-44 sm:h-48 overflow-hidden relative">
                                        <img
                                            src={project.image_url || project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-sm">
                                                {project.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                                <ExternalLink className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs mb-3">{project.client}</p>
                                        <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="pt-3 border-t border-gray-100 mt-auto">
                                            <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                                                <span className="font-semibold text-gray-600">Tech:</span> {project.tech}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
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

                            {/* Close Button */}
                            <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 border border-white/20 hover:scale-105">
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header overlay content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {selectedProject.category}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 text-xs font-semibold rounded-full">
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
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-teal-400 rounded-r-full"></div>
                                    <div className="pl-2">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                <Lightbulb className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm">Solusi</h4>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack Pills */}
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
                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-emerald-100">
                                <p className="text-gray-700 text-sm font-medium mb-4">Tertarik dengan project serupa?</p>
                                <button
                                    onClick={() => handleWhatsApp(selectedProject)}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 text-sm sm:text-base"
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

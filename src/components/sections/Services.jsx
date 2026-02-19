'use client';

import { useState, useEffect } from 'react';
import {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText,
    ArrowRight, Layers, ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText
};

const categoryImages = {
    'quick': "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    'mid': "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    'premium': "https://images.unsplash.com/photo-1577962917302-cd874c4e3169?auto=format&fit=crop&w=800&q=80",
    'addon': "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
};

const fallbackCategories = [
    {
        id: 'quick', name: 'Jasa Cepat', tagline: 'Online dalam hitungan jam',
        description: "Solusi instan untuk kebutuhan website mendesak. Hemat waktu, biaya terjangkau, dan langsung siap pakai.",
        services: [
            { icon_name: 'Rocket', title: 'Deploy Website', description: 'Laravel, React, HTML – langsung online di VPS.' },
            { icon_name: 'Globe', title: 'Website Tugas/Demo', description: 'Siap diakses publik untuk presentasi atau demo.' },
            { icon_name: 'Shield', title: 'Pasang Domain & SSL', description: 'HTTPS aktif, domain custom, aman & terpercaya.' },
            { icon_name: 'Server', title: 'Maintenance Ringan', description: 'Cek server, perbaikan error, backup rutin.' },
        ]
    },
    {
        id: 'mid', name: 'Jasa Menengah', tagline: 'Solusi untuk UMKM & Lembaga',
        description: "Tingkatkan kredibilitas bisnis Anda dengan website profesional yang terintegrasi dan mudah dikelola.",
        services: [
            { icon_name: 'Building2', title: 'Company Profile', description: 'Desain premium, SEO-ready, integrasi WhatsApp.' },
            { icon_name: 'CreditCard', title: 'Payment Gateway', description: 'Terima pembayaran otomatis via Midtrans/Xendit.' },
            { icon_name: 'LayoutDashboard', title: 'Dashboard Admin', description: 'Kelola konten dan data dengan mudah.' },
            { icon_name: 'Globe', title: 'Landing Page', description: 'Konversi pengunjung menjadi pelanggan.' },
        ]
    },
    {
        id: 'premium', name: 'Sistem Unggulan', tagline: 'Enterprise-grade untuk Sekolah',
        description: "Sistem manajemen terintegrasi untuk operasional sekolah dan pesantren yang lebih efisien dan modern.",
        services: [
            { icon_name: 'Database', title: 'Sistem Bendahara', description: 'Tagihan, pembayaran, dan laporan keuangan realtime.' },
            { icon_name: 'Users', title: 'Sistem Sekretaris', description: 'Database siswa, guru, dan administrasi akademik.' },
            { icon_name: 'GraduationCap', title: 'Sistem Pendidikan', description: 'E-Rapor, penilaian, dan ijazah digital.' },
            { icon_name: 'Briefcase', title: 'Full System', description: 'All-in-one solution untuk manajemen total.' },
        ]
    },
    {
        id: 'addon', name: 'Jasa Tambahan', tagline: 'Boost performa & otomasi',
        description: "Layanan pendukung untuk memaksimalkan potensi website dan sistem digital Anda.",
        services: [
            { icon_name: 'Search', title: 'SEO Optimization', description: 'Ranking halaman 1 Google & traffic organik.' },
            { icon_name: 'FileText', title: 'Form Integration', description: 'Google Form ke WhatsApp/Telegram otomatis.' },
            { icon_name: 'MessageSquare', title: 'WA Automation', description: 'Chatbot & notifikasi otomatis 24/7.' },
            { icon_name: 'Send', title: 'Hosting & Domain', description: 'Server cepat, aman, dan maintenance free.' },
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
                const { data, error } = await supabase.from('services').select('*').eq('published', true).order('sort_order', { ascending: true });
                if (!error && data && data.length > 0) {
                    const grouped = {};
                    data.forEach(s => {
                        if (!grouped[s.category_id]) {
                            grouped[s.category_id] = {
                                id: s.category_id, name: s.category_name, tagline: s.category_description,
                                description: s.category_description,
                                services: []
                            };
                        }
                        grouped[s.category_id].services.push(s);
                    });
                    const cats = Object.values(grouped);
                    if (cats.length > 0) setCategories(cats);
                }
            } catch { }
        };
        fetchServices();
    }, []);

    const activeCategory = categories[activeTab];

    return (
        <section id="services" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Subtle diagonal lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0' stroke='%23000' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-14 text-center">
                        <div className="w-12 h-[2px] bg-gray-900 mb-6"></div>
                        <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" /> Layanan Kami
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                            Solusi Digital Komprehensif
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Dari pembuatan website sederhana hingga sistem manajemen kompleks, kami punya solusinya.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Tabs */}
                <ScrollReveal width="100%">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
                        {categories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(index)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeTab === index
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/15'
                                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Active Category Content — Clean 2-Column Overlapping */}
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal key={activeTab} width="100%">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 items-stretch">
                            {/* Left — Image */}
                            <div className="h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[520px] rounded-2xl lg:rounded-3xl overflow-hidden relative">
                                <img
                                    src={categoryImages[activeCategory.id] || categoryImages['quick']}
                                    alt={activeCategory.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>

                                {/* Category badge on image */}
                                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                                    <span className="px-3 py-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                                        {activeCategory.tagline}
                                    </span>
                                </div>
                            </div>

                            {/* Right — Overlapping Content Card */}
                            <div className="relative lg:-ml-12 -mt-8 lg:mt-0 z-10 px-4 sm:px-6 lg:px-0 lg:py-6">
                                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8 h-full flex flex-col">
                                    {/* Category Title inside Card */}
                                    <div className="mb-6 pb-5 border-b border-gray-100">
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1.5">
                                            {activeCategory.name}
                                        </h3>
                                        <p className="text-teal-600 font-medium text-sm">
                                            {activeCategory.description}
                                        </p>
                                    </div>

                                    {/* Service Items */}
                                    <div className="space-y-3 flex-grow">
                                        {activeCategory.services.map((service, idx) => {
                                            const SIcon = iconMap[service.icon_name] || Layers;
                                            return (
                                                <div
                                                    key={idx}
                                                    className="group flex items-start gap-4 p-3.5 rounded-xl hover:bg-teal-50/50 transition-all duration-200 border border-transparent hover:border-teal-100"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 group-hover:scale-105 transition-all duration-200">
                                                        <SIcon className="w-5 h-5 text-teal-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-teal-700 transition-colors">
                                                            {service.title}
                                                        </h4>
                                                        <p className="text-gray-500 text-xs leading-relaxed">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 pt-5 border-t border-gray-100">
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-teal-600 transition-colors duration-300 shadow-md shadow-gray-900/10"
                                        >
                                            Mulai Konsultasi <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Services;

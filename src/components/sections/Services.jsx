'use client';

import { useState, useEffect } from 'react';
import {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

// Icon mapping from DB icon_name to component
const iconMap = {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    Search, MessageSquare, Send, Server,
    Users, GraduationCap, Briefcase, FileText
};

// Fallback data
const fallbackCategories = [
    {
        id: 'quick', name: 'Jasa Cepat', description: 'Online dalam hitungan jam',
        gradient: 'from-emerald-500 to-teal-600',
        services: [
            { icon_name: 'Rocket', title: 'Deploy Website', description: 'Laravel, React, HTML – langsung online di VPS dengan domain & SSL.' },
            { icon_name: 'Globe', title: 'Website Tugas/Demo', description: 'Siap diakses publik untuk presentasi atau demo klien.' },
            { icon_name: 'Shield', title: 'Pasang Domain & SSL', description: 'HTTPS aktif, domain custom, siap live.' },
            { icon_name: 'Server', title: 'Maintenance Ringan', description: 'Cek server, perbaikan error, backup rutin.' },
        ]
    },
    {
        id: 'mid', name: 'Jasa Menengah', description: 'Solusi untuk UMKM & Lembaga',
        gradient: 'from-blue-500 to-indigo-600',
        services: [
            { icon_name: 'Building2', title: 'Website Company Profile', description: 'Profil usaha/lembaga profesional dengan integrasi WhatsApp.' },
            { icon_name: 'CreditCard', title: 'Integrasi Payment Gateway', description: 'Midtrans/Xendit dengan invoice otomatis & notifikasi WA.' },
            { icon_name: 'LayoutDashboard', title: 'Dashboard Admin', description: 'CRUD data, laporan, manajemen konten yang mudah.' },
            { icon_name: 'Globe', title: 'Landing Page Promosi', description: 'Halaman khusus untuk campaign marketing & lead generation.' },
        ]
    },
    {
        id: 'premium', name: 'Sistem Unggulan', description: 'Enterprise-grade untuk Sekolah & Pesantren',
        gradient: 'from-blue-600 to-accent',
        services: [
            { icon_name: 'Database', title: 'Sistem Bendahara', description: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA ke wali.' },
            { icon_name: 'Users', title: 'Sistem Sekretaris', description: 'Master data santri/siswa, kelas, jurusan, mutasi lengkap.' },
            { icon_name: 'GraduationCap', title: 'Sistem Pendidikan', description: 'E-Rapor, perhitungan nilai nasional, ijazah digital.' },
            { icon_name: 'Briefcase', title: 'Full System Pesantren', description: 'Bendahara + Sekretaris + Pendidikan dalam satu platform.' },
        ]
    },
    {
        id: 'addon', name: 'Jasa Tambahan', description: 'Boost performa & otomasi',
        gradient: 'from-orange-500 to-red-600',
        services: [
            { icon_name: 'Search', title: 'SEO & Google Console', description: 'Optimasi mesin pencari, submit sitemap, analitik.' },
            { icon_name: 'FileText', title: 'Google Form Integration', description: 'Form → Sheets → Notifikasi Telegram otomatis.' },
            { icon_name: 'MessageSquare', title: 'WhatsApp Automation', description: 'Broadcast & auto-reply untuk komunikasi massal.' },
            { icon_name: 'Send', title: 'Hosting & Domain', description: 'Paket tahunan, perpanjangan, migrasi server.' },
        ]
    }
];

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('quick');
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
                    // Group services by category
                    const grouped = {};
                    data.forEach(service => {
                        if (!grouped[service.category_id]) {
                            grouped[service.category_id] = {
                                id: service.category_id,
                                name: service.category_name,
                                description: service.category_description,
                                gradient: service.category_gradient,
                                services: []
                            };
                        }
                        grouped[service.category_id].services.push(service);
                    });
                    const categoryOrder = ['quick', 'mid', 'premium', 'addon'];
                    const sorted = categoryOrder
                        .filter(id => grouped[id])
                        .map(id => grouped[id]);
                    if (sorted.length > 0) {
                        setCategories(sorted);
                        setActiveCategory(sorted[0].id);
                    }
                }
            } catch {
                // Fallback to hardcoded data
            }
        };
        fetchServices();
    }, []);

    const activeCat = categories.find(c => c.id === activeCategory);

    return (
        <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
                            LAYANAN KAMI
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            15+ Solusi Digital untuk Bisnis Anda
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Dari deploy cepat hingga sistem enterprise — kami siap membantu transformasi digital Anda.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${activeCategory === cat.id
                                ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Active Category Info */}
                {activeCat && (
                    <div className="mb-12 text-center">
                        <p className="text-gray-500 text-lg">{activeCat.description}</p>
                    </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activeCat?.services.map((service, index) => {
                        const IconComp = iconMap[service.icon_name] || Globe;
                        return (
                            <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                                <div className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 h-full flex flex-col">
                                    {/* Gradient glow on hover */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${activeCat?.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activeCat?.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                        <IconComp className="w-7 h-7 text-white" strokeWidth={1.5} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* CTA */}
                                    <button
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-2 group/btn mt-auto pt-2"
                                    >
                                        Konsultasi Gratis
                                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all duration-200 transform hover:-translate-y-1"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Diskusikan Kebutuhan Anda
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;

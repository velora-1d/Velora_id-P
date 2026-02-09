import { useState } from 'react';
import {
    Rocket, Globe, Shield, Database,
    CreditCard, LayoutDashboard, Building2,
    GraduationCap, Users, FileText, Briefcase,
    Search, MessageSquare, Send, Server
} from 'lucide-react';

const serviceCategories = [
    {
        id: 'quick',
        name: 'Jasa Cepat',
        description: 'Online dalam hitungan jam',
        gradient: 'from-emerald-500 to-teal-600',
        services: [
            { icon: Rocket, title: 'Deploy Website', desc: 'Laravel, React, HTML – langsung online di VPS dengan domain & SSL.' },
            { icon: Globe, title: 'Website Tugas/Demo', desc: 'Siap diakses publik untuk presentasi atau demo klien.' },
            { icon: Shield, title: 'Pasang Domain & SSL', desc: 'HTTPS aktif, domain custom, siap live.' },
            { icon: Server, title: 'Maintenance Ringan', desc: 'Cek server, perbaikan error, backup rutin.' },
        ]
    },
    {
        id: 'mid',
        name: 'Jasa Menengah',
        description: 'Solusi untuk UMKM & Lembaga',
        gradient: 'from-blue-500 to-indigo-600',
        services: [
            { icon: Building2, title: 'Website Company Profile', desc: 'Profil usaha/lembaga profesional dengan integrasi WhatsApp.' },
            { icon: CreditCard, title: 'Integrasi Payment Gateway', desc: 'Midtrans/Xendit dengan invoice otomatis & notifikasi WA.' },
            { icon: LayoutDashboard, title: 'Dashboard Admin', desc: 'CRUD data, laporan, manajemen konten yang mudah.' },
            { icon: Globe, title: 'Landing Page Promosi', desc: 'Halaman khusus untuk campaign marketing & lead generation.' },
        ]
    },
    {
        id: 'premium',
        name: 'Sistem Unggulan',
        description: 'Enterprise-grade untuk Sekolah & Pesantren',
        gradient: 'from-purple-500 to-pink-600',
        services: [
            { icon: Database, title: 'Sistem Bendahara', desc: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA ke wali.' },
            { icon: Users, title: 'Sistem Sekretaris', desc: 'Master data santri/siswa, kelas, jurusan, mutasi lengkap.' },
            { icon: GraduationCap, title: 'Sistem Pendidikan', desc: 'E-Rapor, perhitungan nilai nasional, ijazah digital.' },
            { icon: Briefcase, title: 'Full System Pesantren', desc: 'Bendahara + Sekretaris + Pendidikan dalam satu platform.' },
        ]
    },
    {
        id: 'addon',
        name: 'Jasa Tambahan',
        description: 'Boost performa & otomasi',
        gradient: 'from-orange-500 to-red-600',
        services: [
            { icon: Search, title: 'SEO & Google Console', desc: 'Optimasi mesin pencari, submit sitemap, analitik.' },
            { icon: FileText, title: 'Google Form Integration', desc: 'Form → Sheets → Notifikasi Telegram otomatis.' },
            { icon: MessageSquare, title: 'WhatsApp Automation', desc: 'Broadcast & auto-reply untuk komunikasi massal.' },
            { icon: Send, title: 'Hosting & Domain', desc: 'Paket tahunan, perpanjangan, migrasi server.' },
        ]
    }
];

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('quick');

    return (
        <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
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

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {serviceCategories.map((cat) => (
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
                {serviceCategories.filter(c => c.id === activeCategory).map((cat) => (
                    <div key={cat.id} className="mb-12 text-center">
                        <p className="text-gray-500 text-lg">{cat.description}</p>
                    </div>
                ))}

                {/* Services Grid with 3D hover effect */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {serviceCategories
                        .find(c => c.id === activeCategory)
                        ?.services.map((service, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                {/* Gradient glow on hover */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${serviceCategories.find(c => c.id === activeCategory)?.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${serviceCategories.find(c => c.id === activeCategory)?.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {service.desc}
                                </p>

                                {/* CTA */}
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-2 group/btn"
                                >
                                    Konsultasi Gratis
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        ))}
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

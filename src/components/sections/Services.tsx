'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
    nameEn: 'Quick Services',
    description: 'Online dalam hitungan jam',
    descriptionEn: 'Online in hours',
    gradient: 'from-emerald-500 to-teal-600',
    services: [
      { icon: Rocket, title: 'Deploy Website', titleEn: 'Website Deploy', desc: 'Laravel, React, HTML – langsung online di VPS dengan domain & SSL.', descEn: 'Laravel, React, HTML – live on VPS with domain & SSL.' },
      { icon: Globe, title: 'Website Tugas/Demo', titleEn: 'Demo Website', desc: 'Siap diakses publik untuk presentasi atau demo klien.', descEn: 'Ready for public presentations or client demos.' },
      { icon: Shield, title: 'Pasang Domain & SSL', titleEn: 'Domain & SSL Setup', desc: 'HTTPS aktif, domain custom, siap live.', descEn: 'HTTPS active, custom domain, ready to go live.' },
      { icon: Server, title: 'Maintenance Ringan', titleEn: 'Light Maintenance', desc: 'Cek server, perbaikan error, backup rutin.', descEn: 'Server checks, error fixes, routine backups.' },
    ]
  },
  {
    id: 'mid',
    name: 'Jasa Menengah',
    nameEn: 'Medium Services',
    description: 'Solusi untuk UMKM & Lembaga',
    descriptionEn: 'Solutions for SMEs & Institutions',
    gradient: 'from-blue-500 to-indigo-600',
    services: [
      { icon: Building2, title: 'Website Company Profile', titleEn: 'Company Profile Website', desc: 'Profil usaha/lembaga profesional dengan integrasi WhatsApp.', descEn: 'Professional business profile with WhatsApp integration.' },
      { icon: CreditCard, title: 'Integrasi Payment Gateway', titleEn: 'Payment Gateway Integration', desc: 'Midtrans/Xendit dengan invoice otomatis & notifikasi WA.', descEn: 'Midtrans/Xendit with auto invoices & WA notifications.' },
      { icon: LayoutDashboard, title: 'Dashboard Admin', titleEn: 'Admin Dashboard', desc: 'CRUD data, laporan, manajemen konten yang mudah.', descEn: 'Data CRUD, reports, easy content management.' },
      { icon: Globe, title: 'Landing Page Promosi', titleEn: 'Promo Landing Page', desc: 'Halaman khusus untuk campaign marketing & lead generation.', descEn: 'Special pages for marketing campaigns & lead generation.' },
    ]
  },
  {
    id: 'premium',
    name: 'Sistem Unggulan',
    nameEn: 'Premium Systems',
    description: 'Enterprise-grade untuk Sekolah & Pesantren',
    descriptionEn: 'Enterprise-grade for Schools & Islamic Boarding Schools',
    gradient: 'from-purple-500 to-pink-600',
    services: [
      { icon: Database, title: 'Sistem Bendahara', titleEn: 'Treasury System', desc: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA ke wali.', descEn: 'Integrated payment gateway, real-time invoices, WA notifications.' },
      { icon: Users, title: 'Sistem Sekretaris', titleEn: 'Secretary System', desc: 'Master data santri/siswa, kelas, jurusan, mutasi lengkap.', descEn: 'Complete student data, classes, majors, transfers.' },
      { icon: GraduationCap, title: 'Sistem Pendidikan', titleEn: 'Education System', desc: 'E-Rapor, perhitungan nilai nasional, ijazah digital.', descEn: 'E-Report cards, national grade calculations, digital certificates.' },
      { icon: Briefcase, title: 'Full System Pesantren', titleEn: 'Full School System', desc: 'Bendahara + Sekretaris + Pendidikan dalam satu platform.', descEn: 'Treasury + Secretary + Education in one platform.' },
    ]
  },
  {
    id: 'addon',
    name: 'Jasa Tambahan',
    nameEn: 'Add-on Services',
    description: 'Boost performa & otomasi',
    descriptionEn: 'Boost performance & automation',
    gradient: 'from-orange-500 to-red-600',
    services: [
      { icon: Search, title: 'SEO & Google Console', titleEn: 'SEO & Google Console', desc: 'Optimasi mesin pencari, submit sitemap, analitik.', descEn: 'Search engine optimization, sitemap submission, analytics.' },
      { icon: FileText, title: 'Google Form Integration', titleEn: 'Google Form Integration', desc: 'Form → Sheets → Notifikasi Telegram otomatis.', descEn: 'Form → Sheets → Auto Telegram notifications.' },
      { icon: MessageSquare, title: 'WhatsApp Automation', titleEn: 'WhatsApp Automation', desc: 'Broadcast & auto-reply untuk komunikasi massal.', descEn: 'Broadcast & auto-reply for mass communication.' },
      { icon: Send, title: 'Hosting & Domain', titleEn: 'Hosting & Domain', desc: 'Paket tahunan, perpanjangan, migrasi server.', descEn: 'Annual packages, renewals, server migration.' },
    ]
  }
];

type Props = {
  locale: string;
};

const Services = ({ locale }: Props) => {
  const t = useTranslations('services');
  const [activeCategory, setActiveCategory] = useState('quick');
  const isEn = locale === 'en';

  return (
    <section id="services" className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeCategory === cat.id
                  ? `bg-linear-to-r ${cat.gradient} text-white shadow-lg`
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {isEn ? cat.nameEn : cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Info */}
        {serviceCategories.filter(c => c.id === activeCategory).map((cat) => (
          <div key={cat.id} className="mb-12 text-center">
            <p className="text-gray-500 text-lg">{isEn ? cat.descriptionEn : cat.description}</p>
          </div>
        ))}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories
            .find(c => c.id === activeCategory)
            ?.services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${serviceCategories.find(c => c.id === activeCategory)?.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                  {isEn ? service.titleEn : service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {isEn ? service.descEn : service.desc}
                </p>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-2 group/btn"
                >
                  {isEn ? 'Free Consultation' : 'Konsultasi Gratis'}
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

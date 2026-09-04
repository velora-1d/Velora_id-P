'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, MapPin, Briefcase, GraduationCap, Code2, Scale, Mail, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

// Custom TikTok Icon
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

// WhatsApp icon
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const socialConfig = [
    { type: 'whatsapp', icon: <WhatsAppIcon />, label: 'WhatsApp', color: 'hover:text-emerald-400 hover:border-emerald-500/30' },
    { type: 'linkedin', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-500/30' },
    { type: 'tiktok', icon: <TikTokIcon />, label: 'TikTok', color: 'hover:text-cyan-400 hover:border-cyan-500/30' },
    { type: 'github', icon: <Github className="w-4 h-4" />, label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
];

const journey = [
    { year: '2020', text: 'Lulus S.H. — Universitas Islam KH.Ruhiyat Cipasung', icon: GraduationCap },
    { year: '2021', text: 'Riset & Rekayasa Web Architecture', icon: Code2 },
    { year: '2022', text: 'Senior Full-Stack & Systems Freelance', icon: Briefcase },
    { year: '2023', text: 'Pendirian Velora ID Technology Studio', icon: Scale },
];

const expertise = [
    'System Architecture', 'Next.js & React', 'Golang Microservices', 'PostgreSQL & Supabase',
    'Payment Gateway API', 'Enterprise Security', 'Legal Compliance', 'Cloud Infrastructure',
    'PWA & Mobile', 'Performance Tuning',
];

const fallbackFounder = {
    name: 'Mahin Utsman Nawawi, S.H.',
    title: 'Founder & Lead Architect',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio_paragraphs: [
        'Seorang Sarjana Hukum yang mendedikasikan diri pada arsitektur perangkat lunak modern dan rekayasa web berkinerja tinggi. Perpaduan latar belakang legalitas formal dan keahlian teknis menghadirkan cara pandang holistik: membangun infrastruktur digital yang tidak hanya responsif dan terukur, tetapi juga patuh terhadap tata kelola dan kepastian hukum.',
        'Berbasis di Pasirjambu, Bandung, mendirikan Velora ID pada tahun 2023 dengan komitmen jelas: menghadirkan solusi teknologi berstandar korporasi yang dapat diakses oleh lembaga pendidikan, pesantren, dan UMKM nasional.'
    ],
    stats: [
        { value: '50+', label: 'Proyek Selesai' },
        { value: '2023', label: 'Tahun Berdiri' },
        { value: '99.9%', label: 'Uptime Standard' }
    ],
    social_links: [
        { type: 'whatsapp', href: 'https://wa.me/6281320442174', label: 'WhatsApp' },
        { type: 'linkedin', href: 'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/', label: 'LinkedIn' },
        { type: 'tiktok', href: 'https://www.tiktok.com/@velora002', label: 'TikTok' },
        { type: 'github', href: 'https://github.com/mahinutsmannawawi20-svg', label: 'GitHub' },
    ]
};

const Founder = () => {
    const [founderData, setFounderData] = useState(fallbackFounder);

    useEffect(() => {
        const fetchFounder = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase.from('founder').select('*').eq('published', true).single();
                if (!error && data) {
                    const bioParagraphs = data.bio_paragraphs || data.bio || fallbackFounder.bio_paragraphs;
                    const rawLinks = data.social_links || fallbackFounder.social_links;
                    const mappedLinks = rawLinks.map(link => ({
                        type: link.type || link.platform || '',
                        href: link.href || link.url || '',
                        label: link.label || link.platform || '',
                    }));

                    setFounderData({
                        name: data.name || fallbackFounder.name,
                        title: data.title || fallbackFounder.title,
                        photo_url: data.photo_url || fallbackFounder.photo_url,
                        bio_paragraphs: bioParagraphs,
                        stats: data.stats || fallbackFounder.stats,
                        social_links: mappedLinks,
                    });
                }
            } catch { }
        };
        fetchFounder();
    }, []);

    return (
        <section id="founder" className="py-24 sm:py-32 bg-[#faf9f7] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
            {/* Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[18vw] font-black tracking-tighter text-slate-900/[0.03] leading-none whitespace-nowrap z-0">
                FOUNDER
            </div>

            {/* Ambient Lighting & Studio Grid */}
            <div className="absolute inset-0 studio-grid-pattern-light opacity-30 pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
                {/* Section Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-16 sm:mb-20 text-center">
                        <div className="inline-flex items-center gap-2 studio-mono-badge mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            LEADERSHIP & ENGINEERING
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Profil Founder & Arsitek
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                            Integrasi disiplin legalitas formal dan rekayasa perangkat lunak untuk solusi digital yang kokoh dan berkelanjutan.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* LEFT COLUMN: Photo (Sticky) */}
                    <div className="lg:col-span-5 relative z-0 lg:sticky lg:top-28">
                        <ScrollReveal direction="right" width="100%">
                            <div className="relative rounded-3xl overflow-hidden studio-card-light border border-slate-200 shadow-xl bg-white h-[420px] sm:h-[520px] lg:h-[620px] group">
                                <img
                                    src={founderData.photo_url}
                                    alt={founderData.name}
                                    className="w-full h-full object-cover object-top filter saturate-[0.95] brightness-[0.98] group-hover:scale-[1.02] group-hover:saturate-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                
                                {/* Identity overlay at bottom of photo */}
                                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 backdrop-blur-md bg-slate-950/80 border-t border-white/[0.1]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs font-mono font-medium text-emerald-400 tracking-wide">Direct Technical Leadership</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{founderData.name}</h3>
                                    <p className="text-sm text-blue-400 font-mono mt-0.5">{founderData.title}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT COLUMN: Bento Details */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* CARD 1: Bio & Introduction */}
                        <ScrollReveal direction="left" width="100%">
                            <div className="studio-card-light rounded-3xl p-6 sm:p-10 border border-slate-200/80 bg-white shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                                    <div>
                                        <span className="text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider block mb-1">
                                            {founderData.title}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                            {founderData.name}
                                        </h3>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                        Pasirjambu, Bandung
                                    </div>
                                </div>

                                <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                                    {founderData.bio_paragraphs.map((p, i) => (
                                        <p key={i} className="text-justify" dangerouslySetInnerHTML={{ __html: p }} />
                                    ))}
                                </div>

                                {/* Stats Strip */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                                    {founderData.stats.map((stat, i) => (
                                        <div key={i} className="text-center sm:text-left">
                                            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">{stat.value}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* CARD 2: Career Track */}
                            <ScrollReveal direction="up" delay={0.1}>
                                <div className="studio-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/80 bg-white shadow-sm h-full">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800">
                                            Rekam Jejak
                                        </h4>
                                        <span className="text-[10px] font-mono text-slate-400">MILESTONES</span>
                                    </div>

                                    <div className="space-y-5 relative">
                                        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-slate-200" />
                                        {journey.map((j, i) => {
                                            const JIcon = j.icon;
                                            return (
                                                <div key={i} className="flex gap-4 relative z-10">
                                                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                                                        <JIcon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 border border-blue-200/60 text-[10px] font-mono font-semibold text-blue-700 mb-1">
                                                            {j.year}
                                                        </span>
                                                        <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{j.text}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* CARD 3: Core Competencies & Direct Connect */}
                            <ScrollReveal direction="up" delay={0.2}>
                                <div className="studio-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/80 bg-white shadow-sm h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                                            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800">
                                                Kompetensi Kunci
                                            </h4>
                                            <span className="text-[10px] font-mono text-slate-400">STACK & LEGAL</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {expertise.map((skill, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-xs font-mono text-slate-700 hover:border-blue-500/40 hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-3">
                                            Koneksi Profesional
                                        </div>
                                        <div className="flex gap-2">
                                            {founderData.social_links.map((link, i) => {
                                                const sc = socialConfig.find(s => s.type === link.type);
                                                return (
                                                    <a
                                                        key={i}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={link.label}
                                                        className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white hover:border-blue-300 hover:scale-105 transition-all duration-200"
                                                    >
                                                        {sc?.icon}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* CARD 4: Direct Consultation Strip */}
                        <ScrollReveal direction="up" delay={0.3}>
                            <div className="rounded-3xl p-6 sm:p-8 border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <span className="text-xs font-mono text-blue-600 tracking-wider uppercase font-semibold block mb-1">
                                        Executive Consultation
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Diskusikan Arsitektur Sistem Anda</h3>
                                    <p className="text-slate-600 text-xs sm:text-sm mt-1">Konsultasi teknis dan legalitas implementasi langsung bersama Lead Architect.</p>
                                </div>
                                <a
                                    href="#contact"
                                    className="flex-shrink-0 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                                >
                                    <Mail className="w-4 h-4" /> Mulai Diskusi
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;

'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, Quote, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

// Custom TikTok Icon
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

// WhatsApp icon
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const socialIconMap = {
    whatsapp: <WhatsAppIcon />,
    linkedin: <Linkedin className="w-5 h-5" />,
    tiktok: <TikTokIcon />,
    github: <Github className="w-5 h-5" />,
};

const socialColorMap = {
    whatsapp: 'hover:bg-green-500 hover:border-green-500',
    linkedin: 'hover:bg-blue-600 hover:border-blue-600',
    tiktok: 'hover:bg-pink-500 hover:border-pink-500',
    github: 'hover:bg-gray-600 hover:border-gray-600',
};

const fallbackFounder = {
    name: 'Mahin Utsman Nawawi, S.H.',
    title: 'Founder & CEO',
    photo_url: '/images/founder.jpg',
    bio_paragraphs: [
        'Seorang Sarjana Hukum yang memiliki passion kuat di bidang teknologi dan pengembangan web. Kombinasi unik antara latar belakang hukum dan keahlian teknis memberikan perspektif holistik dalam membangun solusi digital yang tidak hanya canggih, tapi juga aman dan sesuai regulasi.',
        'Berbasis di <strong class="text-white">Pasirjambu, Bandung</strong>, Mahin mendirikan Velora pada tahun 2023 dengan misi sederhana: membantu UMKM dan institusi Indonesia untuk go digital dengan cara yang terjangkau dan berkualitas.',
        'Dengan pengalaman menangani berbagai proyek mulai dari website sederhana hingga sistem kompleks seperti manajemen pesantren dan integrasi payment gateway, Mahin memimpin tim Velora untuk selalu mengutamakan kualitas dan kepuasan klien.'
    ],
    stats: [
        { value: '50+', label: 'Proyek' },
        { value: '2023', label: 'Didirikan' },
        { value: '24/7', label: 'Support' }
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
                const { data, error } = await supabase
                    .from('founder')
                    .select('*')
                    .eq('published', true)
                    .limit(1)
                    .single();

                if (!error && data) {
                    setFounderData({
                        name: data.name || fallbackFounder.name,
                        title: data.title || fallbackFounder.title,
                        photo_url: data.photo_url || fallbackFounder.photo_url,
                        bio_paragraphs: data.bio_paragraphs || fallbackFounder.bio_paragraphs,
                        stats: data.stats || fallbackFounder.stats,
                        social_links: data.social_links || fallbackFounder.social_links,
                    });
                }
            } catch { }
        };
        fetchFounder();
    }, []);

    return (
        <section id="founder" className="py-20 sm:py-28 bg-gray-950 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none"></div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-full text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                            FOUNDER
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                            Di Balik <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Velora</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Kenalan dengan orang di balik layar yang membangun dan memimpin Velora
                        </p>
                    </div>
                </ScrollReveal>

                {/* Main Card */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/30">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

                            {/* Photo Column — 2/5 width */}
                            <ScrollReveal direction="right" width="100%">
                                <div className="lg:col-span-2 relative">
                                    <div className="h-[350px] sm:h-[420px] lg:h-full lg:min-h-[600px] relative">
                                        <img
                                            src={founderData.photo_url}
                                            alt={founderData.name}
                                            className="absolute inset-0 w-full h-full object-cover object-top"
                                        />
                                        {/* Photo overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-gray-950/60"></div>

                                        {/* Mobile-only: Name overlay on photo */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Briefcase className="w-4 h-4 text-teal-400" />
                                                <span className="text-teal-400 text-sm font-semibold tracking-wide">{founderData.title}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">{founderData.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Content Column — 3/5 width */}
                            <ScrollReveal direction="left" width="100%">
                                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                                    {/* Name & Title — desktop only */}
                                    <div className="hidden lg:block mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Briefcase className="w-4 h-4 text-teal-400" />
                                            <span className="text-teal-400 text-sm font-semibold tracking-wide">{founderData.title}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">{founderData.name}</h3>
                                    </div>

                                    {/* Quote accent */}
                                    <div className="relative mb-6">
                                        <Quote className="w-8 h-8 text-teal-500/20 absolute -top-2 -left-1" />
                                        <div className="pl-8 border-l-2 border-teal-500/30 space-y-3">
                                            {founderData.bio_paragraphs.map((p, i) => (
                                                <p key={i} className="text-gray-400 text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Location badge */}
                                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 text-gray-600" />
                                        <span>Pasirjambu, Bandung, Indonesia</span>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-3 mb-8">
                                        {founderData.stats.map((stat, i) => (
                                            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-center hover:bg-white/[0.06] hover:border-teal-500/20 transition-all duration-300">
                                                <span className="block text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-1">{stat.value}</span>
                                                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-gray-600 font-medium uppercase tracking-wider mr-1">Connect</span>
                                        {founderData.social_links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${socialColorMap[link.type] || 'hover:bg-teal-500 hover:border-teal-500'}`}
                                                aria-label={link.label}
                                            >
                                                {socialIconMap[link.type] || <Sparkles className="w-5 h-5" />}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;

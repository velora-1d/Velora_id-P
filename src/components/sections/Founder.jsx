'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, Phone } from 'lucide-react';
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
        <section id="founder" className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-semibold mb-4 tracking-wide backdrop-blur-sm">
                            FOUNDER
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Di Balik Velora
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Kenalan dengan orang di balik layar yang membangun Velora
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Photo */}
                            <ScrollReveal direction="right" width="100%">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl transform rotate-3"></div>
                                    <img
                                        src={founderData.photo_url}
                                        alt={founderData.name}
                                        className="relative rounded-2xl w-full max-h-[500px] object-contain shadow-2xl bg-gray-800"
                                    />
                                </div>
                            </ScrollReveal>

                            {/* Info */}
                            <ScrollReveal direction="left" width="100%">
                                <div>
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {founderData.name}
                                    </h3>
                                    <p className="text-primary font-semibold mb-6">{founderData.title}</p>

                                    <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
                                        {founderData.bio_paragraphs.map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
                                        {founderData.stats.map((stat, i) => (
                                            <div key={i} className="text-center">
                                                <span className="block text-2xl font-bold text-white">{stat.value}</span>
                                                <span className="text-xs text-gray-400">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3">
                                        {founderData.social_links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                                                aria-label={link.label}
                                            >
                                                {socialIconMap[link.type] || <Globe className="w-5 h-5" />}
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

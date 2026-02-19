'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, MapPin, ArrowRight, Briefcase, GraduationCap, Code2, Scale } from 'lucide-react';
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
    { type: 'whatsapp', icon: <WhatsAppIcon />, color: 'hover:text-green-600' },
    { type: 'linkedin', icon: <Linkedin className="w-4 h-4" />, color: 'hover:text-blue-600' },
    { type: 'tiktok', icon: <TikTokIcon />, color: 'hover:text-pink-600' },
    { type: 'github', icon: <Github className="w-4 h-4" />, color: 'hover:text-gray-900' },
];

const journey = [
    { year: '2020', text: 'Lulus S.H. — Universitas Hukum', icon: GraduationCap },
    { year: '2021', text: 'Mendalami Web Development', icon: Code2 },
    { year: '2022', text: 'Freelance Full-Stack Developer', icon: Briefcase },
    { year: '2023', text: 'Mendirikan Velora', icon: Scale },
];

const expertise = [
    'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Laravel', 'Flutter',
    'UI/UX Design', 'Payment Gateway', 'Legal Tech', 'Digital Strategy'
];

const fallbackFounder = {
    name: 'Mahin Utsman Nawawi, S.H.',
    title: 'Founder & CEO',
    photo_url: '/images/founder.jpg',
    bio_paragraphs: [
        'Seorang Sarjana Hukum yang memiliki passion kuat di bidang teknologi dan pengembangan web. Kombinasi unik antara latar belakang hukum dan keahlian teknis memberikan perspektif holistik dalam membangun solusi digital yang tidak hanya canggih, tapi juga aman dan sesuai regulasi.',
        'Berbasis di <strong class="text-gray-800 font-semibold">Pasirjambu, Bandung</strong>, Mahin mendirikan Velora pada tahun 2023 dengan misi sederhana: membantu UMKM dan institusi Indonesia untuk go digital dengan cara yang terjangkau dan berkualitas.',
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
                        bio_paragraphs: (data.bio_paragraphs || fallbackFounder.bio_paragraphs).map(p => p.replace(/text-white/g, 'text-gray-900')),
                        stats: data.stats || fallbackFounder.stats,
                        social_links: data.social_links || fallbackFounder.social_links,
                    });
                }
            } catch { }
        };
        fetchFounder();
    }, []);

    return (
        <section id="founder" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Decorative large typography watermark */}
            <div className="absolute top-16 left-0 right-0 flex justify-center pointer-events-none select-none">
                <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-black text-gray-900/[0.018] leading-none tracking-tighter">VELORA</span>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Minimal header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-16 sm:mb-20">
                        <div className="w-12 h-[2px] bg-gray-900 mb-6"></div>
                        <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4">Founder & CEO</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center">
                            Di Balik Velora
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Main Layout: 2-column with proper grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                        {/* Left: Photo + Social — fixed width */}
                        <div className="w-full lg:w-[400px] lg:flex-shrink-0">
                            <ScrollReveal direction="right" width="100%">
                                <div className="lg:sticky lg:top-24">
                                    {/* Photo with geometric accent */}
                                    <div className="relative mb-8">
                                        <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-br from-teal-100 to-cyan-50 rounded-2xl"></div>
                                        <div className="relative">
                                            <img
                                                src={founderData.photo_url}
                                                alt={founderData.name}
                                                className="w-full h-[400px] sm:h-[480px] object-cover object-top rounded-2xl shadow-xl relative z-10"
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-20 h-20 border-b-[3px] border-r-[3px] border-teal-500 rounded-br-2xl z-0"></div>
                                        </div>
                                    </div>

                                    {/* Name card below photo */}
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{founderData.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                            <span>Pasirjambu, Bandung</span>
                                        </div>

                                        {/* Social row */}
                                        <div className="flex items-center gap-1 pt-3 border-t border-gray-100">
                                            {founderData.social_links.map((link, index) => {
                                                const sc = socialConfig.find(s => s.type === link.type);
                                                return (
                                                    <a
                                                        key={index}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`w-9 h-9 rounded-lg text-gray-400 flex items-center justify-center transition-all duration-200 hover:bg-gray-50 ${sc?.color || 'hover:text-gray-900'}`}
                                                        aria-label={link.label}
                                                    >
                                                        {sc?.icon || <Code2 className="w-4 h-4" />}
                                                    </a>
                                                );
                                            })}
                                            <div className="flex-1"></div>
                                            <a href={founderData.social_links[0]?.href || '#'}
                                                target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                                                Hubungi <ArrowRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right: Content — fills remaining space */}
                        <div className="flex-1 min-w-0">
                            <ScrollReveal direction="left" width="100%">
                                <div>
                                    {/* Story */}
                                    <div className="mb-10">
                                        <h4 className="text-sm font-bold tracking-[0.2em] text-teal-600 uppercase mb-5">Cerita Saya</h4>
                                        <div className="space-y-4">
                                            {founderData.bio_paragraphs.map((p, i) => (
                                                <p key={i} className="text-gray-900 text-[15px] sm:text-base leading-[1.8]" dangerouslySetInnerHTML={{ __html: p }} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-gray-200 mb-10"></div>

                                    {/* Journey Timeline */}
                                    <div className="mb-10">
                                        <h4 className="text-sm font-bold tracking-[0.2em] text-teal-600 uppercase mb-6">Perjalanan</h4>
                                        <div className="relative">
                                            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gray-200"></div>
                                            <div className="space-y-5">
                                                {journey.map((j, i) => {
                                                    const JIcon = j.icon;
                                                    return (
                                                        <div key={i} className="flex items-center gap-4 group">
                                                            <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 group-hover:border-teal-400 flex items-center justify-center flex-shrink-0 transition-colors duration-300 relative z-10">
                                                                <JIcon className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-300" />
                                                            </div>
                                                            <div>
                                                                <span className="text-xs font-bold text-teal-600 tracking-wider">{j.year}</span>
                                                                <p className="text-gray-700 text-sm font-medium">{j.text}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-gray-200 mb-10"></div>

                                    {/* Expertise Tags */}
                                    <div className="mb-10">
                                        <h4 className="text-sm font-bold tracking-[0.2em] text-teal-600 uppercase mb-5">Keahlian</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {expertise.map((skill, i) => (
                                                <span key={i} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200 cursor-default">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats bar */}
                                    <div className="bg-gray-900 rounded-2xl p-6 sm:p-8">
                                        <div className="grid grid-cols-3 divide-x divide-gray-700">
                                            {founderData.stats.map((stat, i) => (
                                                <div key={i} className="text-center px-2">
                                                    <span className="block text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</span>
                                                    <span className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
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

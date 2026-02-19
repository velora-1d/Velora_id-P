'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, MapPin, ArrowRight, Briefcase, GraduationCap, Code2, Scale, Mail, Calendar, CheckCircle2 } from 'lucide-react';
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
    { type: 'whatsapp', icon: <WhatsAppIcon />, color: 'hover:text-green-600', bg: 'hover:bg-green-50' },
    { type: 'linkedin', icon: <Linkedin className="w-4 h-4" />, color: 'hover:text-blue-600', bg: 'hover:bg-blue-50' },
    { type: 'tiktok', icon: <TikTokIcon />, color: 'hover:text-pink-600', bg: 'hover:bg-pink-50' },
    { type: 'github', icon: <Github className="w-4 h-4" />, color: 'hover:text-gray-900', bg: 'hover:bg-gray-100' },
];

const journey = [
    { year: '2020', text: 'Lulus S.H. — Universitas Islam KH.Ruhiyat Cipasung', icon: GraduationCap },
    { year: '2021', text: 'Mendalami Web Development', icon: Code2 },
    { year: '2022', text: 'Freelance Full-Stack Developer', icon: Briefcase },
    { year: '2023', text: 'Mendirikan Velora', icon: Scale },
];

const expertise = [
    'Frontend', 'Backend', 'Golang', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Laravel', 'Flutter',
    'UI/UX Design', 'Payment Gateway', 'Legal Tech', 'Digital Strategy', 'Optimasi SEO',
];

const fallbackFounder = {
    name: 'Mahin Utsman Nawawi, S.H.',
    title: 'Founder & CEO',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio_paragraphs: [
        'Seorang Sarjana Hukum yang memiliki passion kuat di bidang teknologi dan pengembangan web. Kombinasi unik antara latar belakang hukum dan keahlian teknis memberikan perspektif holistik dalam membangun solusi digital yang tidak hanya canggih, tapi juga aman dan sesuai regulasi.',
        'Berasal dari Pasirjambu, Bandung, Mahin mendirikan Velora pada tahun 2023 dengan misi sederhana: membantu UMKM dan institusi Indonesia untuk go digital dengan cara yang terjangkau dan berkualitas.'
    ],
    stats: [
        { value: '50+', label: 'Proyek Selesai' },
        { value: '2023', label: 'Tahun Berdiri' },
        { value: '24/7', label: 'Support Client' }
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
                    // Map DB field names: admin saves 'bio' array, component uses 'bio_paragraphs'
                    const bioParagraphs = data.bio_paragraphs || data.bio || fallbackFounder.bio_paragraphs;

                    // Map social_links: admin saves {platform, url}, component uses {type, href}
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
        <section id="founder" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Subtle hexagon pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='43' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0l25 14.4v28.8L25 43 0 28.8V14.4z' stroke='%23000' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '50px 43px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-teal-100">
                            Leadership
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Meet The Founder
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT COLUMN: Photo (Sticky) */}
                        <div className="lg:col-span-5 relative z-0 lg:sticky lg:top-24">
                            <ScrollReveal direction="right" width="100%">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 h-[380px] sm:h-[500px] lg:h-[700px]">
                                    <img
                                        src={founderData.photo_url}
                                        alt={founderData.name}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                                    {/* Mobile Name Overlay */}
                                    <div className="absolute bottom-0 left-0 p-6 lg:hidden">
                                        <h3 className="text-2xl font-bold text-white">{founderData.name}</h3>
                                        <p className="text-white/80">{founderData.title}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* RIGHT COLUMN: Bento Grid Content */}
                        <div className="lg:col-span-7 relative z-10 lg:-ml-12 lg:mt-12 -mt-10 px-0 sm:px-0 space-y-6">

                            {/* CARD 1: Bio & Introduction (Overlapping) */}
                            <ScrollReveal direction="left" width="100%">
                                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/60 border border-gray-100">
                                    <div className="hidden lg:block mb-6 pb-6 border-b border-gray-100">
                                        <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{founderData.name}</h3>
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">{founderData.title}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="flex items-center gap-1 text-sm"><MapPin className="w-3.5 h-3.5" /> Pasirjambu, Bandung</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] sm:text-base">
                                        {founderData.bio_paragraphs.map((p, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                    </div>
                                    {/* Stats Strip */}
                                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
                                        {founderData.stats.map((stat, i) => (
                                            <div key={i} className="text-center sm:text-left">
                                                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                                <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wide">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* CARD 2: Journey / Timeline */}
                                <ScrollReveal direction="up" delay={0.1}>
                                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-gray-200/40 border border-gray-100 h-full">
                                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                                            <span className="w-6 h-[2px] bg-teal-500"></span> Perjalanan
                                        </h4>
                                        <div className="space-y-6 relative">
                                            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100"></div>
                                            {journey.map((j, i) => {
                                                const JIcon = j.icon;
                                                return (
                                                    <div key={i} className="flex gap-4 relative z-10">
                                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400">
                                                            <JIcon className="w-3.5 h-3.5" />
                                                        </div>
                                                        <div>
                                                            <span className="inline-block px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-600 rounded mb-1">{j.year}</span>
                                                            <p className="text-sm font-bold text-gray-900 leading-tight">{j.text}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* CARD 3: Expertise & Skills */}
                                <ScrollReveal direction="up" delay={0.2}>
                                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-gray-200/40 border border-gray-100 h-full flex flex-col">
                                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                                            <span className="w-6 h-[2px] bg-teal-500"></span> Keahlian
                                        </h4>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {expertise.slice(0, 10).map((skill, i) => (
                                                <span key={i} className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600">
                                                    {skill}
                                                </span>
                                            ))}
                                            <span className="px-2.5 py-1 text-xs font-medium text-gray-400">+4 others</span>
                                        </div>

                                        <div className="mt-auto">
                                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                                <span className="w-6 h-[2px] bg-teal-500"></span> Connect
                                            </h4>
                                            <div className="flex gap-2">
                                                {founderData.social_links.map((link, i) => {
                                                    const sc = socialConfig.find(s => s.type === link.type);
                                                    return (
                                                        <a
                                                            key={i}
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 border border-gray-100 hover:-translate-y-1 ${sc?.bg || 'hover:bg-gray-50'} ${sc?.color || 'hover:text-gray-900'}`}
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

                            {/* CARD 4: CTA (Full Width) */}
                            <ScrollReveal direction="up" delay={0.3}>
                                <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-900/20 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Siap berkolaborasi?</h3>
                                        <p className="text-gray-400 text-sm">Konsultasikan ide digital Anda langsung dengan founder.</p>
                                    </div>
                                    <a
                                        href="#contact"
                                        className="flex-shrink-0 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-teal-50 transition-colors flex items-center gap-2"
                                    >
                                        <Mail className="w-4 h-4" /> Hubungi Saya
                                    </a>
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

'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapPin, Mail, Phone, ChevronUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

// Custom brand icons
const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const LinkedInIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const GithubIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const iconMap = {
    whatsapp: { icon: WhatsAppIcon, color: 'hover:bg-green-500 hover:shadow-green-500/30', label: 'WhatsApp' },
    linkedin: { icon: LinkedInIcon, color: 'hover:bg-blue-600 hover:shadow-blue-600/30', label: 'LinkedIn' },
    tiktok: { icon: TikTokIcon, color: 'hover:bg-pink-500 hover:shadow-pink-500/30', label: 'TikTok' },
    github: { icon: GithubIcon, color: 'hover:bg-gray-600 hover:shadow-gray-600/30', label: 'GitHub' },
};

const fallbackSocials = [
    { type: 'whatsapp', href: 'https://wa.me/6281320442174', label: 'WhatsApp' },
    { type: 'linkedin', href: 'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/', label: 'LinkedIn' },
    { type: 'tiktok', href: 'https://www.tiktok.com/@velora002', label: 'TikTok' },
    { type: 'github', href: 'https://github.com/mahinutsmannawawi20-svg', label: 'GitHub' },
];

const Footer = () => {
    const [socials, setSocials] = useState(fallbackSocials);
    const [location, setLocation] = useState('Pasirjambu, Bandung');
    const [email] = useState('velora20.id@gmail.com');
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        // Fetch social links from founder
        supabase.from('founder').select('social_links').eq('published', true).limit(1).single()
            .then(({ data }) => {
                if (data?.social_links?.length) {
                    setSocials(data.social_links);
                }
            });

        // Fetch location from legalitas
        supabase.from('legalitas').select('domisili, domisili_sub').eq('published', true).limit(1).single()
            .then(({ data }) => {
                if (data?.domisili) {
                    setLocation(`${data.domisili}${data.domisili_sub ? ', ' + data.domisili_sub : ''}`);
                }
            });
    }, [supabase]);

    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative">
            {/* Main Footer */}
            <div className="bg-gray-950 relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Divider line with gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                    <div className="py-12 sm:py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                            {/* Brand Column */}
                            <div className="lg:col-span-5">
                                <div className="flex items-center gap-3 mb-5">
                                    <img src="/images/logo.webp" alt="Velora" width={160} height={40} className="h-10 w-auto brightness-0 invert" />
                                    <span className="text-2xl font-extrabold text-white tracking-tight">Velora</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                                    Mitra transformasi digital terpercaya untuk bisnis Anda. Solusi teknologi inovatif yang mendorong pertumbuhan di era digital.
                                </p>

                                {/* Contact info */}
                                <div className="space-y-3 mb-7">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-teal-400" />
                                        </div>
                                        <span className="text-gray-400">{location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-gray-400">{email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <span className="text-gray-400">0813-2044-2174</span>
                                    </div>
                                </div>

                                {/* Social icons with glow */}
                                <div className="flex gap-3">
                                    {socials.map((social, i) => {
                                        const mapped = iconMap[social.type] || iconMap.github;
                                        const IconComp = mapped.icon;
                                        return (
                                            <a
                                                key={i}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label || mapped.label}
                                                className={`w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white ${mapped.color} hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                                            >
                                                <IconComp className="w-[18px] h-[18px]" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Layanan */}
                            <div className="lg:col-span-2">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Layanan</h4>
                                <ul className="space-y-3">
                                    {['Deploy Website', 'Payment Gateway', 'Sistem Pesantren', 'Maintenance', 'SEO & Analytics'].map((item) => (
                                        <li key={item}>
                                            <a href="#services" className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Perusahaan */}
                            <div className="lg:col-span-2">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Perusahaan</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Tentang Kami', href: '#tentang' },
                                        { label: 'Portfolio', href: '#portfolio' },
                                        { label: 'Cara Kerja', href: '#workflow' },
                                        { label: 'Legalitas', href: '#legalitas' },
                                        { label: 'Kontak', href: '#contact' },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a href={item.href} className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            <div className="lg:col-span-3">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Resources</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Blog & Artikel', href: '#blog' },
                                        { label: 'FAQ', href: '#faq' },
                                        { label: 'Produk Unggulan', href: '#featured' },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a href={item.href} className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {/* Mini NIB badge */}
                                <div className="mt-6 p-3 bg-gray-900 border border-gray-800 rounded-xl">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Terdaftar Resmi</p>
                                    <p className="text-xs text-gray-300 font-mono">NIB: 3110250097422</p>
                                    <p className="text-[10px] text-emerald-500 mt-1 font-medium">● Aktif / Terbit</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
                    <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            &copy; {year} Velora ID. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#faq" className="text-gray-500 text-xs hover:text-blue-400 transition-colors">FAQ</a>
                            <a href="#contact" className="text-gray-500 text-xs hover:text-blue-400 transition-colors">Hubungi Kami</a>
                            <button
                                onClick={scrollToTop}
                                className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:-translate-y-0.5"
                                aria-label="Scroll to top"
                            >
                                <ChevronUp className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

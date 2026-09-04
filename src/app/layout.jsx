import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { createClient } from '@/lib/supabase/server';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});


export async function generateMetadata() {
    let titleSetting = 'Jasa Pembuatan Website & Sistem Digital Profesional | Velora ID';
    let descSetting = 'Jasa pembuatan website profesional untuk pesantren, sekolah, UMKM, dan perusahaan di Bandung & Indonesia. Sistem informasi, aplikasi bisnis, & landing page. Konsultasi gratis via WhatsApp.';
    let googleVerification = 'googlef059f7343365627a';

    try {
        const supabase = await createClient();
        const { data: settings } = await supabase.from('site_settings').select('*');
        if (settings) {
            titleSetting = settings.find(s => s.setting_key === 'site_title')?.setting_value || titleSetting;
            descSetting = settings.find(s => s.setting_key === 'site_description')?.setting_value || descSetting;
            googleVerification = settings.find(s => s.setting_key === 'google_verification')?.setting_value || googleVerification;
        }
    } catch (e) {
        console.error("Error generating metadata:", e);
    }

    return {
        metadataBase: new URL('https://www.ve-lora.my.id'),
        title: {
            default: titleSetting,
            template: '%s | Velora ID',
        },
        description: descSetting,
        alternates: {
            canonical: '/',
        },
        openGraph: {
            title: titleSetting,
            description: descSetting,
            url: 'https://www.ve-lora.my.id',
            siteName: 'Velora ID',
            locale: 'id_ID',
            type: 'website',
            images: [
                {
                    url: '/images/og-preview.webp',
                    width: 1200,
                    height: 630,
                    alt: titleSetting,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: titleSetting,
            description: descSetting,
        },
        robots: {
            index: true,
            follow: true,
        },
        verification: {
            google: googleVerification,
        },
    };
}

// Structured Data Entity Graph (Schema.org)
const siteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': ['Organization', 'ProfessionalService'],
            '@id': 'https://www.ve-lora.my.id/#organization',
            name: 'Velora ID',
            alternateName: ['Velora', 'Velora Studio', 'PT Velora Teknologi Digital'],
            url: 'https://www.ve-lora.my.id',
            logo: {
                '@type': 'ImageObject',
                '@id': 'https://www.ve-lora.my.id/#logo',
                url: 'https://www.ve-lora.my.id/images/logo.webp',
                caption: 'Velora ID Logo',
            },
            image: 'https://www.ve-lora.my.id/images/og-preview.webp',
            description: 'Studio rekayasa perangkat lunak dan jasa pembuatan website profesional, aplikasi mobile Flutter, ISP billing system, serta sistem informasi multi-tenant terpadu di Indonesia.',
            priceRange: 'RpRp',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bandung',
                addressRegion: 'Jawa Barat',
                addressCountry: 'ID',
            },
            founder: {
                '@type': 'Person',
                name: 'Mahin Utsman Nawawi, S.H.',
                jobTitle: 'Founder & Principal Software Engineer',
                sameAs: [
                    'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/',
                    'https://github.com/mahinutsmannawawi20-svg',
                ],
            },
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+62-813-2044-2174',
                contactType: 'customer service',
                availableLanguage: ['Indonesian', 'English'],
                areaServed: 'ID',
            },
            areaServed: {
                '@type': 'Country',
                name: 'Indonesia',
            },
            knowsAbout: [
                'Web Application Development',
                'Next.js 16 & React 19',
                'Flutter & Dart Mobile Development',
                'Golang Backend Services',
                'ISP Billing Engine & Network Automation',
                'MikroTik RouterOS API',
                'PostgreSQL Database Engineering',
                'Multi-Tenant SaaS Architecture',
                'Enterprise ERP & School Information Systems',
            ],
            sameAs: [
                'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/',
                'https://www.tiktok.com/@velora002',
                'https://github.com/mahinutsmannawawi20-svg',
                'https://www.threads.net/@velora2310',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://www.ve-lora.my.id/#website',
            url: 'https://www.ve-lora.my.id',
            name: 'Velora ID',
            description: 'Jasa Pembuatan Website & Sistem Digital Profesional',
            publisher: {
                '@id': 'https://www.ve-lora.my.id/#organization',
            },
            inLanguage: 'id-ID',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.ve-lora.my.id/blog?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
    ],
};

export default async function RootLayout({ children }) {
    let gaId = 'G-1XJG5X3KZR';
    try {
        const supabase = await createClient();
        const { data: settings } = await supabase.from('site_settings').select('*');
        if (settings) {
            gaId = settings.find(s => s.setting_key === 'google_analytics_id')?.setting_value || gaId;
        }
    } catch (e) {
        console.error("Error loading analytics ID:", e);
    }

    return (
        <html lang="id" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
            <head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${gaId}');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
                />
            </head>
            <body className="font-sans antialiased text-slate-900 bg-slate-950 selection:bg-blue-600 selection:text-white" suppressHydrationWarning={true}>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

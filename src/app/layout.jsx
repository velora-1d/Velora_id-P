import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { createClient } from '@/lib/supabase/server';
import './globals.css';

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

// Organization JSON-LD Schema
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Velora',
    url: 'https://www.ve-lora.my.id',
    logo: 'https://www.ve-lora.my.id/images/logo.webp',
    description: 'Jasa pembuatan website dan sistem digital profesional di Indonesia',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressCountry: 'ID',
    },
    founder: {
        '@type': 'Person',
        name: 'Mahin Utsman Nawawi, S.H.',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-813-2044-2174',
        contactType: 'customer service',
    },
    sameAs: [
        'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/',
        'https://www.tiktok.com/@velora002',
        'https://github.com/mahinutsmannawawi20-svg',
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
        <html lang="id">
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className="font-sans" suppressHydrationWarning={true}>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

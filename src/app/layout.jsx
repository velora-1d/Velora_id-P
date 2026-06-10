
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
    metadataBase: new URL('https://www.ve-lora.my.id'),
    title: {
        default: 'Jasa Pembuatan Website & Sistem Digital Profesional | Velora ID',
        template: '%s | Velora ID',
    },
    description: 'Jasa pembuatan website profesional untuk pesantren, sekolah, UMKM, dan perusahaan di Bandung & Indonesia. Sistem informasi, aplikasi bisnis, & landing page. Konsultasi gratis via WhatsApp.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Jasa Pembuatan Website & Sistem Digital | Velora ID',
        description: 'Solusi digital terjangkau untuk UMKM & institusi Indonesia. Website, sistem informasi, & payment gateway.',
        url: 'https://www.ve-lora.my.id',
        siteName: 'Velora ID',
        locale: 'id_ID',
        type: 'website',
        images: [
            {
                url: '/images/og-preview.webp',
                width: 1200,
                height: 630,
                alt: 'Velora ID - Jasa Pembuatan Website & Sistem Digital Profesional',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jasa Pembuatan Website & Sistem Digital | Velora ID',
        description: 'Solusi digital terjangkau untuk UMKM & institusi Indonesia.',
    },
    robots: {
        index: true,
        follow: true,
    },
    verification: {
        google: 'googlef059f7343365627a',
    },
};

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

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-1XJG5X3KZR"
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-1XJG5X3KZR');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans`} suppressHydrationWarning={true}>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}

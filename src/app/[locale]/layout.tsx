import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ve-lora.my.id'),
  title: {
    default: 'Jasa Pembuatan Website & Sistem Digital - Velora ID',
    template: '%s | Velora ID',
  },
  description:
    'Jasa pembuatan website profesional, sistem informasi sekolah, dan aplikasi bisnis terbaik di Indonesia. Konsultasi gratis untuk transformasi digital Anda.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://ve-lora.my.id',
    siteName: 'Velora ID',
    images: [{ url: '/images/logo.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as 'id' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans text-gray-900 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { MessageSquare, Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
  const t = useTranslations('contact');

  const handleWhatsApp = () => {
    const message = 'Halo Velora! Saya tertarik untuk konsultasi tentang project digital. Bisa dibantu?';
    window.open(`https://wa.me/6281320442174?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                <p className="text-gray-600">+62 813-2044-2174</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">hello@ve-lora.my.id</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Lokasi</h3>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
            >
              <MessageSquare className="w-5 h-5" />
              Chat via WhatsApp
            </button>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="Nama lengkap Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('message')}</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                placeholder="Ceritakan kebutuhan project Anda..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {t('send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

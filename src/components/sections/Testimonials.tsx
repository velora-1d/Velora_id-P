'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star } from 'lucide-react';

// Fallback data
const fallbackTestimonials = [
  {
    name: 'Ahmad Fauzi',
    role: 'Owner',
    company: 'Toko Online ABC',
    quote: 'Velora sangat membantu dalam membangun website toko online kami. Hasilnya profesional dan tepat waktu!',
    rating: 5,
    chatScreenshot: undefined,
  },
  {
    name: 'Siti Aminah',
    role: 'Kepala Sekolah',
    company: 'SMP Islam Terpadu',
    quote: 'Sistem informasi sekolah yang dibuat Velora sangat memudahkan administrasi kami. Terima kasih!',
    rating: 5,
    chatScreenshot: undefined,
  },
  {
    name: 'Budi Santoso',
    role: 'CEO',
    company: 'PT Digital Maju',
    quote: 'Tim Velora sangat responsif dan profesional. Hasil kerja mereka melampaui ekspektasi kami.',
    rating: 5,
    chatScreenshot: undefined,
  },
];

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
  chatScreenshot?: string;
};

type Props = {
  items?: Testimonial[];
};

const Testimonials = ({ items }: Props) => {
  const t = useTranslations('testimonials');
  const testimonials = items && items.length > 0 ? items : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee gap-6">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="shrink-0 w-80 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                )}

                {/* Quote */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Chat Screenshot (Optional) */}
                {testimonial.chatScreenshot && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={testimonial.chatScreenshot}
                      alt={`Chat with ${testimonial.name}`}
                      width={280}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

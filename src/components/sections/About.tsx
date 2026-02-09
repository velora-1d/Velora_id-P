'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const About = () => {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 rounded-3xl rotate-3" />
            <div className="relative bg-white rounded-3xl p-4 shadow-xl">
              <Image
                src="/images/founder.jpg"
                alt="Founder Velora"
                width={400}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Velora ID
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Velora adalah software house yang berfokus pada pengembangan website, sistem informasi, 
              dan solusi digital untuk bisnis dan lembaga pendidikan di Indonesia.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Kami percaya bahwa setiap bisnis berhak memiliki kehadiran digital yang profesional. 
              Dengan tim yang berpengalaman dan teknologi modern, kami siap membantu transformasi digital Anda.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-extrabold text-blue-500 mb-1">50+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="text-3xl font-extrabold text-blue-500 mb-1">3+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

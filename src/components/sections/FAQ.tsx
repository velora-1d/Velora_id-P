'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

// Fallback data
const fallbackFaqs = [
  {
    question: 'Berapa lama waktu pengerjaan website?',
    answer: 'Waktu pengerjaan tergantung kompleksitas project. Website company profile biasanya 1-2 minggu, sedangkan sistem custom bisa 1-3 bulan.',
    category: 'General',
  },
  {
    question: 'Apakah ada garansi setelah website jadi?',
    answer: 'Ya, kami memberikan garansi maintenance selama 30 hari untuk perbaikan bug. Untuk maintenance lanjutan, tersedia paket bulanan.',
    category: 'Support',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer: 'Pembayaran dilakukan bertahap: 50% di awal sebagai DP, dan 50% setelah project selesai. Untuk project besar, bisa dinegosiasikan.',
    category: 'Payment',
  },
  {
    question: 'Apakah bisa request revisi?',
    answer: 'Tentu! Kami menyediakan hingga 3x revisi mayor gratis. Untuk revisi tambahan, akan dikenakan biaya sesuai scope pekerjaan.',
    category: 'General',
  },
  {
    question: 'Teknologi apa yang digunakan?',
    answer: 'Kami menggunakan teknologi modern seperti React, Next.js, Laravel, Flutter, dan lainnya sesuai kebutuhan project.',
    category: 'Technical',
  },
];

type FAQ = {
  question: string;
  answer: string;
  category?: string;
};

type Props = {
  items?: FAQ[];
};

const FAQ = ({ items }: Props) => {
  const t = useTranslations('faq');
  const faqs = items && items.length > 0 ? items : fallbackFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
                <div>
                  <p className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

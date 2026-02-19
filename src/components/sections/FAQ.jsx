'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, HelpCircle, Database, Server, Wrench, Clock, RefreshCw, CreditCard, Plus, Minus, Sparkles, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const faqItems = [
    {
        icon: Database,
        iconGradient: 'from-blue-500 to-indigo-500',
        question: "Apakah website saya butuh database?",
        answer: "Tidak selalu! Kalau Anda hanya butuh website sederhana untuk menampilkan profil bisnis, cukup tanpa database. Tapi kalau butuh fitur seperti mengelola data, pembayaran, atau laporan — maka perlu database. Tenang, kami yang urus semuanya!",
        highlight: "Website profil = tanpa database. Website dengan fitur = pakai database."
    },
    {
        icon: Server,
        iconGradient: 'from-teal-500 to-cyan-500',
        question: "Website saya nanti disimpan di mana?",
        answer: "Website Anda kami simpan di server cloud yang cepat, aman, dan selalu online 24 jam. Sudah termasuk sertifikat keamanan SSL (gembok hijau di browser) jadi pengunjung merasa aman saat mengakses website Anda.",
        highlight: "Server cepat + aman + SSL gratis sudah termasuk."
    },
    {
        icon: Wrench,
        iconGradient: 'from-amber-500 to-orange-500',
        question: "Kalau ada masalah, siapa yang bantu?",
        answer: "Kami menyediakan layanan perawatan rutin: backup data, cek server, perbaikan error, dan update keamanan. Plus, Anda bisa hubungi kami kapan saja via WhatsApp — kami fast response 24/7!",
        highlight: "Support WhatsApp 24/7. Backup & maintenance rutin."
    },
    {
        icon: Clock,
        iconGradient: 'from-violet-500 to-purple-500',
        question: "Berapa lama sampai website jadi?",
        answer: "Tergantung tingkat kerumitannya. Website sederhana bisa jadi dalam 1-3 hari. Company profile profesional sekitar 1-2 minggu. Sistem yang lebih kompleks membutuhkan 1-3 bulan. Kami akan kasih timeline yang jelas di awal.",
        highlight: "Website simple: 1-3 hari • Profesional: 1-2 minggu • Kompleks: 1-3 bulan"
    },
    {
        icon: RefreshCw,
        iconGradient: 'from-emerald-500 to-green-500',
        question: "Boleh minta revisi kalau belum cocok?",
        answer: "Tentu boleh! Revisi tidak dibatasi selama masih sesuai kesepakatan awal. Kami tidak akan launch sebelum Anda benar-benar puas dengan hasilnya. Kepuasan Anda adalah prioritas kami.",
        highlight: "Revisi unlimited sampai Anda puas 100%!"
    },
    {
        icon: CreditCard,
        iconGradient: 'from-rose-500 to-pink-500',
        question: "Bisa bayar bertahap atau cicil?",
        answer: "Bisa! Untuk project besar, kami menerima pembayaran bertahap: DP 50% di awal, sisanya dilunasi sebelum website diluncurkan. Untuk jasa cepat (deploy dll), pembayaran di awal secara penuh.",
        highlight: "DP 50% → Pelunasan saat selesai. Transparan & fleksibel."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [faqs, setFaqs] = useState(faqItems);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('faqs')
                    .select('*')
                    .eq('published', true)
                    .order('sort_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    setFaqs(data.map((d, i) => ({
                        ...faqItems[i],
                        ...d,
                    })));
                }
            } catch {
                // Fallback to hardcoded data
            }
        };
        fetchFaqs();
    }, []);

    const toggle = (idx) => setOpenIndex(openIndex === idx ? -1 : idx);

    return (
        <section id="faq" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header — Centered, Friendly */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-14 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/60 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Pertanyaan Umum
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                            Ada Pertanyaan? <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Kami Jawab!</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                            Berikut jawaban untuk pertanyaan yang paling sering ditanyakan oleh calon klien kami. Simpel & mudah dipahami.
                        </p>
                    </div>
                </ScrollReveal>

                {/* FAQ Cards */}
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            const IconComp = faq.icon || faqItems[index]?.icon || HelpCircle;
                            const gradient = faq.iconGradient || faqItems[index]?.iconGradient || 'from-gray-500 to-gray-600';
                            return (
                                <ScrollReveal key={faq.id || index} delay={index * 0.06} width="100%">
                                    <div
                                        className={`group bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-400 overflow-hidden ${isOpen
                                                ? 'border-teal-200 shadow-xl shadow-teal-100/40'
                                                : 'border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            onClick={() => toggle(index)}
                                            className="w-full px-5 py-5 sm:px-7 sm:py-6 flex items-center gap-4 text-left"
                                        >
                                            {/* Icon Badge */}
                                            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm ${isOpen
                                                    ? 'scale-110 shadow-md'
                                                    : 'group-hover:scale-105'
                                                }`}>
                                                <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                                            </div>

                                            {/* Question Text */}
                                            <span className={`font-bold text-[15px] sm:text-lg flex-1 pr-2 transition-colors duration-200 ${isOpen ? 'text-teal-700' : 'text-gray-800'
                                                }`}>
                                                {faq.question}
                                            </span>

                                            {/* Toggle Icon */}
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen
                                                    ? 'bg-teal-500 text-white rotate-0'
                                                    : 'bg-gray-100 text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-500'
                                                }`}>
                                                {isOpen ? (
                                                    <Minus className="w-4 h-4" />
                                                ) : (
                                                    <Plus className="w-4 h-4" />
                                                )}
                                            </div>
                                        </button>

                                        {/* Answer — Expandable */}
                                        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="px-5 pb-5 sm:px-7 sm:pb-7 pt-0">
                                                {/* Divider */}
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent mb-5"></div>

                                                {/* Answer Text */}
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                                                    {faq.answer}
                                                </p>

                                                {/* Highlight Chip */}
                                                {faq.highlight && (
                                                    <div className="inline-flex items-start gap-2 px-4 py-3 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-xl">
                                                        <Sparkles className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                                        <span className="text-teal-700 text-xs sm:text-sm font-semibold leading-snug">
                                                            {faq.highlight}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>

                    {/* Bottom CTA Card */}
                    <ScrollReveal delay={0.3} width="100%">
                        <div className="mt-10 sm:mt-12">
                            <div className="relative bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden group">
                                {/* Decorative */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

                                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
                                    {/* Icon */}
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-500">
                                        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                    </div>

                                    {/* Text */}
                                    <div className="text-center sm:text-left flex-1">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                                            Masih ada pertanyaan?
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Jangan ragu! Konsultasi gratis via WhatsApp. Tim kami siap bantu kapan saja, 24/7.
                                        </p>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:gap-3"
                                    >
                                        Tanya Sekarang
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

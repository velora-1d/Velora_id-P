'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, HelpCircle, Database, Server, Wrench, Clock, RefreshCw, CreditCard, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const faqItems = [
    {
        icon: Database,
        question: "Apakah website saya butuh database?",
        answer: "Tidak selalu. Untuk website profil perusahaan sederhana, landing page promosi, atau katalog produk statis, tanpa database justru membuat website lebih cepat dan hemat biaya. Namun jika Anda membutuhkan autentikasi pengguna, sistem kasir/bendahara, atau dashboard CMS pengelola konten, kami akan pasangkan database PostgreSQL/Supabase terenkripsi.",
        highlight: "Profil statis = super cepat tanpa database • Sistem interaktif/CMS = database PostgreSQL aman."
    },
    {
        icon: Server,
        question: "Di mana website dan sistem kami akan dihosting?",
        answer: "Kami mendeploy di infrastruktur cloud global performa tinggi (Vercel, Cloudflare, atau VPS dedicated seperti DigitalOcean/Biznet). Sudah termasuk sertifikasi keamanan HTTPS/SSL Grade A+ otomatis, proteksi DDoS, dan backup database otomatis harian.",
        highlight: "Server cloud SSD cepat + HTTPS SSL Grade A+ + proteksi DDoS sudah termasuk."
    },
    {
        icon: Wrench,
        question: "Bagaimana jika terjadi error atau butuh bantuan darurat?",
        answer: "Seluruh proyek di Velora mendapatkan garansi pemeliharaan aktif setelah serah terima. Anda dapat langsung menghubungi technical support kami melalui jalur khusus WhatsApp dengan SLA tanggapan cepat.",
        highlight: "Dedicated WhatsApp Support + Garansi bugfix aktif 30-90 hari."
    },
    {
        icon: Clock,
        question: "Berapa lama estimasi pengerjaan hingga website go-live?",
        answer: "Jasa cepat (deploy server/domain) selesai dalam 1-3 hari kerja. Website Company Profile dan Landing Page profesional diselesaikan dalam 1-2 minggu. Sementara sistem manajemen sekolah/pesantren terintegrasi memerlukan sprint 2-4 minggu dengan sesi pelatihan staf.",
        highlight: "Jasa Cepat: 1-3 hari • Company Profile: 1-2 minggu • Sistem Terpadu: 2-4 minggu."
    },
    {
        icon: RefreshCw,
        question: "Apakah ada batasan revisi selama proses pembuatan?",
        answer: "Kami menerapkan fase review bertahap (Wireframe -> Desain -> Integrasi Kode). Revisi tidak dibatasi selama masih dalam lingkup kesepakatan fitur awal, hingga Anda puas 100% sebelum peluncuran resmi.",
        highlight: "Review bertahap tanpa batas revisi selama dalam cakupan kesepakatan awal."
    },
    {
        icon: CreditCard,
        question: "Bagaimana skema pembayaran di Velora ID?",
        answer: "Sangat transparan dan fleksibel. Untuk proyek pengembangan sistem, kami menggunakan skema termin (DP 50% di awal pengerjaan, dan sisa pelunasan setelah sistem selesai diuji dan siap diluncurkan). Pembayaran mendukung transfer bank dan Virtual Account.",
        highlight: "Skema termin aman: DP 50% -> Pelunasan setelah verifikasi sistem selesai."
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
            } catch { }
        };
        fetchFaqs();
    }, []);

    const toggle = (idx) => setOpenIndex(openIndex === idx ? -1 : idx);

    return (
        <section id="faq" className="py-24 sm:py-32 bg-white text-slate-900 relative border-t border-slate-200/80 overflow-hidden">
            {/* Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[20vw] font-black tracking-tighter text-slate-900/[0.025] leading-none whitespace-nowrap z-0">
                FAQ
            </div>

            <div className="absolute inset-0 studio-grid-pattern-light opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-14 sm:mb-16">
                        <div className="inline-flex items-center gap-2 studio-mono-badge mb-4">
                            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                            KONSULTASI & FAQ
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Pertanyaan yang Kerap Ditanyakan
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                            Penjelasan transparan seputar proses teknis, hosting, garansi, dan skema kerja sama di Velora.
                        </p>
                    </div>
                </ScrollReveal>

                {/* FAQ Accordion List */}
                <div className="space-y-3.5">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const IconComp = faq.icon || faqItems[index]?.icon || HelpCircle;
                        return (
                            <ScrollReveal key={faq.id || index} delay={index * 0.05} width="100%">
                                <div
                                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        isOpen
                                            ? 'bg-white border-blue-500 shadow-md shadow-blue-500/5'
                                            : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-white'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggle(index)}
                                        className="w-full px-5 py-4.5 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                                isOpen ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-slate-200'
                                            }`}>
                                                <IconComp className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight pr-2">
                                                {faq.question}
                                            </span>
                                        </div>

                                        <div className={`w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180 text-blue-600 border-blue-200 bg-blue-50' : ''
                                        }`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-100">
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal text-justify">
                                                {faq.answer}
                                            </p>
                                            {faq.highlight && (
                                                <div className="rounded-lg bg-blue-50 border border-blue-200/60 p-3 text-xs font-mono text-blue-800 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                                                    <span>{faq.highlight}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Direct Consultation Box */}
                <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 border border-blue-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
                    <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Punya Pertanyaan Spesifik Lainnya?</h4>
                        <p className="text-xs sm:text-sm text-slate-600">Diskusikan kebutuhan arsitektur dan estimasi biaya langsung dengan tim teknis kami.</p>
                    </div>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 whitespace-nowrap hover:-translate-y-0.5"
                    >
                        <MessageSquare className="w-4 h-4 text-blue-100" />
                        <span>Chat via WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

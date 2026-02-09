import { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';

const faqs = [
    {
        question: "Apakah website/sistem butuh database?",
        answer: "Tergantung kebutuhan. Untuk company profile statis, tidak perlu database. Untuk sistem dengan CRUD (bendahara, sekretaris, dll), kami gunakan MySQL/PostgreSQL yang aman dan scalable."
    },
    {
        question: "Di mana hosting-nya?",
        answer: "Kami menggunakan infrastruktur Cloud Server (VPS) Enterprise yang stabil, aman, dan cepat. Semua paket website sudah termasuk konfigurasi server yang optimal dan sertifikat keamanan SSL (HTTPS) standar industri."
    },
    {
        question: "Bagaimana proses maintenance?",
        answer: "Kami menyediakan paket maintenance bulanan yang mencakup: backup rutin, monitoring server, perbaikan bug, dan update keamanan. Support via WhatsApp 24/7."
    },
    {
        question: "Berapa lama proses pengerjaan?",
        answer: "Deploy website: 1-3 hari. Company profile: 1-2 minggu. Sistem kompleks: 1-3 bulan. Timeline pasti akan disampaikan di proposal setelah konsultasi."
    },
    {
        question: "Apakah ada garansi revisi?",
        answer: "Ya! Revisi unlimited selama scope tidak berubah. Kami tidak akan launch sebelum Anda 100% puas dengan hasilnya."
    },
    {
        question: "Bisa bayar bertahap?",
        answer: "Untuk project besar, kami support pembayaran termin (DP 50%, pelunasan sebelum launch). Untuk jasa cepat, full payment di awal."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Header */}
                    <div className="lg:sticky lg:top-32">
                        <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
                            FAQ
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                            Pertanyaan yang Sering Ditanyakan
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Belum menemukan jawaban yang Anda cari? Langsung hubungi kami via WhatsApp untuk konsultasi gratis.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:-translate-y-1"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Tanya Langsung
                        </button>
                    </div>

                    {/* Right: Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-primary shadow-lg' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                                >
                                    <span className={`font-semibold text-lg pr-4 ${openIndex === index ? 'text-primary' : 'text-gray-900'}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''
                                            }`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}>
                                    <p className="px-8 pb-6 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const fallbackTestimonials = [
    {
        content: "Velora sangat membantu digitalisasi administrasi pesantren kami. Sistem bendahara terintegrasi WA membuat pembayaran SPP santri jadi transparan dan auto-reconcile.",
        name: "Ustadz Ahmad Fauzi",
        role: "Pimpinan Lembaga",
        company: "Pesantren Al-Hikmah",
        rating: 5
    },
    {
        content: "Deploy website company profile dan landing page selesai dalam hitungan hari. Loading super cepat, skor PageSpeed 99, dan langsung dapat klien dari Google.",
        name: "Rizky Pratama",
        role: "Founder & Director",
        company: "CV Digital Kreasi",
        rating: 5
    },
    {
        content: "Integrasi payment gateway QRIS dan Virtual Account untuk platform kami berjalan lancar. Notifikasi WhatsApp instan sangat diapresiasi oleh pelanggan.",
        name: "Siti Nurhaliza",
        role: "Operasional Bisnis",
        company: "Retail Prima Hub",
        rating: 5
    },
    {
        content: "Website resmi kami jadi jauh lebih representatif dan terpercaya di mata investor. Tim Velora sangat responsif dalam maintenance dan garansi.",
        name: "Budi Santoso",
        role: "Managing Director",
        company: "PT Maju Nusantara",
        rating: 5
    },
    {
        content: "Sistem e-rapor dan administrasi santri yang dibuatkan sangat intuitif. Guru dan staf tata usaha kami bisa langsung menggunakannya tanpa kendala.",
        name: "Ibu Dewi Kartika",
        role: "Kepala Kurikulum",
        company: "SMP & MA Terpadu",
        rating: 5
    },
    {
        content: "Server stabil tanpa downtime, penataan database rapi, dan keamanan data terjamin. Partner teknologi terbaik untuk jangka panjang.",
        name: "Andi Wijaya",
        role: "Head of Technology",
        company: "Logistics Prima",
        rating: 5
    }
];

const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-[85vw] sm:w-[380px] md:w-[410px] mx-2.5 sm:mx-3.5">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 p-6 sm:p-7 shadow-xl flex flex-col justify-between h-[225px] sm:h-[235px] group hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 backdrop-blur-md">
            <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-3.5">
                    <div className="flex gap-1">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <Quote className="w-5 h-5 text-slate-700 group-hover:text-blue-400/50 transition-colors" />
                </div>

                {/* Content */}
                <p className="text-slate-300 text-sm sm:text-[14.5px] leading-relaxed mb-4 font-normal text-justify line-clamp-3">
                    &quot;{testimonial.content}&quot;
                </p>
            </div>

            {/* Author */}
            <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 font-bold text-xs">
                        {testimonial.avatar_url ? (
                            <img src={testimonial.avatar_url} alt={testimonial.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            testimonial.name.split(' ').map(w => w[0]).join('').substring(0, 2)
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm tracking-tight">{testimonial.name}</h4>
                        <p className="text-slate-400 text-[11px] sm:text-xs line-clamp-1">
                            {testimonial.role}{testimonial.company ? ` • ${testimonial.company}` : ''}
                        </p>
                    </div>
                </div>

                <span className="text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                </span>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState(fallbackTestimonials);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });

                if (!error && data && data.length > 0) {
                    setTestimonials(data);
                }
            } catch { }
        };
        fetchTestimonials();
    }, []);

    const baseList = testimonials.length > 0 ? testimonials : fallbackTestimonials;
    const trackList = baseList.length < 5 ? [...baseList, ...baseList] : baseList;

    return (
        <section id="testimonials" className="py-24 sm:py-32 bg-[#070C18] text-white relative border-t border-slate-800/80 overflow-hidden">
            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.03]">
                <span className="text-[18vw] font-black text-white tracking-tighter leading-none select-none whitespace-nowrap">
                    VELORA
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-14 sm:mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 uppercase tracking-widest mb-4">
                            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                            [REPUTASI_KLIEN]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Kepercayaan Nyata dari Mitra Kami
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Pengalaman langsung yayasan, pimpinan pesantren, dan pelaku usaha yang telah mempercayakan sistem digitalnya kepada Velora.
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* Auto-scrolling Infinite Marquee */}
            <div className="relative overflow-hidden py-4 w-full select-none">
                {/* Side Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#070C18] via-[#070C18]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#070C18] via-[#070C18]/80 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                    {/* Track 1 */}
                    <div className="flex shrink-0">
                        {trackList.map((testimonial, index) => (
                            <TestimonialCard key={`track-1-${index}`} testimonial={testimonial} />
                        ))}
                    </div>
                    {/* Track 2 (Seamless loop replica) */}
                    <div className="flex shrink-0" aria-hidden="true">
                        {trackList.map((testimonial, index) => (
                            <TestimonialCard key={`track-2-${index}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Trust Indicator Pill */}
            <div className="container mx-auto px-6 mt-14 sm:mt-16">
                <ScrollReveal width="100%">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-400 font-mono">
                            <span>Dipercaya oleh</span>
                            <span className="text-white font-bold">50+ lembaga & institusi</span>
                            <span>di seluruh Indonesia</span>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Testimonials;

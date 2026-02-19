'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

// Fallback data jika DB belum ada
const fallbackTestimonials = [
    {
        content: "Velora sangat membantu digitalisasi administrasi pesantren kami. Sistem bendahara terintegrasi WA membuat pembayaran SPP jadi transparan.",
        name: "Ustadz Ahmad Fauzi",
        role: "Kepala Pesantren Al-Hikmah",
        rating: 5
    },
    {
        content: "Deploy website tugas kuliah dalam hitungan jam! Responsif dan profesional. Sangat recommended untuk mahasiswa yang butuh website cepat.",
        name: "Rizky Pratama",
        role: "Mahasiswa IT",
        rating: 5
    },
    {
        content: "Integrasi payment gateway Midtrans untuk toko online kami berjalan lancar. Tim support sangat responsif dan helpful.",
        name: "Siti Nurhaliza",
        role: "Owner Toko Online",
        rating: 5
    },
    {
        content: "Website company profile kami jadi lebih profesional. SEO-nya juga bagus, sekarang sudah muncul di Google page 1!",
        name: "Budi Santoso",
        role: "Direktur CV Maju Jaya",
        rating: 5
    },
    {
        content: "Sistem e-learning yang dibuatkan sangat user-friendly. Guru-guru kami yang gaptek pun bisa pakai dengan mudah.",
        name: "Ibu Dewi Kartika",
        role: "Kepala Sekolah SDN 01",
        rating: 5
    },
    {
        content: "Maintenance server kami ditangani dengan baik. Response time cepat dan harga sangat bersaing.",
        name: "Andi Wijaya",
        role: "IT Manager PT Sukses",
        rating: 5
    }
];

const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-[85vw] sm:w-[400px] pt-8 mx-3 sm:mx-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-lg relative group hover:-translate-y-1 transition-all duration-300">
            {/* Overlapping Avatar */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 p-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {testimonial.avatar_url ? (
                            <img src={testimonial.avatar_url} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-teal-600 font-bold text-xl">
                                {testimonial.name.split(' ').map(w => w[0]).join('').substring(0, 2)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-gray-100 group-hover:text-teal-50 transition-colors">
                <Quote className="w-10 h-10 fill-current" />
            </div>

            <div className="mt-8 text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 italic relative z-10">
                    &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-teal-600 text-xs font-medium uppercase tracking-wide mt-1">
                        {testimonial.role}
                    </p>
                    {testimonial.company && (
                        <p className="text-gray-400 text-xs mt-0.5">{testimonial.company}</p>
                    )}
                </div>
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
            } catch {
                // Fallback to hardcoded data if DB not available
            }
        };

        fetchTestimonials();
    }, []);

    // Duplicate for infinite scroll effect
    const allTestimonials = [...testimonials, ...testimonials];

    return (
        <section id="testimonials" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-16">
                        <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-teal-100">
                            Testimoni
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
                            Apa Kata Klien Kami
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed text-center">
                            Kepuasan klien adalah prioritas utama kami dalam setiap karya yang kami ciptakan.
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* Auto-scrolling Marquee */}
            <div className="relative overflow-hidden py-4">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-[#faf9f7] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-[#faf9f7] to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling container */}
                <div className="flex animate-marquee hover:pause-animation">
                    {allTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>

            {/* Trust indicator */}
            <div className="container mx-auto px-6 mt-16">
                <ScrollReveal width="100%">
                    <div className="text-center">
                        <p className="text-gray-400 text-sm font-medium">
                            Dipercaya oleh <span className="text-gray-900 font-bold">50+ klien</span> di seluruh Indonesia
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Testimonials;

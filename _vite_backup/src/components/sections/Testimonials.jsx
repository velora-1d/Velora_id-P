import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Velora sangat membantu digitalisasi administrasi pesantren kami. Sistem bendahara terintegrasi WA membuat pembayaran SPP jadi transparan.",
        name: "Ustadz Ahmad Fauzi",
        role: "Kepala Pesantren Al-Hikmah",
        avatar: "AF",
        rating: 5
    },
    {
        quote: "Deploy website tugas kuliah dalam hitungan jam! Responsif dan profesional. Sangat recommended untuk mahasiswa yang butuh website cepat.",
        name: "Rizky Pratama",
        role: "Mahasiswa IT",
        avatar: "RP",
        rating: 5
    },
    {
        quote: "Integrasi payment gateway Midtrans untuk toko online kami berjalan lancar. Tim support sangat responsif dan helpful.",
        name: "Siti Nurhaliza",
        role: "Owner Toko Online",
        avatar: "SN",
        rating: 5
    },
    {
        quote: "Website company profile kami jadi lebih profesional. SEO-nya juga bagus, sekarang sudah muncul di Google page 1!",
        name: "Budi Santoso",
        role: "Direktur CV Maju Jaya",
        avatar: "BS",
        rating: 5
    },
    {
        quote: "Sistem e-learning yang dibuatkan sangat user-friendly. Guru-guru kami yang gaptek pun bisa pakai dengan mudah.",
        name: "Ibu Dewi Kartika",
        role: "Kepala Sekolah SDN 01",
        avatar: "DK",
        rating: 5
    },
    {
        quote: "Maintenance server kami ditangani dengan baik. Response time cepat dan harga sangat bersaing.",
        name: "Andi Wijaya",
        role: "IT Manager PT Sukses",
        avatar: "AW",
        rating: 5
    }
];

// Duplicate for infinite scroll effect
const allTestimonials = [...testimonials, ...testimonials];

const TestimonialCard = ({ testimonial }) => (
    <div className="flex-shrink-0 w-[400px] bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mx-4">
        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-primary/50 mb-4" strokeWidth={1} />

        {/* Stars */}
        <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>

        {/* Quote */}
        <p className="text-white/90 text-base leading-relaxed mb-6">
            "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {testimonial.avatar}
            </div>
            <div>
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                <p className="text-gray-400 text-xs">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-semibold mb-4 tracking-wide backdrop-blur-sm">
                        TESTIMONI
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Apa Kata Klien Kami
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Kepuasan klien adalah prioritas utama kami.
                    </p>
                </div>
            </div>

            {/* Auto-scrolling Marquee */}
            <div className="relative overflow-hidden">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling container */}
                <div className="flex animate-marquee hover:pause-animation">
                    {allTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>

            {/* Trust indicator */}
            <div className="container mx-auto px-6 mt-12">
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Dipercaya oleh <span className="text-white font-semibold">50+ klien</span> di seluruh Indonesia
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

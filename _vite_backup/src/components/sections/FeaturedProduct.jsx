import { GraduationCap, Users, Database, Wallet, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

const features = [
    {
        icon: Wallet,
        title: 'Sistem Bendahara',
        desc: 'Payment gateway terintegrasi, invoice real-time, notifikasi WA otomatis ke wali santri.',
        color: 'from-emerald-500 to-teal-600'
    },
    {
        icon: Users,
        title: 'Sistem Sekretaris',
        desc: 'Master data santri lengkap: biodata, kelas, jurusan, mutasi, dan dokumen.',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        icon: GraduationCap,
        title: 'Sistem Pendidikan',
        desc: 'E-Rapor digital, perhitungan nilai nasional, ijazah digital yang sah.',
        color: 'from-purple-500 to-pink-600'
    },
];

const benefits = [
    'Terintegrasi dalam satu platform',
    'Notifikasi real-time via WhatsApp',
    'Dashboard admin yang mudah digunakan',
    'Laporan keuangan otomatis',
    'Support & maintenance berkelanjutan',
    'Customizable sesuai kebutuhan'
];

const FeaturedProduct = () => {
    return (
        <section id="featured" className="py-16 sm:py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full text-sm font-semibold mb-6 tracking-wide">
                            PRODUK UNGGULAN
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                            Sistem Manajemen<br />
                            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Pesantren & Sekolah
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Solusi digital all-in-one untuk mengelola administrasi, keuangan, dan akademik lembaga pendidikan Anda. Didesain khusus untuk pesantren dan sekolah di Indonesia.
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-primary/30 transition-all duration-200 transform hover:-translate-y-1"
                        >
                            Konsultasi Gratis
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Right: Feature Cards */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                        <feature.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Full System Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10">
                                <Database className="w-10 h-10 mb-4 text-primary" strokeWidth={1.5} />
                                <h3 className="text-xl font-bold mb-2">Full System Terintegrasi</h3>
                                <p className="text-gray-400 text-sm">
                                    Gabungkan ketiga sistem dalam satu platform terpadu dengan single sign-on dan reporting terpusat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;

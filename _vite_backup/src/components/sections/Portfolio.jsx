import { useState } from 'react';
import { X, ExternalLink, MessageSquare } from 'lucide-react';

const projects = [
    {
        title: "E-Commerce Platform",
        category: "Retail & E-Commerce",
        client: "Fashion Hub Indonesia",
        description: "Platform e-commerce multi-channel dengan integrasi payment gateway dan inventory management real-time.",
        challenge: "Klien membutuhkan sistem yang dapat mengelola ribuan produk dengan banyak varian dan integrasi ke marketplace.",
        solution: "Kami membangun platform custom dengan dashboard terpusat, sync otomatis ke Tokopedia/Shopee, dan laporan penjualan real-time.",
        tech: "React, Node.js, PostgreSQL",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
        icon: "🛒"
    },
    {
        title: "Digital Banking App",
        category: "Finance & Banking",
        client: "Bank Digital Nusantara",
        description: "Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investment tracking.",
        challenge: "Membutuhkan keamanan tingkat tinggi dengan UX yang tetap mudah digunakan oleh semua kalangan.",
        solution: "Implementasi biometric authentication, end-to-end encryption, dengan UI/UX yang intuitif dan accessibility-friendly.",
        tech: "Flutter, Go, MongoDB",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        icon: "💳"
    },
    {
        title: "Hospital Management System",
        category: "Healthcare",
        client: "RS Sehat Sejahtera",
        description: "Sistem informasi rumah sakit terintegrasi dengan rekam medis elektronik dan telemedicine.",
        challenge: "Sistem lama berbasis kertas menyebabkan keterlambatan layanan dan kehilangan data pasien.",
        solution: "Migrasi penuh ke sistem digital dengan modul pendaftaran, antrian, rekam medis, billing, dan telemedicine.",
        tech: "Laravel, Vue.js, MySQL",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        icon: "🏥"
    },
    {
        title: "Fleet Management System",
        category: "Logistics",
        client: "Logistics Prima",
        description: "Sistem tracking armada real-time dengan optimasi rute dan manajemen pengiriman.",
        challenge: "Armada 200+ kendaraan sulit dipantau, banyak keterlambatan dan inefisiensi rute.",
        solution: "GPS tracking real-time, algoritma optimasi rute, dashboard monitoring, dan notifikasi otomatis ke pelanggan.",
        tech: "Python, Django, PostgreSQL",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
        icon: "🚚"
    },
    {
        title: "Learning Management System",
        category: "Education",
        client: "EduTech Indonesia",
        description: "Platform e-learning dengan virtual classroom, quiz interaktif, dan progress tracking.",
        challenge: "Pandemi memaksa sekolah beralih online tanpa infrastruktur yang memadai.",
        solution: "LMS lengkap dengan video conference, bank soal, rapor digital, dan integrasi dengan sistem sekolah.",
        tech: "Next.js, Firebase, WebRTC",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        icon: "📚"
    },
    {
        title: "Business Analytics Dashboard",
        category: "Retail & E-Commerce",
        client: "Retail Mart Group",
        description: "Dashboard analytics real-time dengan AI-powered insights untuk pengambilan keputusan bisnis.",
        challenge: "Data tersebar di banyak sistem, sulit mendapat gambaran bisnis secara menyeluruh.",
        solution: "Data warehouse terpusat dengan visualisasi interaktif dan prediksi penjualan berbasis machine learning.",
        tech: "React, Python, TensorFlow",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        icon: "📊"
    }
];

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    const handleWhatsApp = (project) => {
        const message = `Halo Velora! Saya tertarik dengan project "${project.title}" yang ada di portfolio. Bisa diskusi lebih lanjut?`;
        window.open(`https://wa.me/6281320442174?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section id="portfolio" className="py-12 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
                        PORTFOLIO
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Portfolio Kami</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Proyek-proyek transformasi digital yang telah kami selesaikan dengan sukses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col h-full cursor-pointer group"
                            onClick={() => openModal(project)}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <ExternalLink className="w-5 h-5" />
                                        Lihat Detail
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                                    {project.title}
                                </h3>
                                <div className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs uppercase tracking-wide">
                                        {project.category}
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span>{project.client}</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="pt-4 border-t border-gray-100 mt-auto">
                                    <p className="text-xs text-gray-500 font-mono">
                                        <span className="font-bold text-gray-700">Tech:</span> {project.tech}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="h-56 relative">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-6">
                                <span className="text-4xl mb-2 block">{selectedProject.icon}</span>
                                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {selectedProject.category}
                                </span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-600">{selectedProject.client}</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        🎯 Tantangan
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">{selectedProject.challenge}</p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        💡 Solusi
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">{selectedProject.solution}</p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-bold text-gray-900 mb-2">Tech Stack</h4>
                                    <p className="text-gray-600 font-mono text-sm">{selectedProject.tech}</p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-gray-500 text-sm mb-4">Tertarik dengan project serupa?</p>
                                <button
                                    onClick={() => handleWhatsApp(selectedProject)}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Diskusikan Project Serupa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;

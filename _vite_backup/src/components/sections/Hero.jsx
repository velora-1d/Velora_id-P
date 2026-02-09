import { ArrowRight, MessageSquare, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
                    srcSet="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=80 640w,
                            https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80 1200w,
                            https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80 1920w"
                    sizes="(max-width: 640px) 100vw, 100vw"
                    alt="Office Background"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-primary/50"></div>
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 z-[1] opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Floating Elements - Static decorative blurs */}
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 mb-6 sm:mb-8">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full status-pulse"></span>
                        <span className="text-white/90 text-sm font-medium">✨ Open for Projects 2025</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
                        Jasa Pembuatan Website
                        <br />
                        <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            & Sistem Digital
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        Website, Sistem, dan Solusi Digital yang cepat, modern, dan terintegrasi untuk bisnis & lembaga Anda.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 px-4 sm:px-0">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg btn-hover shadow-2xl hover:shadow-white/20 w-full sm:w-auto"
                        >
                            <MessageSquare className="w-5 h-5" />
                            Konsultasi Gratis
                            <ArrowRight className="w-5 h-5 icon-hover" />
                        </button>
                        <button
                            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg btn-hover w-full sm:w-auto"
                        >
                            <Play className="w-5 h-5" />
                            Lihat Portfolio
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg mx-auto">
                        <div className="text-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">50+</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Proyek Selesai</div>
                        </div>
                        <div className="text-center border-x border-white/10">
                            <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">98%</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Klien Puas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">24/7</div>
                            <div className="text-gray-400 text-xs sm:text-sm">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-white rounded-full animate-scroll-hint"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

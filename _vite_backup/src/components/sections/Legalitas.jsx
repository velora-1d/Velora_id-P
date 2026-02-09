import { Shield, CheckCircle, Building, MapPin, FileText, Calendar, Award, Globe, Verified } from 'lucide-react';

const Legalitas = () => {
    return (
        <section id="legalitas" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Ambient Light Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 sm:mb-6">
                        <Verified className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">Legalitas Usaha</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
                        Usaha Terdaftar <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Secara Resmi</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed text-justify md:text-center px-2 sm:px-0">
                        Velora ID merupakan usaha yang telah terdaftar secara resmi dan memiliki legalitas yang diterbitkan oleh Pemerintah Republik Indonesia melalui sistem OSS (Online Single Submission).
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Main NIB Card */}
                    <div className="relative mb-8 sm:mb-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl sm:rounded-[2rem] blur-2xl opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
                            {/* Mobile/Tablet: Stacked layout */}
                            <div className="flex flex-col lg:hidden items-center gap-5 sm:gap-8">
                                {/* Icon */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-2xl opacity-40"></div>
                                    <div className="relative w-18 h-18 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
                                        <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                    </div>
                                </div>
                                {/* NIB */}
                                <div className="text-center">
                                    <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3">Nomor Induk Berusaha</p>
                                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wider mb-3 sm:mb-4" style={{ fontFamily: 'monospace' }}>
                                        3110250097422
                                    </h3>
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl">
                                        <span className="relative flex h-3 w-3">
                                            <span className="status-pulse inline-flex rounded-full h-full w-full bg-emerald-400"></span>
                                        </span>
                                        <span className="text-emerald-300 font-semibold text-lg">AKTIF / TERBIT</span>
                                    </div>
                                </div>
                                {/* Quick Info */}
                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl flex-1">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-white font-medium text-sm">Perizinan Berbasis Risiko</p>
                                            <p className="text-slate-400 text-xs">Tingkat Risiko Rendah</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl flex-1">
                                        <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-white font-medium text-sm">Skala Usaha Mikro</p>
                                            <p className="text-slate-400 text-xs">Terverifikasi OSS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Horizontal layout with NIB truly centered */}
                            <div className="hidden lg:flex items-center justify-center gap-12">
                                {/* Left - Icon */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-40"></div>
                                    <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl">
                                        <Shield className="w-14 h-14 text-white" />
                                    </div>
                                </div>

                                {/* Center - NIB (takes remaining space and centers content) */}
                                <div className="text-center flex-1">
                                    <p className="text-slate-400 text-sm uppercase tracking-[0.3em] mb-3">Nomor Induk Berusaha</p>
                                    <h3 className="text-5xl xl:text-6xl font-bold text-white tracking-wider mb-4" style={{ fontFamily: 'monospace' }}>
                                        3110250097422
                                    </h3>
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl">
                                        <span className="relative flex h-3 w-3">
                                            <span className="status-pulse inline-flex rounded-full h-full w-full bg-emerald-400"></span>
                                        </span>
                                        <span className="text-emerald-300 font-semibold text-lg">AKTIF / TERBIT</span>
                                    </div>
                                </div>

                                {/* Right - Quick Info */}
                                <div className="space-y-4 flex-shrink-0 w-64">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-white font-medium">Perizinan Berbasis Risiko</p>
                                            <p className="text-slate-400 text-sm">Tingkat Risiko Rendah</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                                        <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-white font-medium">Skala Usaha Mikro</p>
                                            <p className="text-slate-400 text-sm">Terverifikasi OSS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detail Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* Card 1 */}
                        <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/30 transition-colors duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-5">
                                <Building className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h4 className="text-white font-semibold text-lg mb-2">Nama Usaha</h4>
                            <p className="text-slate-300 font-medium">Velora ID</p>
                            <p className="text-slate-500 text-sm mt-1">Digital Services</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-5">
                                <Shield className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h4 className="text-white font-semibold text-lg mb-2">Pemilik</h4>
                            <p className="text-slate-300 font-medium">Mahin Utsman Nawawi, S.H.</p>
                            <p className="text-slate-500 text-sm mt-1">Founder & CEO</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-colors duration-300 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-5">
                                <MapPin className="w-7 h-7 text-purple-400" />
                            </div>
                            <h4 className="text-white font-semibold text-lg mb-2">Domisili</h4>
                            <p className="text-slate-300 font-medium">Kabupaten Bandung</p>
                            <p className="text-slate-500 text-sm mt-1">Jawa Barat, Indonesia</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-colors duration-200 group">
                            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center mb-5">
                                <Calendar className="w-7 h-7 text-amber-400" />
                            </div>
                            <h4 className="text-white font-semibold text-lg mb-2">Tanggal Terbit</h4>
                            <p className="text-slate-300 font-medium">31 Oktober 2025</p>
                            <p className="text-slate-500 text-sm mt-1">via Sistem OSS</p>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="bg-slate-800/30 backdrop-blur rounded-2xl p-8 border border-slate-700/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg mb-2">Wilayah Operasional</h4>
                                    <p className="text-slate-400 text-justify">Seluruh Wilayah Republik Indonesia. Kami melayani klien dari Sabang sampai Merauke dengan komitmen kualitas yang sama.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg mb-2">Bidang Usaha (KBLI)</h4>
                                    <p className="text-slate-400 text-justify">KBLI 46699 — Perdagangan Besar Produk Lainnya YTDL. Mencakup layanan digital, pengembangan web, dan solusi teknologi.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-slate-500 text-sm mt-10">
                        Legalitas ini diterbitkan dan dikelola secara resmi melalui sistem OSS, serta ditandatangani secara elektronik oleh instansi terkait sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Legalitas;

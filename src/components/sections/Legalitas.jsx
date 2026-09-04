'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, Building, MapPin, FileText, Calendar, Award, Globe, Verified, BadgeCheck, Crown, Star, Fingerprint, Scale } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const fallback = {
    nib: '3110250097422', status: 'AKTIF / TERBIT',
    nama_usaha: 'Velora ID', nama_usaha_sub: 'Digital Services',
    pemilik: 'Mahin Utsman Nawawi, S.H.', pemilik_title: 'Founder & CEO',
    domisili: 'Kabupaten Bandung', domisili_sub: 'Jawa Barat, Indonesia',
    tanggal_terbit: '31 Oktober 2025', tanggal_terbit_sub: 'via Sistem OSS',
    perizinan_text: 'Perizinan Berbasis Risiko', perizinan_sub: 'Tingkat Risiko Rendah',
    skala_text: 'Skala Usaha Mikro', skala_sub: 'Terverifikasi OSS',
    wilayah_desc: 'Seluruh Wilayah Republik Indonesia. Kami melayani klien dari Sabang sampai Merauke dengan komitmen kualitas yang sama.',
    kbli_desc: 'KBLI 46699 — Perdagangan Besar Produk Lainnya YTDL. Mencakup layanan digital, pengembangan web, dan solusi teknologi.',
    footer_text: 'Legalitas ini diterbitkan dan dikelola secara resmi melalui sistem OSS, serta ditandatangani secara elektronik oleh instansi terkait sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.'
};

const Legalitas = () => {
    const [d, setD] = useState(fallback);

    useEffect(() => {
        const fetch_ = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase.from('legalitas').select('*').eq('published', true).limit(1).single();
                if (!error && data) setD({ ...fallback, ...data });
            } catch { }
        };
        fetch_();
    }, []);

    const details = [
        { icon: Building, label: 'Nama Usaha', value: d.nama_usaha, sub: d.nama_usaha_sub, color: 'text-amber-600', bg: 'bg-amber-50' },
        { icon: Shield, label: 'Pemilik', value: d.pemilik, sub: d.pemilik_title, color: 'text-teal-600', bg: 'bg-teal-50' },
        { icon: MapPin, label: 'Domisili', value: d.domisili, sub: d.domisili_sub, color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: Calendar, label: 'Tanggal Terbit', value: d.tanggal_terbit, sub: d.tanggal_terbit_sub, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <section id="legalitas" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[18vw] font-black tracking-tighter text-slate-900/[0.025] leading-none whitespace-nowrap z-0">
                LEGALITAS
            </div>

            {/* Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            {/* Subtle zigzag pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0L40 20' stroke='%23000' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '40px 20px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/60 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                            <Verified className="w-3.5 h-3.5" />
                            Legalitas Resmi
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
                            Usaha Terdaftar <br className="hidden sm:block" />
                            <span className="text-blue-600">Secara Resmi</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Velora ID memiliki legalitas resmi yang diterbitkan oleh Pemerintah Republik Indonesia melalui sistem OSS.
                        </p>
                    </div>
                </ScrollReveal>

                {/* === MAIN CERTIFICATE CARD === */}
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal delay={0.1} width="100%">
                        <div className="relative">
                            {/* Outer glow */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-amber-300/30 via-amber-200/20 to-teal-300/20 rounded-[2rem] blur-lg pointer-events-none"></div>

                            {/* Certificate Card */}
                            <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-amber-200/80 shadow-2xl shadow-amber-100/30 overflow-hidden">
                                {/* Top gold ribbon */}
                                <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"></div>


                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                                    <Shield className="w-80 h-80 text-amber-900" />
                                </div>

                                <div className="relative p-6 sm:p-10 md:p-12 lg:p-14">
                                    {/* Certificate Header */}
                                    <div className="text-center mb-8 sm:mb-10">
                                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-200 mb-5 shadow-lg shadow-amber-100/50">
                                            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                                        </div>
                                        <p className="text-amber-600/80 text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold mb-3">Nomor Induk Berusaha</p>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-[0.15em] mb-4" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                                            {d.nib}
                                        </h3>
                                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-full">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                            </span>
                                            <span className="text-emerald-700 font-bold text-sm tracking-wide">{d.status}</span>
                                        </div>
                                    </div>

                                    {/* Decorative divider */}
                                    <div className="flex items-center gap-4 mb-8 sm:mb-10">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
                                        <Star className="w-4 h-4 text-amber-300" />
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
                                    </div>

                                    {/* Detail Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
                                        {details.map((item, i) => (
                                            <div key={i} className="group text-center p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-amber-200 bg-gray-50/50 hover:bg-amber-50/50 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                                                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.bg} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} strokeWidth={1.8} />
                                                </div>
                                                <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold mb-1.5">{item.label}</p>
                                                <p className="text-gray-900 font-bold text-sm sm:text-base leading-snug">{item.value}</p>
                                                <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Badges Row */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                                        <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                <BadgeCheck className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-900 font-bold text-sm">{d.perizinan_text}</p>
                                                <p className="text-gray-500 text-xs">{d.perizinan_sub}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 rounded-2xl">
                                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                <Award className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <div>
                                                <p className="text-gray-900 font-bold text-sm">{d.skala_text}</p>
                                                <p className="text-gray-500 text-xs">{d.skala_sub}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="flex items-center gap-4 mb-8 sm:mb-10">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
                                        <Star className="w-4 h-4 text-amber-300" />
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>
                                    </div>

                                    {/* Bottom Info Sections */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
                                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <Globe className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-gray-900 font-bold text-sm mb-1.5">Wilayah Operasional</h4>
                                                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed text-justify">{d.wilayah_desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 border border-gray-100">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-gray-900 font-bold text-sm mb-1.5">Bidang Usaha (KBLI)</h4>
                                                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed text-justify">{d.kbli_desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer stamp */}
                                    <div className="text-center pt-6 border-t border-amber-100">
                                        <div className="inline-flex items-center gap-2 mb-3">
                                            <Fingerprint className="w-4 h-4 text-amber-400" />
                                            <span className="text-amber-600/70 text-xs font-semibold uppercase tracking-widest">Ditandatangani Secara Elektronik</span>
                                            <Fingerprint className="w-4 h-4 text-amber-400" />
                                        </div>
                                        <p className="text-gray-400 text-xs leading-relaxed max-w-lg mx-auto text-justify">
                                            {d.footer_text}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom gold ribbon */}
                                <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400"></div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Legalitas;

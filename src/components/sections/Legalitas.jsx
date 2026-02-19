'use client';

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, Building, MapPin, FileText, Calendar, Award, Globe, Verified } from 'lucide-react';
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

const NibSection = ({ d }) => (
    <>
        <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3">Nomor Induk Berusaha</p>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wider mb-3 sm:mb-4" style={{ fontFamily: 'monospace' }}>{d.nib}</h3>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl">
            <span className="relative flex h-3 w-3"><span className="status-pulse inline-flex rounded-full h-full w-full bg-emerald-400"></span></span>
            <span className="text-emerald-300 font-semibold text-lg">{d.status}</span>
        </div>
    </>
);

const InfoBadges = ({ d }) => (
    <>
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl flex-1">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div><p className="text-white font-medium text-sm">{d.perizinan_text}</p><p className="text-slate-400 text-xs">{d.perizinan_sub}</p></div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl flex-1">
            <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div><p className="text-white font-medium text-sm">{d.skala_text}</p><p className="text-slate-400 text-xs">{d.skala_sub}</p></div>
        </div>
    </>
);

const DetailCard = ({ delay, icon: Icon, iconColor, borderColor, title, value, sub }) => (
    <ScrollReveal delay={delay} className="h-full">
        <div className={`bg-slate-800/40 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:${borderColor} transition-colors duration-300 h-full`}>
            <div className={`w-14 h-14 bg-gradient-to-br ${iconColor} rounded-2xl flex items-center justify-center mb-5`}>
                <Icon className="w-7 h-7" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">{title}</h4>
            <p className="text-slate-300 font-medium">{value}</p>
            <p className="text-slate-500 text-sm mt-1">{sub}</p>
        </div>
    </ScrollReveal>
);

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

    const cards = [
        { delay: 0.4, icon: Building, iconColor: 'from-emerald-500/20 to-emerald-600/20', borderColor: 'border-emerald-500/30', title: 'Nama Usaha', value: d.nama_usaha, sub: d.nama_usaha_sub },
        { delay: 0.5, icon: Shield, iconColor: 'from-cyan-500/20 to-cyan-600/20', borderColor: 'border-cyan-500/30', title: 'Pemilik', value: d.pemilik, sub: d.pemilik_title },
        { delay: 0.6, icon: MapPin, iconColor: 'from-indigo-500/20 to-indigo-600/20', borderColor: 'border-indigo-500/30', title: 'Domisili', value: d.domisili, sub: d.domisili_sub },
        { delay: 0.7, icon: Calendar, iconColor: 'from-amber-500/20 to-amber-600/20', borderColor: 'border-amber-500/30', title: 'Tanggal Terbit', value: d.tanggal_terbit, sub: d.tanggal_terbit_sub },
    ];

    return (
        <section id="legalitas" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal width="100%">
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
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    <ScrollReveal delay={0.2} width="100%">
                        <div className="relative mb-8 sm:mb-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl sm:rounded-[2rem] blur-2xl opacity-50"></div>
                            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl">
                                {/* Mobile */}
                                <div className="flex flex-col lg:hidden items-center gap-5 sm:gap-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-40"></div>
                                        <div className="relative w-18 h-18 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
                                            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-center"><NibSection d={d} /></div>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md"><InfoBadges d={d} /></div>
                                </div>
                                {/* Desktop */}
                                <div className="hidden lg:flex items-center justify-center gap-12">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl blur-2xl opacity-40"></div>
                                        <div className="relative w-28 h-28 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl">
                                            <Shield className="w-14 h-14 text-white" />
                                        </div>
                                    </div>
                                    <div className="text-center flex-1"><NibSection d={d} /></div>
                                    <div className="space-y-4 flex-shrink-0 w-64"><InfoBadges d={d} /></div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {cards.map((c, i) => <DetailCard key={i} {...c} />)}
                    </div>

                    <div className="bg-slate-800/30 backdrop-blur rounded-2xl p-8 border border-slate-700/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0"><Globe className="w-6 h-6 text-cyan-400" /></div>
                                <div><h4 className="text-white font-semibold text-lg mb-2">Wilayah Operasional</h4><p className="text-slate-400 text-justify">{d.wilayah_desc}</p></div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0"><FileText className="w-6 h-6 text-emerald-400" /></div>
                                <div><h4 className="text-white font-semibold text-lg mb-2">Bidang Usaha (KBLI)</h4><p className="text-slate-400 text-justify">{d.kbli_desc}</p></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-10">{d.footer_text}</p>
                </div>
            </div>
        </section>
    );
};

export default Legalitas;

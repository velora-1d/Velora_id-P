'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import CountUp from '../animations/CountUp';
import { Users, Rocket, Shield, Lightbulb, Award, TrendingUp, Clock, Target } from 'lucide-react';

const fallbackAbout = {
    storyTitle: 'Sejarah Velora',
    paragraphs: [
        'Velora didirikan pada tahun 2023 dengan visi sederhana: menjembatani kesenjangan antara teknologi canggih dan kebutuhan bisnis praktis. Bermula dari sebuah tim kecil pengembang yang passionate, kami berkembang menjadi konsultan transformasi digital yang melayani berbagai industri.',
        'Nama "Velora" diambil dari kata "Velocity" (kecepatan) dan "Aurora" (cahaya baru), melambangkan komitmen kami untuk membawa percepatan dan perspektif baru bagi setiap klien kami. Kami percaya bahwa teknologi bukan hanya alat, tetapi katalis untuk perubahan positif.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=70',
    stats: [
        { value: 50, label: 'Proyek Selesai', suffix: '+' },
        { value: 98, label: 'Klien Puas', suffix: '%' }
    ]
};

const values = [
    { icon: Lightbulb, title: 'Inovasi', desc: 'Kami selalu mengadopsi teknologi terbaru untuk solusi terdepan.', color: 'amber' },
    { icon: Shield, title: 'Kepercayaan', desc: 'Transparansi & keamanan data adalah prioritas utama kami.', color: 'blue' },
    { icon: Rocket, title: 'Kecepatan', desc: 'Pengerjaan cepat tanpa mengorbankan kualitas hasil akhir.', color: 'emerald' },
    { icon: Users, title: 'Kolaborasi', desc: 'Kami bekerja bersama klien sebagai mitra, bukan vendor.', color: 'rose' },
];

const colorMap = {
    amber: { bg: 'bg-amber-50', icon: 'text-amber-500', border: 'border-amber-200', ring: 'ring-amber-100' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-200', ring: 'ring-blue-100' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-500', border: 'border-emerald-200', ring: 'ring-emerald-100' },
    rose: { bg: 'bg-rose-50', icon: 'text-rose-500', border: 'border-rose-200', ring: 'ring-rose-100' },
};

const statIcons = [Award, TrendingUp, Clock, Target];

const About = () => {
    const [aboutData, setAboutData] = useState(fallbackAbout);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('about_content')
                    .select('*')
                    .eq('published', true)
                    .order('sort_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    const storyTitle = data.find(d => d.section_key === 'story_title')?.title || fallbackAbout.storyTitle;
                    const paragraphs = data
                        .filter(d => d.section_key.startsWith('story_p'))
                        .map(d => d.content);
                    const imageUrl = data.find(d => d.section_key === 'image')?.image_url || fallbackAbout.imageUrl;
                    const stats = data
                        .filter(d => d.section_key.startsWith('stat_'))
                        .map(d => ({
                            value: parseInt(d.stat_value) || 0,
                            label: d.stat_label,
                            suffix: d.section_key === 'stat_satisfaction' ? '%' : '+'
                        }));

                    setAboutData({
                        storyTitle: storyTitle || fallbackAbout.storyTitle,
                        paragraphs: paragraphs.length > 0 ? paragraphs : fallbackAbout.paragraphs,
                        imageUrl: imageUrl || fallbackAbout.imageUrl,
                        stats: stats.length > 0 ? stats : fallbackAbout.stats
                    });
                }
            } catch { }
        };
        fetchAbout();
    }, []);

    return (
        <section id="tentang" className="py-20 sm:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-100/40 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
            {/* Subtle diamond mesh */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0L36 18L18 36L0 18Z' stroke='%23000' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '36px 36px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200/60 text-teal-700 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
                            <Users className="w-3.5 h-3.5" />
                            TENTANG KAMI
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                            Mengenal <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Velora</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Tim profesional yang berdedikasi membantu bisnis Anda tumbuh melalui inovasi digital dan solusi teknologi terdepan.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Story Section — Image + Text */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
                    {/* Image side with decorative frame */}
                    <ScrollReveal direction="right">
                        <div className="relative">
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-[3px] border-l-[3px] border-teal-400/50 rounded-tl-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-[3px] border-r-[3px] border-cyan-400/50 rounded-br-3xl pointer-events-none"></div>

                            {/* Main image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
                                <img
                                    src={aboutData.imageUrl}
                                    alt="Tim Velora"
                                    className="w-full h-[350px] sm:h-[450px] object-cover"
                                />
                                {/* Subtle overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                            </div>

                            {/* Floating stat card on image */}
                            <div className="absolute -bottom-6 right-4 sm:right-6 bg-white rounded-xl shadow-lg shadow-gray-200/80 border border-gray-100 p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <span className="block text-xl font-bold text-gray-900">
                                        <CountUp to={aboutData.stats[0]?.value || 50} />{aboutData.stats[0]?.suffix || '+'}
                                    </span>
                                    <span className="text-xs text-gray-500">{aboutData.stats[0]?.label || 'Proyek Selesai'}</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Text side */}
                    <ScrollReveal direction="left">
                        <div>
                            {/* Story title with accent line */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-full"></div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{aboutData.storyTitle}</h3>
                            </div>

                            {/* Paragraphs */}
                            <div className="space-y-4 mb-8">
                                {aboutData.paragraphs.map((p, i) => (
                                    <p key={i} className="text-gray-600 leading-relaxed text-[15px] sm:text-base">{p}</p>
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 gap-4">
                                {aboutData.stats.map((stat, i) => {
                                    const StatIcon = statIcons[i] || Award;
                                    return (
                                        <div key={i} className="group bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-teal-200/50 transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                                                    <StatIcon className="w-4 h-4 text-teal-600" />
                                                </div>
                                                <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                                    <CountUp to={stat.value} />{stat.suffix}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Values / Pillars Section — Overlapping Card UI */}
                <ScrollReveal width="100%">
                    <div className="relative mb-20 sm:mb-28">
                        {/* Section Header */}
                        <div className="text-center mb-10 sm:mb-12">
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Nilai Inti Kami</h3>
                            <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
                                Prinsip yang menjadi fondasi setiap solusi yang kami bangun.
                            </p>
                        </div>

                        {/* Banner Image */}
                        <div className="h-[250px] sm:h-[350px] rounded-3xl overflow-hidden relative shadow-lg shadow-gray-200/50 mb-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=70"
                                alt="Velora Values"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                            {/* Decorative text on image */}
                            <div className="absolute bottom-8 left-0 right-0 text-center text-white/20 font-bold text-[10vw] sm:text-[120px] leading-none tracking-tighter select-none pointer-events-none">
                                VELORA
                            </div>
                        </div>

                        {/* Overlapping Cards Grid */}
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 -mt-16 sm:-mt-24">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {values.map((v, i) => {
                                    const Icon = v.icon;
                                    const c = colorMap[v.color];
                                    return (
                                        <div
                                            key={i}
                                            className="group bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col items-center text-center sm:items-start sm:text-left"
                                        >
                                            <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ring-1 ${c.ring}`}>
                                                <Icon className={`w-5 h-5 ${c.icon}`} />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default About;

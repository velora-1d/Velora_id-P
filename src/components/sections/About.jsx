'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import CountUp from '../animations/CountUp';

const fallbackAbout = {
    storyTitle: 'Sejarah Velora',
    paragraphs: [
        'Velora didirikan pada tahun 2023 dengan visi sederhana: menjembatani kesenjangan antara teknologi canggih dan kebutuhan bisnis praktis. Bermula dari sebuah tim kecil pengembang yang passionate, kami berkembang menjadi konsultan transformasi digital yang melayani berbagai industri.',
        'Nama "Velora" diambil dari kata "Velocity" (kecepatan) dan "Aurora" (cahaya baru), melambangkan komitmen kami untuk membawa percepatan dan perspektif baru bagi setiap klien kami. Kami percaya bahwa teknologi bukan hanya alat, tetapi katalis untuk perubahan positif.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    stats: [
        { value: 50, label: 'Proyek Selesai', suffix: '+' },
        { value: 98, label: 'Klien Puas', suffix: '%' }
    ]
};

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
        <section id="tentang" className="py-16 sm:py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
                            TENTANG KAMI
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Tentang Velora</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Kami adalah tim profesional yang berdedikasi untuk membantu bisnis Anda tumbuh melalui inovasi digital.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <ScrollReveal direction="right">
                        <div>
                            <img
                                src={aboutData.imageUrl}
                                alt="Tim Velora"
                                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{aboutData.storyTitle}</h3>
                            {aboutData.paragraphs.map((p, i) => (
                                <p key={i} className="text-gray-600 mb-4 leading-relaxed text-justify">{p}</p>
                            ))}

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                {aboutData.stats.map((stat, i) => (
                                    <div key={i} className="bg-gray-50 p-4 rounded-xl text-center">
                                        <span className="block text-3xl font-bold text-primary mb-1">
                                            <CountUp to={stat.value} />{stat.suffix}
                                        </span>
                                        <span className="text-sm text-gray-500">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;

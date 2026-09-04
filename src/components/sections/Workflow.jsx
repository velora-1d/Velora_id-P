'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, FileSearch, Code2, Rocket, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = { MessageSquare, FileSearch, Code2, Rocket, Globe };

const fallbackSteps = [
    { 
        icon_name: 'MessageSquare', 
        title: 'Discovery & Briefing', 
        description: 'Diskusi intensif untuk membedah problem proses bisnis, arsitektur data, dan target solusi digital yang ingin dicapai.',
        phase: 'TAHAP 01',
        sla: '1-2 Hari'
    },
    { 
        icon_name: 'FileSearch', 
        title: 'Spesifikasi & Prototipe', 
        description: 'Penyusunan blueprint arsitektur sistem, wireframe alur pengguna, serta proposal biaya & timeline yang transparan.',
        phase: 'TAHAP 02',
        sla: '2-4 Hari'
    },
    { 
        icon_name: 'Code2', 
        title: 'Development & Integrasi', 
        description: 'Eksekusi coding dengan prinsip clean architecture, integrasi database, payment gateway, dan pengujian berkala.',
        phase: 'TAHAP 03',
        sla: 'Sprint 1-3 Minggu'
    },
    { 
        icon_name: 'Rocket', 
        title: 'Deploy, Pelatihan & Garansi', 
        description: 'Peluncuran live ke server VPS, serah terima data, panduan staf lembaga, serta pendampingan garansi bugfix.',
        phase: 'TAHAP 04',
        sla: 'Garansi Aktif'
    },
];

const Workflow = () => {
    const [steps, setSteps] = useState(fallbackSteps);

    useEffect(() => {
        const fetchSteps = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('workflow_steps')
                    .select('*')
                    .eq('published', true)
                    .order('sort_order', { ascending: true });

                if (!error && data && data.length > 0) {
                    setSteps(data.map((s, i) => ({
                        ...fallbackSteps[i],
                        ...s
                    })));
                }
            } catch { }
        };
        fetchSteps();
    }, []);

    return (
        <section id="workflow" className="py-24 sm:py-32 bg-white text-slate-900 relative border-t border-slate-200/80 overflow-hidden">
            <div className="absolute inset-0 studio-grid-pattern-light opacity-50 pointer-events-none"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.03]">
                <span className="text-[18vw] font-black text-slate-900 tracking-tighter leading-none select-none whitespace-nowrap">
                    WORKFLOW
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-16 sm:mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 uppercase tracking-widest mb-4 shadow-sm">
                            <Code2 className="w-3.5 h-3.5 text-blue-600" />
                            [PIPELINE_EKSEKUSI]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Alur Pengerjaan yang Terstruktur & Transparan
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Setiap fase pengerjaan memiliki indikator capaian yang jelas tanpa ada langkah tersembunyi.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Pipeline Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
                    {steps.map((step, index) => {
                        const IconComp = iconMap[step.icon_name] || Globe;
                        return (
                            <ScrollReveal key={index} delay={index * 0.1} className="h-full">
                                <div className="h-full rounded-2xl studio-card-light p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-200 group shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <IconComp className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono text-slate-400">
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <div className="text-[10px] font-mono text-blue-600 uppercase tracking-wider mb-1 font-semibold">
                                            {step.phase || `FASE 0${index + 1}`}
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-blue-600 transition-colors">
                                            {step.title}
                                        </h3>

                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 text-justify">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                                        <span className="flex items-center gap-1 text-emerald-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Terarah
                                        </span>
                                        <span className="text-slate-500">{step.sla || 'Estimasi Tepat'}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 sm:mt-16 text-center">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/20 transition-all group"
                    >
                        <MessageSquare className="w-4 h-4 text-blue-100" />
                        <span>Mulai Konsultasi Gratis</span>
                        <ArrowRight className="w-4 h-4 text-blue-100 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Workflow;

'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, FileSearch, Code2, Rocket, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const iconMap = { MessageSquare, FileSearch, Code2, Rocket, Globe };

const fallbackSteps = [
    { icon_name: 'MessageSquare', title: 'Konsultasi', description: 'Diskusi kebutuhan via WhatsApp. Kami dengarkan masalah Anda.', color_gradient: 'from-blue-500 to-blue-600' },
    { icon_name: 'FileSearch', title: 'Proposal', description: 'Solusi terbaik dengan timeline dan estimasi transparan.', color_gradient: 'from-accent to-accent-dark' },
    { icon_name: 'Code2', title: 'Development', description: 'Proses development dengan update real-time. Revisi unlimited.', color_gradient: 'from-indigo-500 to-indigo-600' },
    { icon_name: 'Rocket', title: 'Launch', description: 'Go live dengan garansi maintenance dan support berkelanjutan.', color_gradient: 'from-emerald-500 to-emerald-600' },
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
                    setSteps(data);
                }
            } catch { }
        };
        fetchSteps();
    }, []);

    return (
        <section id="workflow" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            {/* Subtle horizontal dotted lines */}
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60' stroke='%23000' stroke-width='0.3' stroke-dasharray='4 4' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold mb-4 tracking-wide">
                            CARA KERJA
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Proses yang Jelas & Transparan
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Dari diskusi hingga launch, kami pastikan Anda selalu terinformasi.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative max-w-5xl mx-auto">
                    <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-accent to-emerald-500 rounded-full"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6">
                        {steps.map((step, index) => {
                            const IconComp = iconMap[step.icon_name] || Globe;
                            return (
                                <ScrollReveal key={index} delay={index * 0.2} className="h-full">
                                    <div className="relative group text-center h-full">
                                        <div className="relative mx-auto mb-6">
                                            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.color_gradient || step.color} flex items-center justify-center shadow-xl mx-auto relative z-10`}>
                                                <IconComp className="w-12 h-12 text-white" strokeWidth={1.5} />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg shadow-lg z-20">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed px-2">{step.description}</p>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Mulai Konsultasi
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Workflow;

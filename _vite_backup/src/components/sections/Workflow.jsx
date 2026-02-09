import { MessageSquare, FileSearch, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: 'Konsultasi',
        description: 'Diskusi kebutuhan via WhatsApp. Kami dengarkan masalah Anda.',
        color: 'from-blue-500 to-blue-600'
    },
    {
        icon: FileSearch,
        title: 'Proposal',
        description: 'Solusi terbaik dengan timeline dan estimasi transparan.',
        color: 'from-purple-500 to-purple-600'
    },
    {
        icon: Code2,
        title: 'Development',
        description: 'Proses development dengan update real-time. Revisi unlimited.',
        color: 'from-pink-500 to-pink-600'
    },
    {
        icon: Rocket,
        title: 'Launch',
        description: 'Go live dengan garansi maintenance dan support berkelanjutan.',
        color: 'from-emerald-500 to-emerald-600'
    }
];

const Workflow = () => {
    return (
        <section id="workflow" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
                        CARA KERJA
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Proses yang Jelas & Transparan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Dari diskusi hingga launch, kami pastikan Anda selalu terinformasi.
                    </p>
                </div>

                {/* Horizontal Timeline - 4 Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group text-center">
                                {/* Step Number Circle */}
                                <div className="relative mx-auto mb-6">
                                    <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl mx-auto relative z-10`}>
                                        <step.icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                                    </div>
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-lg shadow-lg z-20">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed px-2">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
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

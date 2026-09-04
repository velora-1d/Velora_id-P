'use client';

import { useState, useEffect } from 'react';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2, Clock, MessageCircle, ArrowUpRight, Sparkles, Building2, User, Terminal } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';
import { createClient } from '@/lib/supabase/client';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const [contactData, setContactData] = useState({
        whatsapp: '6281320442174',
        email: 'velora20.id@gmail.com',
        address: 'Pasirjambu, Bandung',
        ctaTitle: 'Siap Memulai Proyek Digital?',
        ctaSubtitle: 'Konsultasi gratis — ceritakan kebutuhan sistem atau website Anda, dan kami siapkan solusi arsitektur terbaik.'
    });

    useEffect(() => {
        const fetchContactSettings = async () => {
            try {
                const supabase = createClient();
                const { data } = await supabase
                    .from('site_settings')
                    .select('*')
                    .eq('published', true);
                if (data) {
                    const wa = data.find(d => d.setting_key === 'contact_whatsapp')?.setting_value;
                    const mail = data.find(d => d.setting_key === 'contact_email')?.setting_value;
                    const addr = data.find(d => d.setting_key === 'contact_address')?.setting_value;
                    const title = data.find(d => d.setting_key === 'cta_title')?.setting_value;
                    const sub = data.find(d => d.setting_key === 'cta_subtitle')?.setting_value;

                    setContactData({
                        whatsapp: wa || '6281320442174',
                        email: mail || 'velora20.id@gmail.com',
                        address: addr || 'Pasirjambu, Bandung',
                        ctaTitle: title || 'Siap Memulai Proyek Digital?',
                        ctaSubtitle: sub || 'Konsultasi gratis — ceritakan kebutuhan sistem atau website Anda, dan kami siapkan solusi arsitektur terbaik.'
                    });
                }
            } catch {}
        };
        fetchContactSettings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.company,
                    message: formData.message,
                }),
            });
        } catch { }

        const waMessage = `Halo Velora Studio!%0A%0A*Data Pengirim:*%0ANama: ${formData.name}%0AEmail: ${formData.email}%0APerusahaan/Lembaga: ${formData.company}%0A%0A*Kebutuhan:*%0A${formData.message}`;
        window.open(`https://wa.me/${contactData.whatsapp}?text=${waMessage}`, '_blank');

        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    return (
        <section id="contact" className="py-24 sm:py-32 bg-[#070C18] text-white relative border-t border-slate-800/80 overflow-hidden">
            {/* Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[20vw] font-black tracking-tighter text-white/[0.03] leading-none whitespace-nowrap z-0">
                VELORA
            </div>

            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-14 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-mono text-blue-300 uppercase tracking-widest mb-4">
                            <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                            [HUBUNGI_STUDIO]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 whitespace-pre-line">
                            {contactData.ctaTitle}
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                            {contactData.ctaSubtitle}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Bento Grid Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                        {/* Form Card (Span 7) */}
                        <ScrollReveal delay={0.1} width="100%" className="lg:col-span-7">
                            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                                        <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                                            <Send className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white tracking-tight">Kirim Pesan & Konsultasi</h3>
                                            <p className="text-xs text-slate-400">Tanggapan instan via WhatsApp resmi Velora</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Nama Lengkap *</label>
                                                <div className="relative">
                                                    <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'name' ? 'text-blue-400' : 'text-slate-500'}`} />
                                                    <input
                                                        type="text" id="name" name="name"
                                                        value={formData.name} onChange={handleChange}
                                                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 outline-none transition-all text-sm"
                                                        placeholder="Mahin Utsman"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Email *</label>
                                                <div className="relative">
                                                    <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-blue-400' : 'text-slate-500'}`} />
                                                    <input
                                                        type="email" id="email" name="email"
                                                        value={formData.email} onChange={handleChange}
                                                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                                                        required
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 outline-none transition-all text-sm"
                                                        placeholder="nama@lembaga.sch.id"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Perusahaan / Nama Lembaga</label>
                                            <div className="relative">
                                                <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'company' ? 'text-blue-400' : 'text-slate-500'}`} />
                                                <input
                                                    type="text" id="company" name="company"
                                                    value={formData.company} onChange={handleChange}
                                                    onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 outline-none transition-all text-sm"
                                                    placeholder="Pesantren / Yayasan / UMKM"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Deskripsi Kebutuhan Sistem *</label>
                                            <textarea
                                                id="message" name="message"
                                                value={formData.message} onChange={handleChange}
                                                onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                                                required rows="4"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder:text-slate-600 focus:border-blue-500 focus:bg-slate-950 outline-none transition-all text-sm resize-none"
                                                placeholder="Saya butuh sistem informasi untuk mengelola SPP santri terintegrasi WA..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2.5 disabled:opacity-70 group"
                                        >
                                            {status === 'sending' ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                                            ) : (
                                                <><Send className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" /> <span>Kirim Pesan Langsung via WhatsApp</span></>
                                            )}
                                        </button>

                                        {status === 'success' && (
                                            <div className="p-3.5 bg-emerald-950/70 text-emerald-300 rounded-xl text-xs border border-emerald-800 font-mono flex items-center gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                                <span>Pesan telah disiapkan. Jendela WhatsApp otomatis terbuka.</span>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right Info Cards (Span 5) */}
                        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                            {/* WhatsApp Fast Card */}
                            <ScrollReveal delay={0.15} width="100%">
                                <a
                                    href={`https://wa.me/${contactData.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-800/60 p-6 text-white hover:border-emerald-500 transition-all shadow-xl"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                                            <WhatsAppIcon className="w-6 h-6" />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">WhatsApp Direct Hub</h4>
                                    <p className="text-emerald-400 font-mono text-sm">
                                        {contactData.whatsapp.startsWith('62') ? '0' + contactData.whatsapp.slice(2) : contactData.whatsapp}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2">Respon instan dalam hitungan menit untuk konsultasi teknis.</p>
                                </a>
                            </ScrollReveal>

                            {/* Email & Location 2-col mini bento */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5">
                                    <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 mb-3">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-sm text-white mb-1">Email Resmi</h4>
                                    <p className="text-slate-400 text-xs font-mono truncate">{contactData.email}</p>
                                </div>

                                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5">
                                    <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 mb-3">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-sm text-white mb-1">Lokasi Studio</h4>
                                    <p className="text-slate-400 text-xs">{contactData.address}</p>
                                </div>
                            </div>

                            {/* Operational Status Card */}
                            <div className="rounded-xl bg-slate-950 border border-slate-800/90 p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-xs text-white uppercase tracking-wider">Jam Operasional</h5>
                                        <p className="text-slate-400 text-xs">Setiap Hari — Layanan Standby 24/7</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[11px] font-mono rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

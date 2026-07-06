'use client';

import { useState, useEffect } from 'react';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2, Clock, MessageCircle, ArrowUpRight, Sparkles, Building2, User } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';
import { createClient } from '@/lib/supabase/client';

// WhatsApp icon
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
        ctaSubtitle: 'Konsultasi gratis — ceritakan ide Anda dan kami bantu wujudkan.'
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
                        ctaSubtitle: sub || 'Konsultasi gratis — ceritakan ide Anda dan kami bantu wujudkan.'
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

        const waMessage = `Halo Velora!%0A%0A*Data Pengirim:*%0ANama: ${formData.name}%0AEmail: ${formData.email}%0APerusahaan: ${formData.company}%0A%0A*Pesan:*%0A${formData.message}`;
        window.open(`https://wa.me/${contactData.whatsapp}?text=${waMessage}`, '_blank');

        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-14 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200/60 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                            <MessageCircle className="w-3.5 h-3.5" />
                            Hubungi Kami
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight whitespace-pre-line">
                            {contactData.ctaTitle}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
                            {contactData.ctaSubtitle}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Bento Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

                        {/* === FORM CARD (Large, spans 7 cols) === */}
                        <ScrollReveal delay={0.1} width="100%" className="lg:col-span-7">
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 h-full">
                                <div className="flex items-center gap-3 mb-7">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-200/50">
                                        <Send className="w-5 h-5 text-white" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Kirim Pesan</h3>
                                        <p className="text-xs text-gray-400">Kami akan merespon dalam 1x24 jam</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                        <div className="relative">
                                            <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nama Lengkap *</label>
                                            <div className="relative">
                                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focusedField === 'name' ? 'text-teal-500' : 'text-gray-300'}`} />
                                                <input
                                                    type="text" id="name" name="name"
                                                    value={formData.name} onChange={handleChange}
                                                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-teal-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                                            <div className="relative">
                                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focusedField === 'email' ? 'text-teal-500' : 'text-gray-300'}`} />
                                                <input
                                                    type="email" id="email" name="email"
                                                    value={formData.email} onChange={handleChange}
                                                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-teal-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Perusahaan / Lembaga</label>
                                        <div className="relative">
                                            <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focusedField === 'company' ? 'text-teal-500' : 'text-gray-300'}`} />
                                            <input
                                                type="text" id="company" name="company"
                                                value={formData.company} onChange={handleChange}
                                                onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-teal-400 outline-none transition-all text-sm placeholder:text-gray-300"
                                                placeholder="PT Teknologi Masa Depan"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ceritakan Kebutuhan Anda *</label>
                                        <textarea
                                            id="message" name="message"
                                            value={formData.message} onChange={handleChange}
                                            onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                                            required rows="4"
                                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-0 focus:border-teal-400 outline-none transition-all text-sm placeholder:text-gray-300 resize-none"
                                            placeholder="Saya butuh sistem untuk mengelola..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 group"
                                    >
                                        {status === 'sending' ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
                                        ) : (
                                            <><Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Kirim Pesan via WhatsApp</>
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm border border-emerald-200 font-medium flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            Pesan terkirim! Anda akan diarahkan ke WhatsApp.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </ScrollReveal>

                        {/* === RIGHT COLUMN: Info Cards (5 cols) === */}
                        <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">

                            {/* WhatsApp Card — Highlighted */}
                            {/* WhatsApp Card — Highlighted */}
                            <ScrollReveal delay={0.15} width="100%" className="col-span-2">
                                <a
                                    href={`https://wa.me/${contactData.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-emerald-200/40 hover:shadow-2xl hover:shadow-emerald-200/60 transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <WhatsAppIcon className="w-6 h-6" />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">Chat WhatsApp</h4>
                                    <p className="text-white/80 text-sm">
                                        {contactData.whatsapp.startsWith('62') ? '0' + contactData.whatsapp.slice(2) : contactData.whatsapp}
                                    </p>
                                    <p className="text-white/60 text-xs mt-1">Fast response — langsung terhubung</p>
                                </a>
                            </ScrollReveal>

                            {/* Email Card */}
                            <ScrollReveal delay={0.2} width="100%">
                                <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 h-full">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-200/40 group-hover:scale-110 transition-transform duration-500">
                                        <Mail className="w-5 h-5 text-white" strokeWidth={1.8} />
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed truncate">{contactData.email}</p>
                                </div>
                            </ScrollReveal>

                            {/* Location Card */}
                            <ScrollReveal delay={0.25} width="100%">
                                <div className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-500 hover:-translate-y-1 h-full">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-violet-200/40 group-hover:scale-110 transition-transform duration-500">
                                        <MapPin className="w-5 h-5 text-white" strokeWidth={1.8} />
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 mb-1">Lokasi</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{contactData.address}</p>
                                </div>
                            </ScrollReveal>

                            {/* Operating Hours Card */}
                            <ScrollReveal delay={0.3} width="100%" className="col-span-2">
                                <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white flex items-center gap-5 shadow-xl shadow-gray-900/10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-amber-400" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-0.5">Jam Operasional</h4>
                                        <p className="text-gray-400 text-xs">Setiap Hari, 24 Jam — Fast Response via WhatsApp</p>
                                    </div>
                                    <div className="ml-auto flex-shrink-0 hidden sm:block">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                            <span className="text-emerald-400 text-xs font-bold">Online</span>
                                        </span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

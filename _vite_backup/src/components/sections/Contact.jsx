import { useState } from 'react';
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const waMessage = `Halo Velora!%0A%0A*Data Pengirim:*%0ANama: ${formData.name}%0AEmail: ${formData.email}%0APerusahaan: ${formData.company}%0A%0A*Pesan:*%0A${formData.message}`;
        window.open(`https://wa.me/6281320442174?text=${waMessage}`, '_blank');

        setStatus('success');
    };

    return (
        <section id="contact" className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
                        HUBUNGI KAMI
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Siap Memulai Proyek?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Konsultasi gratis untuk diskusikan kebutuhan digital bisnis Anda.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left: Contact Info */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 lg:p-12 text-white relative overflow-hidden">
                                {/* Decoration */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                                    <p className="text-gray-400 mb-10 leading-relaxed">
                                        Kami siap membantu Anda. Hubungi kami melalui salah satu channel berikut.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold mb-1">Lokasi</p>
                                                <p className="text-gray-400 text-sm">Pasirjambu, Bandung<br />Remote-First Team, Melayani Seluruh Indonesia</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold mb-1">Email</p>
                                                <p className="text-gray-400 text-sm">velora20.id@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold mb-1">WhatsApp</p>
                                                <p className="text-gray-400 text-sm">0813-2044-2174</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-white/10">
                                        <p className="text-gray-500 text-sm">Jam Operasional</p>
                                        <p className="text-white font-medium">Setiap Hari, 24 Jam Fast Response</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="lg:col-span-3 p-10 lg:p-12">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Nama Perusahaan/Lembaga</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                            placeholder="PT Teknologi Masa Depan"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Ceritakan Kebutuhan Anda *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 resize-none"
                                            placeholder="Saya butuh sistem untuk..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Mengirim...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Kirim Pesan
                                            </>
                                        )}
                                    </button>

                                    {status === 'success' && (
                                        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm border border-emerald-200 font-medium flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Pesan terkirim! Anda akan diarahkan ke WhatsApp.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

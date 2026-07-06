'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Settings, Save, Loader2, Globe, ShieldCheck, Megaphone, PhoneCall, Info } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function SiteSettingsClient({ initialData }) {
    const [form, setForm] = useState({
        site_title: '',
        site_description: '',
        google_verification: '',
        google_analytics_id: '',
        hero_title: '',
        hero_subtitle: '',
        hero_image: '',
        cta_title: '',
        cta_subtitle: '',
        contact_whatsapp: '',
        contact_email: '',
        contact_address: '',
        
        hero_stat_projects_val: '',
        hero_stat_projects_lbl: '',
        hero_stat_satisfaction_val: '',
        hero_stat_satisfaction_lbl: '',
        hero_stat_support_val: '',
        hero_stat_support_lbl: '',
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const supabase = createClient();
    const router = useRouter();

    // Map initial Supabase settings rows into single form state
    useEffect(() => {
        if (initialData) {
            const mapped = {
                site_title: '',
                site_description: '',
                google_verification: '',
                google_analytics_id: '',
                hero_title: '',
                hero_subtitle: '',
                hero_image: '',
                cta_title: '',
                cta_subtitle: '',
                contact_whatsapp: '',
                contact_email: '',
                contact_address: '',
                
                hero_stat_projects_val: '',
                hero_stat_projects_lbl: '',
                hero_stat_satisfaction_val: '',
                hero_stat_satisfaction_lbl: '',
                hero_stat_support_val: '',
                hero_stat_support_lbl: '',
            };
            
            initialData.forEach(item => {
                if (item.setting_key === 'hero_stat_projects') {
                    mapped.hero_stat_projects_val = item.setting_value || '';
                    mapped.hero_stat_projects_lbl = item.setting_label || '';
                } else if (item.setting_key === 'hero_stat_satisfaction') {
                    mapped.hero_stat_satisfaction_val = item.setting_value || '';
                    mapped.hero_stat_satisfaction_lbl = item.setting_label || '';
                } else if (item.setting_key === 'hero_stat_support') {
                    mapped.hero_stat_support_val = item.setting_value || '';
                    mapped.hero_stat_support_lbl = item.setting_label || '';
                } else if (item.setting_key in mapped) {
                    mapped[item.setting_key] = item.setting_value || '';
                }
            });
            
            setForm(mapped);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        const settingsToSave = [
            { setting_key: 'site_title', setting_label: 'Judul Website (SEO)', setting_value: form.site_title, sort_order: 10 },
            { setting_key: 'site_description', setting_label: 'Deskripsi Website (SEO)', setting_value: form.site_description, sort_order: 11 },
            { setting_key: 'google_verification', setting_label: 'Google Search Console Verification Token', setting_value: form.google_verification, sort_order: 12 },
            { setting_key: 'google_analytics_id', setting_label: 'Google Analytics Measurement ID', setting_value: form.google_analytics_id, sort_order: 13 },
            { setting_key: 'hero_title', setting_label: 'Beranda - Judul Banner Utama (Hero Title)', setting_value: form.hero_title, sort_order: 1 },
            { setting_key: 'hero_subtitle', setting_label: 'Beranda - Subjudul Banner (Hero Subtitle)', setting_value: form.hero_subtitle, sort_order: 2 },
            { setting_key: 'hero_image', setting_label: 'Beranda - Gambar Latar Belakang (Hero Background Image)', setting_value: form.hero_image, sort_order: 3 },
            { setting_key: 'cta_title', setting_label: 'Beranda - Judul Banner CTA Hubungi Kami', setting_value: form.cta_title, sort_order: 20 },
            { setting_key: 'cta_subtitle', setting_label: 'Beranda - Subjudul Banner CTA Hubungi Kami', setting_value: form.cta_subtitle, sort_order: 21 },
            { setting_key: 'contact_whatsapp', setting_label: 'Kontak - Nomor WhatsApp', setting_value: form.contact_whatsapp, sort_order: 22 },
            { setting_key: 'contact_email', setting_label: 'Kontak - Alamat Email', setting_value: form.contact_email, sort_order: 23 },
            { setting_key: 'contact_address', setting_label: 'Kontak - Alamat / Lokasi Kantor', setting_value: form.contact_address, sort_order: 24 },
            
            // Stats
            { setting_key: 'hero_stat_projects', setting_label: form.hero_stat_projects_lbl || 'Proyek Selesai', setting_value: form.hero_stat_projects_val, setting_suffix: '+', sort_order: 14 },
            { setting_key: 'hero_stat_satisfaction', setting_label: form.hero_stat_satisfaction_lbl || 'Klien Puas', setting_value: form.hero_stat_satisfaction_val, setting_suffix: '%', sort_order: 15 },
            { setting_key: 'hero_stat_support', setting_label: form.hero_stat_support_lbl || 'Support', setting_value: form.hero_stat_support_val, setting_suffix: '/24', sort_order: 16 }
        ];

        // Match existing IDs to perform updates instead of inserting duplicates
        const upsertData = settingsToSave.map(s => {
            const existing = initialData.find(item => item.setting_key === s.setting_key);
            return {
                ...(existing ? { id: existing.id } : {}),
                ...s,
                published: true,
                updated_at: new Date().toISOString()
            };
        });

        const { error: upsertError } = await supabase
            .from('site_settings')
            .upsert(upsertData);

        if (upsertError) {
            setError('Gagal menyimpan pengaturan: ' + upsertError.message);
        } else {
            setSuccess(true);
            router.refresh();
            // Automatically hide success alert after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        }
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-400" />
                    Pengaturan Web (SEO & Analytics)
                </h3>
            </div>

            {success && (
                <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-sm font-medium">
                    Semua perubahan pengaturan berhasil disimpan!
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Pengaturan Umum & SEO */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Globe className="w-5 h-5 text-primary" />
                        <h4 className="text-base font-bold text-white">1. Identitas & SEO Website</h4>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Judul Website (Meta Title SEO)</label>
                            <input 
                                type="text"
                                value={form.site_title}
                                onChange={(e) => setForm({ ...form, site_title: e.target.value })}
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Contoh: Jasa Pembuatan Website Profesional | Velora ID"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Deskripsi Website (Meta Description SEO)</label>
                            <textarea 
                                value={form.site_description}
                                onChange={(e) => setForm({ ...form, site_description: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                                placeholder="Tulis ringkasan penjelasan website Anda untuk mesin pencari Google..."
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Integrasi Google */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <h4 className="text-base font-bold text-white">2. Integrasi Google & Analytics</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Google Search Console Verification Token</label>
                            <input 
                                type="text"
                                value={form.google_verification}
                                onChange={(e) => setForm({ ...form, google_verification: e.target.value })}
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Contoh: googlef059f7343365627a"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Google Analytics Measurement ID (G-XXXX)</label>
                            <input 
                                type="text"
                                value={form.google_analytics_id}
                                onChange={(e) => setForm({ ...form, google_analytics_id: e.target.value })}
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Contoh: G-1XJG5X3KZR"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Banner Utama Beranda (Hero) */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Info className="w-5 h-5 text-primary" />
                        <h4 className="text-base font-bold text-white">3. Banner Utama Beranda (Hero Banner)</h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Kolom Kiri (2/3 lebar) untuk Teks Banner */}
                        <div className="lg:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Judul Utama Banner (Mendukung Enter)</label>
                                <textarea 
                                    value={form.hero_title}
                                    onChange={(e) => setForm({ ...form, hero_title: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                                    placeholder="Contoh: Jasa Pembuatan Website&#10;& Sistem Digital"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Subjudul Banner</label>
                                <textarea 
                                    value={form.hero_subtitle}
                                    onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                                    placeholder="Tulis penjelasan singkat penawaran yang muncul di bawah judul utama..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Kolom Kanan (1/3 lebar) untuk Gambar Background */}
                        <div className="lg:col-span-1">
                            <ImageUpload 
                                label="Gambar Latar Belakang Banner"
                                value={form.hero_image}
                                onChange={(url) => setForm({ ...form, hero_image: url })}
                                folder="site"
                            />
                        </div>
                    </div>

                    {/* Statistik Banner Bawah */}
                    <div className="pt-4 border-t border-gray-800 space-y-4">
                        <label className="block text-sm font-semibold text-white">Data Statistik Banner Utama (Tampil di bagian bawah banner)</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Stat 1 */}
                            <div className="p-4 bg-gray-800/40 border border-gray-800 rounded-xl space-y-3">
                                <p className="text-xs text-primary font-semibold">Statistik 1 (Suffix: +)</p>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Angka / Nilai</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_projects_val}
                                        onChange={(e) => setForm({ ...form, hero_stat_projects_val: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: 50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Keterangan Label</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_projects_lbl}
                                        onChange={(e) => setForm({ ...form, hero_stat_projects_lbl: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: Proyek Selesai"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="p-4 bg-gray-800/40 border border-gray-800 rounded-xl space-y-3">
                                <p className="text-xs text-primary font-semibold">Statistik 2 (Suffix: %)</p>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Angka / Nilai</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_satisfaction_val}
                                        onChange={(e) => setForm({ ...form, hero_stat_satisfaction_val: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: 98"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Keterangan Label</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_satisfaction_lbl}
                                        onChange={(e) => setForm({ ...form, hero_stat_satisfaction_lbl: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: Klien Puas"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="p-4 bg-gray-800/40 border border-gray-800 rounded-xl space-y-3">
                                <p className="text-xs text-primary font-semibold">Statistik 3 (Suffix: /24)</p>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Angka / Nilai</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_support_val}
                                        onChange={(e) => setForm({ ...form, hero_stat_support_val: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: Support"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">Keterangan Label</label>
                                    <input 
                                        type="text"
                                        value={form.hero_stat_support_lbl}
                                        onChange={(e) => setForm({ ...form, hero_stat_support_lbl: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Contoh: CS Online 24/7"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Banner CTA & Hubungi Kami */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Megaphone className="w-5 h-5 text-primary" />
                        <h4 className="text-base font-bold text-white">4. Banner CTA & Kontak Hubungi Kami</h4>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Judul Banner CTA (Bawah Beranda)</label>
                                <input 
                                    type="text"
                                    value={form.cta_title}
                                    onChange={(e) => setForm({ ...form, cta_title: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Contoh: Siap Memulai Proyek Digital?"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Subjudul Banner CTA</label>
                                <textarea 
                                    value={form.cta_subtitle}
                                    onChange={(e) => setForm({ ...form, cta_subtitle: e.target.value })}
                                    rows={1}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                                    placeholder="Contoh: Hubungi kami untuk konsultasi gratis dan penawaran menarik..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 border-t border-gray-800/60 pt-4 pb-2">
                            <PhoneCall className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-white uppercase tracking-wider">Detail Informasi Hubungi Kami</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Nomor WhatsApp CS (Format: 628xxx)</label>
                                <input 
                                    type="text"
                                    value={form.contact_whatsapp}
                                    onChange={(e) => setForm({ ...form, contact_whatsapp: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Contoh: 6281320442174"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Alamat Email Kontak</label>
                                <input 
                                    type="email"
                                    value={form.contact_email}
                                    onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Contoh: hi@velora.id"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Alamat / Lokasi Kantor</label>
                                <input 
                                    type="text"
                                    value={form.contact_address}
                                    onChange={(e) => setForm({ ...form, contact_address: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Contoh: Pasirjambu, Bandung"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-4 border-t border-gray-800">
                    <button 
                        type="submit" 
                        disabled={saving} 
                        className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Menyimpan Semua Perubahan...' : 'Simpan Semua Perubahan'}
                    </button>
                </div>
            </form>
        </div>
    );
}

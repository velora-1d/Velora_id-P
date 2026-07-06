'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Save, Loader2, Settings } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const SETTING_KEYS = [
    { value: 'site_title', label: 'Judul Website (Meta Title SEO)', suffix: '', defaultLabel: 'Meta Title default untuk penelusuran Google' },
    { value: 'site_description', label: 'Deskripsi Website (Meta Description SEO)', suffix: '', defaultLabel: 'Meta Description default untuk penelusuran Google' },
    { value: 'google_verification', label: 'Google Search Console Verification Token', suffix: '', defaultLabel: 'Token verifikasi Google Search Console' },
    { value: 'google_analytics_id', label: 'Google Analytics Measurement ID', suffix: '', defaultLabel: 'ID Pengukuran Google Analytics (G-XXXXXX)' },
    { value: 'hero_title', label: 'Beranda - Judul Banner Utama (Hero Title)', suffix: '', defaultLabel: 'Jasa Pembuatan Website & Sistem Digital' },
    { value: 'hero_subtitle', label: 'Beranda - Subjudul Banner (Hero Subtitle)', suffix: '', defaultLabel: 'Website, Sistem, dan Solusi Digital yang cepat, modern, dan terintegrasi untuk bisnis & lembaga Anda.' },
    { value: 'hero_image', label: 'Beranda - Gambar Latar Belakang (Hero Background Image)', suffix: '', defaultLabel: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=70' },
    { value: 'cta_title', label: 'Beranda - Judul Banner CTA Hubungi Kami', suffix: '', defaultLabel: 'Siap Memulai Proyek Digital?' },
    { value: 'cta_subtitle', label: 'Beranda - Subjudul Banner CTA Hubungi Kami', suffix: '', defaultLabel: 'Konsultasi gratis — ceritakan ide Anda dan kami bantu wujudkan.' },
    { value: 'contact_whatsapp', label: 'Kontak - Nomor WhatsApp (Contoh: 6281320442174)', suffix: '', defaultLabel: '6281320442174' },
    { value: 'contact_email', label: 'Kontak - Alamat Email', suffix: '', defaultLabel: 'velora20.id@gmail.com' },
    { value: 'contact_address', label: 'Kontak - Alamat / Lokasi Kantor', suffix: '', defaultLabel: 'Pasirjambu, Bandung' },
    { value: 'hero_stat_projects', label: 'Statistik Hero - Jumlah Proyek Selesai', suffix: '+', defaultLabel: 'Proyek Selesai' },
    { value: 'hero_stat_satisfaction', label: 'Statistik Hero - Persentase Kepuasan Klien', suffix: '%', defaultLabel: 'Klien Puas' },
    { value: 'hero_stat_support', label: 'Statistik Hero - Layanan Support', suffix: '/24', defaultLabel: 'Support' }
];

export default function SiteSettingsClient({ initialData }) {
    const [items, setItems] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() { 
        return { 
            setting_key: '', 
            setting_value: '', 
            setting_label: '', 
            setting_suffix: '', 
            sort_order: 0 
        }; 
    }

    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus setting ini?')) return;
        const { error } = await supabase.from('site_settings').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: u, error } = await supabase.from('site_settings').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? u : i));
        } else {
            const { data: c, error } = await supabase.from('site_settings').insert(data).select().single();
            if (!error) setItems([...items, c]);
        }
        setSaving(false); closeForm(); router.refresh();
    };

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-lg space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Pengaturan' : 'Pengaturan Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Jenis Pengaturan</label>
                                <select
                                    value={form.setting_key}
                                    onChange={(e) => {
                                        const key = e.target.value;
                                        const match = SETTING_KEYS.find(k => k.value === key);
                                        setForm({
                                            ...form,
                                            setting_key: key,
                                            setting_label: match ? match.defaultLabel : form.setting_label,
                                            setting_suffix: match ? match.suffix : form.setting_suffix
                                        });
                                    }}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    disabled={editing !== null}
                                    required
                                >
                                    <option value="">Pilih pengaturan...</option>
                                    {SETTING_KEYS.map(k => (
                                        <option key={k.value} value={k.value}>{k.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Isi / Nilai Pengaturan (Value)</label>
                                {(form.setting_key.toLowerCase().includes('image') || form.setting_key.toLowerCase().includes('logo')) ? (
                                    <ImageUpload
                                        value={form.setting_value}
                                        onChange={(url) => setForm({ ...form, setting_value: url })}
                                        folder="site"
                                        label=""
                                        required={true}
                                    />
                                ) : (form.setting_key === 'site_description' || form.setting_key === 'hero_subtitle' || form.setting_key === 'cta_subtitle') ? (
                                    <textarea 
                                        value={form.setting_value} 
                                        onChange={(e) => setForm({ ...form, setting_value: e.target.value })} 
                                        rows={4} 
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" 
                                        required 
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        value={form.setting_value} 
                                        onChange={(e) => setForm({ ...form, setting_value: e.target.value })} 
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                        required 
                                    />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Label Keterangan (Contoh: Proyek Selesai)</label>
                                <input 
                                    type="text" 
                                    value={form.setting_label} 
                                    onChange={(e) => setForm({ ...form, setting_label: e.target.value })} 
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Simbol Akhiran (Suffix)</label>
                                    <input 
                                        type="text" 
                                        value={form.setting_suffix} 
                                        onChange={(e) => setForm({ ...form, setting_suffix: e.target.value })} 
                                        placeholder="Contoh: +, %, /24"
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Urutan</label>
                                    <input 
                                        type="number" 
                                        value={form.sort_order} 
                                        onChange={(e) => setForm({ ...form, sort_order: e.target.value })} 
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={saving || !form.setting_key} className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h3 className="text-white font-medium flex items-center gap-2"><Settings className="w-5 h-5 text-gray-400" /> Pengaturan Website ({items.length})</h3>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                    <Plus className="w-4 h-4" /> Pengaturan Baru
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Belum ada pengaturan</p>
                ) : items.map(item => {
                    const matched = SETTING_KEYS.find(k => k.value === item.setting_key);
                    const friendlyName = matched ? matched.label : item.setting_key;
                    return (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors flex flex-col justify-between">
                            <div>
                                <p className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-md inline-block">{friendlyName}</p>
                                <p className="text-2xl font-bold text-white mt-3 truncate">{item.setting_value}<span className="text-primary text-lg">{item.setting_suffix}</span></p>
                                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.setting_label}</p>
                            </div>
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-800/60">
                                <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1 transition-colors"><Edit className="w-3.5 h-3.5" /> Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

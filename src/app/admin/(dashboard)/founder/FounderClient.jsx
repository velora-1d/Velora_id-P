'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Save, Loader2, User, Plus, X, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function FounderClient({ initialData }) {
    const defaults = {
        name: '',
        title: '',
        photo_url: '',
        bio_paragraphs: [''],
        stats: [{ label: '', value: '' }],
        social_links: [{ type: '', href: '', label: '' }],
        published: true
    };

    // Map initialData: DB might have 'bio' (old) or 'bio_paragraphs'
    const mapInitialData = (data) => {
        if (!data) return defaults;
        return {
            ...data,
            bio_paragraphs: data.bio_paragraphs || data.bio || defaults.bio_paragraphs,
            social_links: (data.social_links || defaults.social_links).map(l => ({
                type: l.type || l.platform || '',
                href: l.href || l.url || '',
                label: l.label || l.type || l.platform || '',
            })),
        };
    };

    const [form, setForm] = useState(mapInitialData(initialData));
    const [saving, setSaving] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, bio, ...data } = form;

        // Ensure we save as 'bio_paragraphs' consistently
        const saveData = {
            ...data,
            bio_paragraphs: form.bio_paragraphs,
            // Also save as 'bio' for backward compatibility
            bio: form.bio_paragraphs,
        };

        if (id) {
            await supabase.from('founder').update({ ...saveData, updated_at: new Date().toISOString() }).eq('id', id);
        } else {
            const { data: c } = await supabase.from('founder').insert(saveData).select().single();
            if (c) setForm(mapInitialData(c));
        }
        setSaving(false); router.refresh();
    };

    // Array helpers
    const updateArr = (key, idx, val) => { const a = [...form[key]]; a[idx] = val; setForm({ ...form, [key]: a }); };
    const addArr = (key, def) => setForm({ ...form, [key]: [...form[key], def] });
    const removeArr = (key, idx) => { const a = [...form[key]]; a.splice(idx, 1); setForm({ ...form, [key]: a }); };
    const updateObj = (key, idx, field, val) => { const a = [...form[key]]; a[idx] = { ...a[idx], [field]: val }; setForm({ ...form, [key]: a }); };

    const inp = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

    const platformOptions = [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'github', label: 'GitHub' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'twitter', label: 'Twitter' },
    ];

    return (
        <div className="w-full space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Data Founder</h3>
                            <p className="text-xs text-gray-400">Kelola profil, foto, bio, statistik, dan media sosial founder</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-5 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Kolom Kiri: Foto & Status (lg:col-span-4) */}
                        <div className="lg:col-span-4 space-y-5">
                            <ImageUpload
                                label="Foto Founder"
                                value={form.photo_url}
                                onChange={(url) => setForm({ ...form, photo_url: url })}
                                folder="team"
                            />

                            <div className="bg-gray-800/60 border border-gray-700/60 p-4 rounded-xl space-y-3">
                                <label className="block text-sm font-medium text-gray-300">Status Publikasi</label>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">Tampilkan di website utama</span>
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, published: !form.published })}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${form.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                                    >
                                        {form.published ? <><Eye className="w-3.5 h-3.5" /> Aktif</> : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Nama, Jabatan, Bio, Stats, Social Links (lg:col-span-8) */}
                        <div className="lg:col-span-8 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1 font-medium">Nama Founder</label>
                                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1 font-medium">Jabatan</label>
                                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
                                </div>
                            </div>

                            {/* Bio paragraphs */}
                            <div className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-sm font-medium text-gray-300">Bio Paragraf</label>
                                        <p className="text-xs text-gray-400 mt-0.5">Setiap paragraf tampil sebagai blok terpisah pada landing page.</p>
                                    </div>
                                    <button type="button" onClick={() => addArr('bio_paragraphs', '')} className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer">
                                        <Plus className="w-3.5 h-3.5" /> Tambah Paragraf
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(form.bio_paragraphs || []).map((p, i) => (
                                        <div key={i} className="flex gap-2">
                                            <div className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400 mt-2 font-medium">{i + 1}</div>
                                            <textarea value={p} onChange={(e) => updateArr('bio_paragraphs', i, e.target.value)} rows={3} className={`${inp} flex-1 resize-none`} placeholder={`Tulis isi paragraf ${i + 1}...`} />
                                            {form.bio_paragraphs.length > 1 && (
                                                <button type="button" onClick={() => removeArr('bio_paragraphs', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl self-start mt-1 cursor-pointer">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">Statistik / Pencapaian</label>
                                    <button type="button" onClick={() => addArr('stats', { label: '', value: '' })} className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer">
                                        <Plus className="w-3.5 h-3.5" /> Tambah
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(form.stats || []).map((s, i) => (
                                        <div key={i} className="flex gap-2 bg-gray-900/60 p-2.5 rounded-xl border border-gray-800 items-center">
                                            <input type="text" placeholder="Nilai (50+)" value={s.value} onChange={(e) => updateObj('stats', i, 'value', e.target.value)} className={`${inp} w-28`} />
                                            <input type="text" placeholder="Label (Proyek Selesai)" value={s.label} onChange={(e) => updateObj('stats', i, 'label', e.target.value)} className={`${inp} flex-1`} />
                                            <button type="button" onClick={() => removeArr('stats', i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-xl space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-300">Tautan Media Sosial</label>
                                    <button type="button" onClick={() => addArr('social_links', { type: '', href: '', label: '' })} className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer">
                                        <Plus className="w-3.5 h-3.5" /> Tambah
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(form.social_links || []).map((s, i) => (
                                        <div key={i} className="flex gap-2 bg-gray-900/60 p-2.5 rounded-xl border border-gray-800 items-center">
                                            <select
                                                value={s.type}
                                                onChange={(e) => {
                                                    const selected = platformOptions.find(p => p.value === e.target.value);
                                                    updateObj('social_links', i, 'type', e.target.value);
                                                    if (selected) updateObj('social_links', i, 'label', selected.label);
                                                }}
                                                className={`${inp} w-32`}
                                            >
                                                <option value="">Platform</option>
                                                {platformOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                            </select>
                                            <input type="text" placeholder="URL Tautan" value={s.href} onChange={(e) => updateObj('social_links', i, 'href', e.target.value)} className={`${inp} flex-1`} />
                                            <button type="button" onClick={() => removeArr('social_links', i)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-3">
                                <button type="submit" disabled={saving} className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
                                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

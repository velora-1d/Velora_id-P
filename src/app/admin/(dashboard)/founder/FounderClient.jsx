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
        <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><User className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Data Founder</h3>
                        <p className="text-xs text-gray-500">Edit informasi founder website</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Title */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Nama</label>
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Jabatan</label>
                            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
                        </div>
                    </div>

                    {/* Photo */}
                    <ImageUpload
                        label="Foto Founder"
                        value={form.photo_url}
                        onChange={(url) => setForm({ ...form, photo_url: url })}
                        folder="team"
                    />

                    {/* Published Toggle */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-400">Published</label>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, published: !form.published })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${form.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                        >
                            {form.published ? <><Eye className="w-3 h-3" /> Aktif</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                        </button>
                    </div>

                    {/* Bio paragraphs */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-400">Bio (paragraf)</label>
                            <button type="button" onClick={() => addArr('bio_paragraphs', '')} className="text-xs text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Tambah Paragraf</button>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Setiap paragraf akan ditampilkan sebagai blok teks terpisah pada halaman website.</p>
                        {(form.bio_paragraphs || []).map((p, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <div className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500 mt-2">{i + 1}</div>
                                <textarea value={p} onChange={(e) => updateArr('bio_paragraphs', i, e.target.value)} rows={3} className={`${inp} flex-1 resize-none`} placeholder={`Paragraf ${i + 1}...`} />
                                {form.bio_paragraphs.length > 1 && <button type="button" onClick={() => removeArr('bio_paragraphs', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><X className="w-4 h-4" /></button>}
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-400">Stats</label>
                            <button type="button" onClick={() => addArr('stats', { label: '', value: '' })} className="text-xs text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Tambah</button>
                        </div>
                        {(form.stats || []).map((s, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input type="text" placeholder="Value (contoh: 50+)" value={s.value} onChange={(e) => updateObj('stats', i, 'value', e.target.value)} className={`${inp} w-28`} />
                                <input type="text" placeholder="Label (contoh: Proyek Selesai)" value={s.label} onChange={(e) => updateObj('stats', i, 'label', e.target.value)} className={`${inp} flex-1`} />
                                <button type="button" onClick={() => removeArr('stats', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-400">Social Links</label>
                            <button type="button" onClick={() => addArr('social_links', { type: '', href: '', label: '' })} className="text-xs text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Tambah</button>
                        </div>
                        {(form.social_links || []).map((s, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <select
                                    value={s.type}
                                    onChange={(e) => {
                                        const selected = platformOptions.find(p => p.value === e.target.value);
                                        updateObj('social_links', i, 'type', e.target.value);
                                        if (selected) updateObj('social_links', i, 'label', selected.label);
                                    }}
                                    className={`${inp} w-36`}
                                >
                                    <option value="">Pilih Platform</option>
                                    {platformOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                </select>
                                <input type="text" placeholder="URL" value={s.href} onChange={(e) => updateObj('social_links', i, 'href', e.target.value)} className={`${inp} flex-1`} />
                                <button type="button" onClick={() => removeArr('social_links', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={saving} className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-2">
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

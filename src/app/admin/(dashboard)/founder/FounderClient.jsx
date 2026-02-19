'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Save, Loader2, User, Plus, X } from 'lucide-react';

export default function FounderClient({ initialData }) {
    const defaults = { name: '', title: '', photo_url: '', bio: [''], stats: [{ label: '', value: '' }], social_links: [{ platform: '', url: '' }] };
    const [form, setForm] = useState(initialData || defaults);
    const [saving, setSaving] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        if (id) {
            await supabase.from('founder').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
        } else {
            const { data: c } = await supabase.from('founder').insert(data).select().single();
            if (c) setForm(c);
        }
        setSaving(false); router.refresh();
    };

    // Array helpers
    const updateArr = (key, idx, val) => { const a = [...form[key]]; a[idx] = val; setForm({ ...form, [key]: a }); };
    const addArr = (key, def) => setForm({ ...form, [key]: [...form[key], def] });
    const removeArr = (key, idx) => { const a = [...form[key]]; a.splice(idx, 1); setForm({ ...form, [key]: a }); };
    const updateObj = (key, idx, field, val) => { const a = [...form[key]]; a[idx] = { ...a[idx], [field]: val }; setForm({ ...form, [key]: a }); };

    const inp = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

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
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Photo URL</label>
                        <input type="text" value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} className={inp} />
                        {form.photo_url && <img src={form.photo_url} alt="Preview" className="w-20 h-20 rounded-xl object-cover mt-2" />}
                    </div>

                    {/* Bio paragraphs */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-400">Bio (paragraf)</label>
                            <button type="button" onClick={() => addArr('bio', '')} className="text-xs text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Tambah</button>
                        </div>
                        {(form.bio || []).map((p, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <textarea value={p} onChange={(e) => updateArr('bio', i, e.target.value)} rows={2} className={`${inp} flex-1 resize-none`} />
                                {form.bio.length > 1 && <button type="button" onClick={() => removeArr('bio', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><X className="w-4 h-4" /></button>}
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
                                <input type="text" placeholder="Label" value={s.label} onChange={(e) => updateObj('stats', i, 'label', e.target.value)} className={`${inp} flex-1`} />
                                <input type="text" placeholder="Value" value={s.value} onChange={(e) => updateObj('stats', i, 'value', e.target.value)} className={`${inp} w-24`} />
                                <button type="button" onClick={() => removeArr('stats', i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-400">Social Links</label>
                            <button type="button" onClick={() => addArr('social_links', { platform: '', url: '' })} className="text-xs text-primary flex items-center gap-1"><Plus className="w-3 h-3" /> Tambah</button>
                        </div>
                        {(form.social_links || []).map((s, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input type="text" placeholder="Platform" value={s.platform} onChange={(e) => updateObj('social_links', i, 'platform', e.target.value)} className={`${inp} w-32`} />
                                <input type="text" placeholder="URL" value={s.url} onChange={(e) => updateObj('social_links', i, 'url', e.target.value)} className={`${inp} flex-1`} />
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

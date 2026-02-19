'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Save, Loader2 } from 'lucide-react';

export default function AboutClient({ initialData }) {
    const [items, setItems] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() { return { section_key: '', title: '', content: '', image_url: '', stats_json: '[]' }; }

    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item, stats_json: JSON.stringify(item.stats_json || [], null, 2) }); setEditing(item.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus konten ini?')) return;
        const { error } = await supabase.from('about_content').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, stats_json, ...rest } = form;
        let parsedStats;
        try { parsedStats = JSON.parse(stats_json); } catch { parsedStats = []; }
        const data = { ...rest, stats_json: parsedStats };
        if (editing) {
            const { data: u, error } = await supabase.from('about_content').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? u : i));
        } else {
            const { data: c, error } = await supabase.from('about_content').insert(data).select().single();
            if (!error) setItems([...items, c]);
        }
        setSaving(false); closeForm(); router.refresh();
    };

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Konten' : 'Konten Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Section Key</label>
                                    <input type="text" value={form.section_key} onChange={(e) => setForm({ ...form, section_key: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Judul</label>
                                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                                <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Konten</label>
                                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Stats JSON (array of objects)</label>
                                <textarea value={form.stats_json} onChange={(e) => setForm({ ...form, stats_json: e.target.value })} rows={4} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder='[{"label":"Proyek","value":"50+"}]' />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">About Sections ({items.length})</h3>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                    <Plus className="w-4 h-4" /> Konten Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Belum ada konten about</p>
                ) : items.map(item => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono">{item.section_key}</span>
                        <p className="text-white font-medium mt-2">{item.title}</p>
                        <p className="text-sm text-gray-400 line-clamp-3 mt-1">{item.content}</p>
                        {item.image_url && <img src={item.image_url} alt="" className="w-full h-32 object-cover rounded-xl mt-3" />}
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => openEdit(item)} className="flex-1 py-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

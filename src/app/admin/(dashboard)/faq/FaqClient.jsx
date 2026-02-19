'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, Save, Loader2 } from 'lucide-react';

export default function FaqClient({ initialData }) {
    const [items, setItems] = useState(initialData);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() { return { question: '', answer: '', sort_order: 0, published: true }; }

    const filtered = items.filter(i => i.question.toLowerCase().includes(search.toLowerCase()));
    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const togglePublish = async (item) => {
        const { error } = await supabase.from('faqs').update({ published: !item.published }).eq('id', item.id);
        if (!error) setItems(items.map(i => i.id === item.id ? { ...i, published: !i.published } : i));
    };
    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus FAQ ini?')) return;
        const { error } = await supabase.from('faqs').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: u, error } = await supabase.from('faqs').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? u : i));
        } else {
            const { data: c, error } = await supabase.from('faqs').insert(data).select().single();
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
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit FAQ' : 'FAQ Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Pertanyaan</label>
                                <input type="text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Jawaban</label>
                                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Urutan</label>
                                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => setForm({ ...form, published: !form.published })} className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-gray-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.published ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-gray-300">{form.published ? 'Published' : 'Draft'}</span>
                                </div>
                                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {saving ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari FAQ..." className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> FAQ Baru
                </button>
            </div>

            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">{search ? 'Tidak ditemukan' : 'Belum ada FAQ'}</p>
                ) : filtered.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium">{item.question}</p>
                                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.answer}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ml-3 flex-shrink-0 ${item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                {item.published ? 'Live' : 'Draft'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-gray-500 flex-1">Urutan: {item.sort_order}</span>
                            <button onClick={() => openEdit(item)} className="py-1.5 px-3 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors flex items-center gap-1">
                                <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => togglePublish(item)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                                {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

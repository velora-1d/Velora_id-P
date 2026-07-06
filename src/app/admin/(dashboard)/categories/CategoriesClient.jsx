'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Edit, Eye, EyeOff, Loader2, Plus, Save, Search, Trash2, X } from 'lucide-react';
import IconPicker from '@/components/admin/IconPicker';

const types = ['blog', 'portfolio', 'services', 'faq', 'testimonial'];

function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function empty() {
    return { type: 'blog', name: '', slug: '', description: '', icon_name: 'Tag', sort_order: 0, published: true };
}

export default function CategoriesClient({ initialCategories }) {
    const [categories, setCategories] = useState(initialCategories);
    const [form, setForm] = useState(empty());
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const filtered = categories.filter((item) =>
        `${item.type} ${item.name} ${item.slug}`.toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const handleName = (name) => setForm({ ...form, name, slug: editing ? form.slug : slugify(name) });

    const togglePublish = async (item) => {
        const { error } = await supabase.from('categories').update({ published: !item.published }).eq('id', item.id);
        if (!error) setCategories(categories.map((cat) => cat.id === item.id ? { ...cat, published: !cat.published } : cat));
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus kategori ini?')) return;
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (!error) setCategories(categories.filter((cat) => cat.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        data.sort_order = parseInt(data.sort_order) || 0;

        if (editing) {
            const { data: updated, error } = await supabase.from('categories').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setCategories(categories.map((cat) => cat.id === editing ? updated : cat));
        } else {
            const { data: created, error } = await supabase.from('categories').insert(data).select().single();
            if (!error) setCategories([...categories, created]);
        }

        setSaving(false);
        closeForm();
        router.refresh();
    };

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Kategori' : 'Kategori Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Tipe</label>
                                    <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        {types.map((type) => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Nama</label>
                                    <input value={form.name} onChange={(e) => handleName(e.target.value)} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Slug</label>
                                    <input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                                </div>
                                <IconPicker value={form.icon_name} onChange={(icon_name) => setForm({ ...form, icon_name })} />
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Urutan</label>
                                    <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Deskripsi</label>
                                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="button" onClick={() => setForm({ ...form, published: !form.published })} className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-gray-700'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.published ? 'translate-x-6' : ''}`} />
                                </button>
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
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari kategori..." className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                    <Plus className="w-4 h-4" /> Kategori Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.type} / {item.slug}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                {item.published ? 'Live' : 'Draft'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{item.description || 'Tanpa deskripsi'}</p>
                        <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(item)} className="flex-1 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => togglePublish(item)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl">{item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

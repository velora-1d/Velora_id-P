'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Save, Loader2, Star as StarIcon } from 'lucide-react';

export default function TestimonialsClient({ initialTestimonials }) {
    const [items, setItems] = useState(initialTestimonials);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(getEmpty());
    const supabase = createClient();
    const router = useRouter();

    function getEmpty() {
        return { name: '', role: '', company: '', content: '', rating: 5, avatar_url: '', published: false };
    }

    const openNew = () => { setForm(getEmpty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };

    const togglePublish = async (item) => {
        const { error } = await supabase.from('testimonials').update({ published: !item.published }).eq('id', item.id);
        if (!error) setItems(items.map(i => i.id === item.id ? { ...i, published: !i.published } : i));
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus testimonial ini?')) return;
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { id, created_at, ...data } = form;

        if (editing) {
            const { data: updated, error } = await supabase.from('testimonials').update(data).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? updated : i));
        } else {
            const { data: created, error } = await supabase.from('testimonials').insert(data).select().single();
            if (!error) setItems([created, ...items]);
        }
        setSaving(false);
        setShowForm(false);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-lg space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Testimonial' : 'Testimonial Baru'}</h3>
                            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { key: 'name', label: 'Nama', required: true },
                                { key: 'role', label: 'Jabatan' },
                                { key: 'company', label: 'Perusahaan' },
                                { key: 'avatar_url', label: 'Avatar URL' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                    <input type="text" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={f.required} />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                                            className={`p-1 ${n <= form.rating ? 'text-amber-400' : 'text-gray-600'}`}
                                        >
                                            <StarIcon className="w-6 h-6 fill-current" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Konten</label>
                                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" required />
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
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">{items.length} testimonial</p>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Tambah Testimonial
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Belum ada testimonial</p>
                ) : items.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg flex-shrink-0">
                                {item.avatar_url ? <img src={item.avatar_url} alt={item.name} className="w-full h-full rounded-full object-cover" /> : item.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.role}{item.company ? ` • ${item.company}` : ''}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                {item.published ? 'Live' : 'Draft'}
                            </span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map(n => (
                                <StarIcon key={n} className={`w-3.5 h-3.5 ${n <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`} />
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-3 mb-4">{item.content}</p>
                        <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(item)} className="flex-1 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors flex items-center justify-center gap-1">
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

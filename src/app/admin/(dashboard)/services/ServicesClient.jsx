'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, Save, Loader2 } from 'lucide-react';
import IconPicker from '@/components/admin/IconPicker';
import ImageUpload from '@/components/admin/ImageUpload';
import GradientPicker from '@/components/admin/GradientPicker';

function csvToArray(value) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function ServicesClient({ initialData, categories = [] }) {
    const [items, setItems] = useState(initialData);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() {
        return { category_ref_id: '', category_id: '', category_name: '', category_description: '', category_gradient: 'from-blue-500 to-indigo-600', icon_name: 'Globe', title: '', description: '', image_url: '', background_image_url: '', tags: '', seo_title: '', seo_description: '', seo_keywords: '', sort_order: 0, published: true };
    }

    const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.category_name.toLowerCase().includes(search.toLowerCase()));
    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => {
        setForm({
            ...item,
            tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
            seo_keywords: Array.isArray(item.seo_keywords) ? item.seo_keywords.join(', ') : '',
        });
        setEditing(item.id);
        setShowForm(true);
    };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const togglePublish = async (item) => {
        const { error } = await supabase.from('services').update({ published: !item.published }).eq('id', item.id);
        if (!error) setItems(items.map(i => i.id === item.id ? { ...i, published: !i.published } : i));
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus service ini?')) return;
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        const selectedCategory = categories.find((category) => category.id === data.category_ref_id);
        data.category_ref_id = data.category_ref_id || null;
        data.category_id = selectedCategory?.slug || data.category_id;
        data.category_name = selectedCategory?.name || data.category_name;
        data.category_description = selectedCategory?.description || data.category_description;
        data.tags = csvToArray(data.tags || '');
        data.seo_keywords = csvToArray(data.seo_keywords || '');
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: updated, error } = await supabase.from('services').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? updated : i));
        } else {
            const { data: created, error } = await supabase.from('services').insert(data).select().single();
            if (!error) setItems([...items, created]);
        }
        setSaving(false);
        closeForm();
        router.refresh();
    };

    const fields = [
        { key: 'title', label: 'Judul Layanan', required: true },
        { key: 'category_gradient', label: 'Gradient CSS' },
        { key: 'sort_order', label: 'Urutan', type: 'number' },
    ];

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Service' : 'Service Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                                    <select
                                        value={form.category_ref_id || ''}
                                        onChange={(e) => {
                                            const selected = categories.find((category) => category.id === e.target.value);
                                            setForm({
                                                ...form,
                                                category_ref_id: e.target.value,
                                                category_id: selected?.slug || form.category_id,
                                                category_name: selected?.name || form.category_name,
                                                category_description: selected?.description || form.category_description,
                                            });
                                        }}
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option value="">Pilih kategori</option>
                                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                </div>
                                <IconPicker value={form.icon_name} onChange={(icon_name) => setForm({ ...form, icon_name })} />
                                {fields.map(f => (
                                    <div key={f.key}>
                                        {f.key === 'category_gradient' ? (
                                            <GradientPicker value={form.category_gradient} onChange={(category_gradient) => setForm({ ...form, category_gradient })} label="Gradient Warna Kategori" />
                                        ) : (
                                            <>
                                                <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                                <input type={f.type || 'text'} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={f.required} />
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Deskripsi</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Deskripsi Kategori</label>
                                <textarea value={form.category_description} onChange={(e) => setForm({ ...form, category_description: e.target.value })} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                            </div>
                            <ImageUpload label="Gambar Utama Layanan" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="services" />
                            <ImageUpload label="Gambar Latar Belakang" value={form.background_image_url} onChange={(url) => setForm({ ...form, background_image_url: url })} folder="services" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Tag Layanan (pisahkan dengan koma)</label>
                                    <input value={form.tags || ''} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Contoh: website, seo, company-profile" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Kata Kunci SEO (pisahkan dengan koma)</label>
                                    <input value={form.seo_keywords || ''} onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Contoh: jasa website, buat web bandung" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Judul Penelusuran SEO (SEO Title)</label>
                                <input value={form.seo_title || ''} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Deskripsi Penelusuran SEO (SEO Description)</label>
                                <textarea value={form.seo_description || ''} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
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
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari service..." className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Service Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">{search ? 'Tidak ditemukan' : 'Belum ada service'}</p>
                ) : filtered.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-white font-medium">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.category_name} • {item.icon_name}</p>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                {item.published ? 'Live' : 'Draft'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{item.description}</p>
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

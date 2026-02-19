'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Save, Loader2 } from 'lucide-react';

export default function WorkflowClient({ initialData }) {
    const [items, setItems] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() { return { icon_name: 'Globe', title: '', description: '', color_gradient: 'from-blue-500 to-blue-600', sort_order: 0, published: true }; }

    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const togglePublish = async (item) => {
        const { error } = await supabase.from('workflow_steps').update({ published: !item.published }).eq('id', item.id);
        if (!error) setItems(items.map(i => i.id === item.id ? { ...i, published: !i.published } : i));
    };
    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus step ini?')) return;
        const { error } = await supabase.from('workflow_steps').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: u, error } = await supabase.from('workflow_steps').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setItems(items.map(i => i.id === editing ? u : i));
        } else {
            const { data: c, error } = await supabase.from('workflow_steps').insert(data).select().single();
            if (!error) setItems([...items, c]);
        }
        setSaving(false); closeForm(); router.refresh();
    };

    const fields = [
        { key: 'title', label: 'Judul Step', required: true },
        { key: 'icon_name', label: 'Icon Name (Lucide)' },
        { key: 'color_gradient', label: 'Gradient CSS' },
        { key: 'sort_order', label: 'Urutan', type: 'number' },
    ];

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Step' : 'Step Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {fields.map(f => (
                                    <div key={f.key}>
                                        <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                        <input type={f.type || 'text'} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={f.required} />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Deskripsi</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
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

            <div className="flex items-center justify-between">
                <h3 className="text-white font-medium">Workflow Steps ({items.length})</h3>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Step Baru
                </button>
            </div>

            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">Belum ada workflow step</p>
                ) : items.map((item, idx) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">{idx + 1}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium">{item.title}</p>
                            <p className="text-sm text-gray-400 mt-0.5">{item.icon_name} • {item.description?.slice(0, 60)}...</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                            {item.published ? 'Live' : 'Draft'}
                        </span>
                        <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => togglePublish(item)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                            {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

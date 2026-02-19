'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Save, Loader2, Settings } from 'lucide-react';

export default function SiteSettingsClient({ initialData }) {
    const [items, setItems] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(empty());
    const supabase = createClient();
    const router = useRouter();

    function empty() { return { setting_key: '', setting_value: '', setting_label: '', setting_suffix: '', sort_order: 0 }; }

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
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Setting' : 'Setting Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { key: 'setting_key', label: 'Key (slug)', required: true },
                                { key: 'setting_label', label: 'Label (tampilan)' },
                                { key: 'setting_value', label: 'Value', required: true },
                                { key: 'setting_suffix', label: 'Suffix (e.g. +, %)' },
                                { key: 'sort_order', label: 'Urutan', type: 'number' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                    <input type={f.type || 'text'} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={f.required} />
                                </div>
                            ))}
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
                <h3 className="text-white font-medium flex items-center gap-2"><Settings className="w-5 h-5 text-gray-400" /> Site Settings ({items.length})</h3>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                    <Plus className="w-4 h-4" /> Setting Baru
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">Belum ada setting</p>
                ) : items.map(item => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors">
                        <p className="text-xs text-gray-500 font-mono">{item.setting_key}</p>
                        <p className="text-2xl font-bold text-white mt-1">{item.setting_value}<span className="text-primary text-lg">{item.setting_suffix}</span></p>
                        <p className="text-sm text-gray-400 mt-1">{item.setting_label}</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => openEdit(item)} className="flex-1 py-1.5 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, ArrowLeft, Save, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function PortfolioClient({ initialProjects }) {
    const [projects, setProjects] = useState(initialProjects);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(getEmptyForm());
    const supabase = createClient();
    const router = useRouter();

    function getEmptyForm() {
        return { title: '', category: '', client: '', description: '', challenge: '', solution: '', tech: '', image_url: '', icon: 'Globe', published: false };
    }

    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => { setForm(getEmptyForm()); setEditing(null); setShowForm(true); };
    const openEdit = (project) => { setForm({ ...project }); setEditing(project.id); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const togglePublish = async (project) => {
        const { error } = await supabase.from('portfolio_projects').update({ published: !project.published }).eq('id', project.id);
        if (!error) setProjects(projects.map(p => p.id === project.id ? { ...p, published: !p.published } : p));
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus proyek ini?')) return;
        setDeleting(id);
        const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
        if (!error) setProjects(projects.filter(p => p.id !== id));
        setDeleting(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { id, created_at, updated_at, ...data } = form;

        if (editing) {
            const { data: updated, error } = await supabase.from('portfolio_projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setProjects(projects.map(p => p.id === editing ? updated : p));
        } else {
            const { data: created, error } = await supabase.from('portfolio_projects').insert(data).select().single();
            if (!error) setProjects([created, ...projects]);
        }
        setSaving(false);
        closeForm();
        router.refresh();
    };

    return (
        <div className="space-y-6">
            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-2xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Proyek' : 'Proyek Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { key: 'title', label: 'Judul', required: true },
                                    { key: 'category', label: 'Kategori' },
                                    { key: 'client', label: 'Klien' },
                                    { key: 'icon', label: 'Icon (Emoji)' },
                                    { key: 'tech', label: 'Tech Stack' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                        <input type="text" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={f.required} />
                                    </div>
                                ))}
                            </div>
                            <ImageUpload
                                label="Project Image"
                                value={form.image_url}
                                onChange={(url) => setForm({ ...form, image_url: url })}
                                folder="portfolio"
                            />
                            {['description', 'challenge', 'solution'].map(key => (
                                <div key={key}>
                                    <label className="block text-sm text-gray-400 mb-1 capitalize">{key === 'description' ? 'Deskripsi' : key === 'challenge' ? 'Tantangan' : 'Solusi'}</label>
                                    <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                                </div>
                            ))}
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

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari proyek..." className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Proyek Baru
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-12">{search ? 'Tidak ditemukan' : 'Belum ada proyek'}</p>
                ) : filtered.map((project) => (
                    <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors">
                        {project.image_url && (
                            <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover" />
                        )}
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-white font-medium">{project.icon} {project.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{project.category} • {project.client}</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${project.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                    {project.published ? 'Live' : 'Draft'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{project.description}</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openEdit(project)} className="flex-1 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors flex items-center justify-center gap-1">
                                    <Edit className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button onClick={() => togglePublish(project)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
                                    {project.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <button onClick={() => handleDelete(project.id)} disabled={deleting === project.id} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

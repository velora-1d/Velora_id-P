'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, ArrowLeft, Save, Loader2, LayoutGrid, List, Layers, Globe } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import IconPicker from '@/components/admin/IconPicker';

function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function csvToArray(value) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function PortfolioClient({ initialProjects, categories = [] }) {
    const [projects, setProjects] = useState(initialProjects);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(getEmptyForm());
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    function getEmptyForm() {
        return { title: '', slug: '', category_id: '', category: '', client: '', description: '', challenge: '', solution: '', tech: '', image_url: '', background_image_url: '', icon_name: 'Globe', tags: '', seo_title: '', seo_description: '', seo_keywords: '', published: false };
    }

    // Auto-open edit modal if ?edit=[id] query param is present
    useEffect(() => {
        const editId = searchParams?.get('edit');
        if (editId && projects.length > 0) {
            const target = projects.find(p => p.id === editId);
            if (target) {
                openEdit(target);
            }
        }
    }, [searchParams, projects]);

    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => { setForm(getEmptyForm()); setEditing(null); setShowForm(true); };
    const openEdit = (project) => {
        setForm({
            ...project,
            icon_name: project.icon_name || project.icon || 'Globe',
            tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
            seo_keywords: Array.isArray(project.seo_keywords) ? project.seo_keywords.join(', ') : '',
        });
        setEditing(project.id);
        setShowForm(true);
    };
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
        const { id, created_at, updated_at, icon, ...data } = form;
        const selectedCategory = categories.find((category) => category.id === data.category_id);
        data.category = selectedCategory?.name || data.category;
        data.category_id = data.category_id || null;
        data.tags = csvToArray(data.tags || '');
        data.seo_keywords = csvToArray(data.seo_keywords || '');

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
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-4xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Proyek' : 'Proyek Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Kolom Kiri (2/3 lebar) untuk Teks & SEO */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { key: 'title', label: 'Judul', required: true },
                                            { key: 'slug', label: 'Slug', required: true },
                                            { key: 'client', label: 'Klien' },
                                            { key: 'tech', label: 'Tech Stack' },
                                        ].map(f => (
                                            <div key={f.key}>
                                                <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                                <input
                                                    type="text"
                                                    value={form[f.key]}
                                                    onChange={(e) => setForm({
                                                        ...form,
                                                        [f.key]: f.key === 'slug' ? slugify(e.target.value) : e.target.value,
                                                        slug: f.key === 'title' && !editing ? slugify(e.target.value) : form.slug,
                                                    })}
                                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                    required={f.required}
                                                />
                                            </div>
                                        ))}
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Kategori</label>
                                            <select
                                                value={form.category_id || ''}
                                                onChange={(e) => {
                                                    const selected = categories.find((category) => category.id === e.target.value);
                                                    setForm({ ...form, category_id: e.target.value, category: selected?.name || form.category });
                                                }}
                                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="">Pilih kategori</option>
                                                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                            </select>
                                        </div>
                                        <IconPicker value={form.icon_name} onChange={(icon_name) => setForm({ ...form, icon_name })} />
                                    </div>
                                    
                                    {['description', 'challenge', 'solution'].map(key => (
                                        <div key={key}>
                                            <label className="block text-sm text-gray-400 mb-1 capitalize">{key === 'description' ? 'Deskripsi' : key === 'challenge' ? 'Tantangan' : 'Solusi'}</label>
                                            <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                                        </div>
                                    ))}
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Tags</label>
                                            <input value={form.tags || ''} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="web, dashboard" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">SEO Keywords</label>
                                            <input value={form.seo_keywords || ''} onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="keyword 1, keyword 2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">SEO Title</label>
                                        <input value={form.seo_title || ''} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">SEO Description</label>
                                        <textarea value={form.seo_description || ''} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                                    </div>
                                </div>

                                {/* Kolom Kanan (1/3 lebar) untuk Gambar */}
                                <div className="lg:col-span-1 space-y-4">
                                    <ImageUpload
                                        label="Project Image"
                                        value={form.image_url}
                                        onChange={(url) => setForm({ ...form, image_url: url })}
                                        folder="portfolio"
                                    />
                                    <ImageUpload
                                        label="Background Image"
                                        value={form.background_image_url}
                                        onChange={(url) => setForm({ ...form, background_image_url: url })}
                                        folder="portfolio"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-800">
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

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul, kategori, atau klien..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* View Mode Toggle */}
                    <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1">
                        <button
                            type="button"
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                                viewMode === 'grid'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                            title="Tampilan Grid (Foto)"
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Grid</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                                viewMode === 'table'
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                            title="Tampilan Tabel"
                        >
                            <List className="w-4 h-4" />
                            <span className="hidden sm:inline">Tabel</span>
                        </button>
                    </div>

                    <button
                        onClick={openNew}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Proyek Baru
                    </button>
                </div>
            </div>

            {/* Content Display */}
            {filtered.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
                    <Layers className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-base font-medium text-gray-400">
                        {search ? 'Tidak ada proyek yang cocok dengan pencarian' : 'Belum ada proyek portofolio'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        {search ? 'Coba gunakan kata kunci pencarian yang lain' : 'Klik tombol "Proyek Baru" untuk menambahkan portofolio baru'}
                    </p>
                </div>
            ) : viewMode === 'grid' ? (
                /* 1. GRID VIEW (WITH IMAGES) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-200 flex flex-col justify-between"
                        >
                            {/* Card Top: Image & Badges */}
                            <div>
                                <div className="relative w-full h-48 bg-gray-950 overflow-hidden">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                                            <Layers className="w-10 h-10 mb-1 opacity-40" />
                                            <span className="text-xs">Tidak ada mockup</span>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-gray-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg border border-white/10 shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Status Toggle Badge */}
                                    <div className="absolute top-3 right-3">
                                        <button
                                            type="button"
                                            onClick={() => togglePublish(project)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer ${
                                                project.published
                                                    ? 'bg-emerald-500/90 text-white hover:bg-emerald-600'
                                                    : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700'
                                            }`}
                                            title="Klik untuk ubah status publish"
                                        >
                                            {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {project.published ? 'Live' : 'Draft'}
                                        </button>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <Link
                                        href={`/admin/portfolio/detail/${project.id}`}
                                        className="text-white font-bold text-base hover:text-primary transition-colors line-clamp-1 mb-1 block"
                                    >
                                        {project.title}
                                    </Link>
                                    <p className="text-xs text-primary font-medium mb-2">
                                        {project.client ? `Klien: ${project.client}` : project.category}
                                    </p>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                        {project.description || 'Belum ada deskripsi proyek.'}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="px-5 pb-5 pt-0">
                                <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                                    {/* Detail Button */}
                                    <Link
                                        href={`/admin/portfolio/detail/${project.id}`}
                                        className="flex-1 py-2 px-3 text-xs font-semibold text-gray-200 hover:text-white bg-gray-800 hover:bg-gray-750 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-gray-700/60"
                                    >
                                        <Eye className="w-3.5 h-3.5 text-primary" />
                                        Detail
                                    </Link>

                                    {/* Edit Button */}
                                    <button
                                        type="button"
                                        onClick={() => openEdit(project)}
                                        className="py-2 px-3 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-750 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-gray-700/60 cursor-pointer"
                                        title="Edit Proyek"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(project.id)}
                                        disabled={deleting === project.id}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20 cursor-pointer disabled:opacity-50"
                                        title="Hapus Proyek"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* 2. TABLE VIEW */
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Proyek</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium hidden md:table-cell">Kategori</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium hidden sm:table-cell">Status</th>
                                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((project) => (
                                    <tr key={project.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {project.image_url ? (
                                                    <img
                                                        src={project.image_url}
                                                        alt={project.title}
                                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-800"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0">
                                                        <Layers className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/admin/portfolio/detail/${project.id}`}
                                                        className="text-white font-medium hover:text-primary transition-colors block truncate max-w-[280px]"
                                                    >
                                                        {project.title}
                                                    </Link>
                                                    <p className="text-gray-500 text-xs mt-0.5">{project.client ? `Klien: ${project.client}` : project.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-gray-400">{project.category}</span>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <button
                                                type="button"
                                                onClick={() => togglePublish(project)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                                    project.published
                                                        ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                                                }`}
                                            >
                                                {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                {project.published ? 'Live' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/portfolio/detail/${project.id}`}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => openEdit(project)}
                                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                                                    title="Edit Proyek"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(project.id)}
                                                    disabled={deleting === project.id}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                                    title="Hapus Proyek"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

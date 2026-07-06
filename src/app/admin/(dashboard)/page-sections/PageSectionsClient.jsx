'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Edit, Eye, EyeOff, Loader2, Plus, Save, Search, Trash2, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import IconPicker from '@/components/admin/IconPicker';

function csvToArray(value) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function empty() {
    return {
        page_key: 'home',
        section_key: '',
        label: '',
        title: '',
        subtitle: '',
        content: '',
        tag: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        image_url: '',
        background_image_url: '',
        icon_name: 'LayoutDashboard',
        sort_order: 0,
        published: true,
    };
}

export default function PageSectionsClient({ initialSections }) {
    const [sections, setSections] = useState(initialSections);
    const [form, setForm] = useState(empty());
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const filtered = sections.filter((section) =>
        `${section.page_key} ${section.section_key} ${section.title} ${section.label}`.toLowerCase().includes(search.toLowerCase())
    );

    const openNew = () => { setForm(empty()); setEditing(null); setShowForm(true); };
    const openEdit = (section) => {
        setForm({
            ...section,
            seo_keywords: Array.isArray(section.seo_keywords) ? section.seo_keywords.join(', ') : '',
        });
        setEditing(section.id);
        setShowForm(true);
    };
    const closeForm = () => { setShowForm(false); setEditing(null); };

    const togglePublish = async (section) => {
        const { error } = await supabase.from('page_sections').update({ published: !section.published }).eq('id', section.id);
        if (!error) setSections(sections.map((item) => item.id === section.id ? { ...item, published: !item.published } : item));
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus section ini?')) return;
        const { error } = await supabase.from('page_sections').delete().eq('id', id);
        if (!error) setSections(sections.filter((section) => section.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        data.sort_order = parseInt(data.sort_order) || 0;
        data.seo_keywords = csvToArray(data.seo_keywords || '');

        if (editing) {
            const { data: updated, error } = await supabase.from('page_sections').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setSections(sections.map((section) => section.id === editing ? updated : section));
        } else {
            const { data: created, error } = await supabase.from('page_sections').insert(data).select().single();
            if (!error) setSections([...sections, created]);
        }

        setSaving(false);
        closeForm();
        router.refresh();
    };

    const input = (key, label, required = false) => (
        <div>
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            <input
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                required={required}
            />
        </div>
    );
    const pageNames = { home: 'Halaman Utama', about: 'Tentang Kami', contact: 'Kontak' };
    const sectionNames = {
        hero: 'Bagian Hero',
        about: 'Bagian Tentang',
        services: 'Bagian Layanan',
        portfolio: 'Bagian Portofolio',
        workflow: 'Bagian Cara Kerja',
        testimonials: 'Bagian Testimoni',
        contact: 'Bagian Kontak',
        footer: 'Bagian Footer'
    };

    return (
        <div className="space-y-6">
            {showForm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-3xl space-y-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">{editing ? 'Edit Section' : 'Section Baru'}</h3>
                            <button onClick={closeForm} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Pilih Halaman (Page)</label>
                                    <select
                                        value={form.page_key}
                                        onChange={(e) => setForm({ ...form, page_key: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        required
                                    >
                                        <option value="home">Halaman Utama (Home)</option>
                                        <option value="about">Halaman Tentang (About)</option>
                                        <option value="contact">Halaman Kontak (Contact)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Pilih Bagian (Section)</label>
                                    <select
                                        value={form.section_key}
                                        onChange={(e) => setForm({ ...form, section_key: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        required
                                    >
                                        <option value="">Pilih bagian...</option>
                                        <option value="hero">Bagian Hero</option>
                                        <option value="about">Bagian Tentang Kami (About)</option>
                                        <option value="services">Bagian Layanan (Services)</option>
                                        <option value="portfolio">Bagian Portofolio</option>
                                        <option value="workflow">Bagian Cara Kerja (Workflow)</option>
                                        <option value="testimonials">Bagian Testimoni</option>
                                        <option value="contact">Bagian Kontak</option>
                                        <option value="footer">Bagian Footer</option>
                                    </select>
                                </div>
                                {input('label', 'Label (Keterangan Singkat)')}
                                {input('tag', 'Tag (Kategori)')}
                                {input('title', 'Judul Utama')}
                                {input('subtitle', 'Subjudul')}
                                <IconPicker value={form.icon_name} onChange={(icon_name) => setForm({ ...form, icon_name })} />
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Urutan Tampilan</label>
                                    <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Konten / Isi Bagian</label>
                                <textarea value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ImageUpload label="Gambar Utama" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} folder="site" />
                                <ImageUpload label="Gambar Latar Belakang" value={form.background_image_url} onChange={(url) => setForm({ ...form, background_image_url: url })} folder="site" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {input('seo_title', 'SEO Title (Judul Penelusuran)')}
                                {input('seo_keywords', 'SEO Keywords (Kata Kunci - Pisahkan dengan koma)')}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">SEO Description (Deskripsi Penelusuran)</label>
                                <textarea value={form.seo_description || ''} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
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
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari section..." className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                    <Plus className="w-4 h-4" /> Section Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((section) => (
                    <div key={section.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="text-white font-medium">{section.title || sectionNames[section.section_key] || section.section_key}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{pageNames[section.page_key] || section.page_key} / {sectionNames[section.section_key] || section.section_key}</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${section.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                    {section.published ? 'Live' : 'Draft'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{section.subtitle || section.content || 'Tanpa konten'}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                            <button onClick={() => openEdit(section)} className="flex-1 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => togglePublish(section)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl">{section.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                            <button onClick={() => handleDelete(section.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

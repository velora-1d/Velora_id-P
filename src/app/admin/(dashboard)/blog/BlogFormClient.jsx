'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

function csvToArray(value) {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function BlogFormClient({ post = null, categories = [] }) {
    const isEdit = !!post;
    const [form, setForm] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        excerpt: post?.excerpt || '',
        image_url: post?.image_url || '',
        background_image_url: post?.background_image_url || '',
        category_id: post?.category_id || '',
        category: post?.category || 'Technology',
        author: post?.author || 'Tim Velora',
        read_time: post?.read_time || '5 menit',
        tags: Array.isArray(post?.tags) ? post.tags.join(', ') : '',
        seo_title: post?.seo_title || '',
        seo_description: post?.seo_description || '',
        seo_keywords: Array.isArray(post?.seo_keywords) ? post.seo_keywords.join(', ') : '',
        published: post?.published || false,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const supabase = createClient();
    const router = useRouter();

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (value) => {
        setForm({
            ...form,
            title: value,
            slug: isEdit ? form.slug : generateSlug(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const selectedCategory = categories.find((category) => category.id === form.category_id);
        const payload = {
            ...form,
            category: selectedCategory?.name || form.category,
            category_id: form.category_id || null,
            tags: csvToArray(form.tags),
            seo_keywords: csvToArray(form.seo_keywords),
        };

        if (isEdit) {
            const { error } = await supabase
                .from('blog_posts')
                .update({ ...payload, updated_at: new Date().toISOString() })
                .eq('id', post.id);
            if (error) {
                setError(error.message);
                setSaving(false);
                return;
            }
        } else {
            const { error } = await supabase.from('blog_posts').insert(payload);
            if (error) {
                setError(error.message.includes('duplicate') ? 'Slug sudah digunakan' : error.message);
                setSaving(false);
                return;
            }
        }

        router.push('/admin/blog');
        router.refresh();
    };

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/blog" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-bold text-white">{isEdit ? 'Edit Artikel' : 'Artikel Baru'}</h1>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Judul artikel..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
                                    placeholder="judul-artikel"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt (Ringkasan)</label>
                                <textarea
                                    value={form.excerpt}
                                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                    placeholder="Ringkasan singkat artikel..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Konten (Markdown)</label>
                                <textarea
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    rows={15}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y font-mono text-sm leading-relaxed"
                                    placeholder="Tulis konten artikel di sini (support Markdown)..."
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                                <select
                                    value={form.category_id}
                                    onChange={(e) => {
                                        const selected = categories.find((category) => category.id === e.target.value);
                                        setForm({ ...form, category_id: e.target.value, category: selected?.name || form.category });
                                    }}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="">Pilih kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Penulis</label>
                                <input
                                    type="text"
                                    value={form.author}
                                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Waktu Baca</label>
                                <input
                                    type="text"
                                    value={form.read_time}
                                    onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="5 menit"
                                />
                            </div>

                            <ImageUpload
                                label="Cover Image"
                                value={form.image_url}
                                onChange={(url) => setForm({ ...form, image_url: url })}
                                folder="blog"
                            />

                            <ImageUpload
                                label="Background Image"
                                value={form.background_image_url}
                                onChange={(url) => setForm({ ...form, background_image_url: url })}
                                folder="blog"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="website, umkm, seo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    value={form.seo_title}
                                    onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">SEO Description</label>
                                <textarea
                                    value={form.seo_description}
                                    onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">SEO Keywords</label>
                                <input
                                    type="text"
                                    value={form.seo_keywords}
                                    onChange={(e) => setForm({ ...form, seo_keywords: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="keyword 1, keyword 2"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, published: !form.published })}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-primary' : 'bg-gray-700'}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.published ? 'translate-x-6' : ''}`} />
                                </button>
                                <span className="text-sm text-gray-300">{form.published ? 'Published' : 'Draft'}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Menyimpan...' : (isEdit ? 'Update Artikel' : 'Simpan Artikel')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Search,
    LayoutGrid,
    List,
    FileText,
    Calendar,
    User,
    ArrowUpRight
} from 'lucide-react';

export default function BlogListClient({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // Default to grid view with images
    const [deleting, setDeleting] = useState(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatDate = (dateStr) => {
        if (!mounted || !dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const togglePublish = async (post) => {
        const nextStatus = !post.published;
        const { error } = await supabase
            .from('blog_posts')
            .update({ published: nextStatus })
            .eq('id', post.id);
        if (!error) {
            setPosts(posts.map(p => p.id === post.id ? { ...p, published: nextStatus } : p));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) return;
        setDeleting(id);
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (!error) {
            setPosts(posts.filter(p => p.id !== id));
        }
        setDeleting(null);
    };

    return (
        <div className="w-full space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul atau kategori artikel..."
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

                    <Link
                        href="/admin/blog/new"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" />
                        Artikel Baru
                    </Link>
                </div>
            </div>

            {/* Content Display */}
            {filtered.length === 0 ? (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-base font-medium text-gray-400">
                        {search ? 'Tidak ada artikel yang cocok dengan pencarian' : 'Belum ada artikel'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        {search ? 'Coba gunakan kata kunci pencarian yang lain' : 'Klik tombol "Artikel Baru" untuk membuat artikel pertama Anda'}
                    </p>
                </div>
            ) : viewMode === 'grid' ? (
                /* 1. GRID VIEW (WITH IMAGES) */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((post) => (
                        <div
                            key={post.id}
                            className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-200 flex flex-col justify-between"
                        >
                            {/* Card Top: Image & Badges */}
                            <div>
                                <div className="relative w-full h-48 bg-gray-950 overflow-hidden">
                                    {post.image_url ? (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                                            <FileText className="w-10 h-10 mb-1 opacity-40" />
                                            <span className="text-xs">Tidak ada foto</span>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-gray-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg border border-white/10 shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Status Toggle Badge */}
                                    <div className="absolute top-3 right-3">
                                        <button
                                            type="button"
                                            onClick={() => togglePublish(post)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer ${
                                                post.published
                                                    ? 'bg-emerald-500/90 text-white hover:bg-emerald-600'
                                                    : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700'
                                            }`}
                                            title="Klik untuk ubah status publish"
                                        >
                                            {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                            {post.published ? 'Live' : 'Draft'}
                                        </button>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <Link
                                        href={`/admin/blog/detail/${post.id}`}
                                        className="text-white font-bold text-base hover:text-primary transition-colors line-clamp-2 mb-2 block"
                                    >
                                        {post.title}
                                    </Link>
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                        {post.excerpt || 'Tidak ada ringkasan artikel.'}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-800/60">
                                        <span className="flex items-center gap-1 truncate max-w-[120px]">
                                            <User className="w-3.5 h-3.5 text-gray-500" />
                                            {post.author || 'Tim Velora'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                            {formatDate(post.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="px-5 pb-5 pt-0">
                                <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                                    {/* Detail Button */}
                                    <Link
                                        href={`/admin/blog/detail/${post.id}`}
                                        className="flex-1 py-2 px-3 text-xs font-semibold text-gray-200 hover:text-white bg-gray-800 hover:bg-gray-750 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-gray-700/60"
                                    >
                                        <Eye className="w-3.5 h-3.5 text-primary" />
                                        Detail
                                    </Link>

                                    {/* Edit Button */}
                                    <Link
                                        href={`/admin/blog/edit/${post.id}`}
                                        className="py-2 px-3 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-750 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-gray-700/60"
                                        title="Edit Artikel"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                    </Link>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(post.id)}
                                        disabled={deleting === post.id}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20 cursor-pointer disabled:opacity-50"
                                        title="Hapus Artikel"
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
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Artikel</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium hidden md:table-cell">Kategori</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium hidden sm:table-cell">Status</th>
                                    <th className="text-left px-6 py-4 text-gray-400 font-medium hidden lg:table-cell">Tanggal</th>
                                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((post) => (
                                    <tr key={post.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {post.image_url ? (
                                                    <img
                                                        src={post.image_url}
                                                        alt={post.title}
                                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-800"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/admin/blog/detail/${post.id}`}
                                                        className="text-white font-medium hover:text-primary transition-colors block truncate max-w-[280px]"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                    <p className="text-gray-500 text-xs mt-0.5 md:hidden">{post.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-gray-400">{post.category}</span>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <button
                                                type="button"
                                                onClick={() => togglePublish(post)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                                    post.published
                                                        ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                                        : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                                                }`}
                                            >
                                                {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                {post.published ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/blog/detail/${post.id}`}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/blog/edit/${post.id}`}
                                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                    title="Edit Artikel"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deleting === post.id}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                                    title="Hapus Artikel"
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

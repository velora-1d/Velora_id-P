'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';

export default function BlogListClient({ initialPosts }) {
    const [posts, setPosts] = useState(initialPosts);
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatDate = (dateStr) => {
        if (!mounted) return '';
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
        const { error } = await supabase
            .from('blog_posts')
            .update({ published: !post.published })
            .eq('id', post.id);
        if (!error) {
            setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus artikel ini?')) return;
        setDeleting(id);
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (!error) {
            setPosts(posts.filter(p => p.id !== id));
        }
        setDeleting(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari artikel..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <Link
                    href="/admin/blog/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Artikel Baru
                </Link>
            </div>

            {/* Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left px-6 py-4 text-gray-400 font-medium">Judul</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium hidden md:table-cell">Kategori</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium hidden sm:table-cell">Status</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-medium hidden lg:table-cell">Tanggal</th>
                                <th className="text-right px-6 py-4 text-gray-400 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        {search ? 'Tidak ditemukan' : 'Belum ada artikel'}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((post) => (
                                    <tr key={post.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-white font-medium truncate max-w-[250px]">{post.title}</p>
                                            <p className="text-gray-500 text-xs mt-0.5 md:hidden">{post.category}</p>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-gray-400">{post.category}</span>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <button
                                                onClick={() => togglePublish(post)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${post.published ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'}`}
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
                                                    href={`/admin/blog/edit/${post.id}`}
                                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    disabled={deleting === post.id}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

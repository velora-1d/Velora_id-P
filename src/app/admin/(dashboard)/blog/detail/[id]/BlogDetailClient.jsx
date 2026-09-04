'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    ArrowLeft,
    Edit,
    ExternalLink,
    Calendar,
    Clock,
    User,
    Tag,
    Eye,
    EyeOff,
    Trash2,
    Share2,
    FileText,
    CheckCircle2
} from 'lucide-react';

export default function BlogDetailClient({ post: initialPost }) {
    const [post, setPost] = useState(initialPost);
    const [toggling, setToggling] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const togglePublish = async () => {
        setToggling(true);
        const nextState = !post.published;
        const { error } = await supabase
            .from('blog_posts')
            .update({ published: nextState, updated_at: new Date().toISOString() })
            .eq('id', post.id);

        if (!error) {
            setPost({ ...post, published: nextState });
            router.refresh();
        }
        setToggling(false);
    };

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) return;
        setDeleting(true);
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', post.id);

        if (!error) {
            router.push('/admin/blog');
            router.refresh();
        } else {
            alert('Gagal menghapus artikel');
            setDeleting(false);
        }
    };

    const copyShareLink = () => {
        const url = `${window.location.origin}/blog/${post.slug}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full space-y-6">
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blog"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
                        title="Kembali ke Daftar Blog"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Detail Artikel</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-gray-400">{post.category}</span>
                        </div>
                        <h1 className="text-xl font-bold text-white line-clamp-1">{post.title}</h1>
                    </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        onClick={togglePublish}
                        disabled={toggling}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border cursor-pointer ${
                            post.published
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750'
                        }`}
                    >
                        {post.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {post.published ? 'Status: Published' : 'Status: Draft'}
                    </button>

                    <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-xs font-medium border border-gray-700 transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Lihat Publik
                    </Link>

                    <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        <Edit className="w-3.5 h-3.5" />
                        Edit Artikel
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20 cursor-pointer disabled:opacity-50"
                        title="Hapus Artikel"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (8 cols): Article Content & Featured Image */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Featured Image */}
                    {post.image_url ? (
                        <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-xl max-h-[440px]">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-auto max-h-[440px] object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-gray-950/80 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/10">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-48 rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 flex flex-col items-center justify-center text-gray-500">
                            <FileText className="w-10 h-10 mb-2 opacity-40" />
                            <p className="text-sm">Tidak ada foto thumbnail artikel</p>
                        </div>
                    )}

                    {/* Article Header Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800/80">
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-primary" />
                                    <span>{post.author || 'Tim Velora'}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span>{formatDate(post.created_at)}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>{post.read_time || '5 menit baca'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Excerpt / Summary */}
                        {post.excerpt && (
                            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl">
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Ringkasan Artikel</p>
                                <p className="text-sm text-gray-300 italic leading-relaxed">{post.excerpt}</p>
                            </div>
                        )}

                        {/* Full Body Content */}
                        <div className="pt-4 border-t border-gray-800/80">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Konten Lengkap</h2>
                            <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                {post.content || <p className="text-gray-500 italic">Konten artikel belum diisi.</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (4 cols): Meta Info, SEO, & Actions */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Metadata Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                            Informasi Artikel
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-xs text-gray-500 block">Kategori</span>
                                <span className="text-white font-medium">{post.category}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Slug URL</span>
                                <span className="text-gray-300 font-mono text-xs break-all">/blog/{post.slug}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Penulis</span>
                                <span className="text-white">{post.author || 'Tim Velora'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Waktu Baca</span>
                                <span className="text-white">{post.read_time || '5 menit'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Tanggal Dibuat</span>
                                <span className="text-white text-xs">{formatDate(post.created_at)}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Terakhir Diperbarui</span>
                                <span className="text-white text-xs">{formatDate(post.updated_at)}</span>
                            </div>
                        </div>

                        {/* Copy Link button */}
                        <div className="pt-2">
                            <button
                                onClick={copyShareLink}
                                className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-gray-700 cursor-pointer"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                                {copied ? 'Tautan Berhasil Disalin!' : 'Salin Tautan Artikel'}
                            </button>
                        </div>
                    </div>

                    {/* SEO Metadata Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                            Optimasi Mesin Pencari (SEO)
                        </h3>
                        <div className="space-y-3 text-xs">
                            <div>
                                <span className="text-gray-500 block mb-1">SEO Title:</span>
                                <p className="text-gray-300 bg-gray-800/60 p-2.5 rounded-lg border border-gray-800">
                                    {post.seo_title || post.title}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">SEO Description:</span>
                                <p className="text-gray-300 bg-gray-800/60 p-2.5 rounded-lg border border-gray-800">
                                    {post.seo_description || post.excerpt || 'Menggunakan deskripsi artikel default.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

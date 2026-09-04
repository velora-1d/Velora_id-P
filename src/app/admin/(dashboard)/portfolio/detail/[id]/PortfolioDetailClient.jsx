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
    Briefcase,
    Tag,
    Eye,
    EyeOff,
    Trash2,
    Share2,
    Layers,
    Target,
    Lightbulb,
    CheckCircle2,
    Globe
} from 'lucide-react';

export default function PortfolioDetailClient({ project: initialProject }) {
    const [project, setProject] = useState(initialProject);
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
            year: 'numeric'
        });
    };

    const togglePublish = async () => {
        setToggling(true);
        const nextState = !project.published;
        const { error } = await supabase
            .from('portfolio_projects')
            .update({ published: nextState, updated_at: new Date().toISOString() })
            .eq('id', project.id);

        if (!error) {
            setProject({ ...project, published: nextState });
            router.refresh();
        }
        setToggling(false);
    };

    const handleDelete = async () => {
        if (!confirm('Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.')) return;
        setDeleting(true);
        const { error } = await supabase
            .from('portfolio_projects')
            .delete()
            .eq('id', project.id);

        if (!error) {
            router.push('/admin/portfolio');
            router.refresh();
        } else {
            alert('Gagal menghapus proyek');
            setDeleting(false);
        }
    };

    const copyShareLink = () => {
        const url = `${window.location.origin}/portfolio/${project.slug || project.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Parse tech/tags if string or array
    const techList = Array.isArray(project.tags)
        ? project.tags
        : typeof project.tech === 'string' && project.tech
            ? project.tech.split(',').map(t => t.trim()).filter(Boolean)
            : [];

    return (
        <div className="w-full space-y-6">
            {/* Top Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/portfolio"
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
                        title="Kembali ke Daftar Portofolio"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Detail Portofolio</span>
                            <span className="text-gray-600">•</span>
                            <span className="text-xs text-gray-400">{project.category}</span>
                        </div>
                        <h1 className="text-xl font-bold text-white line-clamp-1">{project.title}</h1>
                    </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        onClick={togglePublish}
                        disabled={toggling}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border cursor-pointer ${
                            project.published
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-750'
                        }`}
                    >
                        {project.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {project.published ? 'Status: Live' : 'Status: Draft'}
                    </button>

                    <Link
                        href={`/portfolio/${project.slug || project.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-xs font-medium border border-gray-700 transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Lihat Publik
                    </Link>

                    <Link
                        href={`/admin/portfolio?edit=${project.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        <Edit className="w-3.5 h-3.5" />
                        Edit Proyek
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20 cursor-pointer disabled:opacity-50"
                        title="Hapus Proyek"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (8 cols): Project Image & Case Study Content */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Featured Project Image */}
                    {project.image_url ? (
                        <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-xl max-h-[460px]">
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-auto max-h-[460px] object-cover"
                            />
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-gray-950/80 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/10">
                                    {project.category}
                                </span>
                                {project.client && (
                                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/10">
                                        Klien: {project.client}
                                    </span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-56 rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 flex flex-col items-center justify-center text-gray-500">
                            <Layers className="w-12 h-12 mb-2 opacity-40" />
                            <p className="text-sm">Tidak ada foto mockup proyek</p>
                        </div>
                    )}

                    {/* Project Overview Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                                {project.title}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                {project.description || 'Belum ada deskripsi proyek.'}
                            </p>
                        </div>

                        {/* Challenge & Solution Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-800">
                            {/* Challenge */}
                            <div className="bg-gray-850/60 border border-gray-800 rounded-xl p-5 space-y-2">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Target className="w-4 h-4" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider">Tantangan Klien</h3>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {project.challenge || 'Tantangan spesifik proyek belum dicatat.'}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="bg-gray-850/60 border border-gray-800 rounded-xl p-5 space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Lightbulb className="w-4 h-4" />
                                    <h3 className="text-xs font-bold uppercase tracking-wider">Solusi Velora</h3>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    {project.solution || 'Solusi implementasi belum dicatat.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (4 cols): Meta Info, Tech Stack, & SEO */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Project Quick Facts */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                            Informasi Proyek
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-xs text-gray-500 block">Nama Klien / Brand</span>
                                <span className="text-white font-medium">{project.client || '-'}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Kategori Layanan</span>
                                <span className="text-white font-medium">{project.category}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Slug URL</span>
                                <span className="text-gray-300 font-mono text-xs break-all">/portfolio/{project.slug || project.id}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Tanggal Registrasi</span>
                                <span className="text-white text-xs">{formatDate(project.created_at)}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block">Terakhir Diperbarui</span>
                                <span className="text-white text-xs">{formatDate(project.updated_at)}</span>
                            </div>
                        </div>

                        {/* Copy Link button */}
                        <div className="pt-2">
                            <button
                                onClick={copyShareLink}
                                className="w-full py-2.5 px-3 bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors border border-gray-700 cursor-pointer"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                                {copied ? 'Tautan Berhasil Disalin!' : 'Salin Tautan Portofolio'}
                            </button>
                        </div>
                    </div>

                    {/* Tech Stack & Tags */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                            Teknologi & Fitur
                        </h3>
                        {techList.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {techList.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-medium rounded-lg"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-500 italic">Belum ada daftar teknologi atau tags.</p>
                        )}
                    </div>

                    {/* SEO Metadata Card */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-gray-800 pb-3">
                            SEO Metadata
                        </h3>
                        <div className="space-y-3 text-xs">
                            <div>
                                <span className="text-gray-500 block mb-1">SEO Title:</span>
                                <p className="text-gray-300 bg-gray-800/60 p-2.5 rounded-lg border border-gray-800">
                                    {project.seo_title || project.title}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500 block mb-1">SEO Description:</span>
                                <p className="text-gray-300 bg-gray-800/60 p-2.5 rounded-lg border border-gray-800">
                                    {project.seo_description || project.description || 'Menggunakan deskripsi default.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

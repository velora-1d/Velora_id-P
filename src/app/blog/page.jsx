import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Blog - Artikel & Insight Digital',
    description: 'Baca artikel terbaru tentang jasa pembuatan website, transformasi digital UMKM, sistem informasi pesantren & sekolah, dan tips teknologi bisnis dari Velora ID.',
    openGraph: {
        title: 'Blog - Artikel & Insight Digital | Velora ID',
        description: 'Wawasan tentang jasa pembuatan website profesional, sistem digital untuk pesantren, sekolah, dan UMKM Indonesia.',
    },
    alternates: {
        canonical: '/blog',
    },
};

async function getPosts() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, author, created_at, read_time, image_url')
        .eq('published', true)
        .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-[#070C18] text-slate-100 relative overflow-hidden">
            {/* Ambient Background & Grid */}
            <div className="absolute inset-0 studio-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none" />

            {/* Header Section */}
            <div className="relative border-b border-white/[0.06] bg-slate-950/40 backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-7xl relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-400 hover:text-white hover:border-blue-500/30 transition-all mb-8 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Kembali ke Beranda
                    </Link>

                    <div className="inline-flex items-center gap-2 studio-mono-badge mb-4">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        ENGINEERING INSIGHTS & ARCHIVES
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight">
                        Publikasi & Analisis Teknis
                    </h1>
                    <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                        Dokumentasi arsitektur sistem modern, panduan integrasi sistem sekolah & pesantren, serta praktik terbaik rekayasa digital oleh tim Velora ID.
                    </p>
                </div>
            </div>

            {/* Blog Content Grid */}
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-7xl relative z-10">
                {posts.length === 0 ? (
                    <div className="text-center py-24 studio-card rounded-3xl p-12 border border-white/[0.08]">
                        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Belum Ada Artikel Dipublikasikan</h2>
                        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                            Artikel dan dokumentasi teknis terbaru sedang dalam tahap penyusunan oleh tim engineer kami.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Featured Post (first) */}
                        {posts[0] && (
                            <Link href={`/blog/${posts[0].slug}`} className="group block mb-12">
                                <div className="studio-card rounded-3xl overflow-hidden border border-white/[0.08] bg-slate-900/40 hover:border-blue-500/30 transition-all duration-300">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[340px] overflow-hidden bg-slate-950">
                                            <img
                                                src={posts[0].image_url}
                                                alt={posts[0].title}
                                                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#070C18]/40 to-[#070C18] opacity-70" />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-mono font-bold rounded-md uppercase tracking-wider shadow-md">
                                                    Featured Article
                                                </span>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="px-2.5 py-1 rounded bg-slate-800 border border-white/[0.08] text-[11px] font-mono font-medium text-blue-400 uppercase tracking-wider">
                                                        {posts[0].category}
                                                    </span>
                                                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        {posts[0].read_time}
                                                    </span>
                                                </div>

                                                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                                                    {posts[0].title}
                                                </h2>

                                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                                                    {posts[0].excerpt}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                                                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5 text-slate-400" />
                                                        {posts[0].author}
                                                    </span>
                                                    <span className="hidden sm:flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                        {formatDate(posts[0].created_at)}
                                                    </span>
                                                </div>

                                                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                                                    <span>Baca</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Rest of posts */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {posts.slice(1).map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                                    <div className="studio-card rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900/40 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="h-48 sm:h-52 overflow-hidden bg-slate-950 relative">
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono font-medium text-blue-300 uppercase tracking-wider">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 text-slate-400" />
                                                        {post.read_time}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{formatDate(post.created_at)}</span>
                                                </div>

                                                <h3 className="font-bold text-white text-base sm:text-lg mb-2 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>

                                                <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="px-6 pb-6 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                                            <span className="text-xs font-mono text-slate-400">{post.author}</span>
                                            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                                Baca Analisis <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

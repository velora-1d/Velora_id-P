'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, Clock, PenLine, ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import Link from 'next/link';

const fallbackPosts = [
    {
        title: "Arsitektur Multi-Tenant & Keamanan Data untuk Lembaga Pendidikan", category: "Architecture", slug: "tren-transformasi-digital-2025",
        excerpt: "Bagaimana isolasi database relasional dan otentikasi berbasis RBAC melindungi integritas data operasional sekolah dan pesantren.",
        author: "Tim Engineer Velora", created_at: "2025-01-15", read_time: "5 menit",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Optimasi Query PostgreSQL & Realtime Supabase pada Beban Tinggi", category: "Database", slug: "implementasi-ai-untuk-umkm",
        excerpt: "Pola indexing, row-level security policies, dan pencegahan connection spike saat pembayaran SPP serentak.",
        author: "Tim Engineer Velora", created_at: "2025-01-08", read_time: "4 menit",
        image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Integrasi Payment Gateway Otomatis: Rekonsiliasi Realtime Tanpa Celah", category: "Fintech", slug: "migrasi-ke-cloud-panduan-lengkap",
        excerpt: "Strategi webhook idempotent, status synchronization, dan verifikasi hash signature untuk transaksi keuangan aman.",
        author: "Tim Engineer Velora", created_at: "2024-12-28", read_time: "6 menit",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
];

const Blog = () => {
    const [posts, setPosts] = useState(fallbackPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) setPosts(data);
            } catch { }
        };
        fetchPosts();
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <section id="blog" className="py-24 sm:py-32 bg-[#faf9f7] text-slate-900 relative overflow-hidden border-t border-slate-200/80">
            {/* Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 select-none pointer-events-none text-[18vw] font-black tracking-tighter text-slate-900/[0.03] leading-none whitespace-nowrap z-0">
                INSIGHTS
            </div>

            {/* Ambient Lighting & Grid */}
            <div className="absolute inset-0 studio-grid-pattern-light opacity-30 pointer-events-none" />
            <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-16 sm:mb-20 text-center">
                        <div className="inline-flex items-center gap-2 studio-mono-badge mb-4">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                            INSIGHTS & PUBLICATIONS
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Wawasan Rekayasa Digital
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                            Dokumentasi arsitektur sistem, optimasi performa, dan praktik terbaik transformasi digital untuk institusi dan UMKM.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Featured Article */}
                {featured && (
                    <ScrollReveal width="100%">
                        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
                            <div className="studio-card-light rounded-3xl overflow-hidden border border-slate-200/80 bg-white hover:border-blue-500/40 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                    {/* Image Column */}
                                    <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-slate-100">
                                        <img
                                            src={featured.image_url || featured.image}
                                            alt={featured.title}
                                            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-slate-950/20 to-transparent opacity-60" />
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-mono font-bold rounded-md uppercase tracking-wider shadow-lg">
                                                Featured Insight
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200/60 text-[11px] font-mono font-medium text-blue-700 uppercase tracking-wider">
                                                    {featured.category}
                                                </span>
                                                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                    {featured.read_time}
                                                </span>
                                            </div>

                                            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                                                {featured.title}
                                            </h3>

                                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 text-justify">
                                                {featured.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-slate-400" />
                                                    {featured.author}
                                                </span>
                                                <span className="hidden sm:flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    {formatDate(featured.created_at)}
                                                </span>
                                            </div>

                                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                                                <span>Baca Artikel</span>
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                )}

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {(rest.length > 0 ? rest : posts.slice(0, 3)).map((post, index) => (
                        <ScrollReveal key={post.id || index} delay={index * 0.1} width="100%">
                            <Link href={`/blog/${post.slug}`} className="group block h-full">
                                <div className="studio-card-light rounded-2xl overflow-hidden border border-slate-200/80 bg-white hover:border-blue-500/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                                    <div>
                                        {/* Image */}
                                        <div className="h-48 sm:h-52 overflow-hidden bg-slate-100 relative">
                                            <img
                                                src={post.image_url || post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono font-medium text-blue-300 uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    {post.read_time}
                                                </span>
                                                <span>•</span>
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>

                                            <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>

                                            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed text-justify">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-xs font-mono text-slate-500">{post.author}</span>
                                        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                            Baca <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Bottom CTA to /blog */}
                <ScrollReveal width="100%" delay={0.2}>
                    <div className="text-center mt-14">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-500/40 text-slate-900 rounded-xl font-mono text-sm transition-all duration-300 shadow-sm hover:-translate-y-0.5 group"
                        >
                            <span>Eksplorasi Seluruh Publikasi</span>
                            <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Blog;

'use client';

import { useState, useEffect } from 'react';
import { Calendar, User, Clock, PenLine, ArrowRight, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import Link from 'next/link';

const fallbackPosts = [
    {
        title: "Tren Transformasi Digital 2025", category: "Technology", slug: "tren-transformasi-digital-2025",
        excerpt: "Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.",
        author: "Tim Velora", created_at: "2024-12-20", read_time: "5 menit",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=70"
    },
    {
        title: "Implementasi AI untuk UMKM", category: "AI & Automation", slug: "implementasi-ai-untuk-umkm",
        excerpt: "Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.",
        author: "Tim Velora", created_at: "2024-12-15", read_time: "4 menit",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=70"
    },
    {
        title: "Migrasi ke Cloud: Panduan Lengkap", category: "Cloud Computing", slug: "migrasi-ke-cloud-panduan-lengkap",
        excerpt: "Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.",
        author: "Tim Velora", created_at: "2024-12-10", read_time: "6 menit",
        image_url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=70"
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
        <section id="blog" className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
            {/* Subtle square grid */}
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='8' y='8' width='32' height='32' rx='2' stroke='%23000' stroke-width='0.4' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '48px 48px' }}></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-14 sm:mb-18">
                        <div className="w-12 h-[2px] bg-gray-900 mb-6"></div>
                        <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-4 flex items-center gap-2">
                            <PenLine className="w-3.5 h-3.5" /> Blog & Insights
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight text-center">
                            Artikel Terbaru
                        </h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed text-center">
                            Wawasan tentang teknologi, transformasi digital, dan inovasi bisnis.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* Featured Article */}
                    {featured && (
                        <ScrollReveal width="100%">
                            <Link href={`/blog/${featured.slug}`} className="relative mb-8 cursor-pointer group block">
                                {/* Image */}
                                <div className="h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden">
                                    <img
                                        src={featured.image_url || featured.image}
                                        alt={featured.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Overlapping Card */}
                                <div className="relative mx-4 sm:mx-8 md:mx-12 -mt-20 sm:-mt-24">
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-bold rounded-md uppercase tracking-wider border border-teal-100">
                                                Featured
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-md uppercase tracking-wider border border-gray-200">
                                                {featured.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
                                            {featured.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm sm:text-base mb-5 leading-relaxed line-clamp-2 max-w-2xl">
                                            {featured.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
                                                <span className="flex items-center gap-1.5 align-middle">
                                                    <User className="w-3.5 h-3.5" /> {featured.author}
                                                </span>
                                                <span className="flex items-center gap-1.5 align-middle">
                                                    <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.created_at)}
                                                </span>
                                                <span className="flex items-center gap-1.5 align-middle">
                                                    <Clock className="w-3.5 h-3.5" /> {featured.read_time}
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    )}

                    {/* Article Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {(rest.length > 0 ? rest : posts.slice(0, 3)).map((post, index) => (
                            <ScrollReveal key={post.id || index} delay={index * 0.1} width="100%">
                                <Link href={`/blog/${post.slug}`} className="cursor-pointer group block">
                                    {/* Image */}
                                    <div className="h-48 sm:h-52 rounded-2xl overflow-hidden">
                                        <img
                                            src={post.image_url || post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Overlapping Content Card */}
                                    <div className="relative mx-3 -mt-10">
                                        <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                                <span className="text-gray-400 text-[10px] flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {post.read_time}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                                                {post.excerpt}
                                            </p>

                                            {/* Author + Read more */}
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
                                                        <User className="w-3 h-3 text-teal-600" />
                                                    </div>
                                                    <span className="text-xs text-gray-500 font-medium">{post.author}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Baca <ChevronRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* See All Articles Link */}
                    <ScrollReveal width="100%" delay={0.3}>
                        <div className="text-center mt-12">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-all duration-300 shadow-lg hover:-translate-y-0.5 group"
                            >
                                Lihat Semua Artikel
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Blog;

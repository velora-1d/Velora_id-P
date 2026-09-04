import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, MessageSquare, ChevronRight } from 'lucide-react';

// Force dynamic rendering — blog posts are dynamic content
export const dynamic = 'force-dynamic';


// Dynamic metadata per post — crucial for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('blog_posts')
        .select('title, excerpt, image_url, author, category, seo_title, seo_description')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!post) {
        return { title: 'Artikel Tidak Ditemukan' };
    }

    return {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        openGraph: {
            title: post.seo_title || `${post.title} | Velora ID Blog`,
            description: post.seo_description || post.excerpt,
            type: 'article',
            images: post.image_url ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.seo_title || post.title,
            description: post.seo_description || post.excerpt,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}

async function getPost(slug) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error || !data) return null;
    return data;
}

async function getRelatedPosts(category, currentSlug) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, image_url, category, read_time')
        .eq('published', true)
        .eq('category', category)
        .neq('slug', currentSlug)
        .limit(3);

    return data || [];
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const related = await getRelatedPosts(post.category, post.slug);

    // Article JSON-LD Schema
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image_url,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Velora ID',
            logo: { '@type': 'ImageObject', url: 'https://www.ve-lora.my.id/images/logo.webp' },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.ve-lora.my.id/blog/${post.slug}`,
        },
    };

    // BreadcrumbList schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ve-lora.my.id' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.ve-lora.my.id/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.ve-lora.my.id/blog/${post.slug}` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="min-h-screen bg-[#070C18] text-slate-100 relative overflow-hidden">
                {/* Hero Header */}
                <div className="relative h-[48vh] sm:h-[58vh] min-h-[400px] overflow-hidden bg-slate-950 border-b border-white/[0.08]">
                    {(post.background_image_url || post.image_url) && (
                        <img
                            src={post.background_image_url || post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover filter brightness-[0.45]"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-[#070C18]/60 to-transparent" />
                    <div className="absolute inset-0 studio-grid-pattern opacity-10 pointer-events-none" />

                    {/* Navigation Bar */}
                    <div className="absolute top-8 left-0 right-0 z-10">
                        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/[0.1] rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:border-blue-500/30 transition-all group"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                Arsip Artikel
                            </Link>
                        </div>
                    </div>

                    {/* Title and Metadata Overlay */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 max-w-4xl">
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-4">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3 text-slate-600" />
                                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                                <ChevronRight className="w-3 h-3 text-slate-600" />
                                <span className="text-blue-400 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
                            </nav>

                            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                                <span className="px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold rounded-lg uppercase tracking-wider">
                                    {post.category}
                                </span>
                                <span className="px-3 py-1 bg-slate-800/70 backdrop-blur-md border border-white/[0.08] text-slate-300 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-blue-400" /> {post.read_time}
                                </span>
                            </div>

                            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-400" /> {post.author}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(post.created_at)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl relative z-10">
                    <article className="prose prose-invert prose-slate max-w-none leading-relaxed text-slate-300 text-base sm:text-lg">
                        {post.content.split('\n\n').map((paragraph, i) => (
                            <div key={i} className="mb-6">
                                {paragraph.startsWith('## ') ? (
                                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-12 mb-4 pb-3 border-b border-white/[0.08]">
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                ) : paragraph.startsWith('### ') ? (
                                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-100 mt-8 mb-3">
                                        {paragraph.replace('### ', '')}
                                    </h3>
                                ) : paragraph.startsWith('**') ? (
                                    <h3 className="text-white font-bold text-lg mt-8 mb-3 flex items-center gap-2.5">
                                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                                        {paragraph.replace(/\*\*/g, '')}
                                    </h3>
                                ) : paragraph.startsWith('- ') || paragraph.startsWith('* ') ? (
                                    <ul className="space-y-2.5 ml-2">
                                        {paragraph.split('\n').map((line, li) => (
                                            <li key={li} className="flex items-start gap-2.5 text-slate-300 leading-relaxed text-base">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                                                {line.replace(/^[-*]\s/, '')}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{paragraph}</p>
                                )}
                            </div>
                        ))}
                    </article>

                    {/* Meta Tags Strip */}
                    <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Kategori:</span>
                            <span className="px-3 py-1 bg-slate-900 border border-white/[0.08] text-blue-400 rounded-lg text-xs font-mono font-medium">
                                {post.category}
                            </span>
                        </div>
                        <div className="text-xs font-mono text-slate-500">
                            Terbit: {formatDate(post.created_at)}
                        </div>
                    </div>

                    {/* Consultation Card */}
                    <div className="mt-12 rounded-3xl p-6 sm:p-8 border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <span className="text-xs font-mono text-blue-400 tracking-wider uppercase font-semibold block mb-1">
                                Technical Consultation
                            </span>
                            <h3 className="font-heading text-xl font-bold text-white mb-1">
                                Butuh Implementasi untuk Lembaga atau Bisnis Anda?
                            </h3>
                            <p className="text-slate-300 text-xs sm:text-sm">
                                Diskusikan spesifikasi teknis, integrasi sistem, atau pembuatan website langsung dengan tim rekayasa Velora ID.
                            </p>
                        </div>
                        <a
                            href={`https://wa.me/6281320442174?text=${encodeURIComponent(`Halo Velora ID! Saya membaca artikel "${post.title}" dan tertarik berkonsultasi mengenai kebutuhan sistem kami.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Konsultasi Langsung
                        </a>
                    </div>

                    {/* Related Posts */}
                    {related.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-white/[0.08]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">Publikasi Terkait</h3>
                                <Link href="/blog" className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                    Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block h-full">
                                        <div className="studio-card rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-900/40 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                                            <div>
                                                {rel.image_url && (
                                                    <div className="h-36 overflow-hidden bg-slate-950">
                                                        <img
                                                            src={rel.image_url}
                                                            alt={rel.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <span className="text-[10px] font-mono font-medium text-blue-300 uppercase tracking-wider block mb-1">
                                                        {rel.category}
                                                    </span>
                                                    <h4 className="font-bold text-white text-sm leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                                        {rel.title}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="px-4 pb-4 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                                                <span>{rel.read_time}</span>
                                                <span className="text-blue-400 flex items-center gap-1">
                                                    Baca <ChevronRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to Blog */}
                    <div className="mt-14 text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke Arsip Artikel
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

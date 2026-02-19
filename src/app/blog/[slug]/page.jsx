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
        .select('title, excerpt, image_url, author, category')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (!post) {
        return { title: 'Artikel Tidak Ditemukan' };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: `${post.title} | Velora ID Blog`,
            description: post.excerpt,
            type: 'article',
            images: post.image_url ? [{ url: post.image_url, width: 1200, height: 630, alt: post.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
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
            logo: { '@type': 'ImageObject', url: 'https://www.ve-lora.my.id/images/logo.png' },
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

            <div className="min-h-screen bg-[#faf9f7]">
                {/* Hero Image */}
                <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                    {/* Breadcrumbs + Back */}
                    <div className="absolute top-24 left-0 right-0 z-10">
                        <div className="container mx-auto px-4 sm:px-6">
                            <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/20 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="container mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
                            <div className="max-w-3xl">
                                {/* Breadcrumbs */}
                                <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
                                    <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                    <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                    <span className="text-white/70 truncate">{post.title}</span>
                                </nav>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                    <span className="px-3 py-1 bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-200 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {post.read_time}
                                    </span>
                                </div>
                                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-white/60">
                                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(post.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="max-w-3xl mx-auto">
                        {/* Content */}
                        <article className="prose prose-lg prose-gray max-w-none">
                            {post.content.split('\n\n').map((paragraph, i) => (
                                <div key={i} className="mb-5">
                                    {paragraph.startsWith('## ') ? (
                                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-4">
                                            {paragraph.replace('## ', '')}
                                        </h2>
                                    ) : paragraph.startsWith('### ') ? (
                                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-3">
                                            {paragraph.replace('### ', '')}
                                        </h3>
                                    ) : paragraph.startsWith('**') ? (
                                        <h3 className="text-gray-900 font-bold text-lg mt-8 mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0"></span>
                                            {paragraph.replace(/\*\*/g, '')}
                                        </h3>
                                    ) : paragraph.startsWith('- ') || paragraph.startsWith('* ') ? (
                                        <ul className="space-y-2 ml-1">
                                            {paragraph.split('\n').map((line, li) => (
                                                <li key={li} className="flex items-start gap-2 text-gray-600 leading-relaxed">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2.5 flex-shrink-0"></span>
                                                    {line.replace(/^[-*]\s/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{paragraph}</p>
                                    )}
                                </div>
                            ))}
                        </article>

                        {/* Tags / Category */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm text-gray-500">Kategori:</span>
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="mt-10 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-teal-100">
                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">Tertarik dengan topik ini?</h3>
                            <p className="text-gray-600 text-sm mb-5">Diskusikan kebutuhan digital Anda dengan tim Velora. Konsultasi gratis via WhatsApp.</p>
                            <a
                                href={`https://wa.me/6281320442174?text=${encodeURIComponent(`Halo Velora! Saya baca artikel "${post.title}" dan tertarik diskusi lebih lanjut.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-500/20 transition-all duration-200 hover:-translate-y-0.5"
                            >
                                <MessageSquare className="w-5 h-5" />
                                Diskusikan dengan Tim Kami
                            </a>
                        </div>

                        {/* Related Posts */}
                        {related.length > 0 && (
                            <div className="mt-16">
                                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">Artikel Terkait</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {related.map((rel) => (
                                        <Link key={rel.id} href={`/blog/${rel.slug}`} className="group">
                                            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                                {rel.image_url && (
                                                    <div className="h-36 overflow-hidden">
                                                        <img src={rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{rel.category}</span>
                                                    <h4 className="font-bold text-gray-900 text-sm mt-1 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                                                        {rel.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back to Blog */}
                        <div className="mt-12 text-center">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

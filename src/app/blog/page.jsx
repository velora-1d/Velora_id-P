import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen bg-[#faf9f7]">
            {/* Header */}
            <div className="bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-transparent"></div>
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='8' y='8' width='32' height='32' rx='2' stroke='%23fff' stroke-width='0.4' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '48px 48px' }}></div>
                <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Beranda
                    </Link>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight">
                        Blog & <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Insights</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                        Wawasan tentang teknologi, transformasi digital, dan tips membangun bisnis online yang sukses.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Belum ada artikel. Segera hadir!</p>
                        <Link href="/" className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold">
                            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Featured Post (first) */}
                        {posts[0] && (
                            <Link href={`/blog/${posts[0].slug}`} className="group block mb-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={posts[0].image_url}
                                            alt={posts[0].title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-md uppercase tracking-wider border border-teal-100">
                                                Featured
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md uppercase tracking-wider">
                                                {posts[0].category}
                                            </span>
                                        </div>
                                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                                            {posts[0].title}
                                        </h2>
                                        <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3">{posts[0].excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {posts[0].author}</span>
                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(posts[0].created_at)}</span>
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {posts[0].read_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Rest of posts */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.slice(1).map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {post.read_time}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                                <span className="text-xs text-gray-400">{formatDate(post.created_at)}</span>
                                                <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Baca <ArrowRight className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
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

'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, User, MessageSquare, BookOpen, ArrowRight, Clock, PenLine } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';

const fallbackPosts = [
    {
        title: "Tren Transformasi Digital 2025", category: "Technology",
        excerpt: "Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.",
        content: `Transformasi digital bukan lagi pilihan, melainkan keharusan bagi bisnis yang ingin bertahan di era modern. Berikut adalah tren utama yang perlu Anda perhatikan:\n\n**1. AI-Powered Automation**\nKecerdasan buatan semakin accessible untuk UMKM.\n\n**2. Low-Code/No-Code Platforms**\nMemungkinkan bisnis membangun aplikasi tanpa coding mendalam.\n\n**3. Cloud-First Strategy**\nInfrastruktur cloud menjadi fondasi utama.\n\n**4. Cybersecurity Priority**\nKeamanan siber menjadi investasi wajib.`,
        author: "Tim Velora", created_at: "2024-12-20", read_time: "5 menit",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Implementasi AI untuk UMKM", category: "AI & Automation",
        excerpt: "Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.",
        content: `Banyak yang mengira AI hanya untuk perusahaan besar. Padahal, UMKM justru bisa mendapat keuntungan signifikan.\n\n**Chatbot untuk Customer Service**\nRespon pelanggan 24/7 tanpa menambah staf.\n\n**Analisis Penjualan Otomatis**\nAI bisa mengidentifikasi pattern pembelian.\n\n**Personalisasi Marketing**\nEmail yang disesuaikan dengan behavior pelanggan.`,
        author: "Tim Velora", created_at: "2024-12-15", read_time: "4 menit",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Migrasi ke Cloud: Panduan Lengkap", category: "Cloud Computing",
        excerpt: "Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.",
        content: `Migrasi ke cloud adalah langkah besar yang membutuhkan perencanaan matang.\n\n**Fase 1: Assessment**\nAudit infrastruktur existing.\n\n**Fase 2: Pilih Provider**\nAWS, Google Cloud, atau Azure?\n\n**Fase 3: Pilot Project**\nMulai dengan satu aplikasi non-critical.\n\n**Fase 4: Full Migration**\nLanjutkan migrasi bertahap.`,
        author: "Tim Velora", created_at: "2024-12-10", read_time: "6 menit",
        image_url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80"
    }
];

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
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

    const openModal = (post) => setSelectedPost(post);
    const closeModal = () => setSelectedPost(null);

    const handleWhatsApp = (post) => {
        const message = `Halo Velora! Saya tertarik dengan artikel "${post.title}". Bisa diskusi lebih lanjut tentang topik ini?`;
        window.open(`https://wa.me/6281320442174?text=${encodeURIComponent(message)}`, '_blank');
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <section id="blog" className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/5 to-teal-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="text-center mb-10 sm:mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 text-amber-600 rounded-full text-sm font-semibold mb-5 tracking-wide">
                            <PenLine className="w-4 h-4" />
                            BLOG & INSIGHTS
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">Blog & Insights</h2>
                        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            Artikel terbaru tentang teknologi, transformasi digital, dan inovasi bisnis.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* Featured + Sidebar Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

                        {/* FEATURED ARTICLE — Left (large) */}
                        {featured && (
                            <div className="lg:col-span-7">
                                <ScrollReveal width="100%">
                                    <div
                                        className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group h-full"
                                        onClick={() => openModal(featured)}
                                    >
                                        <div className="aspect-[4/3] sm:aspect-[16/10] lg:h-full lg:min-h-[420px] relative">
                                            <img
                                                src={featured.image_url || featured.image}
                                                alt={featured.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"></div>

                                            <div className="absolute inset-0 p-5 sm:p-7 md:p-8 flex flex-col justify-end">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                                        {featured.category}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-semibold rounded-full flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {featured.read_time}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight leading-snug">
                                                    {featured.title}
                                                </h3>
                                                <p className="text-white/70 text-sm sm:text-base mb-4 leading-relaxed line-clamp-2 max-w-lg">
                                                    {featured.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 text-white/50 text-xs sm:text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3.5 h-3.5" /> {featured.author}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.created_at)}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute top-5 right-5 sm:top-7 sm:right-7">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                                                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        )}

                        {/* OTHER ARTICLES — Right (stacked list) */}
                        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
                            {rest.map((post, index) => (
                                <ScrollReveal key={post.id || index} delay={index * 0.1} width="100%">
                                    <div
                                        className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group flex flex-row h-full"
                                        onClick={() => openModal(post)}
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-32 sm:w-40 flex-shrink-0 relative overflow-hidden">
                                            <img
                                                src={post.image_url || post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-5 flex flex-col justify-center flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                                                    {post.category}
                                                </span>
                                                <span className="text-gray-400 text-[10px] sm:text-xs flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {post.read_time}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-2 text-gray-400 text-[10px] sm:text-xs mt-auto">
                                                <span>{post.author}</span>
                                                <span>•</span>
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {/* Hero Image */}
                        <div className="h-64 sm:h-72 relative overflow-hidden rounded-t-3xl">
                            <img src={selectedPost.image_url || selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                            {/* Close Button */}
                            <button onClick={closeModal} className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200 border border-white/20 hover:scale-105">
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header overlay content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {selectedPost.category}
                                    </span>
                                    <span className="px-2.5 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {selectedPost.read_time}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">{selectedPost.title}</h3>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8">
                            {/* Meta pills */}
                            <div className="flex flex-wrap items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600">
                                    <User className="w-3.5 h-3.5 text-gray-400" /> {selectedPost.author}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {formatDate(selectedPost.created_at)}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600">
                                    <BookOpen className="w-3.5 h-3.5 text-gray-400" /> {selectedPost.read_time}
                                </span>
                            </div>

                            {/* Article content */}
                            <div className="prose prose-gray max-w-none">
                                {selectedPost.content.split('\n\n').map((paragraph, i) => (
                                    <div key={i} className="mb-4">
                                        {paragraph.startsWith('**') ? (
                                            <h4 className="text-gray-900 font-bold text-base mt-6 mb-2 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                                {paragraph.replace(/\*\*/g, '')}
                                            </h4>
                                        ) : paragraph.startsWith('## ') ? (
                                            <h3 className="text-gray-900 font-bold text-lg mt-6 mb-2">
                                                {paragraph.replace('## ', '')}
                                            </h3>
                                        ) : (
                                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{paragraph}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-emerald-100">
                                <p className="text-gray-700 text-sm font-medium mb-4">Ingin diskusi lebih lanjut tentang topik ini?</p>
                                <button
                                    onClick={() => handleWhatsApp(selectedPost)}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Diskusikan dengan Tim Kami
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Blog;

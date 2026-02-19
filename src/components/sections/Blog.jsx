'use client';

import { useState, useEffect } from 'react';
import { X, Eye, Calendar, User, MessageSquare, BookOpen } from 'lucide-react';
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

                if (!error && data && data.length > 0) {
                    setPosts(data);
                }
            } catch {
                // Fallback to hardcoded data
            }
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

    return (
        <section id="blog" className="py-12 sm:py-20 bg-white">
            <div className="container mx-auto px-4">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold mb-4 tracking-wide">
                            BLOG & INSIGHTS
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog & Insights</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Artikel terbaru tentang teknologi, transformasi digital, dan inovasi bisnis.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <ScrollReveal key={post.id || index} delay={index * 0.1} className="h-full">
                            <div
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col h-full cursor-pointer group"
                                onClick={() => openModal(post)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={post.image_url || post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            Baca Artikel
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between items-center text-xs text-gray-500">
                                        <span className="font-medium text-gray-700">{post.author}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(post.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="h-56 relative">
                            <img
                                src={selectedPost.image_url || selectedPost.image}
                                alt={selectedPost.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-6 right-6">
                                <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                    {selectedPost.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white">{selectedPost.title}</h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Meta info */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {selectedPost.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(selectedPost.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="w-4 h-4" />
                                    {selectedPost.read_time}
                                </span>
                            </div>

                            {/* Article content */}
                            <div className="prose prose-gray max-w-none">
                                {selectedPost.content.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="text-gray-600 leading-relaxed mb-4">
                                        {paragraph.startsWith('**') ? (
                                            <strong className="text-gray-900 block mt-4">
                                                {paragraph.replace(/\*\*/g, '')}
                                            </strong>
                                        ) : paragraph.startsWith('## ') ? (
                                            <strong className="text-gray-900 block mt-4 text-lg">
                                                {paragraph.replace('## ', '')}
                                            </strong>
                                        ) : paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-gray-500 text-sm mb-4">Ingin diskusi lebih lanjut tentang topik ini?</p>
                                <button
                                    onClick={() => handleWhatsApp(selectedPost)}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
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

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Briefcase, Star, MessageSquare, ArrowRight, Clock, Mail } from 'lucide-react';

const statCards = [
    { label: 'Blog Posts', key: 'blog', icon: FileText, href: '/admin/blog', color: 'from-blue-500 to-blue-600' },
    { label: 'Portfolio', key: 'portfolio', icon: Briefcase, href: '/admin/portfolio', color: 'from-purple-500 to-purple-600' },
    { label: 'Testimonials', key: 'testimonials', icon: Star, href: '/admin/testimonials', color: 'from-amber-500 to-amber-600' },
    { label: 'Pesan Masuk', key: 'messages', icon: MessageSquare, href: '/admin/messages', color: 'from-emerald-500 to-emerald-600' },
];

export default function DashboardClient({ stats, recentMessages, recentPosts }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatDate = (dateStr) => {
        if (!mounted) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => (
                    <Link key={card.key} href={card.href} className="group">
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                                    <card.icon className="w-6 h-6 text-white" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-1">
                                {stats[card.key]}
                                {card.key === 'messages' && stats.unread > 0 && (
                                    <span className="ml-2 text-sm font-medium text-emerald-400">
                                        ({stats.unread} baru)
                                    </span>
                                )}
                            </p>
                            <p className="text-sm text-gray-500">{card.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Messages */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Mail className="w-5 h-5 text-gray-400" />
                            Pesan Terbaru
                        </h3>
                        <Link href="/admin/messages" className="text-sm text-primary hover:text-primary/80 transition-colors">
                            Lihat semua
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentMessages.length === 0 ? (
                            <p className="text-gray-500 text-sm py-4 text-center">Belum ada pesan</p>
                        ) : (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className={`p-4 rounded-xl border transition-colors ${msg.is_read ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-800/60 border-gray-700'}`}>
                                    <div className="flex items-start justify-between mb-1">
                                        <p className="text-sm font-medium text-white">{msg.name}</p>
                                        {!msg.is_read && (
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 mt-1.5"></span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mb-1">{msg.subject || 'Tanpa subjek'}</p>
                                    <p className="text-sm text-gray-500 line-clamp-2">{msg.message}</p>
                                    <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDate(msg.created_at)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Blog Posts */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            Blog Terbaru
                        </h3>
                        <Link href="/admin/blog" className="text-sm text-primary hover:text-primary/80 transition-colors">
                            Lihat semua
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentPosts.length === 0 ? (
                            <p className="text-gray-500 text-sm py-4 text-center">Belum ada artikel</p>
                        ) : (
                            recentPosts.map((post) => (
                                <div key={post.id} className="p-4 rounded-xl bg-gray-800/30 border border-gray-800">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{post.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-700 text-gray-400'}`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                                <span className="text-xs text-gray-500">{post.category}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/admin/blog/edit/${post.id}`}
                                            className="text-xs text-primary hover:text-primary/80 flex-shrink-0"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

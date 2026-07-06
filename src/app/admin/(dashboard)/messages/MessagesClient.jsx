'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mail, Clock, Check, CheckCheck, Trash2, User, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export default function MessagesClient({ initialMessages }) {
    const [messages, setMessages] = useState(initialMessages);
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState('all');
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatDate = (dateStr, full = false) => {
        if (!mounted) return '';
        const date = new Date(dateStr);
        return full
            ? date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    };

    const filtered = filter === 'all' ? messages
        : filter === 'unread' ? messages.filter(m => !m.is_read)
            : messages.filter(m => m.is_read);

    const markRead = async (id) => {
        const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
        if (!error) setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
    };

    const markAllRead = async () => {
        const unreadIds = messages.filter(m => !m.is_read).map(m => m.id);
        if (unreadIds.length === 0) return;
        const { error } = await supabase.from('contact_messages').update({ is_read: true }).in('id', unreadIds);
        if (!error) setMessages(messages.map(m => ({ ...m, is_read: true })));
    };

    const handleDelete = async (id) => {
        if (!confirm('Hapus pesan ini?')) return;
        const { error } = await supabase.from('contact_messages').delete().eq('id', id);
        if (!error) setMessages(messages.filter(m => m.id !== id));
    };

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        {[
                            { key: 'all', label: `Semua (${messages.length})` },
                            { key: 'unread', label: `Belum Dibaca (${unreadCount})` },
                            { key: 'read', label: 'Sudah Dibaca' },
                        ].map(f => (
                            <button key={f.key} onClick={() => setFilter(f.key)}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${filter === f.key ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-white'}`}
                            >{f.label}</button>
                        ))}
                    </div>
                </div>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
                        <CheckCheck className="w-4 h-4" /> Tandai semua dibaca
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                        <Mail className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500">Tidak ada pesan</p>
                    </div>
                ) : filtered.map((msg) => (
                    <div key={msg.id}
                        className={`bg-gray-900 border rounded-2xl transition-all ${!msg.is_read ? 'border-primary/30 bg-gray-900/80' : 'border-gray-800'}`}
                    >
                        <button
                            onClick={() => {
                                setExpanded(expanded === msg.id ? null : msg.id);
                                if (!msg.is_read) markRead(msg.id);
                            }}
                            className="w-full px-6 py-4 flex items-center gap-4 text-left"
                        >
                            {/* Unread dot */}
                            <div className="flex-shrink-0">
                                {!msg.is_read ? (
                                    <span className="w-2.5 h-2.5 bg-primary rounded-full block"></span>
                                ) : (
                                    <span className="w-2.5 h-2.5 bg-gray-700 rounded-full block"></span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <p className={`text-sm font-medium truncate ${!msg.is_read ? 'text-white' : 'text-gray-300'}`}>{msg.name}</p>
                                    <span className="text-xs text-gray-600">•</span>
                                    <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                                </div>
                                <p className="text-sm text-gray-400 truncate">{msg.subject || msg.message.slice(0, 80)}</p>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs text-gray-600 hidden sm:block">
                                    {formatDate(msg.created_at)}
                                </span>
                                {expanded === msg.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                        </button>

                        {/* Expanded content */}
                        {expanded === msg.id && (
                            <div className="px-6 pb-5 pt-0 border-t border-gray-800 mt-0">
                                <div className="pt-4 space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <User className="w-4 h-4 text-gray-600" /> {msg.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail className="w-4 h-4 text-gray-600" /> {msg.email}
                                        </div>
                                        {msg.phone && (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Phone className="w-4 h-4 text-gray-600" /> {msg.phone}
                                            </div>
                                        )}
                                    </div>
                                    {msg.subject && (
                                        <p className="text-sm font-medium text-gray-300">Subjek: {msg.subject}</p>
                                    )}
                                    <div className="bg-gray-800/50 rounded-xl p-4">
                                        <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-xs text-gray-600 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(msg.created_at, true)}
                                        </span>
                                        <button onClick={() => handleDelete(msg.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

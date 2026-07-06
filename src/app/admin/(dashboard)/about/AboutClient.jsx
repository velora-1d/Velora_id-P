'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Save, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AboutClient({ initialData }) {
    const supabase = createClient();
    const router = useRouter();

    const findValue = (key, field = 'content') => {
        const item = initialData.find(d => d.section_key === key);
        return item ? item[field] : '';
    };

    const findId = (key) => {
        const item = initialData.find(d => d.section_key === key);
        return item ? item.id : null;
    };

    const [form, setForm] = useState({
        story_title: { id: findId('story_title'), title: findValue('story_title', 'title') },
        story_p1: { id: findId('story_p1'), content: findValue('story_p1', 'content') },
        story_p2: { id: findId('story_p2'), content: findValue('story_p2', 'content') },
        image: { id: findId('image'), image_url: findValue('image', 'image_url') },
        stat_projects: { 
            id: findId('stat_projects'), 
            stat_value: findValue('stat_projects', 'stat_value') || '50', 
            stat_label: findValue('stat_projects', 'stat_label') || 'Proyek Selesai' 
        },
        stat_satisfaction: { 
            id: findId('stat_satisfaction'), 
            stat_value: findValue('stat_satisfaction', 'stat_value') || '98', 
            stat_label: findValue('stat_satisfaction', 'stat_label') || 'Klien Puas' 
        }
    });

    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const updates = Object.entries(form).map(async ([key, data]) => {
                const payload = {
                    section_key: key,
                    updated_at: new Date().toISOString()
                };

                if (key === 'story_title') {
                    payload.title = data.title;
                } else if (key === 'story_p1' || key === 'story_p2') {
                    payload.content = data.content;
                } else if (key === 'image') {
                    payload.image_url = data.image_url;
                } else if (key.startsWith('stat_')) {
                    payload.stat_value = data.stat_value;
                    payload.stat_label = data.stat_label;
                }

                if (data.id) {
                    return supabase.from('about_content').update(payload).eq('id', data.id);
                } else {
                    return supabase.from('about_content').insert(payload);
                }
            });

            const results = await Promise.all(updates);
            const errors = results.filter(r => r.error);
            
            if (errors.length > 0) {
                setErrorMsg('Gagal memperbarui beberapa bagian Tentang Kami.');
            } else {
                setSuccessMsg('Halaman Tentang Kami berhasil diperbarui!');
                router.refresh();
            }
        } catch {
            setErrorMsg('Koneksi bermasalah. Silakan coba lagi.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Kelola Tentang Kami</h1>
                    <p className="text-sm text-gray-400 mt-1">Ubah konten profil, sejarah, foto utama, dan statistik Velora di satu halaman terpadu.</p>
                </div>
            </div>

            {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{successMsg}</span>
                </div>
            )}

            {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Bagian Sejarah & Cerita */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Info className="w-5 h-5 text-primary" />
                        <h2 className="text-base font-bold text-white">Cerita & Sejarah</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Judul Sejarah</label>
                            <input 
                                type="text" 
                                value={form.story_title.title} 
                                onChange={(e) => setForm({
                                    ...form,
                                    story_title: { ...form.story_title, title: e.target.value }
                                })}
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                placeholder="Contoh: Sejarah Velora"
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Paragraf Pertama</label>
                            <textarea 
                                value={form.story_p1.content} 
                                onChange={(e) => setForm({
                                    ...form,
                                    story_p1: { ...form.story_p1, content: e.target.value }
                                })}
                                rows={4} 
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" 
                                placeholder="Tulis cerita sejarah paragraf 1 di sini..."
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Paragraf Kedua</label>
                            <textarea 
                                value={form.story_p2.content} 
                                onChange={(e) => setForm({
                                    ...form,
                                    story_p2: { ...form.story_p2, content: e.target.value }
                                })}
                                rows={4} 
                                className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" 
                                placeholder="Tulis cerita sejarah paragraf 2 di sini..."
                                required 
                            />
                        </div>

                        <ImageUpload
                            label="Foto Utama Halaman Tentang"
                            value={form.image.image_url}
                            onChange={(url) => setForm({
                                ...form,
                                image: { ...form.image, image_url: url }
                            })}
                            folder="about"
                        />
                    </div>
                </div>

                {/* 2. Bagian Statistik */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                        <Save className="w-5 h-5 text-primary" />
                        <h2 className="text-base font-bold text-white">Statistik Utama</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Stat 1 */}
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-800/80 space-y-3">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Statistik 1 (Proyek)</p>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Nilai Angka (Contoh: 50)</label>
                                <input 
                                    type="text" 
                                    value={form.stat_projects.stat_value} 
                                    onChange={(e) => setForm({
                                        ...form,
                                        stat_projects: { ...form.stat_projects, stat_value: e.target.value }
                                    })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Keterangan Label (Contoh: Proyek Selesai)</label>
                                <input 
                                    type="text" 
                                    value={form.stat_projects.stat_label} 
                                    onChange={(e) => setForm({
                                        ...form,
                                        stat_projects: { ...form.stat_projects, stat_label: e.target.value }
                                    })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-800/80 space-y-3">
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Statistik 2 (Kepuasan)</p>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Nilai Angka (Contoh: 98)</label>
                                <input 
                                    type="text" 
                                    value={form.stat_satisfaction.stat_value} 
                                    onChange={(e) => setForm({
                                        ...form,
                                        stat_satisfaction: { ...form.stat_satisfaction, stat_value: e.target.value }
                                    })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Keterangan Label (Contoh: Klien Puas)</label>
                                <input 
                                    type="text" 
                                    value={form.stat_satisfaction.stat_label} 
                                    onChange={(e) => setForm({
                                        ...form,
                                        stat_satisfaction: { ...form.stat_satisfaction, stat_label: e.target.value }
                                    })}
                                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Panel */}
                <div className="flex justify-end pt-4">
                    <button 
                        type="submit" 
                        disabled={saving} 
                        className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Menyimpan Perubahan...' : 'Simpan Semua Perubahan'}
                    </button>
                </div>
            </form>
        </div>
    );
}

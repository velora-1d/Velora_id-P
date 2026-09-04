'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {
    Save, Loader2, Scale, Shield, CheckCircle, Building, MapPin,
    Calendar, Award, Globe, BadgeCheck, Crown, Star, Eye, ExternalLink
} from 'lucide-react';

export default function LegalitasClient({ initialData }) {
    const defaults = {
        nib: '3110250097422',
        status: 'AKTIF / TERBIT',
        nama_usaha: 'Velora ID',
        nama_usaha_sub: 'Digital Services',
        pemilik: 'Mahin Utsman Nawawi, S.H.',
        pemilik_title: 'Founder & CEO',
        domisili: 'Kabupaten Bandung',
        domisili_sub: 'Jawa Barat, Indonesia',
        tanggal_terbit: '31 Oktober 2025',
        tanggal_terbit_sub: 'via Sistem OSS',
        perizinan_text: 'Perizinan Berbasis Risiko',
        perizinan_sub: 'Tingkat Risiko Rendah',
        skala_text: 'Skala Usaha Mikro',
        skala_sub: 'Terverifikasi OSS',
        wilayah_desc: 'Seluruh Wilayah Republik Indonesia. Kami melayani klien dari Sabang sampai Merauke dengan komitmen kualitas yang sama.',
        kbli_desc: 'KBLI 46699 — Perdagangan Besar Produk Lainnya YTDL. Mencakup layanan digital, pengembangan web, dan solusi teknologi.',
        footer_text: 'Legalitas ini diterbitkan dan dikelola secara resmi melalui sistem OSS, serta ditandatangani secara elektronik oleh instansi terkait sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.',
        published: true
    };

    const [form, setForm] = useState(initialData ? { ...defaults, ...initialData } : defaults);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState(null);
    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        setMsg(null);

        try {
            const { id, created_at, updated_at, ...dataToSave } = form;

            if (id) {
                const { error } = await supabase
                    .from('legalitas')
                    .update({ ...dataToSave, updated_at: new Date().toISOString() })
                    .eq('id', id);
                if (error) throw error;
            } else {
                const { data: c, error } = await supabase
                    .from('legalitas')
                    .insert(dataToSave)
                    .select()
                    .single();
                if (error) throw error;
                if (c) setForm(c);
            }

            setMsg({ type: 'success', text: 'Data legalitas berhasil disimpan ke database!' });
            router.refresh();
        } catch (err) {
            console.error('Save legalitas error:', err);
            setMsg({ type: 'error', text: 'Gagal menyimpan data: ' + (err.message || 'Terjadi kesalahan') });
        } finally {
            setSaving(false);
        }
    };

    const inp = "w-full px-3.5 py-2.5 bg-gray-800/90 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors";
    const labelStyle = "block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider";

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Top Bar Header */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                        <Scale className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-white">Kelola Data Legalitas</h1>
                            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {form.status || 'AKTIF / TERBIT'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">Informasi NIB, izin OSS, dan legalitas resmi Velora ID</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="/#legalitas"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                        <span>Lihat di Website</span>
                    </a>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                    </button>
                </div>
            </div>

            {/* Notification alert */}
            {msg && (
                <div className={`p-4 rounded-xl border text-sm font-medium flex items-center gap-3 ${msg.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}>
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{msg.text}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* SECTION 1: NIB & Identitas Utama */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-gray-800 pb-3.5 mb-5">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Identitas Pokok Usaha & NIB</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                            <label className={labelStyle}>Nomor Induk Berusaha (NIB)</label>
                            <input
                                type="text"
                                value={form.nib || ''}
                                onChange={(e) => setForm({ ...form, nib: e.target.value })}
                                className={`${inp} font-mono tracking-wider font-semibold text-amber-300`}
                                placeholder="Contoh: 3110250097422"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Status Legalitas OSS</label>
                            <input
                                type="text"
                                value={form.status || ''}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className={`${inp} text-emerald-400 font-semibold`}
                                placeholder="Contoh: AKTIF / TERBIT"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Status Publikasi Website</label>
                            <div className="flex items-center h-[42px] px-3.5 bg-gray-800/90 border border-gray-700 rounded-xl">
                                <label className="inline-flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(form.published)}
                                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                        className="w-4 h-4 rounded text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="text-sm text-gray-300 font-medium">Tampilkan di Halaman Utama</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Nama Usaha</label>
                            <input
                                type="text"
                                value={form.nama_usaha || ''}
                                onChange={(e) => setForm({ ...form, nama_usaha: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Velora ID"
                                required
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Subtitle Nama Usaha</label>
                            <input
                                type="text"
                                value={form.nama_usaha_sub || ''}
                                onChange={(e) => setForm({ ...form, nama_usaha_sub: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Digital Services"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Nama Pemilik / Direktur</label>
                            <input
                                type="text"
                                value={form.pemilik || ''}
                                onChange={(e) => setForm({ ...form, pemilik: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Mahin Utsman Nawawi, S.H."
                                required
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Jabatan Pemilik</label>
                            <input
                                type="text"
                                value={form.pemilik_title || ''}
                                onChange={(e) => setForm({ ...form, pemilik_title: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Founder & CEO"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Domisili & Tanggal Penerbitan */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-gray-800 pb-3.5 mb-5">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Domisili & Penerbitan OSS</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className={labelStyle}>Domisili Usaha</label>
                            <input
                                type="text"
                                value={form.domisili || ''}
                                onChange={(e) => setForm({ ...form, domisili: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Kabupaten Bandung"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Provinsi / Negara</label>
                            <input
                                type="text"
                                value={form.domisili_sub || ''}
                                onChange={(e) => setForm({ ...form, domisili_sub: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Jawa Barat, Indonesia"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Tanggal Terbit NIB</label>
                            <input
                                type="text"
                                value={form.tanggal_terbit || ''}
                                onChange={(e) => setForm({ ...form, tanggal_terbit: e.target.value })}
                                className={inp}
                                placeholder="Contoh: 31 Oktober 2025"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Keterangan Penerbit</label>
                            <input
                                type="text"
                                value={form.tanggal_terbit_sub || ''}
                                onChange={(e) => setForm({ ...form, tanggal_terbit_sub: e.target.value })}
                                className={inp}
                                placeholder="Contoh: via Sistem OSS"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Klasifikasi & Perizinan */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-gray-800 pb-3.5 mb-5">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Klasifikasi Perizinan & Skala Usaha</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className={labelStyle}>Kategori Perizinan</label>
                            <input
                                type="text"
                                value={form.perizinan_text || ''}
                                onChange={(e) => setForm({ ...form, perizinan_text: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Perizinan Berbasis Risiko"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Sub-Perizinan / Tingkat Risiko</label>
                            <input
                                type="text"
                                value={form.perizinan_sub || ''}
                                onChange={(e) => setForm({ ...form, perizinan_sub: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Tingkat Risiko Rendah"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Skala Usaha</label>
                            <input
                                type="text"
                                value={form.skala_text || ''}
                                onChange={(e) => setForm({ ...form, skala_text: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Skala Usaha Mikro"
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Sub-Skala / Verifikasi</label>
                            <input
                                type="text"
                                value={form.skala_sub || ''}
                                onChange={(e) => setForm({ ...form, skala_sub: e.target.value })}
                                className={inp}
                                placeholder="Contoh: Terverifikasi OSS"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Keterangan Operasional & KBLI */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-gray-800 pb-3.5 mb-5">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Wilayah Operasional, KBLI, & Catatan Resmi</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className={labelStyle}>Wilayah Operasional</label>
                            <textarea
                                value={form.wilayah_desc || ''}
                                onChange={(e) => setForm({ ...form, wilayah_desc: e.target.value })}
                                rows={2}
                                className={`${inp} resize-none`}
                                placeholder="Deskripsi jangkauan wilayah operasional layanan..."
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Bidang Usaha (KBLI)</label>
                            <textarea
                                value={form.kbli_desc || ''}
                                onChange={(e) => setForm({ ...form, kbli_desc: e.target.value })}
                                rows={2}
                                className={`${inp} resize-none`}
                                placeholder="Kode dan deskripsi KBLI resmi..."
                            />
                        </div>
                        <div>
                            <label className={labelStyle}>Catatan Pengesahan Elektronik (Footer)</label>
                            <textarea
                                value={form.footer_text || ''}
                                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                                rows={2}
                                className={`${inp} resize-none`}
                                placeholder="Keterangan pengesahan OSS dan tanda tangan elektronik..."
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Submit Bar */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{saving ? 'Menyimpan...' : 'Simpan Data Legalitas'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

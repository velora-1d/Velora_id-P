'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Scale } from 'lucide-react';

export default function LegalitasClient({ initialData }) {
    const defaults = { nib: '', business_name: '', owner_name: '', npwp: '', address: '', business_type: '', capital_status: '', main_activity: '', phone: '', email: '', status: '' };
    const [form, setForm] = useState(initialData || defaults);
    const [saving, setSaving] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = form;
        if (id) {
            await supabase.from('legalitas').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
        } else {
            const { data: c } = await supabase.from('legalitas').insert(data).select().single();
            if (c) setForm(c);
        }
        setSaving(false); router.refresh();
    };

    const fields = [
        { key: 'nib', label: 'NIB (Nomor Induk Berusaha)' },
        { key: 'business_name', label: 'Nama Usaha' },
        { key: 'owner_name', label: 'Nama Pemilik' },
        { key: 'npwp', label: 'NPWP' },
        { key: 'business_type', label: 'Jenis Usaha' },
        { key: 'capital_status', label: 'Status Modal' },
        { key: 'main_activity', label: 'Kegiatan Utama' },
        { key: 'phone', label: 'Telepon' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status' },
    ];

    const inp = "w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><Scale className="w-5 h-5 text-primary" /></div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Data Legalitas</h3>
                        <p className="text-xs text-gray-500">Informasi legalitas usaha</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map(f => (
                            <div key={f.key}>
                                <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
                                <input type="text" value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} className={inp} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Alamat</label>
                        <textarea value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className={`${inp} resize-none`} />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button type="submit" disabled={saving} className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl font-medium flex items-center gap-2">
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

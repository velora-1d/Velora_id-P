'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, X, Save, Loader2, CheckCircle2 } from 'lucide-react';
import IconPicker from '@/components/admin/IconPicker';
import GradientPicker from '@/components/admin/GradientPicker';

export default function FeaturedProductClient({ initialFeatures, initialBenefits }) {
    const [features, setFeatures] = useState(initialFeatures);
    const [benefits, setBenefits] = useState(initialBenefits);
    const [showFeatForm, setShowFeatForm] = useState(false);
    const [showBenForm, setShowBenForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [featForm, setFeatForm] = useState(emptyFeat());
    const [benForm, setBenForm] = useState(emptyBen());
    const supabase = createClient();
    const router = useRouter();

    function emptyFeat() { return { icon_name: 'Globe', title: '', description: '', color_gradient: 'from-blue-500 to-indigo-600', sort_order: 0, published: true }; }
    function emptyBen() { return { benefit: '', sort_order: 0, published: true }; }

    // Feature CRUD
    const submitFeature = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, updated_at, ...data } = featForm;
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: u, error } = await supabase.from('featured_products').update({ ...data, updated_at: new Date().toISOString() }).eq('id', editing).select().single();
            if (!error) setFeatures(features.map(f => f.id === editing ? u : f));
        } else {
            const { data: c, error } = await supabase.from('featured_products').insert(data).select().single();
            if (!error) setFeatures([...features, c]);
        }
        setSaving(false); setShowFeatForm(false); setEditing(null); router.refresh();
    };
    const deleteFeature = async (id) => {
        if (!confirm('Hapus fitur?')) return;
        const { error } = await supabase.from('featured_products').delete().eq('id', id);
        if (!error) setFeatures(features.filter(f => f.id !== id));
    };

    // Benefit CRUD
    const submitBenefit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { id, created_at, ...data } = benForm;
        data.sort_order = parseInt(data.sort_order) || 0;
        if (editing) {
            const { data: u, error } = await supabase.from('product_benefits').update(data).eq('id', editing).select().single();
            if (!error) setBenefits(benefits.map(b => b.id === editing ? u : b));
        } else {
            const { data: c, error } = await supabase.from('product_benefits').insert(data).select().single();
            if (!error) setBenefits([...benefits, c]);
        }
        setSaving(false); setShowBenForm(false); setEditing(null); router.refresh();
    };
    const deleteBenefit = async (id) => {
        if (!confirm('Hapus benefit?')) return;
        const { error } = await supabase.from('product_benefits').delete().eq('id', id);
        if (!error) setBenefits(benefits.filter(b => b.id !== id));
    };

    const Modal = ({ show, title, onClose, onSubmit, children }) => show ? (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-lg space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={onSubmit} className="space-y-4">
                    {children}
                    <div className="flex justify-end">
                        <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-2">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;

    const inp = (label, value, onChange, req) => (
        <div>
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            <input type="text" value={value} onChange={onChange} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" required={req} />
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Feature Form Modal */}
            <Modal show={showFeatForm} title={editing ? 'Edit Fitur' : 'Fitur Baru'} onClose={() => { setShowFeatForm(false); setEditing(null); }} onSubmit={submitFeature}>
                {inp('Judul', featForm.title, (e) => setFeatForm({ ...featForm, title: e.target.value }), true)}
                <IconPicker value={featForm.icon_name} onChange={(icon_name) => setFeatForm({ ...featForm, icon_name })} />
                <GradientPicker value={featForm.color_gradient} onChange={(color_gradient) => setFeatForm({ ...featForm, color_gradient })} />
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Deskripsi</label>
                    <textarea value={featForm.description} onChange={(e) => setFeatForm({ ...featForm, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
                </div>
                {inp('Urutan', featForm.sort_order, (e) => setFeatForm({ ...featForm, sort_order: e.target.value }))}
            </Modal>

            {/* Benefit Form Modal */}
            <Modal show={showBenForm} title={editing ? 'Edit Benefit' : 'Benefit Baru'} onClose={() => { setShowBenForm(false); setEditing(null); }} onSubmit={submitBenefit}>
                {inp('Benefit', benForm.benefit, (e) => setBenForm({ ...benForm, benefit: e.target.value }), true)}
                {inp('Urutan', benForm.sort_order, (e) => setBenForm({ ...benForm, sort_order: e.target.value }))}
            </Modal>

            {/* Features Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg">Fitur Produk ({features.length})</h3>
                    <button onClick={() => { setFeatForm(emptyFeat()); setEditing(null); setShowFeatForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                        <Plus className="w-4 h-4" /> Tambah
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map(f => (
                        <div key={f.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                            <p className="text-white font-medium mb-1">{f.title}</p>
                            <p className="text-xs text-gray-500 mb-2">{f.icon_name} • Urutan: {f.sort_order}</p>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{f.description}</p>
                            <div className="flex gap-2">
                                <button onClick={() => { setFeatForm({ ...f }); setEditing(f.id); setShowFeatForm(true); }} className="flex-1 py-1.5 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button>
                                <button onClick={() => deleteFeature(f.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Benefits Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg">Benefits ({benefits.length})</h3>
                    <button onClick={() => { setBenForm(emptyBen()); setEditing(null); setShowBenForm(true); }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium">
                        <Plus className="w-4 h-4" /> Tambah
                    </button>
                </div>
                <div className="space-y-2">
                    {benefits.map(b => (
                        <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-white flex-1">{b.benefit}</span>
                            <span className="text-xs text-gray-500">#{b.sort_order}</span>
                            <button onClick={() => { setBenForm({ ...b }); setEditing(b.id); setShowBenForm(true); }} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"><Edit className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteBenefit(b.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

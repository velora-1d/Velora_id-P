'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const gradientOptions = [
    { name: 'Biru - Indigo', value: 'from-blue-500 to-indigo-600', class: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
    { name: 'Oranye - Merah', value: 'from-orange-500 to-red-600', class: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { name: 'Hijau - Toska', value: 'from-emerald-500 to-teal-600', class: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
    { name: 'Ungu - Violet', value: 'from-violet-500 to-purple-600', class: 'bg-gradient-to-r from-violet-500 to-purple-600' },
    { name: 'Pink - Rose', value: 'from-pink-500 to-rose-600', class: 'bg-gradient-to-r from-pink-500 to-rose-600' },
    { name: 'Amber - Oranye', value: 'from-amber-500 to-orange-600', class: 'bg-gradient-to-r from-amber-500 to-orange-600' },
    { name: 'Cyan - Biru', value: 'from-cyan-500 to-blue-600', class: 'bg-gradient-to-r from-cyan-500 to-blue-600' },
];

export default function GradientPicker({ value, onChange, label = 'Gradient Warna' }) {
    const [open, setOpen] = useState(false);
    
    // Check if the current value is custom or matches one of the presets
    const selected = gradientOptions.find(o => o.value === value) || { 
        name: 'Kustom / Bawaan', 
        value: value || 'from-blue-500 to-indigo-600', 
        class: `bg-gradient-to-r ${value || 'from-blue-500 to-indigo-600'}` 
    };

    return (
        <div className="relative">
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 hover:border-gray-600 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-4 rounded ${selected.class}`} />
                    <span className="font-medium text-white">{selected.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown List */}
            {open && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    
                    <div className="absolute left-0 right-0 mt-2 p-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl z-20 max-h-60 overflow-y-auto space-y-1">
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Pilih Gradasi Warna</p>
                        {gradientOptions.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                                        isSelected ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <div className={`w-8 h-4 rounded flex-shrink-0 ${opt.class}`} />
                                    <span>{opt.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

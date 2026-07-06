'use client';

import { useState } from 'react';
import { getIcon, iconOptions } from '@/lib/icons';
import { ChevronDown } from 'lucide-react';

export default function IconPicker({ value, onChange, label = 'Icon' }) {
    const [open, setOpen] = useState(false);
    const selectedIcon = value || 'Globe';
    const SelectedIconComp = getIcon(selectedIcon);

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
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <SelectedIconComp className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-white">{selectedIcon}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Grid */}
            {open && (
                <>
                    {/* Backdrop to close */}
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    
                    <div className="absolute left-0 right-0 mt-2 p-3 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl z-20 max-h-60 overflow-y-auto">
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Pilih Ikon Visual</p>
                        <div className="grid grid-cols-6 gap-2">
                            {iconOptions.map((name) => {
                                const IconComp = getIcon(name);
                                const isSelected = name === selectedIcon;
                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        title={name}
                                        onClick={() => {
                                            onChange(name);
                                            setOpen(false);
                                        }}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                            isSelected 
                                                ? 'bg-primary text-white scale-105 shadow-md shadow-primary/20' 
                                                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        <IconComp className="w-5 h-5" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

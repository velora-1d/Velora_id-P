'use client';

import { getIcon, iconOptions } from '@/lib/icons';

export default function IconPicker({ value, onChange, label = 'Icon' }) {
    const PreviewIcon = getIcon(value);

    return (
        <div>
            <label className="block text-sm text-gray-400 mb-1">{label}</label>
            <div className="flex gap-2">
                <div className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-primary">
                    <PreviewIcon className="w-5 h-5" />
                </div>
                <select
                    value={value || 'Globe'}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                    {iconOptions.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

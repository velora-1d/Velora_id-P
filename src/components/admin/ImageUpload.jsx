'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Edit } from 'lucide-react';

export default function ImageUpload({ value, onChange, folder = 'general', label = 'Gambar', required = true }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size to 5MB
        if (file.size > 5 * 1024 * 1024) {
            setError('Ukuran file maksimal 5MB');
            return;
        }

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            onChange(data.url);
        } catch (err) {
            setError(err.message || 'Gagal mengunggah gambar');
        } finally {
            setUploading(false);
            // Clear input
            e.target.value = '';
        }
    };

    const triggerSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                {value && (
                    <button
                        type="button"
                        onClick={triggerSelect}
                        disabled={uploading}
                        className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        <Edit className="w-3 h-3" /> Ganti Gambar
                    </button>
                )}
            </div>
            
            {value ? (
                <div className="relative group inline-block rounded-xl overflow-hidden border border-gray-700 bg-gray-900 h-80 max-w-full">
                    {/* Natural aspect-ratio preview */}
                    <img src={value} alt="Preview" className="h-full w-auto object-contain" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={triggerSelect}
                            disabled={uploading}
                            className="p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-lg"
                            title="Ganti Gambar"
                        >
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                            title="Hapus Gambar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div 
                    onClick={triggerSelect}
                    className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-gray-800/50 transition-all group"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                        ) : (
                            <Upload className="w-8 h-8 text-gray-500 group-hover:text-primary mb-2 transition-colors" />
                        )}
                        <p className="text-sm text-gray-400 group-hover:text-gray-300">
                            {uploading ? 'Mengunggah...' : 'Klik untuk upload gambar'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">WebP, PNG, JPG (Maks. 5MB)</p>
                    </div>
                </div>
            )}

            {/* Hidden native input */}
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*" 
                onChange={handleUpload}
                disabled={uploading}
            />

            {/* Hidden validation input to trigger HTML5 constraint validation */}
            <input
                type="text"
                value={value || ''}
                readOnly
                required={required}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
                tabIndex={-1}
                onInvalid={(e) => {
                    e.target.setCustomValidity('Gambar ini wajib diunggah!');
                }}
                onInput={(e) => {
                    e.target.setCustomValidity('');
                }}
            />

            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        </div>
    );
}

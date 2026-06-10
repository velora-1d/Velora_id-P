'use client';

import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ value, onChange, folder = 'general', label = 'Gambar' }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

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

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            
            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                    <img src={value} alt="Preview" className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-gray-800/50 transition-all group">
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
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            )}

            {error && <p className="text-xs text-red-400">{error}</p>}
            
            {/* Fallback URL input */}
            {!uploading && (
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="url"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Atau masukkan URL gambar..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

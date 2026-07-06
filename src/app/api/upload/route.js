import { NextResponse } from 'next/server';
import { uploadToStorage } from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';

const allowedFolders = new Set(['blog', 'portfolio', 'services', 'about', 'founder', 'testimonials', 'site', 'general']);
const maxSize = 5 * 1024 * 1024;

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file');
        const requestedFolder = String(formData.get('folder') || 'general');
        const folder = allowedFolders.has(requestedFolder) ? requestedFolder : 'general';

        if (!file) {
            return NextResponse.json({ error: 'File belum dipilih' }, { status: 400 });
        }

        if (!file.type?.startsWith('image/')) {
            return NextResponse.json({ error: 'File wajib berupa gambar' }, { status: 422 });
        }

        if (file.size > maxSize) {
            return NextResponse.json({ error: 'Ukuran gambar maksimal 5MB' }, { status: 422 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-').toLowerCase();
        const fileName = `${folder}/${timestamp}-${originalName}`;

        const publicUrl = await uploadToStorage(buffer, fileName, file.type);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Upload API Error:', error);
        return NextResponse.json({ error: error.message || 'Gagal mengunggah gambar' }, { status: 500 });
    }
}

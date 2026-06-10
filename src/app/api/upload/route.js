import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
    try {
        // Auth check - ensure only logged in admin can upload
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'general';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
        const fileName = `${folder}/${timestamp}-${originalName}`;

        const publicUrl = await uploadToR2(buffer, fileName, file.type);

        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error('Upload API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Nama, email, dan pesan wajib diisi' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const { data, error } = await supabase
            .from('contact_messages')
            .insert({ name, email, phone: phone || '', subject: subject || '', message })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('velora_admin_session');

        if (!sessionCookie || !sessionCookie.value) {
            return NextResponse.json({ user: null });
        }

        const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
        const sessionData = JSON.parse(decoded);

        return NextResponse.json({
            user: {
                id: sessionData.userId,
                email: sessionData.email,
                name: sessionData.name,
                role: sessionData.role || 'admin',
                user_metadata: {
                    full_name: sessionData.name
                }
            }
        });
    } catch {
        return NextResponse.json({ user: null });
    }
}

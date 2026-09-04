import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db/pgClient';
import { verifyPassword } from '@/lib/auth/password';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
        }

        // Normalize email: trim, lowercase, and handle comma typo (e.g. gmail,com -> gmail.com)
        const normalizedEmail = email.trim().toLowerCase().replace(/,com$/, '.com');

        const pool = getPool();
        const res = await pool.query(
            'SELECT id, email, password_hash, name, role FROM admin_users WHERE LOWER(email) = $1 LIMIT 1',
            [normalizedEmail]
        );

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
        }

        const user = res.rows[0];
        const isValid = verifyPassword(password, user.password_hash);

        if (!isValid) {
            return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
        }

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

        // Set secure HTTP-only session cookie valid for 7 days
        const sessionPayload = JSON.stringify({
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            timestamp: Date.now()
        });

        response.cookies.set('velora_admin_session', Buffer.from(sessionPayload).toString('base64'), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
    }
}

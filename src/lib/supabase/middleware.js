import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({ request })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If Supabase is disabled, handle admin auth via cookie
    if (!supabaseUrl || supabaseUrl.startsWith('###') || !supabaseKey) {
        const adminSession = request.cookies.get('velora_admin_session');
        const isLoggedIn = !!adminSession?.value;

        if (
            request.nextUrl.pathname.startsWith('/admin') &&
            !request.nextUrl.pathname.startsWith('/admin/login')
        ) {
            if (!isLoggedIn) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin/login'
                return NextResponse.redirect(url)
            }
        }

        if (request.nextUrl.pathname === '/admin/login' && isLoggedIn) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }

        return supabaseResponse;
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Protect /admin routes (except /admin/login)
    if (
        request.nextUrl.pathname.startsWith('/admin') &&
        !request.nextUrl.pathname.startsWith('/admin/login')
    ) {
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
    }

    // If logged in and visiting /admin/login, redirect to /admin
    if (request.nextUrl.pathname === '/admin/login' && user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createPgQueryBuilder } from '@/lib/db/pgClient'

export async function createClient() {
    const cookieStore = await cookies()

    // If PostgreSQL DATABASE_URL is configured or Supabase is deactivated
    if (process.env.DATABASE_URL && (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('###'))) {
        return createPgQueryBuilder(cookieStore);
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        if (process.env.DATABASE_URL) {
            return createPgQueryBuilder(cookieStore);
        }
    }

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // setAll called from Server Component — safe to ignore
                    }
                },
            },
        }
    )
}


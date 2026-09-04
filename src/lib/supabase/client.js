import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If Supabase is disabled / commented out, use API route /api/db for PostgreSQL
    if (!supabaseUrl || supabaseUrl.startsWith('###') || !supabaseKey) {
        return {
            from(table) {
                let operation = 'SELECT';
                let fields = '*';
                const filters = [];
                let orderBy = null;
                let limit = null;
                let single = false;
                let dataPayload = null;

                const builder = {
                    select(f = '*') {
                        fields = f;
                        return builder;
                    },
                    eq(col, val) {
                        filters.push({ col, val });
                        return builder;
                    },
                    order(col, { ascending = true } = {}) {
                        orderBy = { col, ascending };
                        return builder;
                    },
                    limit(n) {
                        limit = n;
                        return builder;
                    },
                    single() {
                        single = true;
                        return builder;
                    },
                    insert(data) {
                        operation = 'INSERT';
                        dataPayload = data;
                        return builder;
                    },
                    update(data) {
                        operation = 'UPDATE';
                        dataPayload = data;
                        return builder;
                    },
                    delete() {
                        operation = 'DELETE';
                        return builder;
                    },
                    async then(resolve, reject) {
                        try {
                            const res = await fetch('/api/db', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    table,
                                    operation,
                                    fields,
                                    filters,
                                    orderBy,
                                    limit,
                                    single,
                                    data: dataPayload
                                })
                            });
                            const result = await res.json();
                            resolve(result);
                        } catch (err) {
                            resolve({ data: single ? null : [], error: { message: err.message }, count: 0 });
                        }
                    }
                };
                return builder;
            },
            auth: {
                async getUser() {
                    return { data: { user: null }, error: null };
                },
                async signInWithPassword({ email, password }) {
                    return { data: { user: { id: 'admin', email } }, error: null };
                },
                async signOut() {
                    return { error: null };
                }
            }
        };
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
}

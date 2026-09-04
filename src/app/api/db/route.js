import { NextResponse } from 'next/server';
import { createPgQueryBuilder } from '@/lib/db/pgClient';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            table,
            operation = 'SELECT',
            fields = '*',
            filters = [],
            orderBy = null,
            limit = null,
            single = false,
            data = null
        } = body;

        if (!table) {
            return NextResponse.json({ error: 'Tabel wajib disertakan' }, { status: 400 });
        }

        const client = createPgQueryBuilder();
        let query = client.from(table);

        if (operation === 'SELECT') {
            query = query.select(fields);
        } else if (operation === 'INSERT') {
            query = query.insert(data);
        } else if (operation === 'UPDATE') {
            query = query.update(data);
        } else if (operation === 'DELETE') {
            query = query.delete();
        }

        if (Array.isArray(filters)) {
            for (const f of filters) {
                if (f.col && f.val !== undefined) {
                    query = query.eq(f.col, f.val);
                }
            }
        }

        if (orderBy && orderBy.col) {
            query = query.order(orderBy.col, { ascending: orderBy.ascending !== false });
        }

        if (limit) {
            query = query.limit(limit);
        }

        if (single) {
            query = query.single();
        }

        const result = await query;
        return NextResponse.json(result);
    } catch (err) {
        console.error('API /api/db error:', err.message);
        return NextResponse.json({ data: null, error: { message: err.message } }, { status: 500 });
    }
}

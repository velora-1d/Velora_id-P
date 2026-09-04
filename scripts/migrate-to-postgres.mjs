import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const connectionString = 'postgresql://db-velora:tUTKXsa6tln2Cw0lwyOI@srv1933714.tail4f93f2.ts.net:5435/db-velora';

// Find the latest backup directory
const backupsDir = path.join(projectRoot, 'backups');
const backupDirs = fs.readdirSync(backupsDir)
    .filter(d => d.startsWith('supabase_'))
    .sort()
    .reverse();

if (backupDirs.length === 0) {
    console.error('❌ Tidak ditemukan folder backup Supabase di folder backups/');
    process.exit(1);
}

const latestBackup = path.join(backupsDir, backupDirs[0]);
console.log(`📁 Menggunakan data backup dari: ${latestBackup}`);

const client = new Client({
    connectionString,
    ssl: false
});

async function main() {
    try {
        console.log('🔌 Menghubungkan ke PostgreSQL db-velora...');
        await client.connect();
        console.log('✅ Berhasil terhubung ke database target!');

        // 1. Setup prerequisite roles and auth helpers for compatibility
        console.log('🛠️ Menyiapkan schema & roles kompatibilitas...');
        await client.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'anon') THEN
                    CREATE ROLE anon NOLOGIN;
                END IF;
                IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'authenticated') THEN
                    CREATE ROLE authenticated NOLOGIN;
                END IF;
            END $$;

            CREATE SCHEMA IF NOT EXISTS auth;
            CREATE OR REPLACE FUNCTION auth.role() RETURNS text AS $$
                SELECT 'authenticated'::text;
            $$ LANGUAGE sql STABLE;

            CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid AS $$
                SELECT gen_random_uuid();
            $$ LANGUAGE sql STABLE;
        `);

        // 2. Read and apply schema from complete-migration-safe.sql
        console.log('📜 Menerapkan skema tabel dari complete-migration-safe.sql...');
        const sqlPath = path.join(projectRoot, 'supabase', 'complete-migration-safe.sql');
        const rawSql = fs.readFileSync(sqlPath, 'utf-8');

        // Execute schema in clean transaction or blocks
        await client.query(rawSql);
        console.log('✅ Skema tabel berhasil dibuat / diselaraskan!');

        // 3. Restore data from backup
        console.log('📥 Memulihkan data Supabase ke PostgreSQL db-velora...');
        const allDataPath = path.join(latestBackup, 'all_data.json');
        const allData = JSON.parse(fs.readFileSync(allDataPath, 'utf-8'));

        // Restore in dependency-safe order (categories first, then projects & blogs, etc.)
        const insertionOrder = [
            'categories',
            'site_settings',
            'legalitas',
            'founder',
            'about_content',
            'workflow_steps',
            'services',
            'faqs',
            'featured_products',
            'product_benefits',
            'testimonials',
            'portfolio_projects',
            'blog_posts',
            'page_sections',
            'contact_messages'
        ];

        for (const tableName of insertionOrder) {
            const rows = allData[tableName];
            if (!rows || !Array.isArray(rows) || rows.length === 0) {
                console.log(`ℹ️ [${tableName}] Data kosong, dilewati.`);
                continue;
            }

            // Get column types for this table
            const colInfoRes = await client.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns
                WHERE table_name = $1
            `, [tableName]);
            const colTypes = {};
            colInfoRes.rows.forEach(r => {
                colTypes[r.column_name] = r.data_type.toLowerCase();
            });

            console.log(`⏳ Memasukkan ${rows.length} baris ke tabel ${tableName}...`);
            let insertedCount = 0;

            for (const row of rows) {
                const cols = Object.keys(row).filter(c => colTypes[c]);
                const colNames = cols.map(c => `"${c}"`).join(', ');
                const placeholders = cols.map((_, idx) => `$${idx + 1}`).join(', ');
                const values = cols.map(c => {
                    const v = row[c];
                    const type = colTypes[c];
                    if (v === null || v === undefined) return null;
                    if ((type === 'jsonb' || type === 'json') && (typeof v === 'object')) {
                        return JSON.stringify(v);
                    }
                    return v;
                });

                const query = `
                    INSERT INTO "${tableName}" (${colNames})
                    VALUES (${placeholders})
                    ON CONFLICT (id) DO UPDATE SET
                    ${cols.filter(c => c !== 'id').map(c => `"${c}" = EXCLUDED."${c}"`).join(', ')}
                `;

                try {
                    await client.query(query, values);
                    insertedCount++;
                } catch (rowErr) {
                    console.error(`⚠️ Gagal insert row ${row.id || row.slug || JSON.stringify(row).slice(0, 30)} di ${tableName}: ${rowErr.message}`);
                }
            }
            console.log(`✅ [${tableName}] Berhasil memulihkan ${insertedCount}/${rows.length} baris!`);
        }

        // 4. Verification
        console.log('\n📊 VERIFIKASI DATA DATABASE BARU (db-velora):');
        for (const tableName of insertionOrder) {
            try {
                const countRes = await client.query(`SELECT COUNT(*) as count FROM "${tableName}"`);
                console.log(`  - ${tableName}: ${countRes.rows[0].count} rows`);
            } catch (err) {
                console.log(`  - ${tableName}: ERROR (${err.message})`);
            }
        }

        console.log('\n🎉 MIGRASI DAN RESTORE DATA KE POSTGRESQL SELESAI DENGAN SUKSES!');

    } catch (err) {
        console.error('❌ Terjadi kesalahan saat migrasi:', err);
    } finally {
        await client.end();
    }
}

main();

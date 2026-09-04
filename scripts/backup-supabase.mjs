import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Read .env.local
const envPath = path.join(projectRoot, '.env.local');
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
            const k = trimmed.slice(0, eqIdx).trim();
            const v = trimmed.slice(eqIdx + 1).trim();
            process.env[k] ||= v;
        }
    }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aenvcxkxbvwrcwsffdbb.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_KEY) {
    console.error('❌ Supabase key not found in environment');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const tables = [
    'about_content',
    'blog_posts',
    'categories',
    'contact_messages',
    'faqs',
    'featured_products',
    'founder',
    'legalitas',
    'page_sections',
    'portfolio_projects',
    'product_benefits',
    'services',
    'site_settings',
    'testimonials',
    'workflow_steps'
];

function formatSqlValue(val) {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'object') {
        return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
    }
    return `'${String(val).replace(/'/g, "''")}'`;
}

async function backup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(projectRoot, 'backups', `supabase_${timestamp}`);
    fs.mkdirSync(backupDir, { recursive: true });

    console.log(`🚀 Memulai backup Supabase ke: ${backupDir}`);

    const allData = {};
    let sqlContent = `-- VELORA SUPABASE DATA BACKUP\n-- Generated: ${new Date().toISOString()}\n-- Source: ${SUPABASE_URL}\n\n`;

    for (const table of tables) {
        console.log(`⏳ Mengambil data tabel: ${table}...`);
        const { data, error } = await supabase.from(table).select('*');
        if (error) {
            console.error(`⚠️ Error fetching ${table}:`, error.message);
            allData[table] = { error: error.message };
            continue;
        }

        allData[table] = data || [];
        fs.writeFileSync(
            path.join(backupDir, `${table}.json`),
            JSON.stringify(data || [], null, 2),
            'utf-8'
        );

        console.log(`✅ [${table}] ${data ? data.length : 0} rows dicadangkan.`);

        if (data && data.length > 0) {
            sqlContent += `-- Table: ${table} (${data.length} rows)\n`;
            for (const row of data) {
                const columns = Object.keys(row);
                const values = columns.map(c => formatSqlValue(row[c]));
                sqlContent += `INSERT INTO ${table} (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT DO NOTHING;\n`;
            }
            sqlContent += '\n';
        }
    }

    // Save full JSON and SQL dump
    fs.writeFileSync(path.join(backupDir, 'all_data.json'), JSON.stringify(allData, null, 2), 'utf-8');
    fs.writeFileSync(path.join(backupDir, 'restore_data.sql'), sqlContent, 'utf-8');

    // Also copy to Obsidian Vault AGY-Memory
    const obsidianBackupDir = 'C:\\Users\\p\\Documents\\Obsidian Vault\\00-AGY-Memory\\Velora_id-P\\Backups';
    try {
        fs.mkdirSync(obsidianBackupDir, { recursive: true });
        fs.writeFileSync(path.join(obsidianBackupDir, `supabase_backup_latest.json`), JSON.stringify(allData, null, 2), 'utf-8');
        fs.writeFileSync(path.join(obsidianBackupDir, `supabase_backup_latest.sql`), sqlContent, 'utf-8');
        console.log(`📋 Backup berhasil disinkronkan ke Obsidian Vault AGY Memory!`);
    } catch (e) {
        console.warn(`⚠️ Gagal menyalin ke Obsidian Vault:`, e.message);
    }

    console.log(`\n🎉 BACKUP SUPABASE SELESAI!`);
    console.log(`📁 Lokasi: ${backupDir}`);
    console.log(`📄 Files: all_data.json, restore_data.sql, dan individual JSON tables.`);
}

backup().catch(console.error);

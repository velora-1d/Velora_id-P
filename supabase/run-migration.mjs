/**
 * Run Supabase migration via REST API
 * Usage: node supabase/run-migration.mjs [migration-file.sql]
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const index = trimmed.indexOf('=');
        if (index === -1) continue;
        const key = trimmed.slice(0, index);
        const value = trimmed.slice(index + 1);
        process.env[key] ||= value;
    }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aenvcxkxbvwrcwsffdbb.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const key = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
if (!key) {
    console.error('❌ No Supabase key found. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, key);

// Read migration SQL
const migrationFile = process.argv[2] || 'complete-migration-safe.sql';
const sqlFile = fs.readFileSync(path.join(__dirname, migrationFile), 'utf-8')
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

// Split SQL into individual statements
const statements = sqlFile
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

console.log(`📦 Running ${migrationFile} (${statements.length} statements)...\n`);

let applied = 0;
for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const preview = stmt.split('\n')[0].substring(0, 80);

    try {
        const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' });
        if (error) {
            // Try raw SQL via postgrest
            console.log(`⚠️  [${i + 1}/${statements.length}] ${preview}... (${error.message})`);
        } else {
            applied++;
            console.log(`✅ [${i + 1}/${statements.length}] ${preview}...`);
        }
    } catch (err) {
        console.log(`⚠️  [${i + 1}/${statements.length}] ${preview}... (skipped: ${err.message})`);
    }
}

if (applied === statements.length) {
    console.log('\n✅ Migration script completed.');
} else {
    console.log(`\n⚠️  Applied ${applied}/${statements.length} statements.`);
    console.log('Run the SQL manually in Supabase SQL Editor if RPC is not available:');
    console.log('   https://supabase.com/dashboard/project/aenvcxkxbvwrcwsffdbb/sql/new');
    process.exitCode = 1;
}

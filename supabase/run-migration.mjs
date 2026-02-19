/**
 * Run Supabase migration via REST API
 * Usage: node supabase/run-migration.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
const sqlFile = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf-8');

// Split SQL into individual statements
const statements = sqlFile
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📦 Running migration (${statements.length} statements)...\n`);

for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const preview = stmt.split('\n')[0].substring(0, 80);

    try {
        const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' });
        if (error) {
            // Try raw SQL via postgrest
            console.log(`⚠️  [${i + 1}/${statements.length}] ${preview}... (RPC not available, skipping)`);
        } else {
            console.log(`✅ [${i + 1}/${statements.length}] ${preview}...`);
        }
    } catch (err) {
        console.log(`⚠️  [${i + 1}/${statements.length}] ${preview}... (skipped: ${err.message})`);
    }
}

console.log('\n✅ Migration script completed.');
console.log('\n⚠️  If RPC was not available, please run the SQL manually in Supabase SQL Editor:');
console.log('   https://supabase.com/dashboard/project/aenvcxkxbvwrcwsffdbb/sql/new');

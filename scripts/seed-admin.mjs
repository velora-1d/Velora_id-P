import pg from 'pg';
import crypto from 'crypto';

const { Client } = pg;

export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

const connectionString = 'postgresql://db-velora:tUTKXsa6tln2Cw0lwyOI@100.77.202.57:5435/db-velora';

async function seed() {
    const client = new Client({ connectionString, ssl: false });
    await client.connect();

    const email = 'nawawimahinutsman@gmail.com';
    const rawPassword = 'Mahin_200601';
    const passwordHash = hashPassword(rawPassword);
    const name = 'Mahin Utsman Nawawi';
    const role = 'superadmin';

    console.log(`Menambahkan admin: ${email}...`);

    await client.query(`
        INSERT INTO admin_users (email, password_hash, name, role, updated_at)
        VALUES ($1, $2, $3, $4, now())
        ON CONFLICT (email) DO UPDATE SET
            password_hash = EXCLUDED.password_hash,
            name = EXCLUDED.name,
            role = EXCLUDED.role,
            updated_at = now();
    `, [email, passwordHash, name, role]);

    const res = await client.query('SELECT id, email, name, role, created_at FROM admin_users WHERE email = $1', [email]);
    console.log('✅ Admin berhasil tersimpan di database:');
    console.log(res.rows[0]);

    await client.end();
}

seed().catch(console.error);

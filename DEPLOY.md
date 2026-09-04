# 🚀 Panduan Deployment Docker — Velora ID

File ini berisi instruksi lengkap untuk membangun (*build*) dan menjalankan kontainer Docker aplikasi **Velora ID** (Next.js 16 + React 19 + pnpm standalone).

---

## 📦 Arsitektur Dockerfile

Dockerfile menggunakan metode **Multi-Stage Build** berbasis **Alpine Linux**:
- **Stage 1 (`base` & `deps`)**: Menginstall dependency menggunakan `pnpm install --frozen-lockfile`.
- **Stage 2 (`builder`)**: Melakukan build Next.js dalam mode `standalone`.
- **Stage 3 (`runner`)**: Menghasilkan image produksi yang sangat ringan (~130MB), dijalankan oleh user non-root `nextjs:nodejs` untuk keamanan maksimal.

---

## 🛠️ Langkah 1: Persiapan Environment

Salin file `.env.example` menjadi `.env.production`:

```bash
cp .env.example .env.production
```

Buka `.env.production` dan sesuaikan nilainya:
```env
PORT=3000
NODE_ENV=production
HOSTNAME=0.0.0.0

# Database PostgreSQL
DATABASE_URL=postgresql://db-velora:password@host:5435/db-velora

# S3 / RustFS Object Storage
SUPABASE_S3_ENDPOINT=https://your-s3-endpoint.com
SUPABASE_STORAGE_BUCKET=velora-assets
SUPABASE_S3_ACCESS_KEY_ID=your-access-key-id
SUPABASE_S3_SECRET_ACCESS_KEY=your-secret-access-key
SUPABASE_STORAGE_PUBLIC_URL=https://your-storage-public-url.com
```

---

## 🐳 Opsi A: Deployment Menggunakan Docker Compose (Direkomendasikan)

### 1. Jalankan Kontainer di Background
```bash
docker compose up -d --build
```

### 2. Cek Status Kontainer
```bash
docker compose ps
```

### 3. Lihat Log Real-Time
```bash
docker compose logs -f
```

### 4. Hentikan Kontainer
```bash
docker compose down
```

---

## 🐳 Opsi B: Deployment Menggunakan Docker CLI Standar

### 1. Build Docker Image
```bash
docker build -t velora-id:latest .
```

### 2. Jalankan Image
```bash
docker run -d \
  --name velora-web \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  velora-id:latest
```

---

## 🌐 Opsi C: Deployment ke VPS / Coolify / Portainer

1. **Coolify**:
   - Pilih tipe deployment: **Dockerfile**.
   - Input environment variables dari `.env.example` ke dashboard Coolify.
   - Set Port: `3000`.

2. **Portainer**:
   - Buat Stack baru menggunakan isi dari `docker-compose.yml`.
   - Tambahkan Environment Variables dari `.env.example`.
   - Klik **Deploy the stack**.

---

## 🔍 Health Check & Verifikasi
Setelah kontainer berjalan, aplikasi dapat diakses di:
- **Web**: `http://localhost:3000`
- **Health Check Endpoint**: `http://localhost:3000/api/db` (status koneksi database)

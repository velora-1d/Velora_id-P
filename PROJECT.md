# Velora ID

## Deskripsi
Website company profile dan dashboard CMS Velora ID untuk mengelola konten landing page, blog, portfolio, kategori, pesan, dan pengaturan website.

## Stack Teknologi
- Frontend: Next.js App Router
- Backend: Next.js Fullstack
- Database: Supabase PostgreSQL
- ORM: Supabase client
- Auth: Supabase Auth
- Hosting: Vercel
- Real-time: N/A

## Mode Arsitektur
[x] Next.js Fullstack
[ ] Laravel 13 API + Next.js Frontend
[ ] Lainnya: ___

## Target Platform
[x] Web only
[ ] Mobile only
[ ] Web + Mobile

## Multi-tenant
[ ] Ya
[x] Tidak

## Skala User
[x] Kecil (< 100 user)
[ ] Menengah (< 10.000 user)
[ ] Besar (> 10.000 user)

## Tim
[x] Solo developer
[ ] Tim

## Hosting & Infra
- Development: local
- Staging: Vercel preview
- Production: Vercel

## Catatan Khusus
- Semua gambar dashboard wajib melalui upload.
- Storage memakai Supabase Storage S3-compatible API.
- Detail artikel dan portfolio harus berupa halaman shareable, bukan popup.
- Icon dashboard memakai Lucide icon name, bukan emoji.

## Progress Terakhir
- Menambahkan Supabase Agent Skills.
- Menambahkan migration phase 4 tanpa seed untuk kategori, SEO, slug portfolio, dan field CMS.
- Menambahkan upload-only image component dan helper Supabase Storage S3-compatible.
- Menambahkan CRUD kategori, icon picker, dan halaman detail portfolio.

## Last Updated
2026-07-04

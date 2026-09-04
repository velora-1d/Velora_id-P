-- Script Seed SQL untuk Tabel 'categories' di Supabase
-- Anda dapat menjalankan query ini langsung di SQL Editor Supabase.

INSERT INTO categories (type, name, slug, description, icon_name, sort_order, published) VALUES
-- Kategori untuk Layanan / Services
('services', 'Jasa Cepat', 'quick', 'Solusi instan untuk kebutuhan website mendesak. Hemat waktu, biaya terjangkau, dan langsung siap pakai.', 'Rocket', 1, true),
('services', 'Jasa Menengah', 'mid', 'Tingkatkan kredibilitas bisnis Anda dengan website profesional yang terintegrasi dan mudah dikelola.', 'Building2', 2, true),
('services', 'Sistem Unggulan', 'premium', 'Sistem manajemen terintegrasi untuk operasional sekolah dan pesantren yang lebih efisien dan modern.', 'Database', 3, true),
('services', 'Jasa Tambahan', 'addon', 'Layanan pendukung untuk memaksimalkan potensi website dan sistem digital Anda.', 'Search', 4, true),

-- Kategori untuk Blog / Artikel
('blog', 'Teknologi & Coding', 'teknologi-coding', 'Artikel terbaru seputar teknologi informasi, pemrograman, web development, dan solusi sistem digital.', 'Code2', 1, true),
('blog', 'Bisnis & UMKM', 'bisnis-umkm', 'Tips dan panduan go-digital untuk meningkatkan skala bisnis, penjualan, dan efisiensi operasional UMKM.', 'Briefcase', 2, true),
('blog', 'Pendidikan & Edukasi', 'pendidikan-edukasi', 'Inovasi digital di dunia akademis, sekolah, pesantren, dan manajemen pendidikan modern.', 'GraduationCap', 3, true),
('blog', 'Pengumuman', 'pengumuman', 'Kabar terbaru, rilis fitur, dan pengumuman resmi mengenai layanan dari Velora ID.', 'Bell', 4, true),

-- Kategori untuk Portfolio / Proyek
('portfolio', 'Aplikasi Web', 'aplikasi-web', 'Sistem dashboard admin custom, portal internal perusahaan, dan platform SaaS berbasis cloud.', 'LayoutDashboard', 1, true),
('portfolio', 'Profil Perusahaan', 'profil-perusahaan', 'Website company profile interaktif, modern, responsive, dan dioptimasi penuh untuk SEO Google.', 'Globe', 2, true),
('portfolio', 'Sistem Pendidikan', 'sistem-pendidikan', 'Implementasi sistem terpadu sekolah, e-rapor, absensi digital, dan keuangan pesantren.', 'GraduationCap', 3, true),
('portfolio', 'Toko Online', 'toko-online', 'Platform e-commerce penjualan produk digital maupun fisik dengan integrasi payment gateway.', 'CreditCard', 4, true);

-- ============================================
-- VELORA DATABASE MIGRATION — PHASE 2
-- Run this AFTER migration.sql in Supabase SQL Editor
-- Adds: featured_products, product_benefits, about_content,
--        founder, workflow_steps, legalitas, site_settings
-- ============================================

-- 1. Featured Products
CREATE TABLE IF NOT EXISTS featured_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    color_gradient TEXT DEFAULT 'from-blue-500 to-indigo-600',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Product Benefits
CREATE TABLE IF NOT EXISTS product_benefits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    benefit TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. About Content
CREATE TABLE IF NOT EXISTS about_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    title TEXT DEFAULT '',
    content TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    stat_value TEXT DEFAULT '',
    stat_label TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Founder
CREATE TABLE IF NOT EXISTS founder (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT DEFAULT '',
    photo_url TEXT DEFAULT '/images/founder.jpg',
    bio_paragraphs JSONB DEFAULT '[]',
    stats JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '[]',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Workflow Steps
CREATE TABLE IF NOT EXISTS workflow_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    color_gradient TEXT DEFAULT 'from-blue-500 to-blue-600',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Legalitas
CREATE TABLE IF NOT EXISTS legalitas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nib TEXT NOT NULL,
    status TEXT DEFAULT 'AKTIF / TERBIT',
    nama_usaha TEXT DEFAULT '',
    nama_usaha_sub TEXT DEFAULT '',
    pemilik TEXT DEFAULT '',
    pemilik_title TEXT DEFAULT '',
    domisili TEXT DEFAULT '',
    domisili_sub TEXT DEFAULT '',
    tanggal_terbit TEXT DEFAULT '',
    tanggal_terbit_sub TEXT DEFAULT '',
    perizinan_text TEXT DEFAULT '',
    perizinan_sub TEXT DEFAULT '',
    skala_text TEXT DEFAULT '',
    skala_sub TEXT DEFAULT '',
    wilayah_desc TEXT DEFAULT '',
    kbli_desc TEXT DEFAULT '',
    footer_text TEXT DEFAULT '',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Site Settings (for Hero stats, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL DEFAULT '',
    setting_label TEXT DEFAULT '',
    setting_suffix TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS
-- ============================================
ALTER TABLE featured_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE legalitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read featured_products" ON featured_products FOR SELECT USING (published = true);
CREATE POLICY "Public read product_benefits" ON product_benefits FOR SELECT USING (published = true);
CREATE POLICY "Public read about_content" ON about_content FOR SELECT USING (published = true);
CREATE POLICY "Public read founder" ON founder FOR SELECT USING (published = true);
CREATE POLICY "Public read workflow_steps" ON workflow_steps FOR SELECT USING (published = true);
CREATE POLICY "Public read legalitas" ON legalitas FOR SELECT USING (published = true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (published = true);

-- Admin full access
CREATE POLICY "Admin full featured_products" ON featured_products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full product_benefits" ON product_benefits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full founder" ON founder FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full workflow_steps" ON workflow_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full legalitas" ON legalitas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA
-- ============================================

-- Featured Products
INSERT INTO featured_products (icon_name, title, description, color_gradient, sort_order) VALUES
('Wallet', 'Sistem Bendahara', 'Payment gateway terintegrasi, invoice real-time, notifikasi WA otomatis ke wali santri.', 'from-emerald-500 to-teal-600', 1),
('Users', 'Sistem Sekretaris', 'Master data santri lengkap: biodata, kelas, jurusan, mutasi, dan dokumen.', 'from-blue-500 to-indigo-600', 2),
('GraduationCap', 'Sistem Pendidikan', 'E-Rapor digital, perhitungan nilai nasional, ijazah digital yang sah.', 'from-blue-500 to-accent', 3);

-- Product Benefits
INSERT INTO product_benefits (benefit, sort_order) VALUES
('Terintegrasi dalam satu platform', 1),
('Notifikasi real-time via WhatsApp', 2),
('Dashboard admin yang mudah digunakan', 3),
('Laporan keuangan otomatis', 4),
('Support & maintenance berkelanjutan', 5),
('Customizable sesuai kebutuhan', 6);

-- About Content
INSERT INTO about_content (section_key, title, content, image_url, stat_value, stat_label, sort_order) VALUES
('story_title', 'Sejarah Velora', '', '', '', '', 1),
('story_p1', '', 'Velora didirikan pada tahun 2023 dengan visi sederhana: menjembatani kesenjangan antara teknologi canggih dan kebutuhan bisnis praktis. Bermula dari sebuah tim kecil pengembang yang passionate, kami berkembang menjadi konsultan transformasi digital yang melayani berbagai industri.', '', '', '', 2),
('story_p2', '', 'Nama "Velora" diambil dari kata "Velocity" (kecepatan) dan "Aurora" (cahaya baru), melambangkan komitmen kami untuk membawa percepatan dan perspektif baru bagi setiap klien kami. Kami percaya bahwa teknologi bukan hanya alat, tetapi katalis untuk perubahan positif.', '', '', '', 3),
('image', '', '', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', '', '', 4),
('stat_projects', '', '', '', '50', 'Proyek Selesai', 5),
('stat_satisfaction', '', '', '', '98', 'Klien Puas', 6);

-- Founder
INSERT INTO founder (name, title, photo_url, bio_paragraphs, stats, social_links) VALUES
('Mahin Utsman Nawawi, S.H.', 'Founder & CEO', '/images/founder.jpg',
'["Seorang Sarjana Hukum yang memiliki passion kuat di bidang teknologi dan pengembangan web. Kombinasi unik antara latar belakang hukum dan keahlian teknis memberikan perspektif holistik dalam membangun solusi digital yang tidak hanya canggih, tapi juga aman dan sesuai regulasi.", "Berbasis di <strong class=\"text-white\">Pasirjambu, Bandung</strong>, Mahin mendirikan Velora pada tahun 2023 dengan misi sederhana: membantu UMKM dan institusi Indonesia untuk go digital dengan cara yang terjangkau dan berkualitas.", "Dengan pengalaman menangani berbagai proyek mulai dari website sederhana hingga sistem kompleks seperti manajemen pesantren dan integrasi payment gateway, Mahin memimpin tim Velora untuk selalu mengutamakan kualitas dan kepuasan klien."]',
'[{"value": "50+", "label": "Proyek"}, {"value": "2023", "label": "Didirikan"}, {"value": "24/7", "label": "Support"}]',
'[{"type": "whatsapp", "href": "https://wa.me/6281320442174", "label": "WhatsApp"}, {"type": "linkedin", "href": "https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/", "label": "LinkedIn"}, {"type": "tiktok", "href": "https://www.tiktok.com/@velora002", "label": "TikTok"}, {"type": "github", "href": "https://github.com/mahinutsmannawawi20-svg", "label": "GitHub"}]');

-- Workflow Steps
INSERT INTO workflow_steps (icon_name, title, description, color_gradient, sort_order) VALUES
('MessageSquare', 'Konsultasi', 'Diskusi kebutuhan via WhatsApp. Kami dengarkan masalah Anda.', 'from-blue-500 to-blue-600', 1),
('FileSearch', 'Proposal', 'Solusi terbaik dengan timeline dan estimasi transparan.', 'from-accent to-accent-dark', 2),
('Code2', 'Development', 'Proses development dengan update real-time. Revisi unlimited.', 'from-indigo-500 to-indigo-600', 3),
('Rocket', 'Launch', 'Go live dengan garansi maintenance dan support berkelanjutan.', 'from-emerald-500 to-emerald-600', 4);

-- Legalitas
INSERT INTO legalitas (nib, status, nama_usaha, nama_usaha_sub, pemilik, pemilik_title, domisili, domisili_sub, tanggal_terbit, tanggal_terbit_sub, perizinan_text, perizinan_sub, skala_text, skala_sub, wilayah_desc, kbli_desc, footer_text) VALUES
('3110250097422', 'AKTIF / TERBIT', 'Velora ID', 'Digital Services', 'Mahin Utsman Nawawi, S.H.', 'Founder & CEO', 'Kabupaten Bandung', 'Jawa Barat, Indonesia', '31 Oktober 2025', 'via Sistem OSS', 'Perizinan Berbasis Risiko', 'Tingkat Risiko Rendah', 'Skala Usaha Mikro', 'Terverifikasi OSS', 'Seluruh Wilayah Republik Indonesia. Kami melayani klien dari Sabang sampai Merauke dengan komitmen kualitas yang sama.', 'KBLI 46699 — Perdagangan Besar Produk Lainnya YTDL. Mencakup layanan digital, pengembangan web, dan solusi teknologi.', 'Legalitas ini diterbitkan dan dikelola secara resmi melalui sistem OSS, serta ditandatangani secara elektronik oleh instansi terkait sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.');

-- Site Settings (Hero stats)
INSERT INTO site_settings (setting_key, setting_value, setting_label, setting_suffix, sort_order) VALUES
('hero_stat_projects', '50', 'Proyek Selesai', '+', 1),
('hero_stat_satisfaction', '98', 'Klien Puas', '%', 2),
('hero_stat_support', '24', 'Support', '/7', 3);

-- ============================================
-- VELORA DATABASE MIGRATION (COMPLETE)
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    image_url TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Technology',
    author TEXT NOT NULL DEFAULT 'Tim Velora',
    read_time TEXT DEFAULT '5 menit',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Portfolio Projects
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    client TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    challenge TEXT DEFAULT '',
    solution TEXT DEFAULT '',
    tech TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    icon TEXT DEFAULT '🌐',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT DEFAULT '',
    company TEXT DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    rating INTEGER DEFAULT 5,
    avatar_url TEXT DEFAULT '',
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Services
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id TEXT NOT NULL,
    category_name TEXT NOT NULL,
    category_description TEXT DEFAULT '',
    category_gradient TEXT DEFAULT 'from-blue-500 to-indigo-600',
    icon_name TEXT DEFAULT 'Globe',
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public: read published content
CREATE POLICY "Public can read published blog posts"
    ON blog_posts FOR SELECT
    USING (published = true);

CREATE POLICY "Public can read published portfolio"
    ON portfolio_projects FOR SELECT
    USING (published = true);

CREATE POLICY "Public can read published testimonials"
    ON testimonials FOR SELECT
    USING (published = true);

CREATE POLICY "Public can read published services"
    ON services FOR SELECT
    USING (published = true);

CREATE POLICY "Public can read published faqs"
    ON faqs FOR SELECT
    USING (published = true);

-- Public: insert contact messages
CREATE POLICY "Public can send contact messages"
    ON contact_messages FOR INSERT
    WITH CHECK (true);

-- Admin: full CRUD (authenticated users)
CREATE POLICY "Admin full access blog" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access portfolio" ON portfolio_projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access messages" ON contact_messages
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access services" ON services
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access faqs" ON faqs
    FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DATA — DATA REAL (BUKAN DUMMY)
-- ============================================

-- ===== BLOG POSTS =====
INSERT INTO blog_posts (title, slug, content, excerpt, image_url, category, author, read_time, published) VALUES
('Tren Transformasi Digital 2025', 'tren-transformasi-digital-2025',
'Transformasi digital bukan lagi pilihan, melainkan keharusan bagi bisnis yang ingin bertahan di era modern.

## 1. AI-Powered Automation
Kecerdasan buatan semakin accessible untuk UMKM. Chatbot, analisis data, dan personalisasi pelanggan kini bisa diimplementasikan dengan biaya terjangkau.

## 2. Low-Code/No-Code Platforms
Memungkinkan bisnis membangun aplikasi tanpa coding mendalam, mempercepat time-to-market secara signifikan.

## 3. Cloud-First Strategy
Infrastruktur cloud menjadi fondasi utama, memberikan skalabilitas dan efisiensi biaya yang lebih baik.

## 4. Cybersecurity Priority
Dengan meningkatnya digitalisasi, keamanan siber menjadi investasi wajib, bukan opsional.',
'Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.',
'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
'Technology', 'Tim Velora', '5 menit', true),

('Implementasi AI untuk UMKM', 'implementasi-ai-untuk-umkm',
'Banyak yang mengira AI hanya untuk perusahaan besar. Padahal, UMKM justru bisa mendapat keuntungan signifikan dari implementasi AI yang tepat.

## Chatbot untuk Customer Service
Respon pelanggan 24/7 tanpa menambah staf. Bisa handle FAQ, pesanan, dan keluhan secara otomatis.

## Analisis Penjualan Otomatis
AI bisa mengidentifikasi pattern pembelian, prediksi stok, dan rekomendasi produk yang perlu dipromosikan.

## Personalisasi Marketing
Email yang disesuaikan dengan behavior pelanggan meningkatkan conversion rate hingga 3x lipat.

## Mulai dari Mana?
Tidak perlu langsung kompleks. Mulai dari chatbot WhatsApp sederhana, lalu kembangkan seiring pertumbuhan bisnis.',
'Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.',
'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
'AI & Automation', 'Tim Velora', '4 menit', true),

('Migrasi ke Cloud: Panduan Lengkap', 'migrasi-ke-cloud-panduan-lengkap',
'Migrasi ke cloud adalah langkah besar yang membutuhkan perencanaan matang.

## Fase 1: Assessment
Audit infrastruktur existing. Identifikasi aplikasi mana yang prioritas untuk migrasi dan mana yang perlu refactoring.

## Fase 2: Pilih Provider
AWS, Google Cloud, atau Azure? Masing-masing punya kelebihan. Sesuaikan dengan kebutuhan dan budget.

## Fase 3: Pilot Project
Jangan langsung migrasi semua. Mulai dengan satu aplikasi non-critical untuk testing dan pembelajaran.

## Fase 4: Full Migration
Setelah pilot berhasil, lanjutkan migrasi bertahap dengan rollback plan yang jelas.',
'Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.',
'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
'Cloud Computing', 'Tim Velora', '6 menit', true);

-- ===== PORTFOLIO =====
INSERT INTO portfolio_projects (title, category, client, description, challenge, solution, tech, image_url, icon, published) VALUES
('E-Commerce Platform', 'Retail & E-Commerce', 'Fashion Hub Indonesia',
'Platform e-commerce multi-channel dengan integrasi payment gateway dan inventory management real-time.',
'Klien membutuhkan sistem yang dapat mengelola ribuan produk dengan banyak varian dan integrasi ke marketplace.',
'Kami membangun platform custom dengan dashboard terpusat, sync otomatis ke Tokopedia/Shopee, dan laporan penjualan real-time.',
'React, Node.js, PostgreSQL',
'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', '🛒', true),

('Digital Banking App', 'Finance & Banking', 'Bank Digital Nusantara',
'Aplikasi mobile banking dengan fitur transfer, pembayaran, dan investment tracking.',
'Membutuhkan keamanan tingkat tinggi dengan UX yang tetap mudah digunakan oleh semua kalangan.',
'Implementasi biometric authentication, end-to-end encryption, dengan UI/UX yang intuitif dan accessibility-friendly.',
'Flutter, Go, MongoDB',
'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', '💳', true),

('Hospital Management System', 'Healthcare', 'RS Sehat Sejahtera',
'Sistem informasi rumah sakit terintegrasi dengan rekam medis elektronik dan telemedicine.',
'Sistem lama berbasis kertas menyebabkan keterlambatan layanan dan kehilangan data pasien.',
'Migrasi penuh ke sistem digital dengan modul pendaftaran, antrian, rekam medis, billing, dan telemedicine.',
'Laravel, Vue.js, MySQL',
'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', '🏥', true),

('Fleet Management System', 'Logistics', 'Logistics Prima',
'Sistem tracking armada real-time dengan optimasi rute dan manajemen pengiriman.',
'Armada 200+ kendaraan sulit dipantau, banyak keterlambatan dan inefisiensi rute.',
'GPS tracking real-time, algoritma optimasi rute, dashboard monitoring, dan notifikasi otomatis ke pelanggan.',
'Python, Django, PostgreSQL',
'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', '🚚', true),

('Learning Management System', 'Education', 'EduTech Indonesia',
'Platform e-learning dengan virtual classroom, quiz interaktif, dan progress tracking.',
'Pandemi memaksa sekolah beralih online tanpa infrastruktur yang memadai.',
'LMS lengkap dengan video conference, bank soal, rapor digital, dan integrasi dengan sistem sekolah.',
'Next.js, Firebase, WebRTC',
'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80', '📚', true),

('Business Analytics Dashboard', 'Retail & E-Commerce', 'Retail Mart Group',
'Dashboard analytics real-time dengan AI-powered insights untuk pengambilan keputusan bisnis.',
'Data tersebar di banyak sistem, sulit mendapat gambaran bisnis secara menyeluruh.',
'Data warehouse terpusat dengan visualisasi interaktif dan prediksi penjualan berbasis machine learning.',
'React, Python, TensorFlow',
'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', '📊', true);

-- ===== TESTIMONIALS =====
INSERT INTO testimonials (name, role, company, content, rating, published) VALUES
('Ustadz Ahmad Fauzi', 'Kepala Pesantren Al-Hikmah', 'Pesantren Al-Hikmah',
 'Velora sangat membantu digitalisasi administrasi pesantren kami. Sistem bendahara terintegrasi WA membuat pembayaran SPP jadi transparan.', 5, true),
('Rizky Pratama', 'Mahasiswa IT', '',
 'Deploy website tugas kuliah dalam hitungan jam! Responsif dan profesional. Sangat recommended untuk mahasiswa yang butuh website cepat.', 5, true),
('Siti Nurhaliza', 'Owner Toko Online', 'Toko Fashion SN',
 'Integrasi payment gateway Midtrans untuk toko online kami berjalan lancar. Tim support sangat responsif dan helpful.', 5, true),
('Budi Santoso', 'Direktur', 'CV Maju Jaya',
 'Website company profile kami jadi lebih profesional. SEO-nya juga bagus, sekarang sudah muncul di Google page 1!', 5, true),
('Ibu Dewi Kartika', 'Kepala Sekolah', 'SDN 01',
 'Sistem e-learning yang dibuatkan sangat user-friendly. Guru-guru kami yang gaptek pun bisa pakai dengan mudah.', 5, true),
('Andi Wijaya', 'IT Manager', 'PT Sukses',
 'Maintenance server kami ditangani dengan baik. Response time cepat dan harga sangat bersaing.', 5, true);

-- ===== SERVICES =====
INSERT INTO services (category_id, category_name, category_description, category_gradient, icon_name, title, description, sort_order, published) VALUES
-- Jasa Cepat
('quick', 'Jasa Cepat', 'Online dalam hitungan jam', 'from-emerald-500 to-teal-600', 'Rocket', 'Deploy Website', 'Laravel, React, HTML – langsung online di VPS dengan domain & SSL.', 1, true),
('quick', 'Jasa Cepat', 'Online dalam hitungan jam', 'from-emerald-500 to-teal-600', 'Globe', 'Website Tugas/Demo', 'Siap diakses publik untuk presentasi atau demo klien.', 2, true),
('quick', 'Jasa Cepat', 'Online dalam hitungan jam', 'from-emerald-500 to-teal-600', 'Shield', 'Pasang Domain & SSL', 'HTTPS aktif, domain custom, siap live.', 3, true),
('quick', 'Jasa Cepat', 'Online dalam hitungan jam', 'from-emerald-500 to-teal-600', 'Server', 'Maintenance Ringan', 'Cek server, perbaikan error, backup rutin.', 4, true),
-- Jasa Menengah
('mid', 'Jasa Menengah', 'Solusi untuk UMKM & Lembaga', 'from-blue-500 to-indigo-600', 'Building2', 'Website Company Profile', 'Profil usaha/lembaga profesional dengan integrasi WhatsApp.', 1, true),
('mid', 'Jasa Menengah', 'Solusi untuk UMKM & Lembaga', 'from-blue-500 to-indigo-600', 'CreditCard', 'Integrasi Payment Gateway', 'Midtrans/Xendit dengan invoice otomatis & notifikasi WA.', 2, true),
('mid', 'Jasa Menengah', 'Solusi untuk UMKM & Lembaga', 'from-blue-500 to-indigo-600', 'LayoutDashboard', 'Dashboard Admin', 'CRUD data, laporan, manajemen konten yang mudah.', 3, true),
('mid', 'Jasa Menengah', 'Solusi untuk UMKM & Lembaga', 'from-blue-500 to-indigo-600', 'Globe', 'Landing Page Promosi', 'Halaman khusus untuk campaign marketing & lead generation.', 4, true),
-- Sistem Unggulan
('premium', 'Sistem Unggulan', 'Enterprise-grade untuk Sekolah & Pesantren', 'from-blue-600 to-accent', 'Database', 'Sistem Bendahara', 'Payment gateway terintegrasi, invoice real-time, notifikasi WA ke wali.', 1, true),
('premium', 'Sistem Unggulan', 'Enterprise-grade untuk Sekolah & Pesantren', 'from-blue-600 to-accent', 'Users', 'Sistem Sekretaris', 'Master data santri/siswa, kelas, jurusan, mutasi lengkap.', 2, true),
('premium', 'Sistem Unggulan', 'Enterprise-grade untuk Sekolah & Pesantren', 'from-blue-600 to-accent', 'GraduationCap', 'Sistem Pendidikan', 'E-Rapor, perhitungan nilai nasional, ijazah digital.', 3, true),
('premium', 'Sistem Unggulan', 'Enterprise-grade untuk Sekolah & Pesantren', 'from-blue-600 to-accent', 'Briefcase', 'Full System Pesantren', 'Bendahara + Sekretaris + Pendidikan dalam satu platform.', 4, true),
-- Jasa Tambahan
('addon', 'Jasa Tambahan', 'Boost performa & otomasi', 'from-orange-500 to-red-600', 'Search', 'SEO & Google Console', 'Optimasi mesin pencari, submit sitemap, analitik.', 1, true),
('addon', 'Jasa Tambahan', 'Boost performa & otomasi', 'from-orange-500 to-red-600', 'FileText', 'Google Form Integration', 'Form → Sheets → Notifikasi Telegram otomatis.', 2, true),
('addon', 'Jasa Tambahan', 'Boost performa & otomasi', 'from-orange-500 to-red-600', 'MessageSquare', 'WhatsApp Automation', 'Broadcast & auto-reply untuk komunikasi massal.', 3, true),
('addon', 'Jasa Tambahan', 'Boost performa & otomasi', 'from-orange-500 to-red-600', 'Send', 'Hosting & Domain', 'Paket tahunan, perpanjangan, migrasi server.', 4, true);

-- ===== FAQS =====
INSERT INTO faqs (question, answer, sort_order, published) VALUES
('Apakah website/sistem butuh database?', 'Tergantung kebutuhan. Untuk company profile statis, tidak perlu database. Untuk sistem dengan CRUD (bendahara, sekretaris, dll), kami gunakan MySQL/PostgreSQL yang aman dan scalable.', 1, true),
('Di mana hosting-nya?', 'Kami menggunakan infrastruktur Cloud Server (VPS) Enterprise yang stabil, aman, dan cepat. Semua paket website sudah termasuk konfigurasi server yang optimal dan sertifikat keamanan SSL (HTTPS) standar industri.', 2, true),
('Bagaimana proses maintenance?', 'Kami menyediakan paket maintenance bulanan yang mencakup: backup rutin, monitoring server, perbaikan bug, dan update keamanan. Support via WhatsApp 24/7.', 3, true),
('Berapa lama proses pengerjaan?', 'Deploy website: 1-3 hari. Company profile: 1-2 minggu. Sistem kompleks: 1-3 bulan. Timeline pasti akan disampaikan di proposal setelah konsultasi.', 4, true),
('Apakah ada garansi revisi?', 'Ya! Revisi unlimited selama scope tidak berubah. Kami tidak akan launch sebelum Anda 100% puas dengan hasilnya.', 5, true),
('Bisa bayar bertahap?', 'Untuk project besar, kami support pembayaran termin (DP 50%, pelunasan sebelum launch). Untuk jasa cepat, full payment di awal.', 6, true);

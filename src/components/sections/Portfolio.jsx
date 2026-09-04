'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Sparkles, MapPin, Zap, ChevronRight, ExternalLink, Terminal, ShieldCheck, Laptop, Smartphone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import { getIcon } from '@/lib/icons';

const fallbackProjects = [
    {
        title: "JBR Minpo — ISP Billing Engine, POP Network & Mobile App",
        slug: "jbr-minpo-isp",
        category: "Mobile & Desktop",
        client: "ISP Jabbar23 & PT Jaringan Berkah Raya",
        description: "Sistem komprehensif manajemen operasional ISP (Internet Service Provider) Jabbar23: engine billing berbasis Golang, dashboard monitoring Next.js, sinkronisasi area Point of Presence (POP) jaringan fiber optic, integrasi gateway pembayaran Netpay API, automasi isolasi pelanggan jatuh tempo melalui MikroTik API, penyimpanan aset RustFS (S3), notifikasi Firebase, dan aplikasi mobile Flutter pelanggan (Minpo Mobile) untuk cek tagihan, riwayat pemakaian, serta pelaporan gangguan.",
        challenge: "Sinkronisasi data pelanggan dan status koneksi real-time lintas Point of Presence (POP) area jaringan fiber, penanganan throughput transaksi tinggi billing engine, integrasi gateway Netpay API, notifikasi push Firebase berlatar belakang, penyimpanan dokumen bukti bayar di object storage RustFS (S3), serta pemenuhan standar arsitektur 16KB page size NDK dan obfuscation Proguard R8 pada aplikasi mobile Android.",
        solution: "Membangun backend service performa tinggi berbasis Golang dengan database PostgreSQL, web console responsif dengan Next.js, implementasi adapter Netpay payment callback, integrasi MikroTik RouterOS API untuk isolasi otomatis seketika, pipeline penyimpanan RustFS S3, automasi push notification via Firebase FCM, serta optimalisasi native toolchain NDK pada aplikasi Flutter Minpo Mobile.",
        tech: "Golang, Next.js, Flutter, Dart, PostgreSQL, RustFS (S3), Firebase, Netpay Payment Gateway, MikroTik API, NDK",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/jbr-minpo-dashboard.png",
        background_image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/jbr-minpo-mobile.jpg",
        icon_name: "Radio"
    },
    {
        title: "Santrix Platform — SaaS Manajemen Pesantren Multi-Tenant",
        slug: "santrix-platform",
        category: "SaaS & Web App",
        client: "Pondok Pesantren & Yayasan Pendidikan",
        description: "Ekosistem SaaS manajemen pondok pesantren berbasis cloud dengan arsitektur multi-tenant, mencakup pendaftaran santri baru, buku induk digital, pembayaran SPP otomatis, dan dashboard operasional real-time.",
        challenge: "Mengelola isolasi data ratusan lembaga pesantren dalam satu sistem terpusat tanpa risiko kebocoran data antar-tenant serta query reporting yang tetap instan di bawah beban jutaan log transaksi.",
        solution: "Mengimplementasikan database tenancy isolation dengan Laravel, scoped query otomatis, integrasi payment gateway virtual account, asynchronous job queue, dan cache multi-layer.",
        tech: "Laravel 11, PostgreSQL, Multi-Tenant Architecture, Tailwind CSS, Redis, Docker",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/santrix-platform.jpg",
        icon_name: "Building2"
    },
    {
        title: "Santrix Suite — Mobile App & Desktop POS Loket",
        slug: "santrix-suite",
        category: "Mobile & Desktop",
        client: "Wali Santri & Tim Administrasi Pesantren",
        description: "Aplikasi mobile wali santri berbasis Flutter untuk monitoring hafalan Qur'an dan riwayat pembayaran, dipadukan dengan aplikasi kasir desktop performa tinggi berbasis Tauri Rust untuk loket pembayaran santri offline.",
        challenge: "Menghadirkan aplikasi mobile yang responsif di ribuan perangkat wali santri serta aplikasi desktop loket pembayaran yang ringan tanpa membebani memori RAM komputer loket lama.",
        solution: "Membangun mobile app dengan Flutter & Riverpod untuk caching offline, serta merakit desktop app dengan Tauri & Rust yang hanya mengonsumsi memori di bawah 50MB RAM.",
        tech: "Flutter, Dart, Tauri, Rust, SQLite, REST API",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/santrix-suite.jpg",
        icon_name: "Smartphone"
    },
    {
        title: "ISP-Jabbar23 — Sistem Billing & Manajemen Pelanggan ISP",
        slug: "isp-jabbar23-system",
        category: "Mobile & Desktop",
        client: "ISP Jabbar23 & Mitra Jaringan",
        description: "Solusi terpadu penyedia layanan internet (ISP): landing page pelanggan, portal registrasi paket, aplikasi mobile Flutter untuk cek tagihan & lapor gangguan, serta desktop billing app bagi staf teknisi lapangan.",
        challenge: "Automasi isolasi jaringan bagi pelanggan yang jatuh tempo serta sinkronisasi data tagihan ribuan pelanggan secara instan ke perangkat router MikroTik.",
        solution: "Integrasi API router MikroTik & Radius server, trigger auto-isolate melalui webhook pembayaran, serta notifikasi WhatsApp tagihan otomatis sebelum jatuh tempo.",
        tech: "Flutter, Laravel, MikroTik API, Radius, MySQL, Tailwind CSS",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/isp-jabbar23-system.jpg",
        icon_name: "Radio"
    },
    {
        title: "EduVera — Integrated Education & Learning Management Platform",
        slug: "eduvera-platform",
        category: "EdTech & Akademik",
        client: "Sekolah Menengah & Lembaga Pelatihan Mandiri",
        description: "Platform pembelajaran digital dan manajemen akademik interaktif dengan modul penugasan siswa, ujian online dengan perlindungan anti-cheat, bank soal terstruktur, dan analisis rapor Kurikulum Merdeka.",
        challenge: "Menangani lonjakan koneksi serentak ratusan siswa saat ujian online tanpa terjadi kegagalan pengiriman jawaban akibat fluktuasi koneksi internet siswa.",
        solution: "Arsitektur Next.js decoupled dengan backend Node.js teroptimasi, penyimpanan sementara jawaban di IndexedDB browser, dan sistem autosave berkala berlatar belakang.",
        tech: "Next.js 15, Node.js, Express, PostgreSQL, REST API, Tailwind CSS",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/eduvera-platform.jpg",
        icon_name: "GraduationCap"
    },
    {
        title: "VeloraBlast & CS-Velora — WhatsApp Marketing & Multi-Agent CRM",
        slug: "velorablast-crm",
        category: "Automasi & AI",
        client: "UMKM & Korporasi Retail",
        description: "Engine automasi broadcast pesan WhatsApp massal berkecepatan tinggi dengan fitur anti-banned delay rotation, multi-device gateway, penandaan kontak (tagging), dan sistem customer service multi-agen terpusat.",
        challenge: "Menghindari risiko suspend/blokir nomor WhatsApp akibat lonjakan pengiriman pesan massal dan memastikan pesan promosi sampai tepat waktu ke ribuan prospek.",
        solution: "Algoritma humanized typing delay, random interval rotation, message queue berbasis Redis, serta sistem distribusi chat masuk ke agen CS aktif secara round-robin.",
        tech: "Next.js, Node.js, WebSocket, WhatsApp Multi-Device Protocol, Redis",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/velorablast-crm.jpg",
        icon_name: "Bot"
    },
    {
        title: "VeraPay & Ve-Wallet — Digital Payment & Wallet Reconciliation Gateway",
        slug: "verapay-wallet",
        category: "FinTech & Kasir",
        client: "Platform Bisnis & Ekosistem Digital Velora",
        description: "Orkestrasi pembayaran digital dan dompet virtual internal yang memfasilitasi transaksi QRIS, Virtual Account, auto-split fee ke vendor/mitra, dan rekonsiliasi mutasi bank secara instan.",
        challenge: "Menjamin integritas dan konsistensi transaksi finansial (ACID) serta mencegah double-spending atau selisih pencatatan mutasi saldo saat high concurrency.",
        solution: "Implementasi transaksi berbasis atomic row-locking di PostgreSQL, idempotency key pada setiap request pembayaran, dan verifikasi webhook HMAC-SHA256.",
        tech: "Go / Node.js, PostgreSQL, Redis, Payment Gateway API, Docker",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/verapay-wallet.jpg",
        icon_name: "CreditCard"
    },
    {
        title: "Velora Jobs — Recruitment Portal & Applicant Tracking System (ATS)",
        slug: "velora-jobs-ats",
        category: "SaaS & Web App",
        client: "Perusahaan Rekrutmen & Job Seeker",
        description: "Portal bursa kerja profesional terpadu dengan workflow Applicant Tracking System (ATS), filter kualifikasi pelamar otomatis, kanban board pelamar, dan jadwal wawancara terintegrasi.",
        challenge: "Menyaring ribuan berkas lamaran kerja yang masuk secara manual membutuhkan waktu berhari-hari bagi tim HR.",
        solution: "Sistem scoring kualifikasi kandidat otomatis, kanban board status pelamar (Screening, Interview, Offering), dan integrasi notifikasi WhatsApp/Email ke pelamar.",
        tech: "Next.js, Node.js, PostgreSQL, Tailwind CSS, REST API",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/velora-jobs-ats.jpg",
        icon_name: "Users"
    },
    {
        title: "Dashboard Riyadlul Huda — Multi-Role Pesantren & Financial Accounting",
        slug: "dashboard-riyadlulhuda",
        category: "EdTech & Akademik",
        client: "Pondok Pesantren Riyadlul Huda",
        description: "Sistem tata kelola pondok pesantren terpadu: pembukuan kas bendahara (KAS-RH), pencatatan perizinan santri, inventaris sarana prasarana, serta pelaporan keuangan transparan.",
        challenge: "Pencatatan kas dan administrasi pondok yang tersebar di buku tulis fisik rentan selisih perhitungan dan sulit diaudit saat pelaporan tahunan.",
        solution: "Digitalisasi buku kas berpasangan (debit/kredit) otomatis dengan neraca saldo real-time, akses role bertingkat (Pimpinan, Bendahara, Pengurus), dan ekspor laporan PDF/Excel.",
        tech: "Laravel 11, Flutter, Tauri, MySQL, Tailwind CSS, Alpine.js",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/dashboard-riyadlulhuda.jpg",
        icon_name: "Layers"
    },
    {
        title: "Skillage ABSN & Profiling — Smart Geofence Attendance & HR System",
        slug: "skillage-absn-profiling",
        category: "Mobile & Desktop",
        client: "Manajemen Skillage & Korporat",
        description: "Aplikasi presensi karyawan cerdas berbasis validasi radius geofencing GPS anti-fake GPS, deteksi biometrik wajah, dan sistem pemetaan profil kompetensi SDM.",
        challenge: "Kecurangan presensi karyawan menggunakan aplikasi Fake GPS atau titip absen yang merugikan perusahaan.",
        solution: "Algoritma deteksi mock provider OS Android/iOS, validasi lingkaran geofencing akurat hingga toleransi 5 meter, dan log kehadiran tamper-proof.",
        tech: "Flutter, Cloud Database, Geolocation API, Biometric Auth, Node.js",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/skillage-absn-profiling.jpg",
        icon_name: "MapPin"
    },
    {
        title: "Dimzzy E-Commerce & Retail Inventory Suite",
        slug: "dimzzy-ecommerce",
        category: "E-Commerce & Profil",
        client: "Brand Retail & Fashion Dimzzy",
        description: "Toko online e-commerce modern dengan katalog produk dinamis, keranjang belanja interaktif, kalkulator ongkir otomatis (RajaOngkir), dan sistem manajemen inventaris gudang.",
        challenge: "Sinkronisasi stok barang antara etalase website dengan gudang fisik agar tidak terjadi overselling saat momen flash sale.",
        solution: "Sistem reservasi stok sementara pada sesi checkout, auto-deduct saat pembayaran terkonfirmasi, dan notifikasi otomatis stok menipis ke admin gudang.",
        tech: "React, Node.js, PostgreSQL, Midtrans, RajaOngkir API",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/dimzzy-ecommerce.jpg",
        icon_name: "ShoppingCart"
    },
    {
        title: "One-Subscribe — SaaS Recurring Subscription & Billing Automation",
        slug: "one-subscribe-billing",
        category: "SaaS & Web App",
        client: "Penyedia Layanan Berlangganan & Digital Agency",
        description: "Platform otomasi manajemen langganan berulang (recurring billing), invoice terjadwal otomatis, penanganan grace period, dan analitik metrik SaaS (MRR, Churn, ARR).",
        challenge: "Menghitung metrik pendapatan berulang secara akurat dan mengotomasi dunning management (penagihan kartu/VA gagal) tanpa membuat pelanggan frustrasi.",
        solution: "Scheduler otomatis berbasis cron job dengan webhook payment gateway, auto-retry penagihan, dan reminder tagihan proaktif via WhatsApp & Email.",
        tech: "Next.js, Node.js, PostgreSQL, Cron Worker, Tailwind CSS",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/one-subscribe-billing.jpg",
        icon_name: "Zap"
    },
    {
        title: "Profil Riyadlul Huda & As-Saodah — Official Institutional Web Portal",
        slug: "profil-lembaga-portal",
        category: "E-Commerce & Profil",
        client: "Pondok Pesantren & Lembaga Madrasah",
        description: "Portal profil kelembagaan resmi dengan desain modern, responsif mobile, dilengkapi galeri kegiatan interaktif, arsip warta, profil pengasuh, dan formulir pendaftaran santri baru terpadu.",
        challenge: "Menyajikan informasi kelembagaan yang padat dengan tampilan visual yang elegan, terpercaya, dan sangat cepat diakses dari ponsel berpita internet terbatas.",
        solution: "Desain responsif mobile-first, optimasi Google PageSpeed 95+, integrasi CMS berita mandiri, dan integrasi WhatsApp pendaftaran one-click.",
        tech: "Next.js, Tailwind CSS, Headless CMS, SEO Optimization, Cloudflare",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/profil-lembaga-portal.jpg",
        icon_name: "Globe"
    },
    {
        title: "Data-Analyst & Ve-Report — Business Intelligence & Automated Reporting Hub",
        slug: "data-analyst-report",
        category: "SaaS & Web App",
        client: "Manajemen Operasional & Eksekutif Perusahaan",
        description: "Dashboard analitik intelijen bisnis interaktif dengan agregasi data multi-sumber, visualisasi tren transaksi, dan engine pencetakan laporan otomatis format PDF/Excel berkualitas tinggi.",
        challenge: "Memproses ribuan baris log transaksi menjadi grafik insight visual dalam hitungan detik tanpa membebani browser pengguna.",
        solution: "Pemrosesan data di sisi server (Server-Side Aggregation), indexing database teroptimasi, dan chart library berbasis Canvas performa tinggi.",
        tech: "React, Next.js, Python, Chart.js, PostgreSQL, PDFKit",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/data-analyst-report.jpg",
        icon_name: "BarChart3"
    },
    {
        title: "RAG-Template & YT-Warmup — AI Knowledge Engine & Browser Automation",
        slug: "rag-ai-automation",
        category: "Automasi & AI",
        client: "Tim R&D Internal & Automasi Proses",
        description: "Implementasi kecerdasan buatan berbasis Retrieval-Augmented Generation (RAG) untuk query dokumen kontekstual serta daemon automasi browser tanpa kepala (headless) dengan Playwright.",
        challenge: "Menjaga performa vector similarity search tetap cepat dan daemon automasi browser berjalan stabil tanpa crash atau deteksi bot.",
        solution: "Vector embedding pipeline dengan pgvector di PostgreSQL, chunking semantik cerdas, serta Playwright stealth profile emulation.",
        tech: "Python, Playwright, Pgvector, Node.js, LangChain, OpenAI / Gemini",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/rag-ai-automation.jpg",
        icon_name: "Terminal"
    },
    {
        title: "POS-Skillage — Touchscreen Point of Sales & Thermal Print System",
        slug: "pos-skillage-retail",
        category: "FinTech & Kasir",
        client: "Merchant Retail & Toko Offline",
        description: "Sistem Point of Sale (POS) kasir touchscreen dengan pencarian barcode instan, cetak struk printer thermal Bluetooth/USB, laci kas otomatis, dan sinkronisasi transaksi offline-first.",
        challenge: "Operasional kasir tidak boleh terhenti sedikitpun ketika koneksi internet toko sedang tidak stabil atau padam.",
        solution: "Arsitektur offline-first menggunakan IndexedDB lokal, antrian transaksi offline otomatis, dan auto-sync ke server saat koneksi pulih.",
        tech: "React, Electron / Tauri, IndexedDB, Web Bluetooth API, PostgreSQL",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/pos-skillage-retail.jpg",
        icon_name: "CreditCard"
    },
    {
        title: "ERP-Sekolah — Sistem Informasi Manajemen Akademik & PPDB",
        slug: "erp-sekolah-akademik",
        category: "EdTech & Akademik",
        client: "Sekolah Menengah Kejuruan & Yayasan Pendidikan",
        description: "Sistem ERP sekolah komprehensif mengelola Penerimaan Peserta Didik Baru (PPDB), pembagian kelas, jadwal mengajar guru anti-bentrok, inventaris laboratorium, dan penilaian rapor digital.",
        challenge: "Kompleksitas penyusunan jam mengajar guru dan jadwal mata pelajaran yang seringkali terjadi bentrok jadwal penggunaan ruang kelas/lab.",
        solution: "Algoritma deteksi bentrok jadwal otomatis, visualisasi matriks jadwal kelas interaktif, dan portal mandiri guru & wali murid.",
        tech: "Laravel 11, Livewire, MySQL, Tailwind CSS, Alpine.js",
        image_url: "https://aenvcxkxbvwrcwsffdbb.supabase.co/storage/v1/object/public/Velora/portfolio/erp-sekolah-akademik.jpg",
        icon_name: "GraduationCap"
    }
];

const Portfolio = () => {
    const [projects, setProjects] = useState(fallbackProjects);
    const [filter, setFilter] = useState('Semua');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('portfolio_projects')
                    .select('*')
                    .eq('published', true)
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) setProjects(data);
            } catch { }
        };
        fetchProjects();
    }, []);

    const categories = ['Semua', ...new Set(projects.map(p => p.category))];
    const filtered = filter === 'Semua' ? projects : projects.filter(p => p.category === filter);
    const featured = filtered[0];
    const rest = filtered.slice(1);

    const projectUrl = (project) => `/portfolio/${project.slug || project.id}`;

    return (
        <section id="portfolio" className="py-24 sm:py-32 bg-[#faf9f7] text-slate-900 relative border-t border-slate-200/80 overflow-hidden">
            {/* Subtle technical background grid */}
            <div className="absolute inset-0 studio-grid-pattern-light opacity-50 pointer-events-none"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.03]">
                <span className="text-[16vw] font-black text-slate-900 tracking-tighter leading-none select-none whitespace-nowrap">
                    PORTFOLIO
                </span>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <ScrollReveal width="100%">
                    <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 uppercase tracking-widest mb-4 shadow-sm">
                            <Layers className="w-3.5 h-3.5 text-blue-600" />
                            [SHOWCASE_PORTFOLIO]
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Studi Kasus & Rekayasa Produk
                        </h2>
                        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Kompilasi sistem informasi, platform e-commerce, dan aplikasi kustom yang telah kami selesaikan dengan arsitektur tangguh.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Segmented Controls */}
                <ScrollReveal width="100%">
                    <div className="flex justify-center mb-10 sm:mb-14">
                        <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-slate-100 border border-slate-200/90 gap-1 shadow-inner">
                            {categories.map(cat => {
                                const isActive = filter === cat;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                <div className="max-w-6xl mx-auto">
                    {/* FEATURED CASE STUDY (COMMAND CENTER DISPLAY) */}
                    {featured && (
                        <ScrollReveal width="100%">
                            <div className="mb-12 sm:mb-16 rounded-3xl studio-card-light overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                                {/* Top: Case Study Header & Brief */}
                                <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                        <div className="max-w-3xl">
                                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded font-bold">
                                                    {featured.category}
                                                </span>
                                                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-300/80 px-2.5 py-0.5 rounded font-bold flex items-center gap-1 shadow-sm">
                                                    ★ PROYEK UTAMA
                                                </span>
                                                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                    {featured.client}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                                                {featured.title}
                                            </h3>

                                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 text-justify">
                                                {featured.description}
                                            </p>

                                            {/* Stack Tag Chips */}
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {featured.tech.split(',').map((t, i) => (
                                                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-blue-700 font-medium">
                                                        {t.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 flex-shrink-0 pt-2 lg:pt-0">
                                            <Link
                                                href={projectUrl(featured)}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-600/20 group whitespace-nowrap"
                                            >
                                                <span>Buka Studi Kasus</span>
                                                <ArrowRight className="w-4 h-4 text-blue-100 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                            <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                                                <ShieldCheck className="w-4 h-4" /> Live di Produksi
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom: Command Center Screens Showcase (100% Uncropped!) */}
                                <div className="p-4 sm:p-6 lg:p-8 bg-slate-950">
                                    <div className={`grid grid-cols-1 ${featured.background_image_url ? 'lg:grid-cols-12' : ''} gap-6 items-start`}>
                                        {/* Web Console Screen (8 cols if mobile exists, else full width) */}
                                        <div className={`${featured.background_image_url ? 'lg:col-span-8' : 'w-full'} rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col`}>
                                            {/* Browser Bar */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-300">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                                    </div>
                                                    <span className="text-slate-400 ml-2 truncate max-w-[280px]">
                                                        https://{(featured.slug || 'minpo').toLowerCase().replace(/\s+/g, '-')}.jabbar23.net/admin/dashboard
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    <span className="text-blue-400 font-semibold">[PRODUKSI_LIVE]</span>
                                                </div>
                                            </div>

                                            {/* Dashboard Image - FULL UNROUNDED & UNCROPPED */}
                                            <div className="bg-slate-950 w-full overflow-hidden">
                                                <img
                                                    src={featured.image_url || featured.image}
                                                    alt={featured.title}
                                                    className="w-full h-auto object-contain block"
                                                />
                                            </div>

                                            {/* Footer Caption */}
                                            <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Laptop className="w-3.5 h-3.5 text-blue-400" />
                                                    <span>Web Admin Console &amp; Monitoring Real-Time</span>
                                                </div>
                                                <span className="text-emerald-400 font-semibold">● 13.613 Pelanggan</span>
                                            </div>
                                        </div>

                                        {/* Mobile App Screen (4 cols) */}
                                        {featured.background_image_url && (
                                            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl flex flex-col">
                                                {/* Mobile Header Bar */}
                                                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-300">
                                                    <div className="flex items-center gap-1.5">
                                                        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-slate-200 font-semibold">Minpo Mobile</span>
                                                    </div>
                                                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                        Flutter
                                                    </span>
                                                </div>

                                                {/* Mobile Phone Mockup */}
                                                <div className="p-4 bg-slate-950/90 flex items-center justify-center flex-1">
                                                    <div className="rounded-[2rem] p-2 bg-slate-800/90 border-2 border-slate-700 shadow-2xl max-w-[240px] w-full">
                                                        <div className="w-16 h-3 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                                                        </div>
                                                        <div className="rounded-[1.4rem] overflow-hidden bg-slate-950 border border-white/10">
                                                            <img
                                                                src={featured.background_image_url}
                                                                alt={`${featured.title} Mobile App`}
                                                                className="w-full h-auto object-contain block"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Mobile Footer Caption */}
                                                <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                                                    <span className="text-slate-300">Aplikasi Pelanggan</span>
                                                    <span className="text-blue-400 font-semibold">Self-Service</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* REST OF PORTFOLIO (TECHNICAL GRID CARDS) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {rest.map((project, index) => {
                            const PIcon = getIcon(project.icon_name || project.icon);
                            return (
                                <ScrollReveal key={project.id || index} delay={index * 0.05} width="100%">
                                    <Link
                                        href={projectUrl(project)}
                                        className="rounded-2xl studio-card-light hover:border-blue-500/40 overflow-hidden flex flex-col justify-between transition-all duration-200 group h-full shadow-sm hover:shadow-md hover:-translate-y-1"
                                    >
                                        <div>
                                            {/* Preview Image with Subtle Frame */}
                                            <div className="h-44 sm:h-48 overflow-hidden bg-slate-950 relative border-b border-slate-200">
                                                <img
                                                    src={project.image_url || project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Details */}
                                            <div className="p-5">
                                                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                                                    <span>{project.client}</span>
                                                    {PIcon && <PIcon className="w-3.5 h-3.5 text-blue-600" />}
                                                </div>

                                                <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {project.title}
                                                </h4>

                                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 text-justify">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Footer with Stack and Action */}
                                        <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                                            <span className="text-slate-500 truncate max-w-[170px]">
                                                {project.tech}
                                            </span>
                                            <span className="text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                                                <span>Detail</span>
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

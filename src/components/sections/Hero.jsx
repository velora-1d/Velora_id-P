'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, MessageSquare, Sparkles, 
    ShieldCheck, CheckCircle2, Zap, Database, 
    Layers, ChevronRight, ChevronLeft, Terminal, Activity,
    Globe, Smartphone, CreditCard, Play, Pause,
    Wifi, Battery, Tablet, ShoppingBag, Stethoscope,
    Truck, GraduationCap, MapPin, QrCode
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ScrollReveal from '../animations/ScrollReveal';
import CountUp from '../animations/CountUp';


const applications = [
    {
        id: 'spp-pesantren',
        type: 'web',
        category: 'Web SaaS & ERP',
        shortName: '01 SPP',
        title: 'Sistem SPP & Keuangan',
        tagline: 'ERP Keuangan Pesantren & Sekolah',
        domain: 'spp.velora.id/keuangan',
        metricTitle: 'Realisasi SPP Bulan Berjalan',
        metricValue: 'Rp 54.250.000',
        targetText: '90.4% Target',
        badge: '+18.4% YoY',
        subMetric: '142 Santri Lunas',
        statusLabel: 'Auto-Reconciled',
        progressBlue: '70%',
        progressOrange: '20%',
        feature1: {
            title: 'WhatsApp Billing Bot',
            badge: '0 Antrean',
            desc: 'Invoice PDF resmi otomatis terkirim langsung ke nomor WhatsApp wali murid saat invoice terbit tanpa rekap manual.'
        },
        feature2: {
            title: 'Kanal VA & QRIS All Bank',
            badge: 'Settlement T+0',
            desc: 'Integrasi payment gateway multi-bank (BCA, BRI, Mandiri, BSI, QRIS) dengan verifikasi mutasi instan 24/7.'
        },
        tags: ['Next.js 16', 'PostgreSQL', 'Midtrans API', 'WA Gateway']
    },
    {
        id: 'mobile-wali',
        type: 'mobile',
        category: 'Mobile App (iOS & Android)',
        shortName: '02 Wali (App)',
        title: 'Mobile Wali Murid',
        tagline: 'Portal Monitoring Siswa & Santri',
        domain: 'app.velora.id/wali-murid',
        metricTitle: 'Tagihan & Saku Santri Realtime',
        metricValue: '1-Tap Bayar QRIS',
        targetText: 'Instant Topup',
        badge: 'Play Store & App Store',
        subMetric: 'Hafalan & Nilai Rapor',
        statusLabel: 'Cloud Synced',
        progressBlue: '60%',
        progressOrange: '35%',
        feature1: {
            title: 'Presensi & Pelanggaran Kedisiplinan',
            badge: 'Push Notification',
            desc: 'Orang tua menerima notifikasi instan saat siswa clock-in asrama, izin kepulangan, maupun capaian setoran hafalan.'
        },
        feature2: {
            title: 'Uang Saku Digital Smartcard',
            badge: 'RFID Terintegrasi',
            desc: 'Wali dapat membatasi limit jajan harian santri di kantin dan memantau riwayat transaksi jajan secara transparan.'
        },
        tags: ['React Native / Flutter', 'Push FCM', 'Biometrik', 'Offline Cache']
    },
    {
        id: 'pos-kasir',
        type: 'mobile',
        category: 'Mobile & Tablet POS',
        shortName: '03 Kasir (App)',
        title: 'Aplikasi Kasir POS',
        tagline: 'Kasir Retail Mart & Toko Cepat',
        domain: 'pos.velora.id/terminal-01',
        metricTitle: 'Total Omzet Kasir Shift Berjalan',
        metricValue: 'Rp 18.640.000',
        targetText: '312 Transaksi',
        badge: 'Offline-First',
        subMetric: 'Thermal Struk 58/80mm',
        statusLabel: 'Bluetooth Connected',
        progressBlue: '80%',
        progressOrange: '15%',
        feature1: {
            title: 'Scan Barcode Kamera & Hardware',
            badge: '0.2s Input',
            desc: 'Mendukung barcode scanner wireless, kamera HP, dan pencarian kilat nama barang dengan puluhan ribu SKU katalog.'
        },
        feature2: {
            title: 'Mode Transaksi Tanpa Internet',
            badge: 'Auto-Sync Online',
            desc: 'Tetap bisa melayani antrean kasir saat jaringan mati, data otomatis tersinkronisasi ke server pusat saat online.'
        },
        tags: ['Flutter / Android', 'SQLite Local', 'ESC/POS Printer', 'Multi-Shift']
    },
    {
        id: 'compro-seo',
        type: 'web',
        category: 'Web Portal & CMS',
        shortName: '04 Compro Web',
        title: 'Website Company Profile',
        tagline: 'Corporate High-Speed SEO Web',
        domain: 'velora.id/corporate',
        metricTitle: 'Google PageSpeed Insights',
        metricValue: '99 / 100 Score',
        targetText: 'Speed Index 0.8s',
        badge: 'Core Web Vitals Pass',
        subMetric: 'LCP 0.9s • CLS 0.00',
        statusLabel: 'Google Rank #1',
        progressBlue: '85%',
        progressOrange: '15%',
        feature1: {
            title: 'SEO Schema & OpenGraph JSON-LD',
            badge: 'JSON-LD Active',
            desc: 'Struktur data mikro untuk Organization, FAQ, dan LocalBusiness agar profil bisnis muncul di pencarian Google teratas.'
        },
        feature2: {
            title: 'Headless CMS Dashboard Kustom',
            badge: 'Zero Coding',
            desc: 'Admin dapat memperbarui portfolio, pricing paket, dan artikel blog secara mandiri tanpa menyentuh source code.'
        },
        tags: ['Next.js 16', 'Tailwind CSS', 'Schema.org', 'Edge Caching']
    },
    {
        id: 'mobile-absensi',
        type: 'mobile',
        category: 'Mobile App (iOS & Android)',
        shortName: '05 Presensi (App)',
        title: 'Mobile Presensi GPS',
        tagline: 'Absensi Karyawan & Guru Anti-Fake GPS',
        domain: 'hr.velora.id/mobile-attendance',
        metricTitle: 'Tingkat Kehadiran Karyawan Hari Ini',
        metricValue: '98.5% Hadir',
        targetText: '84 Staf Tepat Waktu',
        badge: 'Anti-Mock Location',
        subMetric: 'Geofence Radius 25m',
        statusLabel: 'GPS Verified',
        progressBlue: '75%',
        progressOrange: '20%',
        feature1: {
            title: 'Selfie Face Matching & Liveness',
            badge: 'Biometric AI',
            desc: 'Pendeteksian wajah asli dengan verifikasi kedipan mata untuk mencegah kecurangan foto atau titip absen sesama staf.'
        },
        feature2: {
            title: 'Geofencing Radius Koordinat Kantor',
            badge: 'Radius Terkunci',
            desc: 'Tombol clock-in otomatis nonaktif jika posisi perangkat berada di luar batas koordinat kantor yang ditentukan.'
        },
        tags: ['Flutter', 'Google Maps API', 'Face Recognition', 'Payroll Export']
    },
    {
        id: 'ecommerce-multivendor',
        type: 'web',
        category: 'E-Commerce Platform',
        shortName: '06 E-Commerce',
        title: 'Toko Online & E-Commerce',
        tagline: 'Katalog Produk & Checkout Otomatis',
        domain: 'store.velora.id/checkout',
        metricTitle: 'Gross Merchandise Value (GMV)',
        metricValue: 'Rp 128.900.000',
        targetText: 'Conversion 4.2%',
        badge: '+24.6% MoM',
        subMetric: '418 Pesanan Terbayar',
        statusLabel: 'Payment Settled',
        progressBlue: '65%',
        progressOrange: '30%',
        feature1: {
            title: 'Kalkulasi Ongkir Ekspedisi Instan',
            badge: 'Multi-Kurir API',
            desc: 'Cek tarif ongkos kirim otomatis hingga level kecamatan untuk JNE, J&T, SiCepat, Anteraja, dan ekspedisi kargo.'
        },
        feature2: {
            title: 'Tracking Resi Otomatis via WA',
            badge: 'Webhook Active',
            desc: 'Pelanggan mendapatkan pesan WhatsApp otomatis berisi nomor resi dan tautan pelacakan langsung saat barang dikirim.'
        },
        tags: ['Next.js', 'Supabase DB', 'RajaOngkir API', 'Midtrans Snap']
    },
    {
        id: 'klinik-emr',
        type: 'web',
        category: 'Healthtech EMR',
        shortName: '07 Klinik EMR',
        title: 'Sistem Klinik & EMR',
        tagline: 'Rekam Medis Terintegrasi SATUSEHAT',
        domain: 'klinik.velora.id/satusehat',
        metricTitle: 'Pasien Terlayani Hari Ini',
        metricValue: '64 Pasien',
        targetText: 'Antrean Cepat 3 Mnt',
        badge: 'SATUSEHAT Ready',
        subMetric: 'Rekam Medis Digital ICD-10',
        statusLabel: 'FHIR Compliant',
        progressBlue: '70%',
        progressOrange: '25%',
        feature1: {
            title: 'Sinkronisasi API SATUSEHAT Kemenkes',
            badge: 'HL7 / FHIR',
            desc: 'Pengiriman data rekam medis terenkripsi langsung ke server Kemenkes RI sesuai mandat Permenkes No. 24 Tahun 2022.'
        },
        feature2: {
            title: 'Display Panggilan Antrean TV Poli',
            badge: 'Voice Call Auto',
            desc: 'Panggilan suara nomor antrean otomatis pada layar TV poli umum, poli gigi, dan loket penyerahan obat farmasi.'
        },
        tags: ['Next.js', 'PostgreSQL', 'HL7 FHIR API', 'E-Klaim BPJS']
    },
    {
        id: 'mobile-kurir',
        type: 'mobile',
        category: 'Mobile Delivery App',
        shortName: '08 Kurir (App)',
        title: 'Mobile Driver & Kurir',
        tagline: 'Aplikasi Pengantaran & Pelacakan Armada',
        domain: 'delivery.velora.id/driver',
        metricTitle: 'Drop Point Pengantaran Hari Ini',
        metricValue: '48 / 50 Paket',
        targetText: '96% Selesai',
        badge: 'Live GPS Fleet',
        subMetric: 'Optimasi Rute Cepat',
        statusLabel: 'On-Schedule',
        progressBlue: '85%',
        progressOrange: '12%',
        feature1: {
            title: 'Bukti Pengantaran Foto & E-Signature',
            badge: 'Digital POD',
            desc: 'Kurir mengambil foto penerima paket ber-watermark waktu dan meminta tanda tangan digital langsung di layar HP.'
        },
        feature2: {
            title: 'Navigasi Peta Turn-by-Turn GPS',
            badge: 'Peta Realtime',
            desc: 'Integrasi rute navigasi efisien menghindari jalan macet untuk menghemat waktu pengiriman dan konsumsi bahan bakar.'
        },
        tags: ['Android / iOS', 'WebSockets', 'OpenStreetMap', 'Digital Signature']
    },
    {
        id: 'wms-gudang',
        type: 'web',
        category: 'Enterprise ERP',
        shortName: '09 WMS Gudang',
        title: 'Manajemen Gudang (WMS)',
        tagline: 'Warehouse & Inventory Control Realtime',
        domain: 'wms.velora.id/inventory',
        metricTitle: 'Akurasi Stok Pergudangan',
        metricValue: '99.8% Accurate',
        targetText: 'Zero Discrepancy',
        badge: 'FIFO / FEFO',
        subMetric: '24.120 SKU Aktif',
        statusLabel: 'Multi-Warehouse',
        progressBlue: '75%',
        progressOrange: '20%',
        feature1: {
            title: 'Stok Opname Barcode Scanner',
            badge: 'Cepat & Akurat',
            desc: 'Audit fisik barang di rak gudang secara cepat tanpa kertas manual, menghindari selisih antara fisik dan sistem.'
        },
        feature2: {
            title: 'Alert Minimum Stok & Reorder PO',
            badge: 'Auto Purchase Draft',
            desc: 'Pemberitahuan otomatis saat stok menyentuh titik batas aman agar proses pemesanan ke supplier tidak terlambat.'
        },
        tags: ['Go / Node.js', 'PostgreSQL', 'Barcode Handheld', 'Multi-Warehouse']
    },
    {
        id: 'mobile-lms',
        type: 'mobile',
        category: 'Mobile EdTech App',
        shortName: '10 CBT (App)',
        title: 'Mobile LMS & Ujian CBT',
        tagline: 'Aplikasi Belajar & Tryout Anti-Curang',
        domain: 'cbt.velora.id/student-app',
        metricTitle: 'Siswa Ujian Simultan Realtime',
        metricValue: '1.250 Peserta',
        targetText: '0 Server Lag',
        badge: 'Anti-Screen Capture',
        subMetric: 'Timer CBT Terenkripsi',
        statusLabel: 'Kiosk Protected',
        progressBlue: '90%',
        progressOrange: '10%',
        feature1: {
            title: 'Kiosk Lock Layar & Anti-Contek',
            badge: 'Layar Terkunci',
            desc: 'Aplikasi mengunci HP siswa sehingga tidak dapat beralih aplikasi, split screen, atau browsing jawaban di Google.'
        },
        feature2: {
            title: 'Koreksi Nilai & Pembahasan Instan',
            badge: 'Hasil Realtime',
            desc: 'Hasil ujian dan statistik pemahaman materi per topik langsung dihitung otomatis begitu tombol submit diklik.'
        },
        tags: ['React Native', 'Secure Enclave', 'Socket.io', 'CBT Engine']
    }
];

const fallbackStats = [
    { setting_value: '50', setting_label: 'Proyek Selesai', setting_suffix: '+' },
    { setting_value: '98', setting_label: 'Klien Puas', setting_suffix: '%' },
    { setting_value: '24', setting_label: 'SLA Support', setting_suffix: '/7' },
];

const Hero = () => {
    const [stats, setStats] = useState(fallbackStats);
    const [activeApp, setActiveApp] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    const [heroData, setHeroData] = useState({
        title: 'Rekayasa Website &\nSistem Digital Presisi',
        subtitle: 'Kami merancang website kustom, sistem informasi pesantren/sekolah, dan aplikasi bisnis modern yang cepat, aman, serta terintegrasi payment gateway.',
    });

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .eq('published', true);
                
                if (!error && data && data.length > 0) {
                    const statItems = data.filter(item => item.setting_key.startsWith('hero_stat_'));
                    if (statItems.length > 0) {
                        setStats(statItems.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)));
                    }

                    const titleItem = data.find(item => item.setting_key === 'hero_title');
                    const subtitleItem = data.find(item => item.setting_key === 'hero_subtitle');

                    setHeroData({
                        title: titleItem?.setting_value || 'Rekayasa Website &\nSistem Digital Presisi',
                        subtitle: subtitleItem?.setting_value || 'Kami merancang website kustom, sistem informasi pesantren/sekolah, dan aplikasi bisnis modern yang cepat, aman, serta terintegrasi payment gateway.',
                    });
                }
            } catch { }
        };
        fetchHeroData();
    }, []);

    // Auto-cycle 10 aplikasi setiap 2 detik (otomatis pause jika mouse hover atau user toggle)
    useEffect(() => {
        if (isPaused) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setActiveApp((prev) => (prev + 1) % applications.length);
        }, 2000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused]);

    const tabsContainerRef = useRef(null);

    // Auto scroll only the horizontal tab strip (NEVER scroll the window/page)
    useEffect(() => {

        const container = tabsContainerRef.current;
        if (container && container.children[activeApp]) {
            const activeEl = container.children[activeApp];
            const targetLeft = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
            container.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: 'smooth'
            });
        }
    }, [activeApp]);


    const handlePrevApp = () => {
        setActiveApp((prev) => (prev - 1 + applications.length) % applications.length);
    };

    const handleNextApp = () => {
        setActiveApp((prev) => (prev + 1) % applications.length);
    };

    const currentApp = applications[activeApp] || applications[0];

    return (
        <section id="home" className="relative min-h-screen bg-[#070C18] text-white pt-28 lg:pt-36 pb-20 overflow-hidden flex flex-col justify-center">
            {/* Ambient Lighting & Atmosphere */}
            <div className="absolute inset-0 studio-grid-pattern opacity-25 pointer-events-none"></div>
            
            {/* Dual Radial Illumination: Cobalt Blue (Top Left) & Warm Orange (Bottom Right) */}
            <div className="absolute top-0 left-0 w-full lg:w-2/3 h-[550px] bg-[radial-gradient(ellipse_60%_50%_at_25%_20%,rgba(37,99,235,0.22),transparent)] pointer-events-none"></div>
            <div className="absolute bottom-10 right-0 w-full lg:w-1/2 h-[450px] bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(249,115,22,0.12),transparent)] pointer-events-none"></div>

            {/* Top Hairline Ambient Beam (Blue to Orange) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 via-orange-500/40 to-transparent"></div>

            {/* Giant Ghost Typography Watermark */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none select-none z-0 w-full overflow-hidden opacity-[0.035]">
                <span className="text-[20vw] font-black text-white tracking-tighter leading-none select-none whitespace-nowrap">
                    VELORA
                </span>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: Asymmetric Bold Typography & Content */}
                    <div className="lg:col-span-6 xl:col-span-7 text-left">
                        {/* Engineering Studio Badge */}
                        <ScrollReveal direction="down">
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs sm:text-sm text-blue-200 shadow-[0_0_20px_rgba(37,99,235,0.15)] mb-6 backdrop-blur-md">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                </span>
                                <span className="font-mono text-xs text-orange-400 font-bold tracking-wider">VELORA STUDIO</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-300 font-medium">Digital Product &amp; Systems Architecture</span>
                            </div>
                        </ScrollReveal>

                        {/* Main Headline */}
                        <ScrollReveal delay={0.1}>
                            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                                Rekayasa Website &amp; <br />
                                <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
                                    Sistem Digital
                                </span>{' '}
                                <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent underline decoration-orange-500/40 decoration-wavy decoration-2 underline-offset-8">
                                    Presisi
                                </span>
                            </h1>
                        </ScrollReveal>

                        {/* Subtitle / Paragraph */}
                        <ScrollReveal delay={0.2}>
                            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal text-justify max-w-xl mb-8">
                                {heroData.subtitle}
                            </p>
                        </ScrollReveal>

                        {/* Dual Action Buttons */}
                        <ScrollReveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center mb-10">
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-orange-500 hover:from-blue-500 hover:to-orange-400 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] border border-blue-400/30 hover:border-orange-400/50 group hover:-translate-y-0.5"
                                >
                                    <MessageSquare className="w-4 h-4 text-blue-100 group-hover:text-white" />
                                    <span>Konsultasi Proyek</span>
                                    <ArrowRight className="w-4 h-4 text-blue-200 group-hover:text-white transition-transform group-hover:translate-x-1" />
                                </button>

                                <button
                                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base border border-slate-700/80 hover:border-orange-500/40 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 group"
                                >
                                    <Terminal className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                                    <span>Eksplorasi Portfolio</span>
                                </button>
                            </div>
                        </ScrollReveal>

                        {/* Integrated Stats KPI Strip (Rata Kiri) */}
                        <ScrollReveal delay={0.4}>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
                                {stats.map((stat, i) => (
                                    <div key={i} className="text-left">
                                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans flex items-baseline">
                                            <CountUp to={parseInt(stat.setting_value) || 0} />
                                            <span className={i === 0 ? "text-orange-400" : i === 1 ? "text-blue-400" : "text-emerald-400"}>
                                                {stat.setting_suffix}
                                            </span>
                                        </div>
                                        <div className="text-slate-400 text-xs font-medium mt-0.5">{stat.setting_label}</div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Capabilities & Standards Badges (Grid 2 Kolom) */}
                        <ScrollReveal delay={0.5}>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg text-xs font-mono text-slate-400">
                                <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2 hover:border-blue-500/40 transition-colors">
                                    <Zap className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                                    <span>Stack Kustom Fleksibel</span>
                                </div>
                                <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2 hover:border-sky-500/40 transition-colors">
                                    <Database className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                                    <span>Arsitektur Data Terukur</span>
                                </div>
                                <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2 hover:border-orange-500/40 transition-colors">
                                    <CreditCard className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                                    <span>Integrasi API &amp; Payment</span>
                                </div>
                                <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2 hover:border-emerald-500/40 transition-colors">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                    <span>Garansi &amp; Standar SLA</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* RIGHT COLUMN: Interactive Bespoke Command Center Preview (10 Apps: Web & Mobile) */}
                    <div className="lg:col-span-6 xl:col-span-5 relative">
                        <ScrollReveal delay={0.3} direction="left">
                            <div 
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                className="relative rounded-2xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-orange-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-slate-700/60"
                            >
                                <div className="rounded-xl bg-slate-950/95 backdrop-blur-xl overflow-hidden border border-slate-800/90 flex flex-col justify-between w-full h-[650px] sm:h-[660px]">
                                    
                                    {/* Unified Fixed Header (h-[88px] across Web & Mobile) */}
                                    <div className="h-[88px] flex-shrink-0 flex flex-col justify-between bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                                        {/* Top System Bar (h-8) */}
                                        {currentApp.type === 'mobile' ? (
                                            <div className="h-8 px-4 flex items-center justify-between border-b border-slate-800/70 text-[11px]">
                                                <span className="font-semibold text-white">09:41</span>
                                                <div className="w-20 h-3.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center gap-1.5 shadow-inner">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400/80"></span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] text-slate-400">5G</span>
                                                    <Wifi className="w-3 h-3 text-slate-300" />
                                                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-8 px-4 flex items-center justify-between border-b border-slate-800/70 text-[11px]">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400/80"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                                                    <div className="ml-2 flex items-center gap-1 text-slate-300 text-[11px] bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                                                        <Globe className="w-3 h-3 text-blue-400" />
                                                        <span className="truncate max-w-[170px] sm:max-w-[200px]">{currentApp.domain}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-emerald-400 text-[10px]">
                                                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                                                    <span>Active 42ms</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* App Title & Category Sub-Header (h-14) */}
                                        <div className="h-14 px-4 py-2 flex items-center justify-between bg-slate-900/50">
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={currentApp.id}
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 4 }}
                                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                                    className="flex items-center gap-2.5 overflow-hidden"
                                                >
                                                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                                                        currentApp.type === 'mobile'
                                                            ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                                                            : 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                                                    }`}>
                                                        {currentApp.id === 'spp-pesantren' && <CreditCard className="w-4 h-4" />}
                                                        {currentApp.id === 'mobile-wali' && <Smartphone className="w-4 h-4" />}
                                                        {currentApp.id === 'pos-kasir' && <Tablet className="w-4 h-4" />}
                                                        {currentApp.id === 'compro-seo' && <Globe className="w-4 h-4" />}
                                                        {currentApp.id === 'mobile-absensi' && <MapPin className="w-4 h-4" />}
                                                        {currentApp.id === 'ecommerce-multivendor' && <ShoppingBag className="w-4 h-4" />}
                                                        {currentApp.id === 'klinik-emr' && <Stethoscope className="w-4 h-4" />}
                                                        {currentApp.id === 'mobile-kurir' && <Truck className="w-4 h-4" />}
                                                        {currentApp.id === 'wms-gudang' && <Database className="w-4 h-4" />}
                                                        {currentApp.id === 'mobile-lms' && <GraduationCap className="w-4 h-4" />}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="text-xs font-bold text-white tracking-wide truncate">{currentApp.title}</div>
                                                        <div className="text-[10px] text-slate-400 truncate">{currentApp.tagline}</div>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>

                                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 flex-shrink-0 ${
                                                currentApp.type === 'mobile'
                                                    ? 'bg-orange-950/80 border border-orange-500/40 text-orange-300'
                                                    : 'bg-blue-950/80 border border-blue-500/40 text-blue-300'
                                            }`}>
                                                {currentApp.type === 'mobile' ? (
                                                    <><Smartphone className="w-3 h-3" /> Mobile App</>
                                                ) : (
                                                    <><Globe className="w-3 h-3" /> Web SaaS</>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* 2-Second Countdown Animated Progress Bar */}
                                    <div className="h-0.5 w-full bg-slate-800 overflow-hidden relative flex-shrink-0">
                                        <motion.div 
                                            key={`${activeApp}-${isPaused}`}
                                            className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-orange-500"
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ 
                                                duration: isPaused ? 0 : 2, 
                                                ease: 'linear' 
                                            }}
                                        />
                                    </div>

                                    {/* Unified Controls & 10-App Selector Strip (h-[74px]) */}
                                    <div className="h-[74px] p-2.5 bg-slate-900/60 border-b border-slate-800/80 flex flex-col justify-between flex-shrink-0">
                                        {/* Auto-cycle Controls Bar */}
                                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={handlePrevApp}
                                                    title="Aplikasi Sebelumnya"
                                                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <ChevronLeft className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setIsPaused(!isPaused)}
                                                    title={isPaused ? "Lanjutkan Auto-Play (2s)" : "Jeda Auto-Play"}
                                                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                                                >
                                                    {isPaused ? <Play className="w-3.5 h-3.5 text-orange-400" /> : <Pause className="w-3.5 h-3.5 text-blue-400" />}
                                                </button>
                                                <button
                                                    onClick={handleNextApp}
                                                    title="Aplikasi Selanjutnya"
                                                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </button>

                                                {isPaused ? (
                                                    <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/50 text-amber-300 text-[10px] font-bold">
                                                        PAUSED
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-600/50 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                                        AUTO 2s
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1.5 text-[11px]">
                                                <span className="text-slate-500">Katalog:</span>
                                                <span className="font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                                    {(activeApp + 1).toString().padStart(2, '0')} / 10
                                                </span>
                                            </div>
                                        </div>

                                        {/* 10 Applications Scrollable Pill Strip */}
                                        <div ref={tabsContainerRef} className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-[11px]">
                                            {applications.map((app, idx) => {
                                                const isActive = activeApp === idx;
                                                const isMobile = app.type === 'mobile';
                                                return (
                                                    <button
                                                        key={app.id}
                                                        onClick={() => setActiveApp(idx)}
                                                        className={`py-0.5 px-2 rounded-md whitespace-nowrap transition-all flex items-center gap-1 border text-[11px] font-mono ${
                                                            isActive
                                                                ? isMobile
                                                                    ? 'bg-orange-500 border-orange-400 text-white font-bold shadow-sm'
                                                                    : 'bg-blue-600 border-blue-500 text-white font-bold shadow-sm'
                                                                : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                                        }`}
                                                    >
                                                        <span>{app.shortName}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Console Body: Silky Smooth Framer Motion Cross-fade with Blur & Slide */}
                                    <div className="flex-1 min-h-[385px] p-3.5 sm:p-4 relative overflow-hidden flex flex-col justify-between">
                                        <AnimatePresence mode="wait">

                                            <motion.div 
                                                key={activeApp} 
                                                initial={{ opacity: 0, x: 14, filter: 'blur(4px)' }}
                                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, x: -14, filter: 'blur(4px)' }}
                                                transition={{ 
                                                    duration: 0.35, 
                                                    ease: [0.22, 1, 0.36, 1] 
                                                }}
                                                className="h-full flex flex-col justify-between gap-2.5"
                                            >
                                                {/* Metric Card (h-[135px]) */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-[135px]">
                                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                                        <span className="truncate max-w-[200px]">{currentApp.metricTitle}</span>
                                                        <span className="text-emerald-400 font-semibold text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex-shrink-0">
                                                            {currentApp.badge}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline justify-between my-1">
                                                        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                                            {currentApp.metricValue}
                                                        </div>
                                                        <span className="text-xs font-mono text-orange-400 font-semibold">
                                                            {currentApp.targetText}
                                                        </span>
                                                    </div>
                                                    {/* Dual Color Progress Bar */}
                                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                                        <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: currentApp.progressBlue }}></div>
                                                        <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: currentApp.progressOrange }}></div>
                                                    </div>
                                                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                                                        <span className="truncate">{currentApp.subMetric}</span>
                                                        <span className="text-blue-400 font-mono flex-shrink-0">{currentApp.statusLabel}</span>
                                                    </div>
                                                </div>

                                                {/* Feature Card 1 (h-[96px]) */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-[96px]">
                                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                            <span className="font-semibold text-slate-200 truncate">{currentApp.feature1.title}</span>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 flex-shrink-0">
                                                            {currentApp.feature1.badge}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-300 leading-relaxed text-justify line-clamp-2">
                                                        {currentApp.feature1.desc}
                                                    </p>
                                                </div>

                                                {/* Feature Card 2 (h-[96px]) */}
                                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between h-[96px]">
                                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                            <span className="font-semibold text-slate-200 truncate">{currentApp.feature2.title}</span>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800/60 flex-shrink-0">
                                                            {currentApp.feature2.badge}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-300 leading-relaxed text-justify line-clamp-2">
                                                        {currentApp.feature2.desc}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Unified Fixed Footer (h-[86px] across Web & Mobile) */}
                                    <div className="h-[86px] px-4 py-2 bg-slate-900/70 border-t border-slate-800/80 flex flex-col justify-between flex-shrink-0">
                                        {/* Row 1: Interactive Touch / Workspace Emulation */}
                                        {currentApp.type === 'mobile' ? (
                                            <div>
                                                <div className="grid grid-cols-4 gap-1 text-center text-[10px] text-slate-400 py-0.5">
                                                    <div className="flex flex-col items-center gap-0.5 text-orange-400 font-bold">
                                                        <Smartphone className="w-3 h-3" />
                                                        <span>Home</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <Activity className="w-3 h-3" />
                                                        <span>Aktivitas</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <MessageSquare className="w-3 h-3" />
                                                        <span>Pesan</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <ShieldCheck className="w-3 h-3" />
                                                        <span>Profil</span>
                                                    </div>
                                                </div>
                                                <div className="w-24 h-1 bg-slate-700/80 rounded-full mx-auto mt-1"></div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="grid grid-cols-4 gap-1 text-center text-[10px] text-slate-400 py-0.5">
                                                    <div className="flex flex-col items-center gap-0.5 text-blue-400 font-bold">
                                                        <Layers className="w-3 h-3" />
                                                        <span>Overview</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <Database className="w-3 h-3" />
                                                        <span>Database</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <Zap className="w-3 h-3" />
                                                        <span>API Gate</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-0.5 hover:text-white">
                                                        <ShieldCheck className="w-3 h-3" />
                                                        <span>Keamanan</span>
                                                    </div>
                                                </div>
                                                <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-1"></div>
                                            </div>
                                        )}

                                        {/* Row 2: Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-1 justify-center overflow-hidden">
                                            {currentApp.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-950/90 border border-slate-800 text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>



                </div>
            </div>
        </section>
    );
};

export default Hero;

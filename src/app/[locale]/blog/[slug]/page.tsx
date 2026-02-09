import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User, BookOpen, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Fallback blog posts
const posts = [
  {
    title: 'Tren Transformasi Digital 2025',
    slug: 'tren-transformasi-digital-2025',
    excerpt: 'Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.',
    content: `Transformasi digital bukan lagi pilihan, melainkan keharusan bagi bisnis yang ingin bertahan di era modern. Berikut adalah tren utama yang perlu Anda perhatikan:

## 1. AI-Powered Automation
Kecerdasan buatan semakin accessible untuk UMKM. Chatbot, analisis data, dan personalisasi pelanggan kini bisa diimplementasikan dengan biaya terjangkau.

## 2. Low-Code/No-Code Platforms
Memungkinkan bisnis membangun aplikasi tanpa coding mendalam, mempercepat time-to-market secara signifikan.

## 3. Cloud-First Strategy
Infrastruktur cloud menjadi fondasi utama, memberikan skalabilitas dan efisiensi biaya yang lebih baik.

## 4. Cybersecurity Priority
Dengan meningkatnya digitalisasi, keamanan siber menjadi investasi wajib, bukan opsional.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    category: 'Technology',
    author: 'Tim Velora',
    publishedAt: '20 Des 2024',
    readTime: 5,
  },
  {
    title: 'Implementasi AI untuk UMKM',
    slug: 'implementasi-ai-untuk-umkm',
    excerpt: 'Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.',
    content: `Banyak yang mengira AI hanya untuk perusahaan besar. Padahal, UMKM justru bisa mendapat keuntungan signifikan dari implementasi AI yang tepat.

## Chatbot untuk Customer Service
Respon pelanggan 24/7 tanpa menambah staf. Bisa handle FAQ, pesanan, dan keluhan secara otomatis.

## Analisis Penjualan Otomatis
AI bisa mengidentifikasi pattern pembelian, prediksi stok, dan rekomendasi produk yang perlu dipromosikan.

## Personalisasi Marketing
Email yang disesuaikan dengan behavior pelanggan meningkatkan conversion rate hingga 3x lipat.

## Mulai dari Mana?
Tidak perlu langsung kompleks. Mulai dari chatbot WhatsApp sederhana, lalu kembangkan seiring pertumbuhan bisnis.`,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Automation',
    author: 'Tim Velora',
    publishedAt: '15 Des 2024',
    readTime: 4,
  },
  {
    title: 'Migrasi ke Cloud: Panduan Lengkap',
    slug: 'migrasi-ke-cloud-panduan-lengkap',
    excerpt: 'Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.',
    content: `Migrasi ke cloud adalah langkah besar yang membutuhkan perencanaan matang. Berikut panduan kami:

## Fase 1: Assessment
Audit infrastruktur existing. Identifikasi aplikasi mana yang prioritas untuk migrasi dan mana yang perlu refactoring.

## Fase 2: Pilih Provider
AWS, Google Cloud, atau Azure? Masing-masing punya kelebihan. Sesuaikan dengan kebutuhan dan budget.

## Fase 3: Pilot Project
Jangan langsung migrasi semua. Mulai dengan satu aplikasi non-critical untuk testing dan pembelajaran.

## Fase 4: Full Migration
Setelah pilot berhasil, lanjutkan migrasi bertahap dengan rollback plan yang jelas.

## Key Metrics
- Downtime target: < 1 jam
- Cost savings: 20-40% setelah 1 tahun
- Performance improvement: 2-3x`,
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80',
    category: 'Cloud Computing',
    author: 'Tim Velora',
    publishedAt: '10 Des 2024',
    readTime: 6,
  },
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const t = await getTranslations('blog');
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const handleWhatsApp = () => {
    const message = `Halo Velora! Saya tertarik dengan artikel "${post.title}". Bisa diskusi lebih lanjut?`;
    return `https://wa.me/6281320442174?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-64 sm:h-96 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            {/* Category */}
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {post.readTime} {t('readTime')}
              </span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm mb-4">Ingin diskusi lebih lanjut tentang topik ini?</p>
              <a
                href={handleWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Diskusikan dengan Tim Kami
              </a>
            </div>

            {/* Back Link */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToList')}
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

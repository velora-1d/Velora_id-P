import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Fallback blog posts data
const posts = [
  {
    title: 'Tren Transformasi Digital 2025',
    slug: 'tren-transformasi-digital-2025',
    excerpt: 'Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    author: 'Tim Velora',
    publishedAt: '20 Des 2024',
    readTime: 5,
  },
  {
    title: 'Implementasi AI untuk UMKM',
    slug: 'implementasi-ai-untuk-umkm',
    excerpt: 'Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    category: 'AI & Automation',
    author: 'Tim Velora',
    publishedAt: '15 Des 2024',
    readTime: 4,
  },
  {
    title: 'Migrasi ke Cloud: Panduan Lengkap',
    slug: 'migrasi-ke-cloud-panduan-lengkap',
    excerpt: 'Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.',
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Computing',
    author: 'Tim Velora',
    publishedAt: '10 Des 2024',
    readTime: 6,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog');
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BlogPage() {
  const t = await getTranslations('blog');

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
              {t('badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-blue-500 px-3 py-1 rounded-full text-xs font-bold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.readTime} {t('readTime')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToList')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

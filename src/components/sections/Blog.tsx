'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Calendar, BookOpen } from 'lucide-react';

// Fallback data jika Sanity belum dihubungkan
const fallbackPosts = [
  {
    title: 'Tren Transformasi Digital 2025',
    slug: 'tren-transformasi-digital-2025',
    excerpt: 'Pelajari tren terbaru dalam transformasi digital yang akan membentuk masa depan bisnis di Indonesia.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    category: 'Technology',
    author: 'Tim Velora',
    publishedAt: '2024-12-20',
    readTime: 5,
  },
  {
    title: 'Implementasi AI untuk UMKM',
    slug: 'implementasi-ai-untuk-umkm',
    excerpt: 'Bagaimana bisnis kecil dan menengah dapat memanfaatkan kecerdasan buatan untuk meningkatkan efisiensi.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    category: 'AI & Automation',
    author: 'Tim Velora',
    publishedAt: '2024-12-15',
    readTime: 4,
  },
  {
    title: 'Migrasi ke Cloud: Panduan Lengkap',
    slug: 'migrasi-ke-cloud-panduan-lengkap',
    excerpt: 'Langkah-langkah strategis untuk memindahkan infrastruktur bisnis Anda ke cloud dengan aman.',
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80',
    category: 'Cloud Computing',
    author: 'Tim Velora',
    publishedAt: '2024-12-10',
    readTime: 6,
  },
];

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
};

type Props = {
  posts?: BlogPost[];
};

const Blog = ({ posts }: Props) => {
  const t = useTranslations('blog');
  const blogPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <section id="blog" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4 tracking-wide">
            {t('badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col h-full group"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {t('readMore')}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between items-center text-xs text-gray-500">
                  <span className="font-medium text-gray-700">{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.readTime} {t('readTime')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

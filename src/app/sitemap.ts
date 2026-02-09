import { MetadataRoute } from 'next';

const posts = [
  { slug: 'tren-transformasi-digital-2025' },
  { slug: 'implementasi-ai-untuk-umkm' },
  { slug: 'migrasi-ke-cloud-panduan-lengkap' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ve-lora.my.id';

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}

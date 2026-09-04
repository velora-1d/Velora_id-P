export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: ['Googlebot', 'Bingbot', 'Applebot'],
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: ['GPTBot', 'Claude-Web', 'PerplexityBot'],
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: 'https://www.ve-lora.my.id/sitemap.xml',
    };
}

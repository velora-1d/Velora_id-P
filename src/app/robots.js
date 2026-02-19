export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/', '/_next/'],
            },
        ],
        sitemap: 'https://www.ve-lora.my.id/sitemap.xml',
    };
}

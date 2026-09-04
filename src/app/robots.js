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
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'ClaudeBot',
                    'Claude-Web',
                    'PerplexityBot',
                    'Google-Extended',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: 'https://www.ve-lora.my.id/sitemap.xml',
        host: 'https://www.ve-lora.my.id',
    };
}


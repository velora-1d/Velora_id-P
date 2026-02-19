export default function sitemap() {
    const baseUrl = 'https://www.ve-lora.my.id';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];
}

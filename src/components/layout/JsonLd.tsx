import { WithContext, Organization, WebSite } from 'schema-dts';

const JsonLd = () => {
  const websiteSchema: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Velora ID',
    url: 'https://velora.id',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://velora.id/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    } as any,
  };

  const organizationSchema: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Velora ID',
    url: 'https://velora.id',
    logo: 'https://velora.id/images/logo.png',
    sameAs: [
      'https://github.com/velora-1d',
      'https://instagram.com/velora.id',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-813-2044-2174',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English'],
    },
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </section>
  );
};

export default JsonLd;

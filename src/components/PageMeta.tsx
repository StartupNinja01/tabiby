/**
 * PageMeta — injects per-page <title>, <meta description>, Open Graph,
 * Twitter cards, canonical, hreflang alternates, and optional JSON-LD
 * structured data into <head> via react-helmet-async.
 *
 * Usage:
 *   <PageMeta
 *     title="Dr. Layla Hassan — Dermatologist in Doha | Tabiby"
 *     description="Book an appointment with Dr. Layla Hassan, Consultant Dermatologist in Education City, Doha."
 *     canonical="https://tabiby.co/doctor/1"
 *     jsonLd={physicianSchema}
 *   />
 */

import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Tabiby';
const SITE_URL = 'https://tabiby.co';
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  /** Pass a fully-formed JSON-LD object; will be serialised into a <script> tag */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Suppress hreflang injection on pages that shouldn't be indexed in all locales */
  noHreflang?: boolean;
}

export default function PageMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
  noHreflang = false,
}: PageMetaProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* hreflang alternates */}
      {!noHreflang && canonical && (
        <>
          <link rel="alternate" hrefLang="en" href={canonical} />
          <link rel="alternate" hrefLang="ar" href={`${canonical}?lang=ar`} />
          <link rel="alternate" hrefLang="hi" href={`${canonical}?lang=hi`} />
          <link rel="alternate" hrefLang="x-default" href={canonical} />
        </>
      )}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

// ─── Schema helpers ────────────────────────────────────────────────────────────

/** JSON-LD for the Tabiby homepage (MedicalOrganization) */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'Tabiby',
    url: 'https://tabiby.co',
    logo: 'https://tabiby.co/favicon.svg',
    description:
      'Tabiby is the trusted healthcare booking platform in Qatar. Find top-rated doctors by specialty, location, and insurance, and book instantly.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'QA',
      addressLocality: 'Doha',
    },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    availableLanguage: ['English', 'Arabic', 'Hindi'],
    sameAs: ['https://tabiby.co'],
  };
}

/** JSON-LD for a doctor profile page (Physician + MedicalBusiness) */
export function doctorJsonLd(doc: {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  clinic: string;
  address: string;
  city: string;
  rating: number;
  reviews: number;
  lat: number;
  lng: number;
  languages: string[];
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      '@id': `https://tabiby.co/doctor/${doc.id}`,
      name: doc.name,
      description: doc.bio,
      medicalSpecialty: doc.specialty,
      worksFor: { '@type': 'Hospital', name: doc.clinic },
      knowsLanguage: doc.languages,
      url: `https://tabiby.co/doctor/${doc.id}`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: doc.rating,
        reviewCount: doc.reviews,
        bestRating: 5,
        worstRating: 1,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: doc.clinic,
      address: {
        '@type': 'PostalAddress',
        streetAddress: doc.address,
        addressLocality: doc.city,
        addressCountry: 'QA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: doc.lat,
        longitude: doc.lng,
      },
      url: `https://tabiby.co/doctor/${doc.id}`,
    },
  ];
}

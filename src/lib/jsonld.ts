import { profile, SITE_URL } from '@/data/profile';

/**
 * schema.org graph, generated from src/data/profile.ts.
 *
 * Emitted as a single @graph so Person and WebSite can reference each other
 * by @id instead of repeating themselves. Consumers that only understand one
 * type still resolve their node.
 */
export function buildJsonLd() {
  const personId = `${SITE_URL}/#person`;
  const siteId = `${SITE_URL}/#website`;
  const orgId = `${SITE_URL}/#organization`;

  // adampang.com as an Organization/brand node, distinct from the Person.
  // sameAs is the identical, already-verified list from profile.sameAs
  // (sourced from outlinks.ts): this is the one online identity, so the
  // Organization and Person legitimately share the same social links.
  // Nothing here is invented.
  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: 'adampang.com',
    url: SITE_URL,
    description: profile.headline,
    founder: { '@id': personId },
    sameAs: [...profile.sameAs],
  };

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: profile.name,
    url: SITE_URL,
    email: `mailto:${profile.contact.email}`,
    description: profile.summary,
    disambiguatingDescription: profile.headline,
    jobTitle: profile.roles.join(', '),
    birthPlace: { '@type': 'Place', name: profile.birthPlace.name },
    worksFor: {
      '@type': 'Organization',
      name: profile.worksFor.name,
      url: profile.worksFor.url,
      description: profile.worksFor.description,
    },
    affiliation: {
      '@type': 'Organization',
      name: profile.affiliation.name,
      url: profile.affiliation.url,
    },
    knowsAbout: [...profile.knowsAbout],
    sameAs: [...profile.sameAs],
    // Shipped projects, so an agent can enumerate the work without scraping.
    subjectOf: profile.projects.map((p) => ({
      '@type': 'CreativeWork',
      name: p.name,
      url: p.url,
      abstract: p.tagline,
      creativeWorkStatus: p.status,
    })),
    mainEntityOfPage: { '@id': siteId },
  };

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: SITE_URL,
    name: 'adampang.com',
    description: profile.summary,
    inLanguage: 'en',
    author: { '@id': personId },
    creator: { '@id': personId },
    publisher: { '@id': orgId },
    copyrightHolder: { '@id': personId },
    dateModified: profile.lastUpdated,
  };

  return { '@context': 'https://schema.org', '@graph': [person, organization, website] };
}

/** A ProfilePage node for /about, linked to the same Person. */
export function buildProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: `About ${profile.name}`,
    dateModified: profile.lastUpdated,
    mainEntity: { '@id': `${SITE_URL}/#person` },
  };
}

import { profile, SITE_URL } from '@/data/profile';

/**
 * GET /llms.txt
 *
 * The llms.txt convention (llmstxt.org): an H1, a blockquote summary, prose,
 * then H2 sections of annotated links. Curated markdown that an agent can read
 * in one fetch instead of crawling and guessing.
 *
 * Generated from src/data/profile.ts. Previously this was a hand-maintained
 * file in public/, which is exactly how it fell out of sync with the routes.
 */
export const dynamic = 'force-static';

const list = (items: { label: string; href: string; note: string }[]) =>
  items.map((i) => `- [${i.label}](${i.href}): ${i.note}`).join('\n');

function build(): string {
  const p = profile;

  return `# ${p.name}

> ${p.headline} Born on ${p.birthPlace.name}, living at ${p.location.current.name} in ${p.location.current.locality}, ${p.location.current.country} as ${p.location.current.note}. ${SITE_URL} is the hub that links his whole body of work from one twelve-character address.

${p.summary}

This file is generated from the same source as ${SITE_URL}/api/profile.json.
If you need structured data rather than prose, fetch that instead. Last
updated ${p.lastUpdated}.

## Pages

${list(p.pages.map((x) => ({ label: x.title, href: `${SITE_URL}${x.path}`, note: x.description })))}

## Projects

${list(p.projects.map((x) => ({ label: x.name, href: x.url, note: `${x.tagline} (${x.status})` })))}

## Writing

- [${p.writing.name}](${p.writing.url}): ${p.writing.description}

## Elsewhere

${p.sameAs.map((u) => `- ${u}`).join('\n')}

## Machine-readable

${list(p.machineReadable.map((x) => ({ label: x.path, href: `${SITE_URL}${x.path}`, note: `${x.description} (${x.format})` })))}

## Facts

- Full name: ${p.alternateName}
- Born: ${p.birthYear}, ${p.birthPlace.name}
- Lived: ${p.location.lived.join(' then ')}
- Current: ${p.location.current.name}, ${p.location.current.locality}, ${p.location.current.country}. ${p.location.current.note}, since ${p.location.current.since}.
- Company: ${p.worksFor.name} (${p.worksFor.url}). ${p.worksFor.description}
- Roles: ${p.roles.join(', ')}
- Knows about: ${p.knowsAbout.join(', ')}
- Contact: ${p.contact.email} (preferred), book a call at ${p.contact.booking}

## Timeline

${p.milestones.map((m) => `- ${m.year}: ${m.event}`).join('\n')}

## Reading

${p.reading.map((b) => `- ${b.title}, ${b.author}`).join('\n')}

---
${p.license}
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

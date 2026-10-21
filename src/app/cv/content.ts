import resume from './resume.json';

/** Single source for the /cv page and scripts/build-cv-pdf.mjs. */
export const cv = resume;

export const pdfHref = '/adam-pang-resume.pdf';

/** Splits "**bold**" and "[label](url)" markup into renderable parts. */
export type Part = { kind: 'text' | 'bold' | 'link'; text: string; href?: string };

export function parse(source: string): Part[] {
  const parts: Part[] = [];
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ kind: 'text', text: source.slice(last, index) });
    if (match[1] !== undefined) parts.push({ kind: 'bold', text: match[1] });
    else parts.push({ kind: 'link', text: match[2], href: match[3] });
    last = index + match[0].length;
  }
  if (last < source.length) parts.push({ kind: 'text', text: source.slice(last) });
  return parts;
}

/**
 * Structural validator for the JSON-LD emitted into <head>.
 *
 * Extracts every application/ld+json block from the built HTML and checks
 * the things that actually break consumers: parseability, required @context
 * and @type, resolvable @id references inside the @graph, absolute URLs,
 * and no undefined/null leaking into the output.
 *
 *   node scripts/validate-jsonld.mjs
 *
 * This is a structural check, not a claim that Google's Rich Results tool
 * agrees. Run that separately against the deployed URL.
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = '.next/server/app';

const htmlFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });

let errors = 0;
let blocks = 0;

const fail = (file, msg) => {
  console.log(`  FAIL  ${file}\n        ${msg}`);
  errors++;
};

for (const file of htmlFiles(ROOT)) {
  const html = fs.readFileSync(file, 'utf8');
  const matches = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    ),
  ];

  for (const [, body] of matches) {
    blocks++;
    const short = file.replace(ROOT, '').replace(/\\/g, '/');

    let doc;
    try {
      doc = JSON.parse(body);
    } catch (e) {
      fail(short, `not parseable: ${e.message}`);
      continue;
    }

    if (!doc['@context']) fail(short, 'missing @context');
    else if (!String(doc['@context']).includes('schema.org'))
      fail(short, `@context is not schema.org: ${doc['@context']}`);

    const nodes = doc['@graph'] ?? [doc];
    if (!Array.isArray(nodes) || nodes.length === 0)
      fail(short, '@graph is empty');

    const ids = new Set(nodes.map((n) => n['@id']).filter(Boolean));

    for (const node of nodes) {
      if (!node['@type']) fail(short, `node missing @type: ${JSON.stringify(node).slice(0, 80)}`);

      // Any {"@id": "..."} reference must resolve within the graph, or be
      // an absolute URL pointing at another document.
      const walk = (v, keyPath) => {
        if (v === undefined) fail(short, `undefined value at ${keyPath}`);
        if (v === null) fail(short, `null value at ${keyPath}`);
        if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${keyPath}[${i}]`));
        if (v && typeof v === 'object') {
          const keys = Object.keys(v);
          if (keys.length === 1 && keys[0] === '@id') {
            const ref = v['@id'];
            if (!ids.has(ref) && !/^https?:\/\//.test(ref))
              fail(short, `unresolvable @id reference: ${ref} (at ${keyPath})`);
          }
          return Object.entries(v).forEach(([k, x]) => walk(x, `${keyPath}.${k}`));
        }
        if (typeof v === 'string' && /^(url|sameAs)$/i.test(keyPath.split('.').pop() ?? '')) {
          if (!/^https?:\/\//.test(v)) fail(short, `non-absolute URL at ${keyPath}: ${v}`);
        }
      };

      walk(node, node['@type']);
    }

    const types = nodes.map((n) => n['@type']).join(' + ');
    console.log(`  ok    ${short.padEnd(28)} ${types}`);
  }
}

console.log(`\n  ${blocks} JSON-LD block${blocks === 1 ? '' : 's'} . ${errors} error${errors === 1 ? '' : 's'}\n`);
process.exit(errors > 0 ? 1 : 0);

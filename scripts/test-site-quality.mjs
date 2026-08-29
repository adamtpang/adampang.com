import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nextBin = require.resolve('next/dist/bin/next');

function stripMarkup(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function visibleBody(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  return stripMarkup(body);
}

function words(value) {
  return value ? value.split(/\s+/).filter(Boolean) : [];
}

function title(html) {
  return stripMarkup(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
}

function paragraphTexts(html) {
  return [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripMarkup(match[1]))
    .filter(Boolean);
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function waitForServer(origin, child, output) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js exited before tests started.\n${output.join('')}`);
    }
    try {
      const response = await fetch(origin, { redirect: 'manual' });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Timed out waiting for ${origin}.\n${output.join('')}`);
}

const port = await freePort();
const origin = `http://127.0.0.1:${port}`;
const output = [];
const server = spawn(process.execPath, [nextBin, 'start', '-H', '127.0.0.1', '-p', String(port)], {
  cwd: projectRoot,
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});
server.stdout.on('data', (chunk) => output.push(chunk.toString()));
server.stderr.on('data', (chunk) => output.push(chunk.toString()));

try {
  await waitForServer(origin, server, output);

  const browserUa = 'Mozilla/5.0 (compatible; Lightmark/2.0; +https://lightmark.app)';
  const botUa = 'Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.2; +https://openai.com/gptbot)';
  const [browserResponse, botResponse] = await Promise.all([
    fetch(`${origin}/`, { headers: { 'user-agent': browserUa } }),
    fetch(`${origin}/`, { headers: { 'user-agent': botUa } }),
  ]);
  assert.equal(browserResponse.status, 200, 'browser homepage must return 200');
  assert.equal(botResponse.status, 200, 'GPTBot homepage must return 200');

  const [html, botHtml] = await Promise.all([browserResponse.text(), botResponse.text()]);
  const homeText = visibleBody(html);
  const botText = visibleBody(botHtml);
  const homeWords = words(homeText);
  const paragraphs = paragraphTexts(html);
  const chunkable = paragraphs.filter((paragraph) => {
    const length = words(paragraph).length;
    return length >= 25 && length <= 120 && !/^(it|this|that|these|they|he|she|we|you)\b/i.test(paragraph);
  });

  assert.equal(title(html), 'Adam Pang — Builder, Writer & Musician');
  assert.ok(title(html).length >= 20 && title(html).length <= 65, 'title must be 20–65 characters');
  assert.equal(count(html, /<h1\b/gi), 1, 'homepage must have exactly one H1');
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/adampang\.com"/i);
  assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]{70,170}"/i);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"WebSite"/);

  assert.ok(homeWords.length >= 250, `homepage needs at least 250 visible words; found ${homeWords.length}`);
  assert.ok(paragraphs.length > 0, 'homepage must contain substantive paragraphs');
  assert.ok(chunkable.length / paragraphs.length >= 0.35, 'at least 35% of paragraphs must stand alone');
  assert.ok(botText.length / homeText.length >= 0.85, 'GPTBot and browser raw content must remain in parity');

  for (const route of ['/about', '/contact', '/privacy']) {
    assert.match(html, new RegExp(`href="${route}"`), `homepage must link ${route}`);
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 200, `${route} must return 200`);
    const routeHtml = await response.text();
    assert.match(visibleBody(routeHtml), /Adam Pang/i, `${route} must identify Adam Pang`);
    assert.ok(words(visibleBody(routeHtml)).length >= 120, `${route} must be a substantial trust page`);
  }

  assert.match(html, /href="\/contact"[^>]*>\s*Contact Adam about a collaboration\s*</i);
  assert.match(homeText, /published offer menu|pricing/i, 'homepage must state offer and pricing context');
  assert.match(html, /href="https:\/\/adam\.gives"/i, 'homepage offer context must link the real published menu');

  const csp = browserResponse.headers.get('content-security-policy') ?? '';
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /frame-src https:\/\/open\.spotify\.com/);
  assert.doesNotMatch(csp, /(?:default-src|script-src|frame-src)\s+\*/i, 'CSP must not use blanket sources');
  assert.doesNotMatch(csp, /'unsafe-eval'/i, 'production CSP must not allow eval');
  assert.equal(browserResponse.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(browserResponse.headers.get('x-frame-options'), 'DENY');
  assert.equal(browserResponse.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');

  const privacyHtml = await (await fetch(`${origin}/privacy`)).text();
  const privacyText = visibleBody(privacyHtml);
  for (const disclosure of ['Vercel Web Analytics', 'Vercel Speed Insights', 'local storage', 'Spotify player', 'no contact form']) {
    assert.match(privacyText, new RegExp(disclosure, 'i'), `privacy page must disclose ${disclosure}`);
  }

  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  for (const route of ['/about', '/contact', '/privacy']) {
    assert.match(sitemap, new RegExp(`https://adampang\\.com${route}`), `sitemap must list ${route}`);
  }

  console.log(
    `site quality: ${homeWords.length} homepage words, ${Math.round((chunkable.length / paragraphs.length) * 100)}% self-contained paragraphs, trust routes reachable, CSP enforced`,
  );
} finally {
  server.kill();
}

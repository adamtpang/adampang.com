import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/profile';

/**
 * robots.txt
 *
 * AI crawlers are named explicitly rather than left to the wildcard. A bare
 * `User-agent: *` does permit them, but several operators look for their own
 * token before deciding, and an explicit allow is an unambiguous signal.
 * This site wants to be read by agents.
 *
 * Token sources:
 *   GPTBot, OAI-SearchBot, ChatGPT-User       platform.openai.com/docs/bots
 *   ClaudeBot, Claude-User, Claude-SearchBot  Anthropic support docs
 *   PerplexityBot, Perplexity-User            perplexity.ai/perplexitybot
 *   Google-Extended                           Gemini training opt-in
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Amazonbot',
  'YouBot',
  'Diffbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Everything is public. /api/ is allowed on purpose: profile.json is
      // the point of the machine-readable layer.
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

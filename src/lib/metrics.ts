/**
 * Live numbers. Fetched at build time with 1-hour revalidation, so the
 * homepage always shows fresh-ish stats without hammering APIs on every
 * request.
 *
 * No secrets, no auth. Both sources are public:
 *   GitHub          api.github.com/users/<username>
 *   Substack RSS    <domain>/feed
 *
 * Adding a new source:
 *   1. Add a fetcher here that returns `T | null` (null on failure)
 *   2. Call it from page.tsx in the Promise.all
 *   3. Wire the result into Leverage via the liveStats prop
 *
 * All fetchers swallow errors so a failed API never breaks the build.
 */

const REVALIDATE = 3600; // seconds. Refresh hourly.

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  totalStars: number;
};

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: REVALIDATE },
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, {
        next: { revalidate: REVALIDATE },
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { public_repos: number; followers: number };
    const repos = (await reposRes.json()) as Array<{
      stargazers_count: number;
      fork: boolean;
    }>;

    const totalStars = repos
      .filter((r) => !r.fork)
      .reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
    };
  } catch {
    return null;
  }
}

export type SubstackStats = {
  postCount: number;
  latestTitle: string | null;
  latestUrl: string | null;
  latestDate: string | null;
};

export async function getSubstackStats(feedUrl: string): Promise<SubstackStats | null> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: 'application/rss+xml, text/xml, */*' },
    });
    if (!res.ok) return null;

    const text = await res.text();
    const items = text.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const postCount = items.length;

    const latest = items[0];
    let latestTitle: string | null = null;
    let latestUrl: string | null = null;
    let latestDate: string | null = null;

    if (latest) {
      const titleMatch = latest.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const linkMatch = latest.match(/<link>([\s\S]*?)<\/link>/);
      const dateMatch = latest.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      if (titleMatch) latestTitle = titleMatch[1].trim();
      if (linkMatch) latestUrl = linkMatch[1].trim();
      if (dateMatch) latestDate = dateMatch[1].trim();
    }

    return { postCount, latestTitle, latestUrl, latestDate };
  } catch {
    return null;
  }
}

export type LiveStats = {
  github: GitHubStats | null;
  substack: SubstackStats | null;
};

export async function getLiveStats(): Promise<LiveStats> {
  const [github, substack] = await Promise.all([
    getGitHubStats('adamtpang'),
    getSubstackStats('https://pangaea.blog/feed'),
  ]);
  return { github, substack };
}

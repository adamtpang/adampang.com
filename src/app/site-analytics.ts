import posthog from 'posthog-js';

const siteId = "adampang.com";
const publicPaths = new Set(["/", "/about", "/contact", "/privacy", "/now", "/ns", "/support", "/design", "/community"]);
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
let initialized = false;
let lastPath: string | null = null;

/** Public pages only. Search text, URL queries and fragments never leave the browser. */
export function capturePageview(pathname: string) {
  if (typeof window === 'undefined' || !token) return;
  if (![siteId, 'www.' + siteId].includes(location.hostname)) return;
  const path = pathname.replace(/\/$/, '') || '/';
  if (!publicPaths.has(path)) { lastPath = null; return; }
  if (!initialized) {
    posthog.init(token, {
      api_host: 'https://us.i.posthog.com', ui_host: 'https://us.posthog.com',
      defaults: '2026-08-30', cookieless_mode: 'always', person_profiles: 'never',
      autocapture: false, capture_pageview: false, capture_pageleave: false,
      capture_dead_clicks: false, capture_performance: false, capture_heatmaps: false,
      capture_exceptions: false, disable_session_recording: true, disable_surveys: true,
      advanced_disable_flags: true, disable_external_dependency_loading: true,
      before_send(event) {
        if (!event || event.event !== '$pageview') return null;
        const p = event.properties;
        const publicPath = p.$pathname;
        if (!publicPaths.has(publicPath)) return null;
        for (const key of Object.keys(p)) {
          if (/referr|initial|utm_|gclid|fbclid|msclkid|url/i.test(key)) delete p[key];
        }
        p.$current_url = 'https://' + location.hostname + publicPath;
        p.$pathname = publicPath; p.$host = location.hostname;
        p.site_id = siteId; p.hostname = location.hostname;
        return event;
      },
    });
    initialized = true;
  }
  if (lastPath === path) return;
  lastPath = path;
  posthog.capture('$pageview', { $pathname: path });
}

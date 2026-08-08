/**
 * Reading progress as a 0..1 fraction.
 *
 * Pulled out of ScrollProgress.tsx as a pure function so it can be tested
 * without a browser. The headless pane this repo is developed against
 * cannot scroll, so the component's behaviour is otherwise unverifiable.
 *
 * Guards the degenerate case: a page shorter than the viewport has no
 * scrollable range, and dividing by that zero would yield NaN, which
 * silently renders as an untransformed (full-width) bar.
 */
export function readingProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number
): number {
  const max = scrollHeight - viewportHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / max));
}

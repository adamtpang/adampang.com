import type { Milestone as MilestoneType } from '@/data/milestones';

/**
 * One beat of the timeline.
 *
 * Four parts at four different weights, which is the whole trick: a year
 * set as a tiny wide-tracked mono marker, the subject at display size, the
 * role in italic underneath, and the consequence as plain body text. The
 * previous version rendered all of it as one grey line, so nothing had
 * hierarchy and the eye had nowhere to land.
 *
 * The hairlines flanking the year are 18px rules, not a border. They make
 * a 12px label read as a chapter marker rather than as small text.
 */
export default function Milestone({ year, title, role, note }: MilestoneType) {
  return (
    <li className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:py-7">
      {/* Year marker. Mono, wide tracking, rules on both sides. */}
      <div
        className="flex items-center gap-2.5 text-caption uppercase text-muted"
        style={{ letterSpacing: '0.4em' }}
      >
        <span aria-hidden className="h-px w-[18px] shrink-0 bg-muted" />
        <span className="nums">{year}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <h3 className="mt-3 font-display text-display-sm leading-[0.95] tracking-tightest text-fg">
        {title}
      </h3>

      <p className="mt-1 text-lead italic text-fg/70">{role}</p>

      {note && <p className="mt-2 max-w-prose text-body text-muted">{note}</p>}
    </li>
  );
}

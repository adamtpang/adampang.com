import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * shadcn Badge, restyled. Tiny pill for status, tags, counts.
 * Each accent has its own variant so callsites can map meaning to color
 * (live = curiosity green, shipping = accent blue).
 *
 * Text uses the -ink token, never the raw hue. The raw hue is only ever the
 * 10%/15% tinted fill. Setting the label in the hue itself is what shipped
 * the "live" badge at 1.92:1 against a 4.5:1 requirement; the -ink variants
 * measure 5.0:1 or better in light and 7.7:1 or better in dark. The tinted
 * pairs are in the contrast suite, so this cannot regress silently.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-caption uppercase tracking-[0.16em] font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line bg-card text-muted',
        sunrise: 'border-accent/30 bg-accent/10 text-accent-ink dark:bg-accent/15 dark:text-accent',
        sky: 'border-sounds/30 bg-sounds/10 text-sounds-ink dark:bg-sounds/15',
        leaf: 'border-curiosity/30 bg-curiosity/10 text-curiosity-ink dark:bg-curiosity/15',
        ember: 'border-alert/30 bg-alert/10 text-alert-ink dark:bg-alert/15',
        sun: 'border-sights/40 bg-sights/10 text-sights-ink dark:bg-sights/15',
        plum: 'border-creativity/30 bg-creativity/10 text-creativity-ink dark:bg-creativity/15',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

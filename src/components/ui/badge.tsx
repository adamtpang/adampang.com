import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * shadcn Badge, restyled. Tiny pill for status, tags, counts.
 * Each rainbow accent has its own variant so callsites can map
 * meaning to color (e.g. live = leaf green, building = sunrise).
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-zinc-200 bg-white text-ink/70',
        sunrise: 'border-sunrise/30 bg-sunrise/10 text-sunrise',
        sky: 'border-sky/30 bg-sky/10 text-sky',
        leaf: 'border-leaf/30 bg-leaf/10 text-leaf',
        ember: 'border-ember/30 bg-ember/10 text-ember',
        sun: 'border-sun/40 bg-sun/15 text-amber-700',
        plum: 'border-plum/30 bg-plum/10 text-plum',
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

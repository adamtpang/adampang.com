import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * shadcn Button, restyled to the adampang sunrise system.
 * Variants:
 *   default. Solid sunrise pill. Primary CTA.
 *   secondary. White pill with zinc border. Secondary CTA.
 *   ghost. Transparent, sunrise on hover.
 *   outline. Sunrise border, sunrise text.
 *   link. Underlined, sunrise hover.
 *   sky / leaf / plum / sun / ember. Rainbow accent buttons.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunrise focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-sunrise text-white shadow-md shadow-sunrise/30 hover:bg-sunrise-600 hover:shadow-lg hover:shadow-sunrise/40 hover:-translate-y-0.5',
        secondary:
          'border border-line bg-card text-fg hover:border-accent hover:text-accent hover:-translate-y-0.5',
        ghost: 'text-fg hover:bg-sunken hover:text-accent',
        outline:
          'border border-accent text-accent-ink hover:bg-accent hover:text-on-accent dark:text-accent',
        link: 'text-accent-ink underline-offset-4 hover:underline dark:text-accent',
        // Section-hue fills. The label is dark ink, never white: the hues are
        // light, so white on them measures 1.92:1 (leaf) to 3.76:1 (ember),
        // all failing AA. Dark ink on the same fills is 4.62:1 to 9.05:1.
        sky: 'bg-sounds text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        leaf: 'bg-curiosity text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        plum: 'bg-creativity text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        sun: 'bg-sights text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        ember: 'bg-alert text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
      },
      size: {
        default: 'h-9 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-7 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

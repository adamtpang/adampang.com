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
          'border border-zinc-200 bg-white text-ink hover:border-sunrise hover:text-sunrise hover:-translate-y-0.5',
        ghost: 'text-ink hover:bg-zinc-100 hover:text-sunrise',
        outline:
          'border border-sunrise text-sunrise hover:bg-sunrise hover:text-white',
        link: 'text-sunrise underline-offset-4 hover:underline',
        sky: 'bg-sky text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        leaf: 'bg-leaf text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        plum: 'bg-plum text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        sun: 'bg-sun text-ink shadow-sm hover:opacity-90 hover:-translate-y-0.5',
        ember: 'bg-ember text-white shadow-sm hover:opacity-90 hover:-translate-y-0.5',
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

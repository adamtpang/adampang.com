import type { Metadata } from 'next';
import DesignSystem from './DesignSystem';

export const metadata: Metadata = {
  title: 'design system',
  description:
    "Live reference for Adam Pang's design system, rendered from a single token source. Colors, type scale, spacing, radii, shadows, and every interactive component state. Machine-readable exports at /design/tokens.json and /design/tokens.css.",
};

export default function DesignPage() {
  // <main> so the page exposes a document landmark like every other route.
  return (
    <main className="relative">
      <DesignSystem />
    </main>
  );
}

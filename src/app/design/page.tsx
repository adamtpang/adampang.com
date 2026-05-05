import type { Metadata } from 'next';
import DesignSystem from './DesignSystem';

export const metadata: Metadata = {
  title: 'design system',
  description: 'Live reference for adam pang\'s design system. Tokens, type, components, motion, voice.',
};

export default function DesignPage() {
  return <DesignSystem />;
}

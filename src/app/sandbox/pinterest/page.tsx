import type { Metadata } from 'next';
import PinterestExperiment from './PinterestExperiment';

export const metadata: Metadata = {
  title: 'pinterest embed sandbox',
  description: 'Comparing Pinterest embed approaches for the Sounds gallery.',
  robots: { index: false, follow: false },
};

export default function PinterestSandbox() {
  return <PinterestExperiment />;
}

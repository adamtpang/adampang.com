"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { capturePageview } from './site-analytics';

export default function SiteAnalytics() {
  const pathname = usePathname();
  useEffect(() => { if (pathname) capturePageview(pathname); }, [pathname]);
  return null;
}

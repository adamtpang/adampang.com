import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adam Pang - Software Engineer & Entrepreneur",
  description: "Software Engineer & Entrepreneur building products that matter. Currently working on Anchor Marianas and exploring new opportunities.",
  keywords: ["Adam Pang", "Software Engineer", "Entrepreneur", "Anchor Marianas", "Web Development", "Guam"],
  authors: [{ name: "Adam Pang" }],
  creator: "Adam Pang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adampang.com",
    siteName: "Adam Pang",
    title: "Adam Pang - Software Engineer & Entrepreneur",
    description: "Software Engineer & Entrepreneur building products that matter.",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Adam Pang"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Pang - Software Engineer & Entrepreneur",
    description: "Software Engineer & Entrepreneur building products that matter.",
    creator: "@adamtpang",
    images: ["/images/profile.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    google: "your-google-site-verification",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

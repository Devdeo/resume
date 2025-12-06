import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { googleFonts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'ResumeForge AI',
  description: 'Build your professional resume with AI-powered tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontUrl = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font.replace(/ /g, '+')}:wght@400;700`).join('&')}&display=swap`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontUrl} rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

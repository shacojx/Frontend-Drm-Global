import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import '@/app/globals.css';

const fontSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DRM Landing',
  description: 'DRM Landing',
};

type RootLayoutProps = Readonly<PropsWithChildren>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={fontSans.className}>{children}</body>
    </html>
  );
}

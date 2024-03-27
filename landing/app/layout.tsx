import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { PropsWithChildren } from 'react';

import '@/app/globals.css';

const fontSans = localFont({
  variable: '--font-sans',
  src: [
    {
      path: '../assets/fonts/GoogleSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GoogleSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GoogleSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GoogleSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GoogleSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GoogleSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: 'DRM Landing',
  description: 'DRM Landing',
};

type RootLayoutProps = Readonly<PropsWithChildren>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body>{children}</body>
    </html>
  );
}

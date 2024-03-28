'use client';
import { NextImage } from '@/components/NextImage';
import logo from '@/assets/images/logo.png';
import { cn } from '@/utils/cn.util';
import Link from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Our Services',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/',
  },
  {
    label: 'Contact Us',
    href: '/',
  },
];

export const Header = () => {
  const [active, setActive] = useState(NAV_ITEMS[0]);

  return (
    <header className="h-28 border-b border-dashed border-stroke">
      <div className="mx-auto flex h-full max-w-6xl items-center px-6">
        <NextImage src={logo} alt="DRM" className="h-16 w-28" objectFit="contain" />

        <div className={cn('grow flex justify-between items-center', 'before:block')}>
          <nav>
            <ul className="flex gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn('px-4 py-3 font-bold text-grey transition-all', {
                      'text-gradient-secondary': active.label === item.label,
                    })}
                    onClick={() => {
                      setActive(item);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button className="bg-gradient-primary h-14 w-28 rounded-xl font-bold text-white">Sign In</button>
        </div>
      </div>
    </header>
  );
};

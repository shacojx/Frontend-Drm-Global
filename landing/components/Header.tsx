'use client';
import { NextImage } from '@/components/NextImage';
import logo from '@/assets/images/logo.png';
import { cn } from '@/utils/cn.util';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconMenu } from '@/assets/icons/IconMenu';
import { IconX } from '@/assets/icons/IconX';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Our Services',
    href: '#our-services',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
  },
];

export const Header = () => {
  const [active, setActive] = useState(NAV_ITEMS[0]);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {showMenu && <div className="fixed z-50 h-screen w-screen bg-gray-700/90 transition-all xl:hidden" />}

      <header className="h-28 border-b border-dashed border-stroke">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <NextImage src={logo} alt="DRM" className="h-16 w-28" objectFit="contain" />

          <div
            className={cn(
              'fixed right-0 top-0 bg-white flex flex-col w-80 max-w-[75vw] h-screen z-[60] shadow p-3 gap-6 grow justify-between transition-all duration-500',
              'xl:items-center xl:static xl:h-full xl:flex-row xl:shadow-none xl:before:block',
              {
                'translate-x-full xl:translate-x-0': !showMenu,
              }
            )}
          >
            <div className="flex items-center justify-between xl:hidden">
              <NextImage src={logo} alt="DRM" className="h-16 w-28" objectFit="contain" />
              <IconX
                className="cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                }}
              />
            </div>

            <nav className="w-full grow">
              <ul className="flex flex-col gap-1 xl:flex-row xl:justify-center xl:gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label} className="border-b xl:border-none">
                    <Link
                      href={item.href}
                      className={cn('px-4 inline-block py-3 font-bold text-grey transition-all', {
                        'text-gradient-secondary': active.label === item.label,
                      })}
                      onClick={() => {
                        setActive(item);
                        setShowMenu(false)
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link href="https://customer.drmsglobal.ai/" target='_blank'>
            <button  className="bg-gradient-primary h-14 w-28 rounded-xl font-bold text-white">Sign In</button>
            </Link>
          </div>

          <IconMenu
            className="size-9 cursor-pointer xl:hidden"
            onClick={() => {
              setShowMenu(true);
            }}
          />
        </div>
      </header>
    </>
  );
};

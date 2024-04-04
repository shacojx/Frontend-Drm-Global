import { NextImage } from '@/components/NextImage';

import bg_hero_image from '@/assets/images/hero.png';
import { cn } from '@/utils/cn.util';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative pt-8 xl:pt-25">
      <div className="absolute -left-40 -top-20 size-80 rounded-full bg-primary/30 blur-3xl" />

      <h1 className="mx-auto max-w-3xl text-center text-[26px]  font-bold xl:text-[3.5rem]">
        <span className="text-gradient-primary">Revolutionze </span>
        your Digitally LLC business
      </h1>

      <p className="mx-auto max-w-lg px-4 pt-10 text-center text-grey">
        The key to business success. Let us handle all procedures - Leading in convenience and professionalism in
        business registration services.
      </p>

      <Link href={process.env.NEXT_PUBLIC_WEB_URL ?? ''} target="_self">
        <button
          className={cn(
            'bg-gradient-primary mx-auto mt-8 flex h-14 items-center rounded-xl px-6 font-bold text-white mb-6',
            'xl:mb-0'
          )}
        >
          Get started
        </button>
      </Link>

    <NextImage className="mx-auto w-full max-w-6xl px-4" src={bg_hero_image} alt="DRM" />
    </section>
  );
};

import { NextImage } from '@/components/NextImage';

import bg_hero_image from '@/assets/images/hero.png';

export const HeroSection = () => {
  return (
    <section className="relative pt-25">
      <div className="absolute -left-40 -top-20 size-80 rounded-full bg-red-500/30 blur-3xl" />

      <h1 className="mx-auto max-w-3xl text-center text-[3.5rem] font-bold">
        <span className="text-gradient-primary">Revolutionze </span>
        your Digitally LLC business
      </h1>

      <p className="mx-auto max-w-lg pt-10 text-center text-grey">
        The key to business success. Let us handle all procedures - Leading in convenience and professionalism in
        business registration services.
      </p>

      <button className="bg-gradient-primary mx-auto mt-8 flex h-14 items-center rounded-xl px-6 font-bold text-white">
        Get started
      </button>

      <NextImage className="-mt-5 aspect-[2880/1000] w-full" src={bg_hero_image} alt="DRM" />
    </section>
  );
};

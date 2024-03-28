import { NextImage } from '@/components/NextImage';

import img_about_us from '@/assets/images/about-us-1.png';
import { cn } from '@/utils/cn.util';

export const AboutUsSection = () => {
  return (
    <section className="mx-auto flex max-w-6xl flex-col justify-between px-4 pt-25 xl:flex-row xl:px-0">
      <div className="flex w-full flex-col justify-center xl:w-7/12">
        <h4
          className={cn(
            'text-grey uppercase font-bold',
            'after:block after:bg-gradient-divider-r after:grow after:h-0.5'
          )}
        >
          About Us
        </h4>

        <h2 className="mt-8 w-4/5 max-w-2xl text-4xl font-bold">
          <span className="text-gradient-primary">Our </span> investors and advisors are the best
        </h2>

        <div className="mt-8 leading-8 text-grey">
          Dealroom Services is a Singapore-based consulting firm. We support individuals to set up businesses globally,
          at the same time protecting your personal wealth. We specialize in managing non-core functions of business so
          you can focus on the core one, helping your businesses to achieve better results.
          <br />
          The core team consist of accountants, advisors and partners with exceptional and extensive contact networks
          globally. We are always ready to support your businesses, all the way from startup to exit stage and beyond.
        </div>
      </div>

      <div className="mt-6 w-full max-w-none xl:mt-0 xl:w-4/12 xl:max-w-96">
        <div className="rounded-4xl border border-stroke p-6">
          <NextImage src={img_about_us} alt="About Us" className="aspect-[4/5] rounded-2xl" />
          <p className="mt-6 text-grey">
            “The good thing about DRMGlobal is that it saves a lot of time so I can do other things - the running of the
            business part.”
          </p>
        </div>
      </div>
    </section>
  );
};

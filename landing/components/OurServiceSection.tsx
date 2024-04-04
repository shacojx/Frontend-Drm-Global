import { cn } from '@/utils/cn.util';
import { NextImage } from '@/components/NextImage';

import img_service_1 from '@/assets/images/service-1.png';
import img_service_2 from '@/assets/images/service-2.png';
import img_service_3 from '@/assets/images/service-3.png';

const OUR_SERVICES = [
  {
    image: img_service_1,
    title: 'CORPORATE SERVICES',
    description:
      'Dealroom Services Pte. Ltd. suite of corporate secretary services are specially designed and crafted for the ever changing landscape. Our trained professionals will be with you every steps of the way from…',
  },
  {
    image: img_service_2,
    title: 'BUSINESS GROWTH',
    description:
      'Dealroom Services Pte. Ltd. business growth advisory service assist and advise businesses where and how to charter their next step with our deep expertise and establish network.',
  },
  {
    image: img_service_3,
    title: 'FUND ADVISORY',
    description:
      'Dealroom Services Pte. Ltd. offers other services to enhance and support your business operations both locally and internationally.',
  },
];

export const OurServiceSection = () => {
  return (
    <section className="px-4 pt-28 xl:px-0" id="our-services">
      <h4
        className={cn(
          'flex gap-4 items-center max-w-6xl mx-auto text-grey uppercase font-bold',
          'before:block before:bg-gradient-divider-l before:grow before:h-0.5',
          'after:block after:bg-gradient-divider-r after:grow after:h-0.5'
        )}
      >
        Our Services
      </h4>

      <h2 className="mx-auto mt-8 max-w-2xl text-center text-[26px] font-bold xl:text-4xl">
        <span className="text-gradient-primary">Flexible </span>
        services for every stage of your business
      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-center text-grey">
        DealRMS is an appropriate statutory authority that offers a comprehensive range of services such as accounting,
        taxation company registration, etc. We pioneered the assistance of professional company registration services.
        So here with us, say hello to all hassle-free administrative & reporting responsibilities.
      </p>

      <div className="mx-auto mt-20 flex max-w-6xl flex-wrap justify-evenly gap-4">
        {OUR_SERVICES.map(({ image, title, description }) => (
          <div key={title} className="flex max-w-full flex-col gap-6 rounded-4xl border border-stroke p-6 sm:max-w-80">
            <NextImage src={image} alt="Service 1" className="aspect-[5/4] w-full rounded-xl" />
            <h4 className="text-gradient-secondary text-xl font-bold">{title}</h4>
            <div className="line-clamp-6 text-grey">{description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

import { NextImage } from '@/components/NextImage';

import img_contact_us_hero from '@/assets/images/contact-us-hero.png';
import { cn } from '@/utils/cn.util';

export default function ContactUsPage() {
  return (
    <div>
      <NextImage src={img_contact_us_hero} alt="" className={cn("aspect-video xl:aspect-[4/1] -mx-4")} />
      <div className="px-4 py-16">
        <h3 className="text-center text-4xl font-bold">CONTACT US</h3>

        <div className="mt-8 text-center text-grey">
          Please use the form on this page to contact us. If you wish to drop by our office, our office address is as
          follows.
        </div>

        <div className="mt-8 text-center text-grey">OFFICE:138 Robinson Road #02-50 Oxley Tower Singapore 068906</div>
        <div className="mt-3 text-center text-grey">PHONE: +65 8806 5531</div>
        <div className="mt-3 text-center text-grey">EMAIL: info@dealrms.com</div>
      </div>
    </div>
  );
}

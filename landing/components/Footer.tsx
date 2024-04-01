import { cn } from '@/utils/cn.util';
import { NextImage } from '@/components/NextImage';

import img_logo from '@/assets/images/logo.png';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import { IconTwitter } from '@/assets/icons/IconTwitter';
import { IconInstagram } from '@/assets/icons/IconInstagram';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={cn('border-t border-stroke pt-14 pb-7 px-4', 'xl:pt-25 xl:px-0')}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 xl:grid-cols-4">
        <div className="flex flex-col gap-8 xl:col-span-2">
          <NextImage src={img_logo} alt="DRM" className="h-16 w-28" objectFit="contain" />
          <div className="w-7/12 leading-8 text-grey">DRMGlobal is a Singapore based business consultancy company.</div>

          <div className="flex gap-8 text-3xl">
            <IconFacebook />
            <IconTwitter />
            <IconInstagram />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-gradient-secondary font-bold">Company</h4>
          <Link href="/" className="text-grey">
            About Us
          </Link>
          <Link href="/" className="text-grey">
            Privacy policy
          </Link>
          <Link href="/" className="text-grey">
            Terms and condition
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-gradient-secondary font-bold">Meet Us</h4>
          <Link href="/" className="text-grey">
            +65 9641 6855
          </Link>
          <Link href="/" className="text-grey">
            info@dealrms.com
          </Link>
          <Link href="/" className="text-grey">
            Singapore Office
            <br />
            138 Robinson Road, #02-50 Oxley Tower, Singapore 068906
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-stroke pt-6 text-center text-grey">
        © 2024 DRMGlobal, All Rights Reserved
      </div>
    </footer>
  );
};

/* eslint-disable @next/next/no-img-element */
import { cn } from '@/utils/cn.util';
import type { ImageProps, StaticImageData } from 'next/image';
// import Image from 'next/image';

type NextImageProps = Pick<ImageProps, 'alt'> & {
  className?: string;
  objectFit?: 'cover' | 'contain';
  src: StaticImageData;
};

export const NextImage = ({ className, src, alt, objectFit = 'cover' }: NextImageProps) => {
  return (
    <div className={cn(className, 'relative overflow-hidden')}>
      <img
        src={src.src}
        alt={alt}
        className={cn('size-full', {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
        })}
      />
      {/* <Image
        src={src}
        alt={alt}
        fill
        className={cn('absolute', {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
        })}
      /> */}
    </div>
  );
};

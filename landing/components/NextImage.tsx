import { cn } from '@/utils/cn.util';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

type NextImageProps = Pick<ImageProps, 'alt' | 'src'> & {
  className?: string;
  objectFit?: 'cover' | 'contain';
};

export const NextImage = ({ className, src, alt, objectFit = 'cover' }: NextImageProps) => {
  return (
    <div className={cn(className, 'relative overflow-hidden')}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn('absolute', {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
        })}
      />
    </div>
  );
};

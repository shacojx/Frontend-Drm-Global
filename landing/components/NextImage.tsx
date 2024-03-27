import { cn } from '@/utils/cn.util';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

type NextImageProps = Pick<ImageProps, 'alt' | 'src'> & {
  className?: string;
};

export const NextImage = ({ className, src, alt }: NextImageProps) => {
  return (
    <div className={cn(className, 'relative')}>
      <Image src={src} alt={alt} fill className="absolute object-contain" />
    </div>
  );
};

import { ButtonHTMLAttributes } from 'react';
import { IconSpinner } from './icons';
import { cn } from '../utils/cn.util';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { isLoading, className, disabled, children, ...rest } = props;
  const newClassName = disabled
    ? ' cursor-not-allowed bg-primary/80 ' + className
    : className;
  return (
    <button
      className={cn(' flex justify-center items-center bg-primary text-white font-semibold rounded-lg py-2 px-4', newClassName, )}
      disabled={disabled}
      {...rest}
      // className='  w-full text-center py-3 uppercase bg-primary text-white hover:bg-primary/80'
      type="submit"
    >
      <span>{isLoading && <IconSpinner className="w-4 h-4 mr-2" />}</span>
      <span>{children}</span>
    </button>
  );
}

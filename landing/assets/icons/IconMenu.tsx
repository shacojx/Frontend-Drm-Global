import type { SVGProps } from 'react';
import React from 'react';

export const IconMenu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="36" height="36" rx="8" fill="#E9EEF6" />
      <rect x="9" y="10.75" width="18" height="1.5" rx="0.75" fill="currentColor" fill-opacity="0.85" />
      <rect x="9" y="17.25" width="9" height="1.5" rx="0.75" fill="currentColor" fill-opacity="0.85" />
      <rect x="9" y="23.75" width="18" height="1.5" rx="0.75" fill="currentColor" fill-opacity="0.85" />
    </svg>
  );
};
